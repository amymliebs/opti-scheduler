class Api::V1::EventsController < ApiController
  def index
    render json: Event.where(user: current_user)
  end

  def show
    event = Event.find_by(access_code: params[:id])

    event_availabilities = []
    event.timeslots.each do |timeslot|
      availability = timeslot.availabilities
      event_availabilities << availability
    end

    render json: {
      event: event,
      timeslots: event.timeslots,
      availabilities: event_availabilities
    }
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

      find_timeslot_to_fill = least_available(availabilities_by_timeslot)

      schedule_slot = schedule_availability(find_timeslot_to_fill)

      delete_unneeded_availabilities = destroy_overlap(availabilities_by_timeslot)

      continue_scheduling = continue_assigning(availabilities_by_timeslot)
    end
  end

  private

  def least_available(event_timeslots)
    fewest_availabilities = nil
    binding.pry
    event_timeslots.each do |slot_availabilities|
      if fewest_availabilities.nil? && slot_availabilities.length > 0
        fewest_availabilities = slot_availabilities
      end
      if !fewest_availabilities.nil? && slot_availabilities.length > 0 && (slot_availabilities.length < fewest_availabilities.length) && (slot_availabilities[0][:status] != "scheduled")
        fewest_availabilities = slot_availabilities
      end
    end
    fewest_availabilities
  end

  def schedule_availability(timeslot)
    schedule_me = timeslot.first
    schedule_me[:status] =  "scheduled"
    availability_record = Availability.find(schedule_me[:id])
    availability_record.update!(status: "scheduled")
  end

  def destroy_overlap(remaining_availabilities)
    remaining_availabilities.each do |slot_availabilities|
      slot_availabilities.each do |slot|
        matching_timeslots = Availability.where(timeslot_id: slot[:timeslot_id]).to_a
        matching_invitee = Availability.where(invitee_id: slot[:invitee_id]).to_a
        matches = matching_timeslots.concat(matching_invitee)
        matches.each do |matching_slot|
          binding.pry
          if matching_slot[:status] == "available"
            binding.pry
            record_to_destroy = Availability.find(matching_slot[:id])
            record_to_destroy.destroy
            remaining_availabilities.delete(matching_slot)
          end
        end
      end
    end
    remaining_availabilities
  end

  def continue_assigning(all_availabilities)
    binding.pry
    all_availabilities.flatten.each do |remaining_timeslot|
      if remaining_timeslot[:status] != "scheduled"
        scheduling_needed = true
      end
    end
  end

  def event_params
    params.require(:event).permit(:event_name, :event_description, :event_date, :rsvp_date, :invitees, :location, :user_id)
  end
end
