import React from 'react'

import AdminEventItem from '../EventItem/AdminEventItem'
import AddButton from '../../events/EventButtons/AddButton'

export default function AdminEvents({ address, events }) {
  return (
    <main className="container mx-auto">
      <section className="container flex gap-4">
        <h3 className="font-sans text-2xl">Upcoming Events:</h3>
        <AddButton />
      </section>

      {events.length === 0 ? (
        <p>Sorry no events found, please come back later! </p>
      ) : (
        <section className="w-full grid grid-cols-3 gap-4 mt-5 pr-6">
          {events.map((event) => (
            <AdminEventItem key={event.id} address={address} event={event} />
          ))}
        </section>
      )}
    </main>
  )
}
