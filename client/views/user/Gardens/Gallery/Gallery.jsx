import React from 'react'
import lightGallery from 'lightgallery'

function Gallery() {
  return (
    <>
      <div id="lightgallery">
        <p> hi, this is the gallery</p>
        <a href="/images/comGardenPlant.png" data-lg-size="1600-2400">
          <img alt="garden image1" src="/images/comGardenPlant.png" />
        </a>
        <a href="/images/comGardenRows.png" data-lg-size="1600-2400">
          <img alt="garden image2" src="/images/comGardenRows.png" />
        </a>
        {/* <img src="/images/comGardenPlant.png" alt="garden image1" /> */}
        {/* <img src="/images/comGardenRows.png" alt="garden image2" /> */}
      </div>
    </>
  )
}

export default Gallery
