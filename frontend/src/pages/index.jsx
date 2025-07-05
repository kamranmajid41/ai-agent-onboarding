import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-primary-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-surface-900/80 shadow-lg border-b border-surface-700">
        <div className="text-2xl font-bold text-primary-400">AI Agent Platform</div>
        <nav className="space-x-6 text-gray-200 font-medium">
          <Link href="#features" className="nav-item">Features</Link>
          <Link href="#contact" className="nav-item">Contact</Link>
          <Link href="/auth/login" className="ml-4 px-5 py-2 btn-primary">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4 leading-tight pb-2">AI Agent Self-Onboarding Platform</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Enable businesses to autonomously onboard AI agents with zero vendor intervention in just 5 simple steps.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary px-8 py-3">Get Started Free</Link>
          <a href="#demo" className="btn-secondary px-8 py-3 border border-primary-500 text-primary-300">Watch Demo</a>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-transparent">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="glass-dark p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">🧠</div>
            <div className="font-bold text-lg mb-1 text-primary-200">5-Step Smart Wizard</div>
            <div className="text-gray-300 text-sm">Guided onboarding with conditional logic</div>
          </div>
          <div className="glass-dark p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">📁</div>
            <div className="font-bold text-lg mb-1 text-primary-200">File Upload & Processing</div>
            <div className="text-gray-300 text-sm">PDF, DOCX, TXT, and website crawling</div>
          </div>
          <div className="glass-dark p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">💬</div>
            <div className="font-bold text-lg mb-1 text-primary-200">Real-time Preview</div>
            <div className="text-gray-300 text-sm">Test your AI agent before going live</div>
          </div>
          <div className="glass-dark p-6 rounded-xl shadow-xl">
            <div className="text-4xl mb-2">🔗</div>
            <div className="font-bold text-lg mb-1 text-primary-200">GoHighLevel Integration</div>
            <div className="text-gray-300 text-sm">CRM and workflow automation</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-surface-900/80 border-t border-surface-700">
        &copy; {new Date().getFullYear()} AI Agent Platform. All rights reserved.
      </footer>
    </div>
  );
} 