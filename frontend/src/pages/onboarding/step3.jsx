import Link from 'next/link';
import { useState } from 'react';

const objectivesList = [
  'Book Appointments',
  'Answer FAQs',
  'Capture Leads',
  'Provide Quotes',
  'Route to Human Agent'
];

const personalities = [
  'Friendly & Conversational',
  'Formal & Efficient',
  'Expert Advisor',
  'Fun & Quirky',
  'Custom'
];

const fallbackOptions = [
  'Let me take a message for you.',
  "Here's how you can contact us directly.",
  'Custom Text Response'
];

export default function Step3AgentPersonality() {
  const [objectives, setObjectives] = useState([]);
  const [personality, setPersonality] = useState('');
  const [customPersonality, setCustomPersonality] = useState('');
  const [services, setServices] = useState(['', '', '']);
  const [fallback, setFallback] = useState('');
  const [customFallback, setCustomFallback] = useState('');
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '17:00', enabled: true },
    tuesday: { open: '09:00', close: '17:00', enabled: true },
    wednesday: { open: '09:00', close: '17:00', enabled: true },
    thursday: { open: '09:00', close: '17:00', enabled: true },
    friday: { open: '09:00', close: '17:00', enabled: true },
    saturday: { open: '', close: '', enabled: false },
    sunday: { open: '', close: '', enabled: false }
  });

  const handleObjectiveToggle = (obj) => {
    setObjectives(objectives.includes(obj)
      ? objectives.filter(o => o !== obj)
      : [...objectives, obj]);
  };

  const handleServiceChange = (i, value) => {
    const newServices = [...services];
    newServices[i] = value;
    setServices(newServices);
  };

  const handleHourChange = (day, field, value) => {
    setBusinessHours({
      ...businessHours,
      [day]: { ...businessHours[day], [field]: value }
    });
  };

  const handleDayToggle = (day) => {
    setBusinessHours({
      ...businessHours,
      [day]: { ...businessHours[day], enabled: !businessHours[day].enabled }
    });
  };

  const isBookingEnabled = objectives.includes('Book Appointments');
  const isValid = objectives.length > 0 && personality && services.every(s => s) && fallback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary-700">AI Agent Platform</div>
        <nav className="space-x-6 text-secondary-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/onboarding/step1">Onboarding</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="flex items-center mb-8">
            <div className="flex-1 h-2 bg-primary-200 rounded-full">
              <div className="h-2 bg-primary-600 rounded-full w-3/5 transition-all" />
            </div>
            <span className="ml-4 text-primary-700 font-semibold">Step 3 of 5</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary-800">Define Agent Purpose & Personality</h2>
          <p className="text-secondary-700 mb-6">Help us shape the voice and goals of your AI. You'll see a live preview next.</p>
          <form className="space-y-6">
            {/* Objectives */}
            <div>
              <label className="block text-sm font-medium mb-2">Primary Objective(s) <span className="text-primary-600">(Select all that apply)</span></label>
              <div className="flex flex-wrap gap-3">
                {objectivesList.map(obj => (
                  <button type="button" key={obj} onClick={() => handleObjectiveToggle(obj)}
                    className={`px-4 py-2 rounded-lg border ${objectives.includes(obj) ? 'bg-primary-600 text-white border-primary-600' : 'bg-secondary-100 text-secondary-700 border-secondary-300'} transition`}>
                    {obj}
                  </button>
                ))}
              </div>
            </div>
            {/* Personality */}
            <div>
              <label className="block text-sm font-medium mb-2">Bot Voice & Personality</label>
              <div className="flex flex-wrap gap-3">
                {personalities.map(p => (
                  <button type="button" key={p} onClick={() => setPersonality(p)}
                    className={`px-4 py-2 rounded-lg border ${personality === p ? 'bg-primary-600 text-white border-primary-600' : 'bg-secondary-100 text-secondary-700 border-secondary-300'} transition`}>
                    {p}
                  </button>
                ))}
              </div>
              {personality === 'Custom' && (
                <input type="text" value={customPersonality} onChange={e => setCustomPersonality(e.target.value)} placeholder="Describe your brand tone" className="mt-2 w-full border rounded-lg px-3 py-2" />
              )}
            </div>
            {/* Services */}
            <div>
              <label className="block text-sm font-medium mb-2">Top 3 Services or Offers</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {services.map((s, i) => (
                  <input key={i} type="text" value={s} onChange={e => handleServiceChange(i, e.target.value)} placeholder={`Service ${i + 1}`} className="w-full border rounded-lg px-3 py-2" />
                ))}
              </div>
            </div>
            {/* Fallback Behavior */}
            <div>
              <label className="block text-sm font-medium mb-2">Fallback Behavior</label>
              <select value={fallback} onChange={e => setFallback(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select fallback response</option>
                {fallbackOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {fallback === 'Custom Text Response' && (
                <input type="text" value={customFallback} onChange={e => setCustomFallback(e.target.value)} placeholder="Custom fallback response" className="mt-2 w-full border rounded-lg px-3 py-2" />
              )}
            </div>
            {/* Business Hours */}
            {isBookingEnabled && (
              <div>
                <label className="block text-sm font-medium mb-2">Business Hours (if booking enabled)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(businessHours).map(([day, val]) => (
                    <div key={day} className="flex items-center gap-2">
                      <input type="checkbox" checked={val.enabled} onChange={() => handleDayToggle(day)} />
                      <span className="capitalize w-20">{day}</span>
                      <input type="time" value={val.open} onChange={e => handleHourChange(day, 'open', e.target.value)} disabled={!val.enabled} className="border rounded px-2 py-1 w-24" />
                      <span>-</span>
                      <input type="time" value={val.close} onChange={e => handleHourChange(day, 'close', e.target.value)} disabled={!val.enabled} className="border rounded px-2 py-1 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Link href="/onboarding/step2" legacyBehavior>
                <a className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-700 hover:bg-secondary-300 transition">Back</a>
              </Link>
              <Link href="/onboarding/step4" legacyBehavior>
                <a className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>Next Step</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 