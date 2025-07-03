import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary-700">AI Agent Platform</div>
        <nav className="space-x-6 text-secondary-700 font-medium">
          <Link href="#features">Features</Link>
          
          <Link href="#contact">Contact</Link>
          <Link href="/onboarding/step1" className="ml-4 px-5 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition">Start Free</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-800 mb-4">AI Agent Self-Onboarding Platform</h1>
        <p className="text-lg md:text-xl text-secondary-700 mb-8 max-w-2xl">
          Enable businesses to autonomously onboard AI agents with zero vendor intervention in just 5 simple steps.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/onboarding/step1" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow hover:bg-primary-700 transition">Start Free Onboarding</Link>
          <a href="#demo" className="px-8 py-3 border border-primary-600 text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition">Watch Demo</a>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">🧠</div>
            <div className="font-bold text-lg mb-1">5-Step Smart Wizard</div>
            <div className="text-secondary-600 text-sm">Guided onboarding with conditional logic</div>
          </div>
          <div>
            <div className="text-4xl mb-2">📁</div>
            <div className="font-bold text-lg mb-1">File Upload & Processing</div>
            <div className="text-secondary-600 text-sm">PDF, DOCX, TXT, and website crawling</div>
          </div>
          <div>
            <div className="text-4xl mb-2">💬</div>
            <div className="font-bold text-lg mb-1">Real-time Preview</div>
            <div className="text-secondary-600 text-sm">Test your AI agent before going live</div>
          </div>
          <div>
            <div className="text-4xl mb-2">🔗</div>
            <div className="font-bold text-lg mb-1">GoHighLevel Integration</div>
            <div className="text-secondary-600 text-sm">CRM and workflow automation</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-secondary-500 text-sm bg-secondary-50">
        &copy; {new Date().getFullYear()} AI Agent Platform. All rights reserved.
      </footer>
    </div>
  );
} 