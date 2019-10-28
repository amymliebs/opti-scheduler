class Api::V1::EventsController < ApiController
  def index
    render json: Event.all
  end

  def create
    @event = Event.new(event_params)
    @event.user = current_user
    @user = @event.user

    if @event.save
      CorrespondenceMailer.invitation_email(@event, @user).deliver_now
      render json: @event
    else
      render json: {
        errors: @event.errors.messages,
        fields: @event
      }
    end
  end

  private

  def event_params
    params.require(:event).permit(:event_name, :event_description, :event_date, :rsvp_date, :invitees, :user_id)
  end
end
