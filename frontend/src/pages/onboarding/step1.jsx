import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
  const [touched, setTouched] = useState({});
  const [showTooltip, setShowTooltip] = useState('');

  // Validation helpers
  const validateEmail = (email) => /.+@.+\..+/.test(email);
  const validateURL = (url) => /^https?:\/\/.+\..+/.test(url);
  const validatePhone = (phone) => /^[\d\-\+\(\) ]{7,}$/.test(phone);

  const getFieldError = (name) => {
    if (!touched[name]) return '';
    if (name === 'businessName' && !form.businessName) return 'Business name is required.';
    if (name === 'website' && (!form.website || !validateURL(form.website))) return 'Valid website URL required.';
    if (name === 'email' && (!form.email || !validateEmail(form.email))) return 'Valid email required.';
    if (name === 'phone' && (!form.phone || !validatePhone(form.phone))) return 'Valid phone required.';
    if (name === 'address' && !form.address) return 'Address is required.';
    if (name === 'industry' && !form.industry) return 'Industry is required.';
    return '';
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

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
    validateURL(form.website) &&
    validateEmail(form.email) &&
    validatePhone(form.phone) &&
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
          <form className="space-y-4" onSubmit={e => { if (!isValid) { e.preventDefault(); setTouched({businessName:true,website:true,email:true,phone:true,address:true,industry:true}); setError('Please fix errors before continuing.'); } }} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Business Name *
                  <span onMouseEnter={()=>setShowTooltip('businessName')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Business Name Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='businessName' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter your official business name as registered.</span>}
                </label>
                <input name="businessName" value={form.businessName} onChange={handleChange} onBlur={handleBlur} aria-label="Business Name" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('businessName') ? 'border-red-500' : ''}`} required />
                {getFieldError('businessName') && <div className="text-red-600 text-xs mt-1">{getFieldError('businessName')}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Website URL *
                  <span onMouseEnter={()=>setShowTooltip('website')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Website URL Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='website' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter a valid URL (e.g., https://yourcompany.com).</span>}
                </label>
                <input name="website" value={form.website} onChange={handleChange} onBlur={handleBlur} aria-label="Website URL" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('website') ? 'border-red-500' : ''}`} required />
                {getFieldError('website') && <div className="text-red-600 text-xs mt-1">{getFieldError('website')}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Email Address *
                  <span onMouseEnter={()=>setShowTooltip('email')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Email Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='email' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter a valid business email address.</span>}
                </label>
                <input name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} aria-label="Email Address" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('email') ? 'border-red-500' : ''}`} required type="email" />
                {getFieldError('email') && <div className="text-red-600 text-xs mt-1">{getFieldError('email')}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Phone Number *
                  <span onMouseEnter={()=>setShowTooltip('phone')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Phone Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='phone' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter a valid phone number (digits, spaces, dashes allowed).</span>}
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} aria-label="Phone Number" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('phone') ? 'border-red-500' : ''}`} required />
                {getFieldError('phone') && <div className="text-red-600 text-xs mt-1">{getFieldError('phone')}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Location Address *
                  <span onMouseEnter={()=>setShowTooltip('address')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Address Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='address' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter your business's main address.</span>}
                </label>
                <input name="address" value={form.address} onChange={handleChange} onBlur={handleBlur} aria-label="Location Address" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('address') ? 'border-red-500' : ''}`} required />
                {getFieldError('address') && <div className="text-red-600 text-xs mt-1">{getFieldError('address')}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Industry Type *
                  <span onMouseEnter={()=>setShowTooltip('industry')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Industry Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='industry' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Choose the industry that best fits your business.</span>}
                </label>
                <select name="industry" value={form.industry} onChange={handleChange} onBlur={handleBlur} aria-label="Industry Type" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 ${getFieldError('industry') ? 'border-red-500' : ''}`} required>
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                {getFieldError('industry') && <div className="text-red-600 text-xs mt-1">{getFieldError('industry')}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  Company Logo (Optional)
                  <span onMouseEnter={()=>setShowTooltip('logo')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Logo Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                  </span>
                  {showTooltip==='logo' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Upload a square logo for best results. PNG/JPG preferred.</span>}
                </label>
                <input type="file" name="logo" accept="image/*" onChange={handleChange} aria-label="Company Logo" className="w-full border rounded-lg px-3 py-2" />
                {form.logo && <div className="mt-2 text-xs text-secondary-600">Selected: {form.logo.name}</div>}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Social Media Links (Optional but Recommended)
                <span onMouseEnter={()=>setShowTooltip('socials')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Socials Info">
                  <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer ml-1" />
                </span>
                {showTooltip==='socials' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Add links to your business's social media profiles for richer AI context.</span>}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="instagram" placeholder="Instagram" value={form.socials.instagram} onChange={handleChange} aria-label="Instagram" className="w-full border rounded-lg px-3 py-2" />
                <input name="facebook" placeholder="Facebook Page" value={form.socials.facebook} onChange={handleChange} aria-label="Facebook Page" className="w-full border rounded-lg px-3 py-2" />
                <input name="linkedin" placeholder="LinkedIn" value={form.socials.linkedin} onChange={handleChange} aria-label="LinkedIn" className="w-full border rounded-lg px-3 py-2" />
                <input name="tiktok" placeholder="TikTok / YouTube" value={form.socials.tiktok} onChange={handleChange} aria-label="TikTok or YouTube" className="w-full border rounded-lg px-3 py-2" />
                <input name="google" placeholder="Google Business Profile" value={form.socials.google} onChange={handleChange} aria-label="Google Business Profile" className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            <div className="flex justify-between mt-8">
              <button type="button" disabled className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-500 cursor-not-allowed">Back</button>
              <Link href={isValid ? "/onboarding/step2" : "#"} legacyBehavior>
                <a onClick={e => { if (!isValid) { e.preventDefault(); setTouched({businessName:true,website:true,email:true,phone:true,address:true,industry:true}); setError('Please fix errors before continuing.'); } }} className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>Next Step</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 