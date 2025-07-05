import React, { useState } from 'react';
import { Card, Badge, Button, Input, Toast, Tooltip } from '../ui';
import { 
  AiOutlineUser, 
  AiOutlineRobot, 
  AiOutlineBell, 
  AiOutlineApi, 
  AiOutlineSecurityScan,
  AiOutlineSave,
  AiOutlineExport,
  AiOutlineReload,
  AiOutlineDelete,
  AiOutlineLink,
  AiOutlineBarChart,
  AiOutlineThunderbolt,
  AiOutlineInfoCircle
} from 'react-icons/ai';
import OnboardingStepper from '../onboarding/OnboardingStepper';

export default function DashboardSettings({ 
  settings, 
  setSettings, 
  handleSave, 
  loading, 
  showToast, 
  setShowToast, 
  toastMessage, 
  toastType, 
  handleExport, 
  handleReset 
}) {
  const [settingsTab, setSettingsTab] = useState('account');

  const SETTINGS_TABS = [
    { id: 'account', label: 'Account', icon: AiOutlineUser },
    { id: 'onboarding', label: 'Onboarding', icon: AiOutlineRobot },
    { id: 'agent', label: 'AI Agent', icon: AiOutlineRobot },
    { id: 'notifications', label: 'Notifications', icon: AiOutlineBell },
    { id: 'integrations', label: 'Integrations', icon: AiOutlineApi },
    { id: 'security', label: 'Security', icon: AiOutlineSecurityScan }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:w-1/4">
        <Card className="card card-hover">
          <nav className="space-y-2">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    settingsTab === tab.id
                      ? 'bg-primary-900/20 text-primary-400 font-medium border border-primary-700/50'
                      : 'text-gray-200 hover:bg-surface-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 flex flex-col">
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Account Tab */}
        {settingsTab === 'account' && (
          <div className="space-y-6">
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <span>Personal Information</span>
                  <Tooltip text="Manage your personal details including name and contact information">
                    <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                  </Tooltip>
                </div>
              } 
              subtitle="Update your personal details"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" value={settings.firstName} onChange={e => setSettings(prev => ({ ...prev, firstName: e.target.value }))} placeholder="Enter your first name" tooltip="Your given name." />
                  <Input label="Last Name" value={settings.lastName} onChange={e => setSettings(prev => ({ ...prev, lastName: e.target.value }))} placeholder="Enter your last name" tooltip="Your family name." />
                </div>
                <Input label="Email Address" type="email" value={settings.email} onChange={e => setSettings(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" tooltip="Used for account notifications." />
              </div>
            </Card>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <span>Company Information</span>
                  <Tooltip text="Update your business details and company information">
                    <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                  </Tooltip>
                </div>
              } 
              subtitle="Update your business details"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Company Name" value={settings.companyName} onChange={e => setSettings(prev => ({ ...prev, companyName: e.target.value }))} placeholder="Enter your company name" tooltip="The name of your business." />
                  <Input label="Company Website" value={settings.companyWebsite} onChange={e => setSettings(prev => ({ ...prev, companyWebsite: e.target.value }))} placeholder="https://yourcompany.com" tooltip="Your public business website." />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Onboarding Tab */}
        {settingsTab === 'onboarding' && (
          <div className="space-y-6">
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <span>Onboarding Configuration</span>
                  <Tooltip text="Configure your AI agent's onboarding process and initial setup">
                    <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                  </Tooltip>
                </div>
              } 
              subtitle="Set up your AI agent's onboarding experience"
            >
              <OnboardingStepper 
                settings={settings} 
                setSettings={setSettings} 
                onSave={handleSave} 
                loading={loading} 
              />
            </Card>
          </div>
        )}

        {/* AI Agent Tab */}
        {settingsTab === 'agent' && (
          <div className="space-y-6">
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <span>AI Agent Settings</span>
                  <Tooltip text="Configure how your AI agent behaves and communicates with users">
                    <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                  </Tooltip>
                </div>
              } 
              subtitle="Configure your AI agent"
            >
              <div className="space-y-4">
                <Input label="Agent Name" value={settings.agentName} onChange={e => setSettings(prev => ({ ...prev, agentName: e.target.value }))} placeholder="AI Assistant" tooltip="How your AI agent will be referred to." />
                <Input label="Welcome Message" value={settings.welcomeMessage} onChange={e => setSettings(prev => ({ ...prev, welcomeMessage: e.target.value }))} placeholder="Hello! How can I help you today?" tooltip="The first message users see from your agent." />
                <Input label="Fallback Message" value={settings.fallbackMessage} onChange={e => setSettings(prev => ({ ...prev, fallbackMessage: e.target.value }))} placeholder="Fallback message" tooltip="Shown if the agent cannot answer." />
                <Input label="Business Hours" value={settings.businessHours} onChange={e => setSettings(prev => ({ ...prev, businessHours: e.target.value }))} placeholder="Monday-Friday: 9:00 AM - 5:00 PM" tooltip="Displayed to users for support availability." />
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {settingsTab === 'notifications' && (
          <div className="space-y-6">
            <Card title="Email Notifications" subtitle="Manage your notification preferences">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-white">Account Notifications</div>
                      <div className="text-sm text-gray-300">Receive updates about your account and security</div>
                    </div>
                    <Tooltip text="Get notified about important account changes, security alerts, and system updates via email">
                      <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.emailNotifications} onChange={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-white">Marketing Emails</div>
                      <div className="text-sm text-gray-300">Receive updates about new features and promotions</div>
                    </div>
                    <Tooltip text="Receive promotional content, feature announcements, and special offers from our team">
                      <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.marketingEmails} onChange={() => setSettings(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Integrations Tab */}
        {settingsTab === 'integrations' && (
          <div className="space-y-6">
            <Card title="Third-Party Integrations" subtitle="Connect your AI agent with other services">
              <div className="space-y-4">
                {Object.entries(settings.integrations).map(([key, integration]) => (
                  <div key={key} className="border border-surface-600/50 rounded-lg p-4 bg-surface-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {key === 'goHighLevel' && <AiOutlineLink className="w-6 h-6 text-primary-400" />}
                          {key === 'openai' && <AiOutlineRobot className="w-6 h-6 text-primary-400" />}
                          {key === 'googleAnalytics' && <AiOutlineBarChart className="w-6 h-6 text-primary-400" />}
                          {key === 'zapier' && <AiOutlineThunderbolt className="w-6 h-6 text-primary-400" />}
                        </div>
                        <div>
                          <div className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          <div className="text-sm text-gray-300">{integration.connected ? 'Connected' : 'Not connected'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={integration.connected ? 'success' : 'warning'}>{integration.connected ? 'Connected' : 'Disconnected'}</Badge>
                        <Button variant="outline" size="sm" onClick={() => setSettings(prev => ({ ...prev, integrations: { ...prev.integrations, [key]: { ...prev.integrations[key], connected: !prev.integrations[key].connected } } }))}>{integration.connected ? 'Disconnect' : 'Connect'}</Button>
                      </div>
                    </div>
                    {/* Integration details editing (API keys, etc.) can be added here */}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {settingsTab === 'security' && (
          <div className="space-y-6">
            <Card title="Privacy & Security" subtitle="Manage your data and privacy settings">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-white">AI Usage & Terms Acceptance</div>
                      <div className="text-sm text-gray-300">Accept terms for AI processing</div>
                    </div>
                    <Tooltip text="Allow your data to be processed by AI systems for improved service and personalization">
                      <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.aiUsage} onChange={() => setSettings(prev => ({ ...prev, aiUsage: !prev.aiUsage }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-700/50 rounded-lg border border-surface-600/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-white">GDPR Compliance</div>
                      <div className="text-sm text-gray-300">EU data protection compliance</div>
                    </div>
                    <Tooltip text="Enable GDPR-compliant data handling for European Union users, including data portability and deletion rights">
                      <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.gdpr} onChange={() => setSettings(prev => ({ ...prev, gdpr: !prev.gdpr }))} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </Card>
            <Card title="Data Management" subtitle="Export, import, or delete your data">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-900/30 rounded-lg border border-primary-700/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-primary-300">Export Settings</div>
                      <div className="text-sm text-primary-400">Download your settings as a JSON file</div>
                    </div>
                    <Tooltip text="Download a backup of all your current settings and configuration data in JSON format">
                      <AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <Button variant="outline" onClick={handleExport} className="border-primary-500 text-primary-400 hover:bg-primary-900/20"><AiOutlineExport className="w-4 h-4 mr-2" />Export</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-warning-900/30 rounded-lg border border-warning-700/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-warning-300">Reset Settings</div>
                      <div className="text-sm text-warning-400">Reset all settings to default values</div>
                    </div>
                    <Tooltip text="Warning: This will restore all settings to their default values. This action cannot be undone">
                      <AiOutlineInfoCircle className="w-4 h-4 text-warning-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <Button variant="outline" onClick={handleReset} className="border-warning-500 text-warning-400 hover:bg-warning-900/20"><AiOutlineReload className="w-4 h-4 mr-2" />Reset</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-error-900/30 rounded-lg border border-error-700/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-error-300">Delete Account</div>
                      <div className="text-sm text-error-400">Permanently delete your account and all data</div>
                    </div>
                    <Tooltip text="Warning: This action will permanently delete your account and all associated data. This cannot be undone">
                      <AiOutlineInfoCircle className="w-4 h-4 text-error-200 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <Button variant="outline" className="border-error-500 text-error-400 hover:bg-error-900/20"><AiOutlineDelete className="w-4 h-4 mr-2" />Delete</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} loading={loading} disabled={loading} className="px-8">
            <div className="flex items-center">
              <AiOutlineSave className="w-4 h-4 mr-2" />
              Save Changes
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
} 