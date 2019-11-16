class Api::V1::InviteesController < ApiController
  def show
    invitee = Invitee.find_by(invitee_code: params[:id])
    event = Event.find_by(access_code: params[:event_id])
    eventId = invitee.event_id
    timeslots = Timeslot.where("event_id = ?", eventId)

    is_scheduled = false
    timeslots.each do |timeslot|
      if timeslot.availabilities[0] && timeslot.availabilities[0].status == "scheduled"
        is_scheduled = true
      end
    end

    render json: {
      event: event,
      invitee: invitee,
      timeslots: timeslots,
      scheduled: is_scheduled
    }
  end

  def update
    rsvp = Invitee.find_by(invitee_code: params[:id])
    event = Event.find_by(access_code: params[:event_id])
    host_time_entries = event.timeslots
    rsvp_times = params[:availabilities][:timeslots]

    if !rsvp.availabilities[0] || rsvp.availabilities[0].status != "scheduled"
      if rsvp.availabilities
        rsvp.availabilities.destroy_all
      end
      if rsvp.update!(invitee_params)
        rsvp_times.each do |rsvp_time|
          host_time_entries.each do |entry|
            if entry.slot == rsvp_time
              Availability.create!(timeslot: entry, invitee: rsvp)
            end
          end
        end
        render json: rsvp
      end
    else
      render json: rsvp.errors
    end
  end

  def invitee_params
    params.require(:invitees).permit(:first_name, :last_name, :email, :note, :phone)
  end
end
