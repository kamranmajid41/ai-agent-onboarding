import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState('');
  const [toast, setToast] = useState('');

  // Validation helpers
  const validateURL = (url) => !url || /^https?:\/\/.+\..+/.test(url);
  const validateFile = (file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type) && file.size <= 10 * 1024 * 1024;

  const getFieldError = (name) => {
    if (!touched[name]) return '';
    if (name === 'website' && website && !validateURL(website)) return 'Valid website URL required.';
    if (name === 'files' && files.some(f => !validateFile(f))) return 'Only PDF, DOCX, TXT files under 10MB allowed.';
    if (name === 'docLinks' && docLinks.some(link => link && !validateURL(link))) return 'All links must be valid URLs.';
    return '';
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const valid = newFiles.every(validateFile);
    setFiles([...files, ...newFiles]);
    setTouched({ ...touched, files: true });
    if (!valid) {
      setToast('Some files are invalid. Only PDF, DOCX, TXT under 10MB allowed.');
      setTimeout(() => setToast(''), 3000);
    } else {
      setToast('Files uploaded successfully!');
      setTimeout(() => setToast(''), 2000);
    }
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

  const isValid = (files.length === 0 || files.every(validateFile)) && (!website || validateURL(website)) && docLinks.every(link => !link || validateURL(link)) && (files.length > 0 || website);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      {/* Toast Notification */}
      {toast && <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary-700 text-white px-6 py-2 rounded shadow-lg z-50">{toast}</div>}
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
          <form className="space-y-6" onSubmit={e => { if (!isValid) { e.preventDefault(); setTouched({files:true,website:true,docLinks:true}); setError('Please fix errors before continuing.'); } }} noValidate>
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                Upload Business Files (.pdf, .docx, .txt)
                <span onMouseEnter={()=>setShowTooltip('files')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="File Info">
                  <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                </span>
                {showTooltip==='files' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Upload PDF, DOCX, or TXT files. Max 10MB each.</span>}
              </label>
              <input type="file" multiple accept=".pdf,.docx,.txt" onChange={handleFileChange} aria-label="Upload Business Files" className={`w-full border rounded-lg px-3 py-2 ${getFieldError('files') ? 'border-red-500' : ''}`} />
              <div className="mt-2 space-y-1">
                {files.map((file, i) => (
                  <div key={i} className="text-xs text-secondary-700 flex items-center gap-2">
                    <span>✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ))}
              </div>
              {getFieldError('files') && <div className="text-red-600 text-xs mt-1">{getFieldError('files')}</div>}
            </div>
            {/* Website Crawl */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                Provide Website URL (auto-crawl enabled)
                <span onMouseEnter={()=>setShowTooltip('website')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Website Info">
                  <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                </span>
                {showTooltip==='website' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Enter your business website. We'll crawl it for content.</span>}
              </label>
              <input type="url" value={website} onChange={e => { setWebsite(e.target.value); setTouched({ ...touched, website: true }); }} onBlur={() => setTouched({ ...touched, website: true })} placeholder="https://yourbusiness.com" aria-label="Website URL" className={`w-full border rounded-lg px-3 py-2 ${getFieldError('website') ? 'border-red-500' : ''}`} />
              {getFieldError('website') && <div className="text-red-600 text-xs mt-1">{getFieldError('website')}</div>}
              <div className="flex items-center gap-4 mt-2">
                <span>Do you want the bot to scan your website for content?
                  <span onMouseEnter={()=>setShowTooltip('crawl')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Crawl Info">
                    <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer ml-1" />
                  </span>
                  {showTooltip==='crawl' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">If yes, select which pages to include below.</span>}
                </span>
                <button type="button" className={`px-3 py-1 rounded-lg ${crawl ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'}`} onClick={() => setCrawl(true)}>Yes</button>
                <button type="button" className={`px-3 py-1 rounded-lg ${!crawl ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'}`} onClick={() => setCrawl(false)}>No</button>
              </div>
              {crawl && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {Object.keys(pages).map(page => (
                    <label key={page} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={pages[page]} onChange={() => setPages({ ...pages, [page]: !pages[page] })} />
                      <span className="capitalize">{page}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Google Docs/Notion Links */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                Google Docs / Notion Links
                <span onMouseEnter={()=>setShowTooltip('docLinks')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Doc Links Info">
                  <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
                </span>
                {showTooltip==='docLinks' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Paste shareable links to Google Docs or Notion pages.</span>}
              </label>
              {docLinks.map((link, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="url" value={link} onChange={e => { handleDocLinkChange(i, e.target.value); setTouched({ ...touched, docLinks: true }); }} onBlur={() => setTouched({ ...touched, docLinks: true })} placeholder="https://docs.google.com/..." aria-label="Google Doc or Notion Link" className={`w-full border rounded-lg px-3 py-2 ${getFieldError('docLinks') ? 'border-red-500' : ''}`} />
                  {docLinks.length > 1 && (
                    <button type="button" onClick={() => removeDocLink(i)} className="text-red-500 px-2">✕</button>
                  )}
                </div>
              ))}
              {getFieldError('docLinks') && <div className="text-red-600 text-xs mt-1">{getFieldError('docLinks')}</div>}
              <button type="button" onClick={addDocLink} className="text-primary-600 hover:underline text-sm mt-1">+ Add another link</button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            <div className="flex justify-between mt-8">
              <Link href="/onboarding/step1" legacyBehavior>
                <a className="px-6 py-2 rounded-lg bg-secondary-200 text-secondary-700 hover:bg-secondary-300 transition">Back</a>
              </Link>
              <Link href={isValid ? "/onboarding/step3" : "#"} legacyBehavior>
                <a onClick={e => { if (!isValid) { e.preventDefault(); setTouched({files:true,website:true,docLinks:true}); setError('Please fix errors before continuing.'); } }} className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>Next Step</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 