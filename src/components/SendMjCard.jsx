import {useState}from 'react'
import ShowImgModal from '../hooks/showImgModal';


const SendMjCard = ({sendDataMjs, closeModal, modal, selectProduct,handleCloseImage, showImage,setShowImage}) => {
  const [formData, setFormData] = useState({
    sector: "",
    tipo: "",
    direccion: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const   handleSubmit = (e) => {
    e.preventDefault();
    sendDataMjs({...formData, price: fixPrice})
  };
  const fixPrice = selectProduct.i_id === 'f02' ? '1362' : selectProduct.i_id === 'f03' ? '1600' : formData.sector === 'La-paz' ? '262' : '270';
  const infoText = fixPrice === '1362' ? 'Cilindro Nuevo': fixPrice === '1600'? 'Cilindro full accesorios': 'Cilindro 25Lbs'

 return (
 <>
      {showImage !== '' && showImage !== null && <ShowImgModal showImage={showImage} handleCloseImage={handleCloseImage} />}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4 ${modal ? 'block' : 'hidden'}`}>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-xl xs:rounded-2xl shadow-2xl overflow-hidden relative z-60"
          >
          <div className="bg-linear-to-br from-amber-400 to-amber-200 px-4 py-3 xs:px-6 xs:py-4 sm:px-8 sm:py-6 flex relative">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-light text-gray-800 tracking-wide pr-8">
              ¿A dónde se lo enviamos?
            </h1>
            <button
              type="button"
              onClick={() => closeModal()}
              className="absolute right-3 top-2 xs:right-4 xs:top-3 sm:right-6 sm:top-4 px-2 py-0.5 xs:py-1 rounded-sm cursor-pointer hover:scale-105 transition duration-75 bg-red-500 text-white text-sm xs:text-base"
            >
              X
            </button>
          </div>

          <div className="px-4 py-4 xs:px-6 xs:py-6 sm:px-8 sm:py-8 space-y-4 xs:space-y-6 sm:space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] xs:max-h-[calc(100vh-180px)] sm:max-h-[80vh]">
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <label  className="text-xs xs:text-sm font-medium text-gray-600 uppercase tracking-wider">
                Seleccione el sector
              </label>
              <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3">
                {["La-paz", "Cane", "Yarumela","Lejamani"].map((sector) => (
                  <label  key={sector} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="sector"
                      value={sector}
                      onChange={handleChange}
                      checked={formData.sector === sector}
                      className="sr-only"
                      required
                    />
                    <div
                      className={`radio-card px-2 py-2 xs:px-3 xs:py-2.5 sm:px-4 sm:py-3 text-center rounded-lg xs:rounded-xl border-2 transition-all ${
                        formData.sector === sector
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-xs xs:text-sm font-medium text-gray-700 capitalize">
                        {sector.replace("-", " ")}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <label  className="flex justify-between text-xs xs:text-sm font-medium text-gray-600 uppercase tracking-wider">
                <span>Tipo de cilindro</span>
                <span className='cursor-pointer hover:text-amber-700 flex items-center gap-1' onClick={()=>setShowImage('/images/tipocilindro.webp')}>
                  <svg className='inline w-3 h-3 xs:w-4 xs:h-4' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path><path d="M277 360h-42V235h42v125zm0-166h-42v-42h42v42z"></path></svg> 
                  <span className=" xs:inline">¿Cuál tengo?</span>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3">
                {[
                  { value: "valvula", label: "De valvula" },
                  { value: "normal", label: "Normal (sapo)" },
                ].map((tipo) => (
                  <label key={tipo.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      value={tipo.value}
                      onChange={handleChange}
                      checked={formData.tipo === tipo.value}
                      className="sr-only"
                      required
                    />
                    <div
                      className={`radio-card px-2 py-2 xs:px-3 xs:py-2.5 sm:px-5 sm:py-3 text-center rounded-lg xs:rounded-xl border-2 transition-all ${
                        formData.tipo === tipo.value
                          ? "border-amber-400 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-xs xs:text-sm font-medium text-gray-700">
                        {tipo.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 xs:space-y-2">
              <label className="text-xs xs:text-sm font-medium text-gray-600 uppercase tracking-wider">
                Dirección de entrega
              </label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 xs:px-4 xs:py-3 rounded-lg xs:rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all resize-none text-gray-700 text-sm xs:text-base"
                rows="3"
                placeholder="Especifique su dirección..."
                required
              ></textarea>
            </div>
          </div>

          <div className="px-4 py-3 xs:px-6 xs:py-4 sm:px-8 sm:py-6 bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <div>
              <p className="text-[10px] xs:text-xs text-gray-500 uppercase tracking-wider mb-0.5 xs:mb-1">
                Total
              </p>
              <p className="text-2xl xs:text-2xl sm:text-3xl font-light text-gray-800">
                <span className='text-xs xs:text-sm font-bold block text-red-400'>
                  {infoText}
                </span>
                {fixPrice}
                <span className="text-base xs:text-lg sm:text-xl text-gray-600">Lps</span>
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 xs:px-6 xs:py-2.5 sm:px-8 sm:py-3 cursor-pointer bg-linear-to-r from-gray-700 to-gray-900 text-white rounded-lg xs:rounded-xl text-sm xs:text-base font-medium hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </>
);
}

export default SendMjCard