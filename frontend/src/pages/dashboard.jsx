import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, Badge, ProgressBar, Button, Input, Toast } from '../components/ui';
import { ChatInterface } from '../components/chat';
import MetricsCard from '../components/dashboard/MetricsCard';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import DashboardOnboarding from '../components/dashboard/DashboardOnboarding';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import DashboardAnalytics from '../components/dashboard/DashboardAnalytics';
import {
  AiOutlineUser,
  AiOutlineRobot,
  AiOutlineBell,
  AiOutlineApi,
  AiOutlineSecurityScan,
  AiOutlineDashboard,
  AiOutlineRocket,
  AiOutlineMessage,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineCheckCircle,
  AiOutlineLink,
  AiOutlineInfoCircle
} from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import Tooltip from '../components/ui/Tooltip';

function isStepComplete(step, onboardingData) {
  const stepData = onboardingData[`step${step}`];
  if (!stepData || Object.keys(stepData).length === 0) return false;
  switch (step) {
    case 1: // Business Information
      return !!(stepData.businessName || stepData.website || stepData.email);
    case 2: // Knowledge Base
      return !!(stepData.files?.length > 0 || stepData.crawl || stepData.website);
    case 3: // Agent Configuration
      return !!(stepData.objectives?.length > 0 || stepData.personality);
    case 4: // Voice Settings
      return stepData.voiceBotEnabled !== undefined;
    case 5: // Deployment
      return !!(stepData.agentName || stepData.chatUrl);
    default:
      return false;
  }
}

// Helper to check if all steps are complete
function allOnboardingStepsComplete(onboardingData) {
  for (let i = 1; i <= 5; i++) {
    if (!isStepComplete(i, onboardingData)) return false;
  }
  return true;
}

export { isStepComplete };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalConversations: 0,
    totalMessages: 0,
    averageMessageLength: 0,
    avgResponseTime: 'N/A',
    satisfactionRate: 'N/A',
    activeAgents: 0 // This remains a placeholder unless we have a backend way to calculate it
  });
  const [onboardingData, setOnboardingData] = useState({});

  // Add state and logic for settings tab
  const DEFAULT_SETTINGS = {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    onboardingData: { 
      step1: {},
      step2: { files: [] }, // Initialize files as an empty array
      step3: {},
      step4: {},
      step5: {}
    },
    agentName: 'AI Assistant',
    welcomeMessage: 'Hello! How can I help you today?',
    fallbackMessage: "I'll connect you with a human representative shortly.",
    businessHours: 'Monday-Friday: 9:00 AM - 5:00 PM',
    aiUsage: true,
    gdpr: true,
    emailNotifications: true,
    marketingEmails: false,
    integrations: {
      goHighLevel: { connected: false, apiKey: '', locationId: '' },
      openai: { connected: false, apiKey: '' },
      googleAnalytics: { connected: false, trackingId: '' },
      zapier: { connected: false, webhookUrl: '' }
    }
  };

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load onboarding data from user data (from backend)
    if (user?.onboardingData) {
      setOnboardingData(user.onboardingData);
    }
    if (user) {
      setSettings(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        companyName: user.company?.name || '',
        companyWebsite: user.company?.website || '',
        agentName: user.settings?.agentName || DEFAULT_SETTINGS.agentName,
        welcomeMessage: user.settings?.welcomeMessage || DEFAULT_SETTINGS.welcomeMessage,
        fallbackMessage: user.settings?.fallbackMessage || DEFAULT_SETTINGS.fallbackMessage,
        businessHours: user.settings?.businessHours || DEFAULT_SETTINGS.businessHours,
        integrations: user.integrations || DEFAULT_SETTINGS.integrations,
        onboardingData: {
          ...DEFAULT_SETTINGS.onboardingData,
          ...user.onboardingData,
          step2: {
            ...(user.onboardingData?.step2 || {}),
            files: Array.isArray(user.onboardingData?.step2?.files) ? user.onboardingData.step2.files : []
          }
        }
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user) return;
      try {
        const response = await fetch(`https://api.botslinger.ai/dashboard/metrics`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMetrics(prevMetrics => ({
          ...prevMetrics,
          totalConversations: data.metrics.totalConversations,
          totalMessages: data.metrics.totalMessages,
          averageMessageLength: data.metrics.averageMessageLength || 0, // Ensure it's a number
          avgResponseTime: data.metrics.avgResponseTime,
          satisfactionRate: data.metrics.satisfactionRate,
        }));
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setToastMessage('Failed to load metrics.');
        setToastType('error');
        setShowToast(true);
      }
    };

    fetchMetrics();
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  function getStepTitle(step) {
    const titles = {
      1: 'Business Information',
      2: 'Knowledge Base',
      3: 'Agent Configuration',
      4: 'Voice Settings',
      5: 'Deployment'
    };
    return titles[step] || `Step ${step}`;
  }

  function getOnboardingProgress() {
    let completed = 0;
    for (let i = 1; i <= 5; i++) {
      if (isStepComplete(i, onboardingData)) completed++;
    }
    return Math.round((completed / 5) * 100);
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update user profile
      const updatedUser = {
        firstName: settings.firstName,
        lastName: settings.lastName,
        company: {
          name: settings.companyName,
          website: settings.companyWebsite
        },
        settings: {
          agentName: settings.agentName,
          welcomeMessage: settings.welcomeMessage,
          fallbackMessage: settings.fallbackMessage,
          businessHours: settings.businessHours,
          aiUsage: settings.aiUsage,
          gdpr: settings.gdpr
        },
        integrations: settings.integrations,
        onboardingData: {
          ...settings.onboardingData,
          step2: {
            ...settings.onboardingData.step2,
            files: (settings.onboardingData.step2?.files || []).filter(file => typeof file === 'string')
          }
        }
      };
      // Call the backend API to update user profile
      const response = await fetch(`https://api.botslinger.ai/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedUser)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      setToastMessage('Settings saved successfully!');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to save settings. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'ai-agent-settings.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setToastMessage('Settings exported successfully!');
    setToastType('success');
    setShowToast(true);
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setSettings(DEFAULT_SETTINGS);
      setToastMessage('Settings reset to defaults.');
      setToastType('info');
      setShowToast(true);
    }
  };

  const handleAgentSendMessage = async (message) => {
    try {
      const response = await fetch(`https://api.botslinger.ai/agents/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error sending message to backend agent:", error);
      setToastMessage('Failed to get agent response. Please check backend.');
      setToastType('error');
      setShowToast(true);
      return "Error: Could not get a response from the agent.";
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: AiOutlineDashboard },
    { id: 'onboarding', label: 'Onboarding', icon: AiOutlineRocket },
    { id: 'agents', label: 'AI Agents', icon: AiOutlineRobot },
    { id: 'conversations', label: 'Conversations', icon: AiOutlineMessage },
    { id: 'analytics', label: 'Analytics', icon: AiOutlineBarChart },
    { id: 'settings', label: 'Settings', icon: AiOutlineSetting }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-dark">
        {/* Header */}
        <header className="glass-dark border-b border-dark-600/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold gradient-text text-shadow">Dashboard</h1>
                <Badge variant="success" className="animate-pulse-slow">Live</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  Welcome back, <span className="text-primary-400 font-medium">{user?.firstName}</span>!
            </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-surface-700 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="glass-dark border-b border-dark-600/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-3 px-4 inline-flex items-center gap-2 text-sm font-medium rounded-t-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-surface-700 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-surface-800'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <DashboardOverview 
                  user={user}
                  metrics={metrics}
                  onboardingData={onboardingData}
                  getOnboardingProgress={getOnboardingProgress}
                  getStepTitle={getStepTitle}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

          {activeTab === 'onboarding' && (
            <DashboardOnboarding 
              onboardingData={onboardingData}
              getOnboardingProgress={getOnboardingProgress}
              getStepTitle={getStepTitle}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'agents' && (
            <div className="space-y-6">
              <Card className="card card-hover">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">AI Agent Status</h3>
                  {!allOnboardingStepsComplete(onboardingData) && (
                    <div className="mb-4 p-4 bg-warning-900/30 border border-warning-700/50 rounded-lg text-warning-300 text-sm">
                      <strong>Complete all onboarding steps to activate your AI agent.</strong>
                      <div className="mt-2">
                        Incomplete steps:
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {[1, 2, 3, 4, 5].filter(step => !isStepComplete(step, onboardingData)).map(step => (
                            <li key={step} className="text-warning-200">{getStepTitle(step)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg border ${allOnboardingStepsComplete(onboardingData) ? 'bg-success-900/30 border-success-700/50' : 'bg-surface-700/50 border-surface-600/50'}`}>
                      <div className="flex justify-center mb-2 gap-2">
                        <AiOutlineRobot className={`w-8 h-8 ${allOnboardingStepsComplete(onboardingData) ? 'text-success-300' : 'text-gray-400'}`} />
                        <Tooltip text={allOnboardingStepsComplete(onboardingData) ? 'Your AI agent is live and available to users.' : 'Your AI agent will be live once all onboarding steps are complete.'}>
                          <AiOutlineInfoCircle className={`w-5 h-5 ${allOnboardingStepsComplete(onboardingData) ? 'text-success-200' : 'text-gray-400'} cursor-pointer`} />
                        </Tooltip>
                      </div>
                      <div className={`font-semibold ${allOnboardingStepsComplete(onboardingData) ? 'text-success-300' : 'text-gray-400'}`}>Agent</div>
                      <div className={`text-sm ${allOnboardingStepsComplete(onboardingData) ? 'text-success-400' : 'text-gray-400'}`}>{allOnboardingStepsComplete(onboardingData) ? 'Live' : 'Inactive'}</div>
                    </div>
                    <div className="text-center p-4 bg-primary-900/30 rounded-lg border border-primary-700/50">
                      <div className="flex justify-center mb-2 gap-2">
                        <GiBrain className="w-8 h-8 text-primary-300" />
                        <Tooltip text="The AI agent's knowledge base and skills are up to date.">
                          <AiOutlineInfoCircle className="w-5 h-5 text-primary-200 cursor-pointer" />
                        </Tooltip>
                      </div>
                      <div className="font-semibold text-primary-300">Training</div>
                      <div className="text-sm text-primary-400">Complete</div>
                    </div>
                    <div className="text-center p-4 bg-accent-900/30 rounded-lg border border-accent-700/50">
                      <div className="flex justify-center mb-2 gap-2">
                        <AiOutlineLink className="w-8 h-8 text-accent-300" />
                        <Tooltip text="Your AI agent is connected to third-party services.">
                          <AiOutlineInfoCircle className="w-5 h-5 text-accent-200 cursor-pointer" />
                        </Tooltip>
                      </div>
                      <div className="font-semibold text-accent-300">Integration</div>
                      <div className="text-sm text-accent-400">Connected</div>
              </div>
            </div>
          </div>
              </Card>
              {/* <Card className="p-6">
                <ChatInterface
                  agentName={settings.agentName}
                  welcomeMessage={settings.welcomeMessage}
                  onSendMessage={handleAgentSendMessage}
                />
              </Card> */}
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="space-y-6">
              <Card className="card card-hover">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Live Chat Preview</h3>
                  <ChatInterface 
                    agentName={settings.agentName} // Pass the agentName from settings
                    welcomeMessage={settings.welcomeMessage} // Pass the welcomeMessage from settings
                    onSendMessage={handleAgentSendMessage} 
                  />
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <DashboardAnalytics metrics={metrics} />
            </div>
          )}

          {activeTab === 'settings' && (
            <DashboardSettings 
              settings={settings}
              setSettings={setSettings}
              handleSave={handleSave}
              loading={loading}
              showToast={showToast}
              setShowToast={setShowToast}
              toastMessage={toastMessage}
              toastType={toastType}
              handleExport={handleExport}
              handleReset={handleReset}
            />
          )}
        </div>
      </main>
    </div>
  </ProtectedRoute>
  );
} 