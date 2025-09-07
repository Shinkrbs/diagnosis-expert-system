export type NasalBreathingValue = 'normal' | 'light' | 'heavy';

export interface Symptoms {
    temperature: number;
    nasalBreathing: NasalBreathingValue;
    headache: boolean;
    cough: boolean;
    soreThroat: boolean;
    antibioticsAllergy: boolean;
}

export interface DiagnosisResult {
    feverStatus: string;
    nasalCondition: string;
    diagnosis: string;
    treatment: string;
    steps: string[]; // show step by step reasoning
}

export const runExpertSystem = (symptoms: Symptoms): DiagnosisResult => {
    const steps: string[] = [];

    // Rules 1, 2, 3: Determine fever status
    let feverStatus = 'no fever';
    if (symptoms.temperature > 38) {
    feverStatus = 'high fever';
    steps.push('Rule 3: Temperature > 38°C → High Fever');
    } else if (symptoms.temperature > 37) {
    feverStatus = 'low fever';
    steps.push('Rule 2: Temperature > 37°C → Low Fever');
    } else {
    steps.push('Rule 1: Temperature <= 37°C → No Fever');
    }

    // Rules 4, 5: Determine nasal condition
    let nasalCondition = 'normal';
    if (symptoms.nasalBreathing === 'light') {
    nasalCondition = 'nasal discharge';
    steps.push('Rule 4: Light nasal breathing → Nasal Discharge');
    } else if (symptoms.nasalBreathing === 'heavy') {
    nasalCondition = 'sinus membranes swelling';
    steps.push('Rule 5: Heavy nasal breathing → Sinus Membranes Swelling');
    }

    // Rule 6: Diagnose a cold
    let diagnosis = 'unknown';
    if (
        feverStatus === 'low fever' &&
        symptoms.headache &&
        nasalCondition === 'nasal discharge' &&
        symptoms.cough
    ) {
        diagnosis = 'cold';
        steps.push('Rule 6: Low fever + Headache + Nasal Discharge + Cough → Cold');
    }

    // Rules 7, 8: Determine if treatment is needed
    let shouldTreat = false;
    if (diagnosis === 'cold' && symptoms.soreThroat) {
    shouldTreat = true;
    steps.push('Rule 8: Cold + Sore Throat → Treat');
    } else if (diagnosis === 'cold' && !symptoms.soreThroat) {
    steps.push('Rule 7: Cold + No Sore Throat → Don\'t Treat');
    }

    // Rules 9, 10: Determine if medication should be given
    const giveMedication = shouldTreat;
    if (giveMedication) {
    steps.push('Rule 10: Treat → Give Medication');
    } else {
    // We only add this step if a diagnosis was made, to avoid clutter.
    if (diagnosis !== 'unknown') {
        steps.push('Rule 9: Don\'t Treat → Don\'t Give Medication');
    }
    }

    // Rules 11, 12: Determine which medication
    let treatment = 'No medication required.';
    if (giveMedication) {
    if (symptoms.antibioticsAllergy) {
        treatment = 'Give Tylenol';
        steps.push('Rule 11: Medication + Allergy → Give Tylenol');
    } else {
        treatment = 'Give Antibiotics';
        steps.push('Rule 12: Medication + No Allergy → Give Antibiotics');
    }
    }

    // Return the complete result object
    return { feverStatus, nasalCondition, diagnosis, treatment, steps };
};