import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import request from 'superagent'

import { addNews } from './addNewsHelper'
import NewsForm from '../../../subcomponents/News/NewsForm/NewsForm' //Change
import { addEventVariants } from '../../animationVariants'

export default function AddNews() {
  const navigate = useNavigate()
  const [gardenId, setGarden] = useState(0)
  const [gardens, setGardens] = useState([])

  useEffect(() => {
    request['get']('/api/v1/gardens')
      .set({ Accept: 'application/json' })
      .then((res) => {
        console.log(res)
        setGardens(res.body.gardens)
        return
      })
      .catch((error) => {
        const errMessage = error.response?.body?.error?.title
        throw new Error(errMessage || error.message)
      })
  }, [])

  function submitNews(news) {
    addNews(news, navigate)
  }

  const initialState = {
    title: '',
    content: '',
  }

  function handleChange(event) {
    console.log('Garden selected: ' + event.target.value)
    setGarden(event.target.value)
  }

  return (
    <motion.div
      variants={addEventVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <select
        name="gardenId"
        id="garden"
        onChange={(event) => handleChange(event)}
        value={gardenId}
        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
      >
        <option hidden>Select from this list</option>
        {gardens.map((garden) => {
          return (
            <option key={garden.id} value={garden.id}>
              {garden.name}
            </option>
          )
        })}
      </select>
      <NewsForm
        formData={initialState}
        action="Create News"
        submitNews={submitNews}
      />
    </motion.div>
  )
}
