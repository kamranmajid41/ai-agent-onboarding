import Link from 'next/link';
import { useState } from 'react';

export default function Step2UploadAssets() {
  const [files, setFiles] = useState([]);
  const [website, setWebsite] = useState('');
  const [crawl, setCrawl] = useState(true);
  const [pages, setPages] = useState({
    homepage: true,
    services: true,
    about: false,
    contact: false,
    faqs: false,
    blog: false
  });
  const [docLinks, setDocLinks] = useState(['']);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handlePageToggle = (page) => {
    setPages({ ...pages, [page]: !pages[page] });
  };

  const handleDocLinkChange = (i, value) => {
    const newLinks = [...docLinks];
    newLinks[i] = value;
    setDocLinks(newLinks);
  };

  const addDocLink = () => setDocLinks([...docLinks, '']);

  const removeDocLink = (i) => setDocLinks(docLinks.filter((_, idx) => idx !== i));

  const isValid = files.length > 0 || website;

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
              <div className="h-2 bg-primary-600 rounded-full w-2/5 transition-all" />
            </div>
            <span className="ml-4 text-primary-700 font-semibold">Step 2 of 5</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary-800">Upload Business Assets</h2>
          <p className="text-secondary-700 mb-6">Upload files that describe your business — brochures, service lists, menus, FAQs, pricing sheets. Acceptable formats: PDF, Word, Web Pages.</p>
          <form className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Upload Business Files (.pdf, .docx, .txt)</label>
              <input type="file" multiple accept=".pdf,.docx,.txt" onChange={handleFileChange} className="w-full border rounded-lg px-3 py-2" />
              <div className="mt-2 space-y-1">
                {files.map((file, i) => (
                  <div key={i} className="text-xs text-secondary-700 flex items-center gap-2">
                    <span>✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Website Crawl */}
            <div>
              <label className="block text-sm font-medium mb-1">Provide Website URL (auto-crawl enabled)</label>
              <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://yourbusiness.com" className="w-full border rounded-lg px-3 py-2" />
              <div className="flex items-center gap-4 mt-2">
                <span>Do you want the bot to scan your website for content?</span>
                <button type="button" className={`px-3 py-1 rounded-lg ${crawl ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'}`} onClick={() => setCrawl(true)}>Yes</button>
                <button type="button" className={`px-3 py-1 rounded-lg ${!crawl ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'}`} onClick={() => setCrawl(false)}>No</button>
              </div>
              {crawl && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {Object.keys(pages).map(page => (
                    <label key={page} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={pages[page]} onChange={() => handlePageToggle(page)} />
                      <span className="capitalize">{page}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Google Docs/Notion Links */}
            <div>
              <label className="block text-sm font-medium mb-1">Google Docs / Notion Links</label>
              {docLinks.map((link, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="url" value={link} onChange={e => handleDocLinkChange(i, e.target.value)} placeholder="https://docs.google.com/..." className="w-full border rounded-lg px-3 py-2" />
                  {docLinks.length > 1 && (
                    <button type="button" onClick={() => removeDocLink(i)} className="text-red-500 px-2">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addDocLink} className="text-primary-600 hover:underline text-sm mt-1">+ Add another link</button>
            </div>
            <div className="flex justify-between mt-8">
              <Link href="/onboarding/step1" legacyBehavior>
                <a className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-700 hover:bg-secondary-300 transition">Back</a>
              </Link>
              <Link href="/onboarding/step3" legacyBehavior>
                <a className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>Next Step</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 