import React from 'react'

import { useSelector } from 'react-redux'
import Events from '../../../../subcomponents/events/Events/Events'
import GardenHeader from '../../../../subcomponents/gardens/GardenHeader/GardenHeader'
import useGarden from '../../../../utils/useGarden'

export default function GardenEvents() {
  const user = useSelector((globalState) => globalState.user)
  const { name, address, imageHeaderUrl, events } = useGarden()

  return (
    <>
      <GardenHeader name={name} url={imageHeaderUrl} />
      <main className="container lg:flex mx-auto mt-5">
        <article className="lg:w-1/2">
          <Events address={address} events={events} user={user} />
        </article>
      </main>
    </>
  )
}
