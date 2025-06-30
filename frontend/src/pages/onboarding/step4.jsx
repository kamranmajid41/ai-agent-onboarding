import Link from 'next/link';

export default function Step4PreviewTest() {
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
              <div className="h-2 bg-primary-600 rounded-full w-4/5 transition-all" />
            </div>
            <span className="ml-4 text-primary-700 font-semibold">Step 4 of 5</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary-800">Preview & Test Agent</h2>
          <p className="text-secondary-700 mb-6">Review and test your agent before going live. Make adjustments if needed.</p>
          {/* Configuration Summary */}
          <div className="mb-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="font-semibold mb-1">Agent Configuration Summary</div>
            <div className="text-sm text-secondary-700">
              <div>Business: <span className="font-medium">Acme Law Firm</span></div>
              <div>Industry: <span className="font-medium">Law</span></div>
              <div>Personality: <span className="font-medium">Professional & Efficient</span></div>
              <div>Objectives: <span className="font-medium">Book Appointments, Answer FAQs, Capture Leads</span></div>
              <div>Services: <span className="font-medium">Legal Consultation, Document Review</span></div>
            </div>
          </div>
          {/* Chat Preview */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Live Chat Preview</div>
            <div className="bg-secondary-100 rounded-lg p-4 h-64 flex flex-col justify-end">
              <div className="mb-2">
                <div className="text-xs text-secondary-500 mb-1">Acme Law AI Assistant</div>
                <div className="bg-primary-100 text-primary-800 rounded-lg px-3 py-2 mb-2 w-fit">🤖 Welcome to Acme Law Firm. How can I assist you today?</div>
                <div className="text-xs text-secondary-500 mb-1 text-right">You</div>
                <div className="bg-secondary-200 text-secondary-800 rounded-lg px-3 py-2 mb-2 ml-auto w-fit">👤 I need help with a legal matter</div>
                <div className="text-xs text-secondary-500 mb-1">Acme Law AI Assistant</div>
                <div className="bg-primary-100 text-primary-800 rounded-lg px-3 py-2 w-fit">🤖 I'd be happy to help you with your legal matter. We offer several services including legal consultation, document review, and court representation. What type of legal assistance do you need?</div>
              </div>
              <div className="flex gap-2 mt-4">
                <input type="text" placeholder="Type your message..." className="flex-1 border rounded-lg px-3 py-2" disabled />
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold shadow cursor-not-allowed" disabled>Send</button>
              </div>
            </div>
            <button className="mt-2 text-primary-600 hover:underline text-sm">Retest with new prompt</button>
          </div>
          {/* Voice Bot Options (static) */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Voice Bot Options</div>
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked readOnly /> Enable Voice Bot
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked readOnly /> Enable Text-to-Speech
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked readOnly /> Enable Speech-to-Text
              </label>
              <div className="flex items-center gap-2">
                <span>Voice:</span>
                <select className="border rounded px-2 py-1" disabled>
                  <option>Default</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Speed:</span>
                <select className="border rounded px-2 py-1" disabled>
                  <option>Normal</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Link href="/onboarding/step3" legacyBehavior>
              <a className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-700 hover:bg-secondary-300 transition">Back</a>
            </Link>
            <Link href="/onboarding/step5" legacyBehavior>
              <a className="px-8 py-2 rounded-lg font-semibold shadow bg-primary-600 text-white hover:bg-primary-700 transition">Confirm & Deploy</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 