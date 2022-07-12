import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNews } from './addNewsHelper'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import NewsForm from '../../../../subcomponents/News/NewsForm/NewsForm'
import { addEventVariants } from '../../../animationVariants'
import { getAllGardens } from '../../../../views/user/Gardens/Index/IndexHelper'
import { showError } from '../../../../slices/error'

export default function AddNews() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [gardenList, setGardenList] = useState([])

  function submitNews(news) {
    addNews(news, navigateTo)
  }

  useEffect(() => {
    getAllGardens()
      .then((gardens) => {
        setGardenList(gardens)
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
        return false
      })
  }, [])

  const initialFormData = {
    title: '',
    content: '',
    gardenId: '',
  }

  return (
    <motion.div
      variants={addEventVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <NewsForm
        initialFormData={initialFormData}
        action="Post News"
        gardenList={gardenList}
        submitNews={submitNews}
      />
    </motion.div>
  )
}
