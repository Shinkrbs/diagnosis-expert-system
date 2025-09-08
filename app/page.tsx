"use client";

import { useState } from "react";
import { runExpertSystem, type Symptoms, type DiagnosisResult, type NasalBreathingValue } from '../lib/expertSystem';

export default function HomePage() {

  const [symptoms, setSymptoms] = useState<Symptoms>({
    temperature: 36.5,
    nasalBreathing: 'normal',
    headache: false,
    cough: false,
    soreThroat: false,
    antibioticsAllergy: false,
  });

  // State to hold the result from our logic. It starts as 'null'.
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // State just for the combobox UI (to open/close it).
  const [isOpen, setIsOpen] = useState(false);
  
  // An array of objects to map UI labels to the simple values our logic expects.
  const comboboxOptions: { label: string; value: NasalBreathingValue }[] = [
    { label: 'Normal', value: 'normal' },
    { label: 'Light (Runny Nose)', value: 'light' },
    { label: 'Heavy (Congested)', value: 'heavy' },
  ];

  // Step 3: Create handler functions to update our central state.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // This smart handler works for both text inputs and checkboxes.
    setSymptoms(prevSymptoms => ({
      ...prevSymptoms,
      [name]: type === 'checkbox' ? checked : parseFloat(value),
    }));
  };

  const handleComboboxSelect = (value: NasalBreathingValue) => {
    setSymptoms(prevSymptoms => ({ ...prevSymptoms, nasalBreathing: value }));
    setIsOpen(false); // Close the dropdown after selection
  };

  // This function is triggered when the main button is clicked.
  const handleDiagnose = () => {
    // It calls our imported logic with the current symptoms state...
    const diagnosisResult = runExpertSystem(symptoms);
    // ...and saves the output to the result state, which makes the UI update.
    setResult(diagnosisResult);
  };

  // Helper to find the display label for the currently selected combobox value.
  const selectedLabel = comboboxOptions.find(opt => opt.value === symptoms.nasalBreathing)?.label;

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center font-sans p-4">
      <main className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-amber-500">Diagnosis Expert System</h1>
          <p className="text-slate-600">Enter the patients symptoms below to get a recommended course of action.</p>

          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-slate-700">Temperature (°C)</label>
            {/* Step 4: Connect ALL inputs to the central state */}
            <input
              type="number" id="temperature" name="temperature"
              value={symptoms.temperature} onChange={handleInputChange} step="0.1"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Nasal Breathing</label>
            <div className="relative mt-1">
              <button
                type="button" onClick={() => setIsOpen(!isOpen)}
                className="relative w-full cursor-default rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <span className="block truncate">{selectedLabel}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-slate-200">
                  <ul className="py-1">
                    {comboboxOptions.map((option) => (
                      <li key={option.value} onClick={() => handleComboboxSelect(option.value)}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-slate-900 hover:bg-sky-50">
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input id="headache" name="headache" type="checkbox" checked={symptoms.headache} onChange={handleInputChange} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
              <label htmlFor="headache" className="ml-3 text-sm font-medium text-slate-700">Headache</label>
            </div>
            <div className="flex items-center">
              <input id="cough" name="cough" type="checkbox" checked={symptoms.cough} onChange={handleInputChange} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
              <label htmlFor="cough" className="ml-3 text-sm font-medium text-slate-700">Cough</label>
            </div>
            <div className="flex items-center">
              <input id="soreThroat" name="soreThroat" type="checkbox" checked={symptoms.soreThroat} onChange={handleInputChange} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
              <label htmlFor="soreThroat" className="ml-3 text-sm font-medium text-slate-700">Sore Throat</label>
            </div>
            <div className="flex items-center">
              <input id="antibioticsAllergy" name="antibioticsAllergy" type="checkbox" checked={symptoms.antibioticsAllergy} onChange={handleInputChange} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500" />
              <label htmlFor="antibioticsAllergy" className="ml-3 text-sm font-medium text-slate-700">Allergy to Antibiotics</label>
            </div>
          </div>

          <button onClick={handleDiagnose}
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors transform hover:scale-105">
            Get Recommendation
          </button>
        </div>

        <div className="bg-slate-50 rounded-lg p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">Results</h2>
          {/* Step 5: Conditionally render the results based on the 'result' state */}
          {result ? (
            <div className="space-y-4 text-left">
              <div>
                <h3 className="font-semibold text-slate-700">Final Diagnosis:</h3>
                <p className="text-lg font-bold text-amber-600 capitalize">{result.diagnosis}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Recommended Treatment:</h3>
                <p className="text-xl font-bold text-amber-600">{result.treatment}</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-700">Reasoning Steps:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mt-2">
                  {result.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-slate-500 text-center">Results will be displayed here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

