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
    event = Event.find_by(access_code: params[:event_id])
    host_time_entries = event.timeslots
    rsvp_times = params[:availabilities][:timeslots]

    if rsvp.update!(invitee_params)
      rsvp_times.each do |rsvp_time|
        host_time_entries.each do |entry|
          if entry.slot == rsvp_time
            Availability.create!(timeslot: entry, invitee: rsvp)
          end
        end
      end
      render json: rsvp
    else
      render json: rsvp.errors
    end
  end

  def invitee_params
    params.require(:invitees).permit(:first_name, :last_name, :email, :note)
  end
end
