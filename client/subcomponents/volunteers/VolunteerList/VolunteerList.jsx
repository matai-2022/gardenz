import React from 'react'
import VolunteerListItem from '../VolunteerListItem/VolunteerListItem'

export default function VolunteerList({ volunteers, eventId }) {
  return (
    <>
      <h4 className="form-title">List of Volunteers</h4>
      <section className="volunteers-list">
        <ul role="volunteerList">
          {volunteers?.length ? (
            volunteers.map((volunteer) => (
              <VolunteerListItem
                key={volunteer.userId}
                volunteer={volunteer}
                eventId={eventId}
              />
            ))
          ) : (
            <p>No volunteers yet</p>
          )}
        </ul>
      </section>
    </>
  )
}
