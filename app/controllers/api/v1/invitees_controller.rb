class Api::V1::InviteesController < ApiController
  def show
    invitee = Invitee.find_by(invitee_code: params[:id])
    event = Event.find_by(access_code: params[:event_id])
    eventId = invitee.event_id

    render json: {
      event: event,
      invitee: invitee,
      timeslots: Timeslot.where("event_id = ?", eventId)
    }
  end

  def update
    rsvp = Invitee.find_by(invitee_code: params[:id])
    if rsvp.update(invitee_params)
      render json: rsvp
    else
      render json: rsvp.errors
    end
  end

  def invitee_params
    params.require(:invitees).permit(:first_name, :last_name, :email, :note)
  end
end
