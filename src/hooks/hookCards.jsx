import { useState, useCallback } from 'react'
import allProducts from '../database/products'
import SendMjCard from '../components/SendMjCard'
import ShowImgModal from './showImgModal'

const WHATSAPP_PHONE = '50499550232'
const PRICES = { 'La-paz': '263', default: '270' }

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
    console.log(orderList)
  }, [createWhatsAppUrl])

  const formData = useCallback((info) => {
    const updateprice = orderList.i_id === 'f02'? '1362' : info.sector === 'La-paz' ? PRICES['La-paz'] : PRICES.default
    console.log(orderList.i_id)
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
        <SendMjCard sendDataMjs={formData} closeModal={closeModal} modal={modal} selectProduct={orderList} />
        {showImage !== '' && showImage !== null && <ShowImgModal showImage={showImage} handleCloseImage={handleCloseImage} />}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mb-5'>
        {allProducts.map((product, index) => (
          <div key={product.i_id} className='border-gray-500 border flex ygradient2 h-[300px] min-w-[350px] rounded-xl hover:scale-101 transition duration-100'>
            {product.i_id === 'f02' && (<span className='absolute bg-red-500 px-2 py-1 text-white font-bold ml-2 mt-2 block rounded-sm border-2 border-yellow-200'>
              Nuevo
            </span>)}
            <img onClick={()=> setShowImage(product.imgUrl)} className=' cursor-pointer w-70 object-cover rounded-l-xl rounded-lg ' src={product.imgUrl} alt={product.name} />
            <div className='w-full  relative'>
              <h3 className=' text-xl sm:text-3xl text-(--gray) font-bold p-2'>
              {product.name}
              </h3>
              <p className='px-2'>
                {product.description}
              </p>
              <hr className='text-gray-700' />
              {product.details.map((detail,i)=>{
                return <p key={i} className='px-2 font-bold text-(--gray) mt-2'>{detail}</p>
              })}
              <span className='absolute bottom-2 left-1 font-extrabold text-(--gray) text-4xl sm:text-5xl'>

              L {product.price}<small className='text-xl'>.00</small>
              </span>
              <button className='btn2 absolute right-4 bottom-5 text-sm font-bold sm:text-xl' onClick={() => sendData(index)}>
                {product.requiereForm ? 'Solicitar' : 'Mas info'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HookCards