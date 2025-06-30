import Link from 'next/link';
import { useState } from 'react';

export default function Settings() {
  const [aiUsage, setAiUsage] = useState(true);
  const [gdpr, setGdpr] = useState(true);
  const [deleteData, setDeleteData] = useState(false);
  const [agentName, setAgentName] = useState('Acme Law AI Assistant');
  const [welcomeMsg, setWelcomeMsg] = useState('Welcome to Acme Law...');
  const [fallbackMsg, setFallbackMsg] = useState("I'll connect you with...");
  const [businessHours, setBusinessHours] = useState('Monday-Friday: 9:00 AM - 5:00 PM, Saturday: 10:00 AM - 2:00 PM, Sunday: Closed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary-700">AI Agent Platform</div>
        <nav className="space-x-6 text-secondary-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/onboarding/step1">Onboarding</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-primary-800">Settings</h2>
          {/* Security & Privacy */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="font-semibold mb-2">Security & Privacy</div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={aiUsage} onChange={() => setAiUsage(!aiUsage)} /> AI Usage & Terms Acceptance
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={gdpr} onChange={() => setGdpr(!gdpr)} /> GDPR Compliance
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={deleteData} onChange={() => setDeleteData(!deleteData)} /> Delete My Data
              </label>
              <button className="mt-2 px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition w-fit">Save Changes</button>
            </div>
          </div>
          {/* Agent Configuration */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="font-semibold mb-2">Agent Configuration</div>
            <div className="flex flex-col gap-4">
              <label className="block">
                Agent Name:
                <input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </label>
              <label className="block">
                Welcome Message:
                <input type="text" value={welcomeMsg} onChange={e => setWelcomeMsg(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </label>
              <label className="block">
                Fallback Message:
                <input type="text" value={fallbackMsg} onChange={e => setFallbackMsg(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </label>
              <label className="block">
                Business Hours:
                <input type="text" value={businessHours} onChange={e => setBusinessHours(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </label>
              <button className="mt-2 px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition w-fit">Edit Hours</button>
            </div>
          </div>
          {/* Integrations */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold mb-2">Integrations</div>
            <div className="flex flex-col gap-3">
              <div>GoHighLevel: <span className="text-success-600 font-semibold ml-2">✅ Connected</span></div>
              <div>OpenAI: <span className="text-success-600 font-semibold ml-2">✅ Connected</span></div>
              <div>Google Analytics: <span className="text-success-600 font-semibold ml-2">✅ Connected</span></div>
              <button className="mt-2 px-6 py-2 rounded-lg bg-secondary-200 text-secondary-700 font-semibold shadow hover:bg-secondary-300 transition w-fit">Manage Integrations</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 