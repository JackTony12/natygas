import { useState, useCallback } from 'react'
import allProducts from '../database/products'
import SendMjCard from '../components/SendMjCard'
import ShowImgModal from './showImgModal'

const WHATSAPP_PHONE = '50431550068'
const PRICES = { 'La-paz': '262', default: '270' }

const HookCards = () => {
  const [modal, setModal] = useState(false)
  const [showImage, setShowImage] = useState(null)



  const handleCloseImage = ()=>{
    setShowImage('')
  }
  const [orderList, setOrderList] = useState({
    product: '',
    type: '',
    price: '',
    sector: '',
    direccion: ''
  })

  const createWhatsAppUrl = useCallback((message) => {
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${message}`
  }, [])

  const sendData = useCallback((i) => {
    const product = allProducts[i]
    if (product.requiereForm) {
      setModal(true)
      setOrderList(prev => ({
        ...prev,
        product: product.name,
        price: product.price,
        i_id:product.i_id,
      }))
    } else {
      const message = `Hola! 👋 Me podria brindar más información sobre: ${product.name} de: ${product.price} Lps%0A`
      window.open(createWhatsAppUrl(message), '_blank')
    }
  }, [createWhatsAppUrl])

  const formData = useCallback((info) => {
    const updateprice = orderList.i_id === 'f02'? '1362' : orderList.i_id === 'f03' ? '1600' : info.sector === 'La-paz' ? PRICES['La-paz'] : PRICES.default
    const updatedOrder = {
      ...orderList,
      price: updateprice,
      sector: info.sector,
      type: info.tipo,
      direccion: info.direccion
    }

    const createMsj = `¡Hola! 👋%0A
    Me gustaría realizar un pedido de gas.%0A%0A
    🧾 *Detalles del pedido:*%0A
    • Producto: ${updatedOrder.product}%0A
    • Tipo: ${updatedOrder.type}%0A
    • Sector: ${updatedOrder.sector}%0A
    • Dirección: ${updatedOrder.direccion}%0A
    • Total: ${updatedOrder.price} Lps%0A
    Por favor, confírmeme si puede enviarlo. 🙏%0A
    Gracias! 😊`

    window.open(createWhatsAppUrl(createMsj), '_blank')
    
    setOrderList({
      product: '',
      type: '',
      price: '',
      sector: '',
      direccion: ''
    })
    setModal(false)
  }, [orderList, createWhatsAppUrl])

  const closeModal = useCallback(() => {
    setModal(false)
  }, [])

  return (
    <>
     <SendMjCard sendDataMjs={formData} closeModal={closeModal} modal={modal} selectProduct={orderList} handleCloseImage={handleCloseImage} showImage={showImage} setShowImage={setShowImage}/>
      {showImage !== '' && showImage !== null && <ShowImgModal showImage={showImage} handleCloseImage={handleCloseImage} />}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mb-5'>
        {allProducts.map((product, index) => (
          <div 
              key={product.i_id} 
              className='relative flex flex-col tiny:flex-row overflow-hidden rounded-2xl bg-linear-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-lg hover:shadow-2xl transition-all duration-300  sm:h-[300px] min-w-[280px] sm:min-w-[350px]'
            >
              {/* Badge :) */}
              {product.i_id === 'f02'  && (
                <span className='absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md border-2 border-white'>
                  NUEVO
                </span>
              )}
  
              {/* Imagen del Producto */}
              <div className='relative h-48 sm:h-auto sm:w-40 shrink-0 bg-linear-to-b from-transparent to-yellow-500/20'>
                <img 
                  onClick={() => setShowImage(product.imgUrl)} 
                  className='w-full h-full object-contain p-6 sm:p-4 cursor-pointer hover:scale-105 transition-transform duration-300' 
                  src={product.imgUrl} 
                  alt={product.name} 
                        />
                    </div>
                                                          
              {/* Contenido :p */}
            <div className='flex flex-col justify-between flex-1 p-4 sm:p-5 sm:pl-2'>
              {/* Header */}
              <div>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight'>
                  {product.name}
                </h3>
                <p className='text-xs sm:text-sm text-gray-700 border-b border-gray-900/10 pb-2 sm:pb-3 mb-2 sm:mb-3'>
                  {product.description}
                </p>
                
                {/* Características */}
                <div className='space-y-1 sm:space-y-1.5'>
                  {product.details.map((detail, i) => (
                    <p key={i} className='text-xs font-semibold text-gray-800 flex items-center'>
                      <span className='w-1.5 h-1.5 bg-gray-900 rounded-full mr-2'></span>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>

              {/*  Precio y Botón jsjsj */}
              <div className='flex items-end justify-between mt-3 sm:mt-4'>
                <div className='flex items-baseline'>
                  <span className='text-lg sm:text-xl font-light text-gray-800 mr-1'>L</span>
                  <span className='text-4xl sm:text-5xl font-bold text-gray-900 leading-none'>
                    {product.price}
                  </span>
                  <span className='text-base sm:text-lg font-medium text-gray-700'>.00</span>
                </div>
                
                <button 
                  className='cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm whitespace-nowrap'
                  onClick={() => sendData(index)}
                >
                  {product.requiereForm ? 'Solicitar' : 'Más info'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HookCards