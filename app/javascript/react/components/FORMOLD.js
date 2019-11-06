

        <form onSubmit={handleEventSubmit}>
          <ErrorList errors={errors} />
          <div className="left-column">
            <div className="form-field">
              <label> Event Window Name *
                <input
                  name="eventName"
                  type="text"
                  onChange={handleFieldChange}
                  value={newEvent.eventName}
                />
              </label>
            </div>

            <div className="form-field">
              <label> Location
                <input
                  name="location"
                  type="text"
                  onChange={handleFieldChange}
                  value={newEvent.location}
                />
              </label>
            </div>

            <div className="form-field">
              <label> Event Window Description <br />
                <textarea
                  className="textarea-box"
                  name="eventDescription"
                  rows="4"
                  onChange={handleFieldChange}
                  value={newEvent.eventDescription}
                  placeholder="Write a description to give your guests context for the event. This description will be visible to every person you invite to schedule an event during this window."
                />
              </label>
            </div>

            <div className="form-field">
              <label> Event Window Date *
                <DatePicker
                  className="centered"
                  name="eventDate"
                  selected={eventDate}
                  onChange={date => setEventDate(date)}
                  placeholderText="mm-dd-yyyy"
                  minDate={new Date()}
                />
              </label>
            </div>

            <div className="form-field">
              <label> RSVP by Date *
                <DatePicker
                  className="centered"
                  name="rsvpDate"
                  selected={rsvpDate}
                  onChange={date => setRsvpDate(date)}
                  placeholderText="mm-dd-yyyy"
                  maxDate={eventDate}
                  minDate={new Date()}
                />
              </label>
            </div>

            <div className="form-field">
              <label> Invitees * <br />
                <textarea
                  className="textarea-box"
                  name="invitees"
                  rows="5"
                  value={newEvent.invitees}
                  onChange={handleFieldChange}
                  placeholder="List the email addresses of your guests, separated by commas."
                />
              </label>
            </div>
          </div>

          <div className="right-column">
            <div className="timeslots-label form-field"> Available Times:&ensp;Select the times you are available to meet. These times set the window available for your invitees. </div>
            <div className="times column">
              <div className="ui stackable grid">
                {times}
              </div>
              <div className="space-below"></div>
              <div className="centered">
                <input className="form-button" type="submit" value="Send Invitations!"/>
              </div>
            </div>
          </div>
        </form>
        <div className="spacer">
        </div>
      </div>
    </div>
