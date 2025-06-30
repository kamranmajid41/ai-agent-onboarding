import Link from 'next/link';

export default function Step5Success() {
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
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          {/* Success Animation (static) */}
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2 text-primary-800">Your AI Agent is Live!</h2>
          <p className="text-secondary-700 mb-6 text-center">Your AI agent has been successfully deployed and is ready to assist your customers.</p>
          <div className="mb-6 w-full bg-secondary-50 rounded-lg border border-secondary-200 p-4">
            <div className="font-semibold mb-1">Agent Details</div>
            <div className="text-sm text-secondary-700">
              <div>Name: <span className="font-medium">Acme Law AI Assistant</span></div>
              <div>Chat URL: <span className="font-medium">https://chat.acmelaw.com</span></div>
              <div>Phone: <span className="font-medium">+1-555-AI-AGENT</span></div>
              <div>Dashboard: <span className="font-medium">https://dashboard.acmelaw.com</span></div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-6">
            <Link href="/dashboard" legacyBehavior>
              <a className="px-8 py-3 rounded-lg font-semibold shadow bg-primary-600 text-white hover:bg-primary-700 transition text-center">Access My AI Dashboard</a>
            </Link>
            <a href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg font-semibold shadow bg-secondary-200 text-secondary-700 hover:bg-secondary-300 transition text-center">Schedule Live Demo</a>
          </div>
          <div className="mt-4 text-success-600 font-semibold">Agent Status: <span className="ml-1">✅ Live</span></div>
          <div className="text-success-600 font-semibold">Training Status: <span className="ml-1">✅ Complete</span></div>
          <div className="text-success-600 font-semibold">GoHighLevel Integration: <span className="ml-1">✅ Connected</span></div>
        </div>
      </main>
    </div>
  );
} 