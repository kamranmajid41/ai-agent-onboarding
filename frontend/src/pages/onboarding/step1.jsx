import Link from 'next/link';
import { useState } from 'react';

const industries = [
  'Law', 'Restaurant', 'Real Estate', 'Med Spa', 'Retail', 'Fitness', 'Coaching', 'Education', 'Other'
];

export default function Step1BusinessProfile() {
  const [form, setForm] = useState({
    businessName: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    logo: null,
    socials: {
      instagram: '',
      facebook: '',
      linkedin: '',
      tiktok: '',
      google: ''
    }
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setForm({ ...form, logo: files[0] });
    } else if (name in form.socials) {
      setForm({ ...form, socials: { ...form.socials, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const isValid =
    form.businessName &&
    form.website &&
    form.email &&
    form.phone &&
    form.address &&
    form.industry;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary-700">AI Agent Platform</div>
        <nav className="space-x-6 text-secondary-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/onboarding/step1" className="ml-4 px-5 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition">Onboarding</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="flex items-center mb-8">
            <div className="flex-1 h-2 bg-primary-200 rounded-full">
              <div className="h-2 bg-primary-600 rounded-full w-1/5 transition-all" />
            </div>
            <span className="ml-4 text-primary-700 font-semibold">Step 1 of 5</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary-800">Business Profile & Industry Type</h2>
          <p className="text-secondary-700 mb-6">Enter accurate business details. This builds your AI agent's personality and ensures it reflects your real brand voice.</p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name *</label>
                <input name="businessName" value={form.businessName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website URL *</label>
                <input name="website" value={form.website} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Location Address *</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Industry Type *</label>
                <select name="industry" value={form.industry} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400" required>
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Company Logo (Optional)</label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                {form.logo && <div className="mt-2 text-xs text-secondary-600">Selected: {form.logo.name}</div>}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Social Media Links (Optional but Recommended)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="instagram" placeholder="Instagram" value={form.socials.instagram} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                <input name="facebook" placeholder="Facebook Page" value={form.socials.facebook} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                <input name="linkedin" placeholder="LinkedIn" value={form.socials.linkedin} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                <input name="tiktok" placeholder="TikTok / YouTube" value={form.socials.tiktok} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                <input name="google" placeholder="Google Business Profile" value={form.socials.google} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="flex justify-between mt-8">
              <button type="button" disabled className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-500 cursor-not-allowed">Back</button>
              <Link href="/onboarding/step2" legacyBehavior>
                <a className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>Next Step</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 