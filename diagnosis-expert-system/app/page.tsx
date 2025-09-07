export default function HomePage() {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center font-sans p-4">
      <main className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Header */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">Medical Expert System</h1>
          <p className="text-slate-600">Enter the patients symptoms below to get a recommended course of action</p>

          {/* Temperature Input Group */}
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-slate-700">
                Temperature (°C)
            </label>
            <input
                type="number"
                id="temperature"
                defaultValue="36.5"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                           placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
          </div>

          {/* Nasal Breathing Select Group */}
          <div>
              <label htmlFor="nasalBreathing" className="block text-sm font-medium text-slate-700">
                Nasal Breathing
              </label>
              <select
                id="nasalBreathing"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option>Normal</option>
                <option>Light (Runny Nose)</option>
                <option>Heavy (Congested)</option>
              </select>
            </div>

            {/* Checkboxes Group */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input id="headache" type="checkbox" className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
                <label htmlFor="headache" className="ml-3 text-sm font-medium text-slate-700">Headache</label>
              </div>
              <div className="flex items-center">
                <input id="cough" type="checkbox" className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
                <label htmlFor="cough" className="ml-3 text-sm font-medium text-slate-700">Cough</label>
              </div>
              <div className="flex items-center">
                <input id="soreThroat" type="checkbox" className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
                <label htmlFor="soreThroat" className="ml-3 text-sm font-medium text-slate-700">Sore Throat</label>
              </div>
               <div className="flex items-center">
                <input id="allergy" type="checkbox" className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
                <label htmlFor="allergy" className="ml-3 text-sm font-medium text-slate-700">Allergy to Antibiotics</label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg shadow-md
                         transition-transform transform hover:scale-105">
              Get Recommendation
            </button>
      
        </div> 

        {/* Results */}
        <div className="bg-slate-50 rounded-lg p-6 flex flex-col">
           <h2 className="text-2xl font-bold text-slate-800 mb-4">Results</h2>
           <div className="flex-grow flex items-center justify-center">
              <p className="text-slate-500 text-center">Results will be displayed here.</p>
           </div>
        </div>

      </main>
    </div>
  );
}

