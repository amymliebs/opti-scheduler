class Api::V1::InviteesController < ApiController
  def show
    invitee = Invitee.find(params[:id])
    event = Event.find(params[:event_id])
    eventId = invitee.event_id
    
    render json: {
      event: event,
      invitee: invitee,
      timeslots: Timeslot.where("event_id = ?", eventId)
    }
  end

  def edit
    # Availability.create
    #
    # thisInvitee = Invitee[:params...]
    # thisInvitee.first__name = first_name
  end
end
