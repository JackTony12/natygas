

const ShowImgModal = ({ handleCloseImage, showImage}) => {
  return (
    <div 
      className='fixed inset-0  bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8'
      onClick={handleCloseImage}
    >
      <div 
        className='relative bg-white rounded-2xl shadow-2xl max-w-[95vw] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full overflow-hidden animate-in fade-in zoom-in duration-300'
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className='cursor-pointer absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-2 sm:p-2.5 transition-all duration-200 hover:scale-110 shadow-lg group'
          onClick={handleCloseImage}
          aria-label="Cerrar"
        >
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className='flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-linear-to-br from-gray-50 to-gray-100'>
          <img 
            className='w-full h-auto max-h-[60vh] sm:max-h-[70vh] lg:max-h-[75vh] object-contain rounded-lg shadow-md' 
            src={showImage} 
            alt="Vista ampliada del producto" 
          />
        </div>

        <div className='bg-white border-t border-gray-200 px-6 py-4 sm:px-8 sm:py-5 flex justify-center sm:justify-end'>
         
        </div>
      </div>
    </div>
  )
}

export default ShowImgModal