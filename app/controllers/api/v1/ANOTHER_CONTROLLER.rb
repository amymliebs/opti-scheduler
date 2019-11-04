when button.click



  times = thisevent.timeslots

  least_availability_timeslot = {}
  times.each do |time|
    if Availability.find_by(timeslot_id) == time

    Event.invitees .find_by(event_id)

timeslots = []
window_times = Timeslot.find_by(event_id)
window_times.each do |time|
  time.availabilities
  timeslots << timeslot

timeslots = ["Jason", "Jason", "Teresa", "Judah", "Michelle", "Judah", "Judah", "Allison"]
counts = Hash.new(0)
timeslots.each { |timeslot| counts[timeslot] += 1 }
      # => {"Jason" => 2, "Teresa" => 1, ....


      words.each_with_object(Hash.new(0)) { |word,counts| counts[word] += 1 }

# {"how"=>1, "much"=>1, "wood"=>2, "could"=>1, "a"=>1, "chuck"=>2}
