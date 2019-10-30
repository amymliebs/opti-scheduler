class Api::V1::EventsController < ApiController
  def index
    render json: Event.all
  end

  def show
    event = Event.find(params[:id])

    render json: {
      event: event,
      timeslots: event.timeslots
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
      invitees.split.each do |invitee|
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
      if new_times.map(&:save)
        CorrespondenceMailer.invitation_email(@event, @user).deliver_now
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
    event_to_delete = Event.find(params[:id])
    event_to_delete.destroy

    render json: {
      events: Event.all
    }
  end

  private

  def event_params
    params.require(:event).permit(:event_name, :event_description, :event_date, :rsvp_date, :invitees, :location, :user_id)
  end
end
