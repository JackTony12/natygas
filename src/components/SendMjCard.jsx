import {useState}from 'react'



const SendMjCard = ({sendDataMjs, closeModal, modal, selectProduct}) => {
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
  const fixPrice = selectProduct.i_id === 'f02' ? '1362' : formData.sector === 'La-paz' ? '263' : '270';
  const infoText = fixPrice === '1362' ? 'Cilindro Nuevo': 'Cilindro 25Lbs'
  
 return (
  <>
    <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 ${modal ? 'block' : 'hidden'}`}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative z-60 mx-4"
      >
        <div className="bg-linear-to-br from-amber-400 to-amber-200 px-8 py-6 flex relative">
          <h1 className="text-2xl font-light text-gray-800 tracking-wide">
            ¿A dónde se lo enviamos?
          </h1>
          <button
            type="button"
            onClick={() => closeModal()}
            className="absolute right-6 top-4 px-2 rounded-sm cursor-pointer hover:scale-105 transition duration-75 bg-red-500 text-white"
          >
            X
          </button>
        </div>

        <div className="px-8 py-8 space-y-8 overflow-y-auto max-h-[80vh]">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              Seleccione el sector
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["La-paz", "Cane", "Yarumela"].map((sector) => (
                <label key={sector} className="relative cursor-pointer">
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
                    className={`radio-card px-4 py-3 text-center rounded-xl border-2 transition-all ${
                      formData.sector === sector
                        ? "border-amber-400 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {sector.replace("-", " ")}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              Tipo de cilindro
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "valvula", label: "De válvula" },
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
                    className={`radio-card px-5 py-3 text-center rounded-xl border-2 transition-all ${
                      formData.tipo === tipo.value
                        ? "border-amber-400 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {tipo.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              Dirección de entrega
            </label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all resize-none text-gray-700"
              rows="4"
              placeholder="Especifique su dirección..."
              required
            ></textarea>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Total
            </p>
            <p className="text-3xl font-light text-gray-800">
              <span className='text-sm font-bold block text-red-400'>
                {infoText}
              </span>
              {fixPrice}
              <span className="text-xl text-gray-600">Lps</span>
            </p>
          </div>
          <button
            type="submit"
            className="px-8 py-3 cursor-pointer bg-linear-to-r from-gray-700 to-gray-900 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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