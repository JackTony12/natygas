import React from 'react'


const ShowImgModal = ({ handleCloseImage, showImage}) => {
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-50 '>
        <div className='border border-white bg-white flex flex-col gap-10 items-center justify-center rounded-xl'>
        <img className='w-[80%] tiny:w-[200px] sm:w-[300px] lg:w-[450px] ' src={showImage} alt="" />
        <button className='btn2' onClick={handleCloseImage}>Close</button>
        </div>
    </div>
  )
}

export default ShowImgModal