import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { addNews } from './addNewsHelper'
import { addEventVariants } from '../../../animationVariants'
import NewsForm from '../../../../subcomponents/News/NewsForm/NewsForm' //Change

export default function AddNews() {
  const navigate = useNavigate()

  function submitNews(news) {
    addNews(news, navigate)
  }

  return (
    <motion.div
      variants={addEventVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <NewsForm action="Create News" submitNews={submitNews} />
    </motion.div>
  )
}
