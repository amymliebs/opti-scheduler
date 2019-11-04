class Api::V1::AvailabilitiesController < ApiController
  before_action :authenticate_user!

  def update
    # times = thisevent.timeslots
    # least_availability_timeslot = {}
    #   times.each do |time|
    #     if Availability.find_by(timeslot_id) == time
    #
    #     Event.invitees .find_by(event_id)
    #     end
    #   end
    # timeslots = []
    # window_times = Timeslot.find_by(event_id)
    # window_times.each do |time|
    #   time.availabilities
    #   timeslots << timeslot


    this_event = Event.find(params[:id])
    timeslots = this_event.timeslots
    counts = Hash.new(0)
    timeslots.each { |timeslot| counts[timeslot] += 1 }
    # => {"Jason" => 2, "Teresa" => 1, ....


    # Find the timeslots of this event
    # Count how many availabilities of each timeslot. replace focus-slot value if it is less than the existing focus-slot.
    #
    # assign the slot to the first availability (.find) for it.
    #
    # Destroy all other timeslots for this invitee_id.
    # Destroy all other availabilities for this timeslot.
    #
    #
    #
    # Find the smallest number in the hash, assign it to the first availabilitiy for it


  end
end
