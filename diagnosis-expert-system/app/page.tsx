"use client";

import { useState } from "react";

export default function HomePage() {

  // --- STATE MANAGEMENT ---
  // State to track if the combobox dropdown is open or closed.
  const [isOpen, setIsOpen] = useState(false);
  // State to store the currently selected nasal breathing option.
  const [selectedValue, setSelectedValue] = useState('Normal');

  // An array of options for our combobox.
  const options = ['Normal', 'Light (Runny Nose)', 'Heavy (Congested)'];

  const handleSelectOption = (value: string) => {
    setSelectedValue(value); // Update the selected value
    setIsOpen(false);      // Close the dropdown
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center font-sans p-4">
      <main className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Header */}
        <div className="flex flex-col space-y-4.5">
          <h1 className="text-3xl font-bold text-amber-500">Medical Expert System</h1>
          <p className="text-slate-600 text-sm">Enter the patients symptoms below to get a recommended course of action</p>

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
                           placeholder-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
          </div>

          {/* Nasal Breathing Select Group */}

          <div>
            <label htmlFor="nasalBreathing" className="block text-sm font-medium text-slate-700">
              Nasal Breathing
            </label>
            {/* The main container needs to be 'relative' to position the dropdown correctly. */}
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)} // Toggles the dropdown open/closed
                className="relative w-full cursor-default rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <span className="block truncate">{selectedValue}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  {/* A simple SVG chevron icon that rotates when the dropdown is open */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                       className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              {/* --- DROPDOWN PANEL --- */}
              {/* This panel is only shown if 'isOpen' is true. */}
              {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-slate-200">
                  <ul className="py-1">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-slate-900 hover:bg-sky-50"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* --- END OF COMBOBOX --- */}

            {/* Checkboxes Group */}
            <div className="space-y-1">
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
              className="w-full bg-amber-500 hover:bg-amber-300 text-white font-bold py-3 px-4 rounded-lg shadow-md
                         transition-transform transform hover:scale-105">
              Get Recommendation
            </button>
      
        </div> 

        {/* Results */}
        <div className="bg-slate-50 rounded-lg p-6 flex flex-col">
           <h2 className="text-2xl font-bold text-amber-500 mb-4">Results</h2>
           <div className="flex-grow flex items-center justify-center">
              <p className="text-slate-500 text-center">Results will be displayed here.</p>
           </div>
        </div>

      </main>
    </div>
  );
}

