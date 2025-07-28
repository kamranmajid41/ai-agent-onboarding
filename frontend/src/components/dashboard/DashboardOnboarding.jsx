import React from 'react';
import { Card, ProgressBar, Button } from '../ui';
import { isStepComplete } from '../../pages/dashboard';

const DashboardOnboarding = ({ onboardingData, getOnboardingProgress, getStepTitle, setActiveTab }) => {
  const progress = getOnboardingProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-surface-900 mb-2">AI Agent Onboarding</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete the onboarding process to configure your AI agent with your business information, 
          knowledge base, and preferences.
        </p>
      </div>

      {/* Progress Overview */}
      <Card title="Onboarding Progress" subtitle="Complete your AI agent setup">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-surface-900">Setup Progress</span>
            <span className="text-sm text-gray-600">{progress}% Complete</span>
          </div>
          <ProgressBar 
            value={progress} 
            max={100} 
            className="h-3"
            color={progress === 100 ? 'success' : 'primary'}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((step) => {
              const isCompleted = isStepComplete(step, onboardingData);
              const isCurrent = !isCompleted && step === Math.ceil(progress / 20);
              return (
                <div
                  key={step}
                  className={`text-center p-3 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-success-100 border-success-300 text-success-900'
                      : isCurrent
                      ? 'bg-primary-100 border-primary-300 text-primary-900'
                      : 'bg-surface-100 border-surface-300 text-gray-500'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {isCompleted ? '✓' : step}
                  </div>
                  <div className="text-xs">
                    {getStepTitle(step)}
                  </div>
                </div>
              );
            })}
                    </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">{getStepTitle(1)}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Set up your business profile, industry type, and contact information.
            </p>
            <Button
              onClick={() => setActiveTab('settings')}
              variant="outline"
              className="w-full border-primary-400 text-primary-600 hover:bg-primary-100"
            >
              Configure Business Info
            </Button>
          </div>
        </Card>

        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">{getStepTitle(2)}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload documents, crawl your website, and build your knowledge base.
            </p>
            <Button
              onClick={() => setActiveTab('settings')}
              variant="outline"
              className="w-full border-accent-400 text-accent-600 hover:bg-accent-100"
            >
              Upload Files
            </Button>
          </div>
        </Card>

        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure your AI agent settings and preferences.
            </p>
            <Button
              onClick={() => setActiveTab('settings')}
              variant="outline"
              className="w-full border-success-400 text-success-600 hover:bg-success-100"
            >
              Go to Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Continue Button */}
      {progress < 100 && (
        <div className="text-center pt-4">
          <Button
            onClick={() => setActiveTab('settings')}
            className="btn-primary"
          >
            Continue Setup
          </Button>
        </div>
      )}

      {/* Completion Message */}
      {progress === 100 && (
        <Card className="card card-hover border-success-500/30">
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-success-700 mb-2">Onboarding Complete!</h3>
            <p className="text-success-600 mb-4">
              Your AI agent is fully configured and ready to help your customers.
            </p>
            <Button
              onClick={() => setActiveTab('agents')}
              className="bg-success-600 hover:bg-success-700"
            >
              View Your Agent
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardOnboarding; 