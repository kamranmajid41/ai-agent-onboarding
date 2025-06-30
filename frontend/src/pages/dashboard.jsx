import Link from 'next/link';

export default function Dashboard() {
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
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-primary-800">Welcome back, Acme Law Firm!</h2>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-2xl font-bold text-primary-700">2,031</div>
              <div className="text-secondary-700">Total Conversations</div>
              <div className="text-success-600 text-xs mt-1">+12% vs last month</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-2xl font-bold text-primary-700">276</div>
              <div className="text-secondary-700">Appointments Booked</div>
              <div className="text-success-600 text-xs mt-1">+8% vs last month</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-2xl font-bold text-primary-700">384</div>
              <div className="text-secondary-700">Leads Captured</div>
              <div className="text-success-600 text-xs mt-1">+15% vs last month</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-2xl font-bold text-primary-700">3.8%</div>
              <div className="text-secondary-700">Unknown Queries Rate</div>
              <div className="text-error-600 text-xs mt-1">-0.3% vs last month</div>
            </div>
          </div>
          {/* Performance Charts (static) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold mb-2">Engagement Funnel</div>
              <div className="h-40 flex flex-col justify-center items-center text-secondary-500">
                <div>Visitors (1,000) → Conversations (500) → Leads (100)</div>
                <div className="mt-2">Abandoned (500) → Bookings (50)</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold mb-2">Performance Over Time</div>
              <div className="h-40 flex items-center justify-center text-secondary-500">
                <div>[Line chart showing conversations, bookings, leads]</div>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="font-semibold mb-2">Recent Activity</div>
            <ul className="text-secondary-700 text-sm space-y-1">
              <li>• New lead captured: "John D. - Legal consultation"</li>
              <li>• Appointment booked: "Sarah M. - Document review"</li>
              <li>• Unknown query: "What is the weather like?"</li>
              <li>• New conversation started: "Mike R."</li>
            </ul>
          </div>
          {/* Social Validation */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold mb-2">Social Media Validation</div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="font-medium mb-1">Instagram Feed</div>
                <div className="bg-secondary-100 rounded-lg p-4 text-secondary-500">📸 [Recent post image]<br />"Great service from Acme Law Firm! Highly recommend"<br />- @happyclient123</div>
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">Google Reviews</div>
                <div className="bg-secondary-100 rounded-lg p-4 text-secondary-500">⭐⭐⭐⭐⭐ "Excellent legal services"<br />- John Smith, 2 days ago</div>
                <div className="bg-secondary-100 rounded-lg p-4 text-secondary-500 mt-2">⭐⭐⭐⭐⭐ "Professional and knowledgeable"<br />- Sarah Johnson, 1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 