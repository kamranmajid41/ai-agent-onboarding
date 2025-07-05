import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../ui';
import { AiOutlineSave, AiOutlineUpload, AiOutlineLink, AiOutlineUser, AiOutlineRobot, AiOutlinePhone, AiOutlineGlobal, AiOutlineInfoCircle } from 'react-icons/ai';
import Tooltip from '../ui/Tooltip';

const INDUSTRIES = [
  'Law', 'Restaurant', 'Real Estate', 'Med Spa', 'Retail', 
  'Fitness', 'Coaching', 'Education', 'Healthcare', 'Technology',
  'Finance', 'Consulting', 'Manufacturing', 'Other'
];

const OBJECTIVES = [
  'Book Appointments', 'Answer FAQs', 'Capture Leads', 
  'Provide Quotes', 'Route to Human Agent', 'Process Orders',
  'Schedule Consultations', 'Handle Complaints'
];

const PERSONALITIES = [
  'Friendly & Conversational', 'Formal & Efficient', 
  'Expert Advisor', 'Fun & Quirky', 'Professional & Helpful',
  'Warm & Welcoming', 'Direct & Clear', 'Custom'
];

const FALLBACK_OPTIONS = [
  "Let me take a message for you.",
  "Here's how you can contact us directly.",
  "I'll connect you with a human representative shortly.",
  "Let me transfer you to our team.",
  "Custom Text Response"
];

export default function OnboardingStepper({ settings, setSettings, onSave, loading }) {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showTooltip, setShowTooltip] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileUpload = (e, stepKey) => {
    const files = Array.from(e.target.files || []);
    setSettings(prev => ({
      ...prev,
      onboardingData: {
        ...prev.onboardingData,
        [stepKey]: {
          ...prev.onboardingData[stepKey],
          files: files
        }
      }
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      onboardingData: {
        ...prev.onboardingData,
        step1: {
          ...prev.onboardingData.step1,
          socials: {
            ...prev.onboardingData.step1?.socials,
            [platform]: value
          }
        }
      }
    }));
  };

  const handleObjectiveToggle = (objective) => {
    const currentObjectives = settings.onboardingData.step3?.objectives || [];
    const newObjectives = currentObjectives.includes(objective)
      ? currentObjectives.filter(obj => obj !== objective)
      : [...currentObjectives, objective];
    
    setSettings(prev => ({
      ...prev,
      onboardingData: {
        ...prev.onboardingData,
        step3: {
          ...prev.onboardingData.step3,
          objectives: newObjectives
        }
      }
    }));
  };

  const getStepTitle = (step) => {
    const titles = {
      1: 'Business Profile & Industry Type',
      2: 'Upload Business Assets',
      3: 'Define Agent Purpose & Personality',
      4: 'Voice Settings & Preview',
      5: 'Deployment & Success'
    };
    return titles[step] || `Step ${step}`;
  };

  function validateStep(step) {
    const errs = {};
    if (step === 1) {
      if (!settings.onboardingData.step1?.businessName) errs.businessName = 'Business Name is required.';
      if (!settings.onboardingData.step1?.industry) errs.industry = 'Industry is required.';
      if (!settings.onboardingData.step1?.email) errs.email = 'Email is required.';
    }
    if (step === 2) {
      if (!settings.onboardingData.step2?.files || settings.onboardingData.step2?.files.length === 0) {
        errs.files = 'At least one business file is required.';
      }
    }
    if (step === 3) {
      if (!settings.onboardingData.step3?.objectives || settings.onboardingData.step3?.objectives.length === 0) {
        errs.objectives = 'At least one objective is required.';
      }
      if (!settings.onboardingData.step3?.personality) {
        errs.personality = 'Personality is required.';
      }
    }
    if (step === 4) {
      if (settings.onboardingData.step4?.voiceBotEnabled === undefined) {
        errs.voiceBotEnabled = 'Voice Bot setting is required.';
      }
    }
    if (step === 5) {
      if (!settings.onboardingData.step5?.agentName) errs.agentName = 'Agent Name is required.';
      if (!settings.onboardingData.step5?.chatUrl) errs.chatUrl = 'Chat URL is required.';
    }
    return errs;
  }

  const handleNext = () => {
    const stepErrors = validateStep(onboardingStep);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card title="AI Agent Onboarding" subtitle="Complete all steps to set up your agent">
        {/* Stepper Navigation */}
        <div className="flex items-center justify-between mb-8">
          {[1,2,3,4,5].map((step) => (
            <button
              key={step}
              className={`flex-1 py-2 rounded-lg mx-1 font-semibold transition-all ${
                onboardingStep === step 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
              }`}
              onClick={() => setOnboardingStep(step)}
            >
              Step {step}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="mt-4">
          {/* Step 1: Business Profile & Industry Type */}
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AiOutlineUser className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold text-white">Business Profile & Industry Type</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Start by providing your business information and selecting your industry type to help customize your AI agent.
              </p>

              {/* Business Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Business Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={<span>Business Name <span className="text-error-400">*</span> <Tooltip text="The official name of your business or organization."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step1?.businessName || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step1: { 
                          ...prev.onboardingData.step1, 
                          businessName: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="Your Business Name"
                  />
                  {errors.businessName && <div className="text-error-400 text-xs mt-1">{errors.businessName}</div>}
                  <Input 
                    label={<span>Website <Tooltip text="Your business's main website URL."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step1?.website || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step1: { 
                          ...prev.onboardingData.step1, 
                          website: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="https://yourbusiness.com"
                  />
                  <Input 
                    label={<span>Email <span className="text-error-400">*</span> <Tooltip text="A contact email for your business."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    type="email"
                    value={settings.onboardingData.step1?.email || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step1: { 
                          ...prev.onboardingData.step1, 
                          email: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="contact@yourbusiness.com"
                  />
                  {errors.email && <div className="text-error-400 text-xs mt-1">{errors.email}</div>}
                  <Input 
                    label={<span>Phone <Tooltip text="A contact phone number for your business."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step1?.phone || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step1: { 
                          ...prev.onboardingData.step1, 
                          phone: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Industry Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Industry <span className="text-error-400">*</span> <Tooltip text="Select the industry that best describes your business."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Healthcare', 'Finance', 'E-commerce', 'Real Estate', 'Education', 'Technology', 'Legal', 'Consulting', 'Manufacturing', 'Retail', 'Hospitality', 'Other'].map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step1: { 
                            ...prev.onboardingData.step1, 
                            industry: industry 
                          } 
                        } 
                      }))}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        settings.onboardingData.step1?.industry === industry
                          ? 'bg-primary-900/30 border-primary-500 text-primary-300'
                          : 'bg-surface-700/50 border-surface-600 text-gray-300 hover:bg-surface-600/50'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
                {errors.industry && <div className="text-error-400 text-xs mt-1">{errors.industry}</div>}
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Social Media Links</h4>
                <p className="text-sm text-gray-300">
                  Add your social media profiles to help your AI agent understand your brand better.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Facebook" 
                    value={settings.onboardingData.step1?.socials?.facebook || ''} 
                    onChange={e => handleSocialLinkChange('facebook', e.target.value)} 
                    placeholder="https://facebook.com/yourbusiness"
                  />
                  <Input 
                    label="Instagram" 
                    value={settings.onboardingData.step1?.socials?.instagram || ''} 
                    onChange={e => handleSocialLinkChange('instagram', e.target.value)} 
                    placeholder="https://instagram.com/yourbusiness"
                  />
                  <Input 
                    label="LinkedIn" 
                    value={settings.onboardingData.step1?.socials?.linkedin || ''} 
                    onChange={e => handleSocialLinkChange('linkedin', e.target.value)} 
                    placeholder="https://linkedin.com/company/yourbusiness"
                  />
                  <Input 
                    label="Twitter" 
                    value={settings.onboardingData.step1?.socials?.twitter || ''} 
                    onChange={e => handleSocialLinkChange('twitter', e.target.value)} 
                    placeholder="https://twitter.com/yourbusiness"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Upload Business Assets */}
          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AiOutlineUpload className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold text-white">Upload Business Assets</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Upload your business documents, files, and website content to train your AI agent with your specific knowledge.
              </p>

              {/* File Upload */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Upload Business Files <span className="text-error-400">*</span> <Tooltip text="Upload files that represent your business knowledge (PDF, DOCX, TXT, CSV)."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></h4>
                <div className="border-2 border-dashed border-surface-600 rounded-lg p-6 text-center">
                  <AiOutlineUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Supported formats: PDF, DOC, DOCX, TXT, CSV (Max 10MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.csv"
                    onChange={(e) => handleFileUpload(e, 'step2')}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="btn-secondary cursor-pointer">
                    Choose Files
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {settings.onboardingData.step2?.files?.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium text-white">Uploaded Files:</h5>
                    <ul className="space-y-1">
                      {settings.onboardingData.step2.files.map((file, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                          <AiOutlineFile className="w-4 h-4" />
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {errors.files && <div className="text-error-400 text-xs mt-1">{errors.files}</div>}
              </div>

              {/* Website Content */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Website Content</h4>
                <div className="space-y-4">
                  <Input 
                    label={<span>Website URL to Crawl <Tooltip text="Enter your website URL to automatically extract content for your agent."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step2?.crawlUrl || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step2: { 
                          ...prev.onboardingData.step2, 
                          crawlUrl: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="https://yourbusiness.com"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.onboardingData.step2?.crawl || false}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step2: { 
                              ...prev.onboardingData.step2, 
                              crawl: e.target.checked 
                            } 
                          } 
                        }))}
                        className="rounded border-surface-600 text-primary-600 focus:ring-primary-500 bg-surface-800"
                      />
                      <span className="ml-2 text-gray-300">Crawl website for content</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Manual Content Entry */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Additional Information</h4>
                <textarea
                  value={settings.onboardingData.step2?.additionalInfo || ''}
                  onChange={e => setSettings(prev => ({ 
                    ...prev, 
                    onboardingData: { 
                      ...prev.onboardingData, 
                      step2: { 
                        ...prev.onboardingData.step2, 
                        additionalInfo: e.target.value 
                      } 
                    } 
                  }))}
                  placeholder="Enter any additional information about your business, services, or frequently asked questions..."
                  className="w-full h-32 bg-surface-800 border border-surface-600 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                />
                <Tooltip text="Add any extra details that will help your agent answer questions."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip>
              </div>
            </div>
          )}

          {/* Step 3: Define Agent Purpose & Personality */}
          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AiOutlineRobot className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold text-white">Define Agent Purpose & Personality</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Configure your AI agent's objectives, personality, and behavior to match your business needs and brand voice.
              </p>

              {/* Primary Objectives */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Primary Objective(s) <span className="text-error-400">*</span> <Tooltip text="Select the main goals for your AI agent (e.g., support, sales, lead gen)."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Customer Support', 'Lead Generation', 'Sales Assistance', 'Appointment Booking', 'Product Information', 'FAQ Handling', 'Technical Support', 'Order Processing'].map((objective) => (
                    <button
                      key={objective}
                      onClick={() => handleObjectiveToggle(objective)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        settings.onboardingData.step3?.objectives?.includes(objective)
                          ? 'bg-primary-900/30 border-primary-500 text-primary-300'
                          : 'bg-surface-700/50 border-surface-600 text-gray-300 hover:bg-surface-600/50'
                      }`}
                    >
                      {objective}
                    </button>
                  ))}
                </div>
                {errors.objectives && <div className="text-error-400 text-xs mt-1">{errors.objectives}</div>}
              </div>

              {/* Bot Voice & Personality */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Bot Voice & Personality</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Personality <span className="text-error-400">*</span> <Tooltip text="Choose the personality style for your AI agent."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip>
                    </label>
                    <select
                      value={settings.onboardingData.step3?.personality || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            personality: e.target.value 
                          } 
                        } 
                      }))}
                      className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    >
                      <option value="">Select personality</option>
                      <option value="Professional">Professional & Formal</option>
                      <option value="Friendly">Friendly & Conversational</option>
                      <option value="Casual">Casual & Relaxed</option>
                      <option value="Enthusiastic">Enthusiastic & Energetic</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Tone</label>
                    <select
                      value={settings.onboardingData.step3?.tone || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            tone: e.target.value 
                          } 
                        } 
                      }))}
                      className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    >
                      <option value="">Select tone</option>
                      <option value="Helpful">Helpful</option>
                      <option value="Informative">Informative</option>
                      <option value="Persuasive">Persuasive</option>
                      <option value="Empathetic">Empathetic</option>
                      <option value="Direct">Direct</option>
                    </select>
                  </div>
                </div>
                
                {settings.onboardingData.step3?.personality === 'Custom' && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Custom Personality Description</label>
                    <textarea
                      value={settings.onboardingData.step3?.customPersonality || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            customPersonality: e.target.value 
                          } 
                        } 
                      }))}
                      placeholder="Describe your AI agent's personality, communication style, and how it should interact with customers..."
                      className="w-full h-24 bg-surface-800 border border-surface-600 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    />
                  </div>
                )}
              </div>

              {/* Services & Offers */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Top 3 Services or Offers</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <Input 
                      key={num}
                      label={`Service/Offer ${num}`} 
                      value={settings.onboardingData.step3?.services?.[num-1] || ''} 
                      onChange={e => {
                        const services = [...(settings.onboardingData.step3?.services || [])];
                        services[num-1] = e.target.value;
                        setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step3: { 
                              ...prev.onboardingData.step3, 
                              services: services 
                            } 
                          } 
                        }));
                      }} 
                      placeholder={`Describe your ${num === 1 ? 'primary' : num === 2 ? 'secondary' : 'tertiary'} service or offer`}
                    />
                  ))}
                </div>
              </div>

              {/* Fallback Behavior */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Fallback Behavior</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">When AI can't help</label>
                    <select
                      value={settings.onboardingData.step3?.fallbackBehavior || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            fallbackBehavior: e.target.value 
                          } 
                        } 
                      }))}
                      className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    >
                      <option value="">Select behavior</option>
                      <option value="human">Transfer to human agent</option>
                      <option value="email">Collect email for follow-up</option>
                      <option value="phone">Provide phone number</option>
                      <option value="schedule">Schedule a call</option>
                    </select>
                  </div>
                  <Input 
                    label="Fallback Message" 
                    value={settings.onboardingData.step3?.fallbackMessage || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step3: { 
                          ...prev.onboardingData.step3, 
                          fallbackMessage: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="I'll connect you with a human representative shortly."
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Business Hours</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Operating Hours</label>
                    <select
                      value={settings.onboardingData.step3?.businessHours || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            businessHours: e.target.value 
                          } 
                        } 
                      }))}
                      className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    >
                      <option value="">Select hours</option>
                      <option value="24/7">24/7 Available</option>
                      <option value="business">Business Hours (9 AM - 5 PM)</option>
                      <option value="extended">Extended Hours (8 AM - 8 PM)</option>
                      <option value="weekend">Weekend Support</option>
                      <option value="custom">Custom Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Time Zone</label>
                    <select
                      value={settings.onboardingData.step3?.timezone || ''}
                      onChange={e => setSettings(prev => ({ 
                        ...prev, 
                        onboardingData: { 
                          ...prev.onboardingData, 
                          step3: { 
                            ...prev.onboardingData.step3, 
                            timezone: e.target.value 
                          } 
                        } 
                      }))}
                      className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                    >
                      <option value="">Select timezone</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Voice Settings & Preview */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AiOutlinePhone className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold text-white">Voice Settings & Preview</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Configure voice settings for your AI agent and preview how it will sound to your customers.
              </p>

              {/* Voice Bot Configuration */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Voice Bot Configuration</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                    <div>
                      <div className="font-medium text-white">
                        Enable Voice Bot <span className="text-error-400">*</span> <Tooltip text="Enable or disable voice bot features for your agent."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip>
                      </div>
                      <div className="text-sm text-gray-300">Allow customers to call and speak with your AI agent</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.onboardingData.step4?.voiceBotEnabled || false}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step4: { 
                              ...prev.onboardingData.step4, 
                              voiceBotEnabled: e.target.checked 
                            } 
                          } 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                    <div>
                      <div className="font-medium text-white">Text-to-Speech</div>
                      <div className="text-sm text-gray-300">Convert AI responses to speech</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.onboardingData.step4?.textToSpeech || false}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step4: { 
                              ...prev.onboardingData.step4, 
                              textToSpeech: e.target.checked 
                            } 
                          } 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                    <div>
                      <div className="font-medium text-white">Speech-to-Text</div>
                      <div className="text-sm text-gray-300">Convert customer speech to text</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.onboardingData.step4?.speechToText || false}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step4: { 
                              ...prev.onboardingData.step4, 
                              speechToText: e.target.checked 
                            } 
                          } 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Voice Settings */}
              {settings.onboardingData.step4?.voiceBotEnabled && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Voice Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Voice</label>
                      <select
                        value={settings.onboardingData.step4?.voice || ''}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step4: { 
                              ...prev.onboardingData.step4, 
                              voice: e.target.value 
                            } 
                          } 
                        }))}
                        className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                      >
                        <option value="">Select voice</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="neutral">Neutral</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Speed</label>
                      <select
                        value={settings.onboardingData.step4?.speed || ''}
                        onChange={e => setSettings(prev => ({ 
                          ...prev, 
                          onboardingData: { 
                            ...prev.onboardingData, 
                            step4: { 
                              ...prev.onboardingData.step4, 
                              speed: e.target.value 
                            } 
                          } 
                        }))}
                        className="w-full bg-surface-800 border border-surface-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500"
                      >
                        <option value="">Select speed</option>
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Live Preview</h4>
                <div className="border border-surface-600/50 rounded-lg p-4 bg-surface-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-900/50 rounded-full flex items-center justify-center">
                      <AiOutlineRobot className="w-4 h-4 text-primary-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{settings.onboardingData.step1?.businessName || 'Your Business'}</div>
                      <div className="text-sm text-gray-300">AI Agent</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {settings.onboardingData.step3?.personality === 'Custom' 
                      ? settings.onboardingData.step3?.customPersonality 
                      : settings.onboardingData.step3?.personality || 'Friendly & Conversational'
                    }
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    Voice: {settings.onboardingData.step4?.voice || 'Default'} | 
                    Speed: {settings.onboardingData.step4?.speed || 'Normal'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Deployment & Success */}
          {onboardingStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AiOutlineGlobal className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-bold text-white">Deployment & Success</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Your AI agent is ready to deploy! Review the final settings and get your integration links.
              </p>

              {/* Deployment Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Deployment Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={<span>Agent Name <span className="text-error-400">*</span> <Tooltip text="The display name for your AI agent."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step5?.agentName || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step5: { 
                          ...prev.onboardingData.step5, 
                          agentName: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="AI Assistant"
                  />
                  {errors.agentName && <div className="text-error-400 text-xs mt-1">{errors.agentName}</div>}
                  <Input 
                    label={<span>Chat URL <span className="text-error-400">*</span> <Tooltip text="The URL where users can chat with your agent."><AiOutlineInfoCircle className="inline w-4 h-4 text-primary-200 ml-1 cursor-pointer" /></Tooltip></span>} 
                    value={settings.onboardingData.step5?.chatUrl || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step5: { 
                          ...prev.onboardingData.step5, 
                          chatUrl: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="https://chat.yourdomain.com"
                  />
                  {errors.chatUrl && <div className="text-error-400 text-xs mt-1">{errors.chatUrl}</div>}
                  <Input 
                    label="Phone Number" 
                    value={settings.onboardingData.step5?.phoneNumber || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step5: { 
                          ...prev.onboardingData.step5, 
                          phoneNumber: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="+1-555-AI-AGENT"
                  />
                  <Input 
                    label="Dashboard URL" 
                    value={settings.onboardingData.step5?.dashboardUrl || ''} 
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      onboardingData: { 
                        ...prev.onboardingData, 
                        step5: { 
                          ...prev.onboardingData.step5, 
                          dashboardUrl: e.target.value 
                        } 
                      } 
                    }))} 
                    placeholder="https://dashboard.yourdomain.com"
                  />
                </div>
              </div>

              {/* Agent Status */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Agent Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success-900/30 rounded-lg border border-success-700/50">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="font-semibold text-success-300">Agent</div>
                    <div className="text-sm text-success-400">
                      {settings.onboardingData.step5?.agentName ? 'Live' : 'Not Live'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary-900/30 rounded-lg border border-primary-700/50">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="font-semibold text-primary-300">Training</div>
                    <div className="text-sm text-primary-400">
                      {settings.onboardingData.step2?.files?.length > 0 ? 'Complete' : 'Pending'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-accent-900/30 rounded-lg border border-accent-700/50">
                    <div className="text-2xl mb-2">🔗</div>
                    <div className="font-semibold text-accent-300">Integration</div>
                    <div className="text-sm text-accent-400">
                      {settings.onboardingData.step5?.chatUrl ? 'Connected' : 'Not Connected'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="bg-success-900/30 border border-success-700/50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">Your AI Agent is Ready!</h3>
                <p className="text-gray-300 mb-4">
                  All configuration steps are complete. Your AI agent is ready to go live and start helping your customers.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="border-success-500 text-success-400 hover:bg-success-900/20">
                    Schedule Demo
                  </Button>
                  <Button className="bg-success-600 hover:bg-success-700">
                    Go Live Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            disabled={onboardingStep === 1} 
            onClick={() => setOnboardingStep(onboardingStep - 1)}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            disabled={onboardingStep === 5} 
            onClick={handleNext}
          >
            Next
          </Button>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={onSave} loading={loading} disabled={loading} className="px-8">
            <div className="flex items-center">
              <AiOutlineSave className="w-4 h-4 mr-2" />
              Save Changes
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
} 