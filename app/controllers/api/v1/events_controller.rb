class Api::V1::EventsController < ApiController
  def index
    render json: Event.where(user: current_user)
  end

  def show
    event = Event.find_by(access_code: params[:id])

    invitees_collection = []

    invitees_collection = event.invitees.map do |invitee|
      if invitee.availabilities.length > 0
        { invitee: {
            invitee_id: invitee.id,
            name: invitee.full_name,
            email: invitee.email,
            scheduled_slot: Timeslot.find_by(id: invitee.availabilities[0].timeslot_id).slot
          }
        } else {
          invitee_email: invitee.email
        }
      end
    end

    event_availabilities = []
    event.timeslots.each do |timeslot|
      availability = timeslot.availabilities
      event_availabilities << availability
    end

    if invitees_collection.length == 1 && invitees_collection.first.nil?
      render json: {
        event: event
      }
    else
      render json: {
        event: event,
        availabilities: event_availabilities,
        timeslots: event.timeslots,
        invitees: invitees_collection
      }
    end
  end

  def create
    invitees = params[:invitee][:email]
    timeslots = params[:timeslot][:slot]
    @event = Event.new(event_params)

    @event.user = current_user
    @user = @event.user

    new_people = []
    new_times = []

    if @event.save
      invitees.split(', ').each do |invitee|
        new_person = Invitee.new
        new_person.email = invitee
        new_person.event = @event
        new_people << new_person
      end
      if new_people.map(&:save)
        timeslots.each do |timeslot|
          new_time = Timeslot.new
          new_time.slot = timeslot
          new_time.event = @event
          new_times << new_time
        end
      end
      times_string = timeslots.join(", ")
      if new_times.map(&:save)
        CorrespondenceMailer.event_creation_email(@event, @user, invitees, times_string).deliver_now

        @event.invitees.each do |invitee|
          CorrespondenceMailer.invitation_email(@event, @user, invitee, times_string).deliver_now
        end

        render json: @event
      else
        render json: { error: @event.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {
        errors: @event.errors.messages,
        fields: @event
      }
    end
  end

  def destroy
    event_to_delete = Event.find_by(access_code: params[:id])
    event_to_delete.destroy

    render json: {
      events: Event.all
    }
  end

  def create_schedule
    availabilities_by_timeslot = params[:available_times][:possibilities]

    scheduling_needed = true

    while scheduling_needed
      scheduling_needed = false
      timeslot_to_fill = least_available(availabilities_by_timeslot)
      schedule_slot = schedule_availability(timeslot_to_fill)
      availabilities_remaining = destroy_overlap(availabilities_by_timeslot, timeslot_to_fill)

      availabilities_remaining.flatten.each do |remaining_timeslot|
        if remaining_timeslot[:status] != "scheduled"
          scheduling_needed = true
        end
      end
    end

    event = Event.find_by(access_code: params[:id])
    user = User.find(event.user_id)

    event.update(rsvp_status: "Scheduled")

    CorrespondenceMailer.host_schedule_email(event, user).deliver_now

    event.invitees.each do |invitee|
      if invitee.availabilities
        scheduled_time = Timeslot.find_by(id: invitee.availabilities[0].timeslot_id).slot
        CorrespondenceMailer.invitee_schedule_email(event, user, invitee, scheduled_time).deliver_now
      end
    end

    render json: {
      events: Event.all
    }
  end

  def send_reminder
    event = Event.find_by(access_code: params[:id])

    event.invitees.each do |invitee|
      if invitee.availabilities.length > 0
        message = "OptiScheduler Reminder: #{invitee.first_name}, you have a meeting, #{event.event_name}, at #{Timeslot.find_by(id: invitee.availabilities[0].timeslot_id).slot} on #{event.event_date}."
        cell_phone = invitee.number
        TwilioClient.new.send_text(message, cell_phone)
      end
    end
  end

  private

  def least_available(event_timeslots)
    fewest_availabilities = nil
    event_timeslots.each do |slot_availabilities|
      if fewest_availabilities.nil? && slot_availabilities.length > 0 && (slot_availabilities[0][:status] != "scheduled")
        fewest_availabilities = slot_availabilities
      elsif !fewest_availabilities.nil? && slot_availabilities.length > 0 && (slot_availabilities.length < fewest_availabilities.length) && (slot_availabilities[0][:status] != "scheduled")
        fewest_availabilities = slot_availabilities
      end
    end
    fewest_availabilities
  end

  def schedule_availability(timeslot)
    schedule_me = timeslot.first
    schedule_me[:status] = "scheduled"
    availability_record = Availability.find(schedule_me[:id])
    availability_record.update_attributes(status: "scheduled")
  end

  def destroy_overlap(remaining_availabilities, scheduled_slot)
    remaining_availabilities.each do |slot_availabilities|
      slot_availabilities.delete_if do |slot|
        if (slot[:invitee_id] == scheduled_slot.first[:invitee_id] || slot[:timeslot_id] == scheduled_slot.first[:timeslot_id]) && (slot[:status] == "available")
          record_to_destroy = Availability.find(slot[:id])
          record_to_destroy.destroy
          true
        end
      end
    end
  end

  def event_params
    params.require(:event).permit(:event_name, :event_description, :event_date, :rsvp_date, :invitees, :location, :user_id)
  end
end
