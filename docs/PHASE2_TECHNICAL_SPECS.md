# Phase 2 Technical Specifications - Frontend Onboarding Wizard

## **Overview**

This document provides technical specifications for the Phase 2 frontend implementation of the AI Agent Self-Onboarding Platform. The onboarding wizard consists of 5 steps with enhanced UX features including validation, tooltips, accessibility, and responsive design.

---

## **File Structure**

```
frontend/src/pages/onboarding/
├── step1.jsx          # Business Profile & Industry Type
├── step2.jsx          # Upload Business Assets  
├── step3.jsx          # Define Agent Purpose & Personality
├── step4.jsx          # Preview & Test Agent
└── step5.jsx          # Success Page & Dashboard Access
```

---

## **Component Specifications**

### **Step 1: Business Profile & Industry Type**

**File:** `frontend/src/pages/onboarding/step1.jsx`

#### **State Management**
```javascript
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
const [touched, setTouched] = useState({});
const [error, setError] = useState('');
const [showTooltip, setShowTooltip] = useState('');
```

#### **Validation Functions**
```javascript
const validateEmail = (email) => /.+@.+\..+/.test(email);
const validateURL = (url) => /^https?:\/\/.+\..+/.test(url);
const validatePhone = (phone) => /^[\d\-\+\(\) ]{7,}$/.test(phone);
```

#### **Form Fields**
- **Business Name** (required): Text input with validation
- **Website URL** (required): URL input with format validation
- **Email Address** (required): Email input with format validation
- **Phone Number** (required): Phone input with format validation
- **Location Address** (required): Text input
- **Industry Type** (required): Dropdown with predefined options
- **Company Logo** (optional): File upload (image/*)
- **Social Media Links** (optional): 5 text inputs for different platforms

#### **Enhancements**
- Real-time validation on blur
- Inline error messages
- Info tooltips for all fields
- Responsive grid layout
- Accessibility labels

---

### **Step 2: Upload Business Assets**

**File:** `frontend/src/pages/onboarding/step2.jsx`

#### **State Management**
```javascript
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
```

#### **Validation Functions**
```javascript
const validateURL = (url) => !url || /^https?:\/\/.+\..+/.test(url);
const validateFile = (file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type) && file.size <= 10 * 1024 * 1024;
```

#### **Form Fields**
- **File Upload** (required): Multi-file input (.pdf, .docx, .txt, max 10MB each)
- **Website URL** (optional): URL input with validation
- **Website Crawl Toggle** (optional): Yes/No buttons
- **Page Selection** (conditional): Checkboxes for crawlable pages
- **Google Docs/Notion Links** (optional): Dynamic URL inputs

#### **Enhancements**
- File type and size validation
- Toast notifications for upload status
- Dynamic link management (add/remove)
- Visual feedback for selected files
- Info tooltips for complex fields

---

### **Step 3: Define Agent Purpose & Personality**

**File:** `frontend/src/pages/onboarding/step3.jsx`

#### **State Management**
```javascript
const [objectives, setObjectives] = useState([]);
const [personality, setPersonality] = useState('');
const [customPersonality, setCustomPersonality] = useState('');
const [services, setServices] = useState(['', '', '']);
const [fallback, setFallback] = useState('');
const [customFallback, setCustomFallback] = useState('');
const [businessHours, setBusinessHours] = useState({
  monday: { open: '09:00', close: '17:00', enabled: true },
  tuesday: { open: '09:00', close: '17:00', enabled: true },
  wednesday: { open: '09:00', close: '17:00', enabled: true },
  thursday: { open: '09:00', close: '17:00', enabled: true },
  friday: { open: '09:00', close: '17:00', enabled: true },
  saturday: { open: '', close: '', enabled: false },
  sunday: { open: '', close: '', enabled: false }
});
const [touched, setTouched] = useState({});
const [error, setError] = useState('');
const [showTooltip, setShowTooltip] = useState('');
```

#### **Form Fields**
- **Primary Objectives** (required): Multi-select buttons
- **Bot Voice & Personality** (required): Single-select buttons with custom option
- **Top 3 Services** (required): 3 text inputs
- **Fallback Behavior** (required): Dropdown with custom option
- **Business Hours** (conditional): Time inputs for each day when booking enabled

#### **Enhancements**
- Button-based selection for better UX
- Conditional form fields
- Improved business hours layout (vertical cards)
- Real-time validation
- Info tooltips for complex fields

---

### **Step 4: Preview & Test Agent**

**File:** `frontend/src/pages/onboarding/step4.jsx`

#### **Layout Structure**
- Two-column responsive layout (configuration + chat)
- Left column: Configuration summary and voice bot options
- Right column: Chat preview interface

#### **Features**
- **Configuration Summary**: Display of collected data
- **Chat Preview**: Mock chat interface with message bubbles
- **Voice Bot Options**: Static checkboxes and dropdowns
- **Retest Button**: Placeholder for future functionality

#### **Enhancements**
- Responsive grid layout
- Improved chat UI with proper message bubbles
- Better spacing and visual hierarchy
- Clean separation between sections

---

### **Step 5: Success Page & Dashboard Access**

**File:** `frontend/src/pages/onboarding/step5.jsx`

#### **Features**
- Success confirmation message
- Dashboard access button
- Calendly demo scheduling link
- Bot status display

#### **Enhancements**
- Clean, celebratory design
- Clear next steps for users
- Professional layout and typography

---

## **Shared Components & Patterns**

### **Tooltip System**
```javascript
// Usage pattern across all steps
<span onMouseEnter={()=>setShowTooltip('fieldName')} onMouseLeave={()=>setShowTooltip('')} tabIndex={0} aria-label="Field Info">
  <AiOutlineInfoCircle className="inline text-primary-400 cursor-pointer" />
</span>
{showTooltip==='fieldName' && <span className="absolute bg-white border p-2 rounded shadow text-xs z-10">Tooltip text</span>}
```

### **Validation Pattern**
```javascript
// Standard validation pattern
const getFieldError = (name) => {
  if (!touched[name]) return '';
  if (name === 'fieldName' && !form.fieldName) return 'Field is required.';
  return '';
};

// Usage in JSX
<input className={`w-full border rounded-lg px-3 py-2 ${getFieldError('fieldName') ? 'border-red-500' : ''}`} />
{getFieldError('fieldName') && <div className="text-red-600 text-xs mt-1">{getFieldError('fieldName')}</div>}
```

### **Navigation Pattern**
```javascript
// Standard navigation with validation
<Link href={isValid ? "/onboarding/nextStep" : "#"} legacyBehavior>
  <a onClick={e => { if (!isValid) { e.preventDefault(); setTouched({...}); setError('Please fix errors before continuing.'); } }} 
     className={`px-8 py-2 rounded-lg font-semibold shadow transition ${isValid ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>
    Next Step
  </a>
</Link>
```

---

## **Styling System**

### **Design Tokens**
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-400: #60a5fa;
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;

/* Secondary Colors */
--secondary-100: #f3f4f6;
--secondary-200: #e5e7eb;
--secondary-300: #d1d5db;
--secondary-500: #6b7280;
--secondary-600: #4b5563;
--secondary-700: #374151;
```

### **Responsive Breakpoints**
```css
/* Mobile First */
.grid-cols-1 md:grid-cols-2  /* 1 column on mobile, 2 on desktop */
.w-full max-w-2xl            /* Full width on mobile, max width on desktop */
```

### **Component Variants**
```css
/* Button Styles */
.btn-primary: bg-primary-600 text-white hover:bg-primary-700
.btn-secondary: bg-secondary-200 text-secondary-700 hover:bg-secondary-300
.btn-disabled: bg-secondary-200 text-secondary-500 cursor-not-allowed

/* Input Styles */
.input-default: border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400
.input-error: border-red-500
```

---

## **Accessibility Features**

### **ARIA Labels**
```javascript
// All form controls have proper ARIA labels
<input aria-label="Business Name" />
<select aria-label="Industry Type" />
<button aria-label="Enable Monday" />
```

### **Keyboard Navigation**
- All interactive elements are keyboard accessible
- Logical tab order throughout forms
- Focus indicators for all interactive elements

### **Screen Reader Support**
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive labels and descriptions
- Error announcements

---

## **Performance Optimizations**

### **Code Splitting**
- Each step is a separate page component
- Lazy loading ready for future implementation
- Minimal bundle size per step

### **State Management**
- Local component state only
- No unnecessary re-renders
- Efficient validation logic

### **File Handling**
- Client-side file validation
- Size and type checking before upload
- Visual feedback for user actions

---

## **Integration Points**

### **Backend API Endpoints**
```javascript
// Expected API structure for form submission
POST /api/onboarding/step1
{
  businessName: string,
  website: string,
  email: string,
  phone: string,
  address: string,
  industry: string,
  logo: File,
  socials: {
    instagram: string,
    facebook: string,
    linkedin: string,
    tiktok: string,
    google: string
  }
}

POST /api/onboarding/step2
{
  files: File[],
  website: string,
  crawl: boolean,
  pages: object,
  docLinks: string[]
}

POST /api/onboarding/step3
{
  objectives: string[],
  personality: string,
  customPersonality: string,
  services: string[],
  fallback: string,
  customFallback: string,
  businessHours: object
}
```

### **File Upload Integration**
```javascript
// File upload ready for backend integration
const handleFileUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

---

## **Testing Strategy**

### **Unit Tests**
- Form validation functions
- State management logic
- Component rendering

### **Integration Tests**
- Form submission flow
- Navigation between steps
- File upload functionality

### **Accessibility Tests**
- Screen reader compatibility
- Keyboard navigation
- Color contrast compliance

### **Cross-Browser Tests**
- Chrome, Firefox, Safari, Edge
- Mobile browsers
- Different screen sizes

---

## **Deployment Considerations**

### **Build Process**
```bash
# Production build
npm run build

# Static export (if needed)
npm run export
```

### **Environment Variables**
```javascript
// Required environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_UPLOAD_URL=https://uploads.example.com
```

### **Performance Monitoring**
- Core Web Vitals tracking
- Form completion rate monitoring
- Error rate tracking
- User interaction analytics

---

**This technical specification provides a complete reference for the Phase 2 frontend implementation, ensuring consistency, maintainability, and quality across all onboarding wizard components.** 