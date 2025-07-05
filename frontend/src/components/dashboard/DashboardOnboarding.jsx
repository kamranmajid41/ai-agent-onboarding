import React from 'react';
import { Card, ProgressBar, Button } from '../ui';
import { isStepComplete } from '../../pages/dashboard';

const DashboardOnboarding = ({ onboardingData, getOnboardingProgress, getStepTitle, setActiveTab }) => {
  const progress = getOnboardingProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">AI Agent Onboarding</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Complete the onboarding process to configure your AI agent with your business information, 
          knowledge base, and preferences.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="card card-hover">
        <div className="p-6">
          <h4 className="text-lg font-semibold text-white">Your Progress</h4>
          <div className="text-sm text-gray-300">{getOnboardingProgress()}% Complete</div>
          
          <div className="mt-4">
            <ProgressBar 
              value={progress} 
              max={100} 
              className="h-3"
              color={progress === 100 ? 'success' : 'primary'}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((step) => {
              const isCompleted = isStepComplete(step, onboardingData);
              const isCurrent = !isCompleted && step === Math.ceil(progress / 20);
              return (
                <div
                  key={step}
                  className={`text-center p-4 rounded-lg border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success-900/30 border-success-700/50 text-success-300'
                      : isCurrent
                      ? 'bg-primary-900/30 border-primary-700/50 text-primary-300'
                      : 'bg-surface-700/50 border-surface-600/50 text-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {isCompleted ? '✓' : step}
                  </div>
                  <div className="text-xs font-medium">
                    {getStepTitle(step)}
                  </div>
                  <div className="text-xs mt-1">
                    {isCompleted ? 'Complete' : isCurrent ? 'Current' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card card-hover">
          <div className="p-6">
            <h5 className="font-semibold text-white mb-2">{getStepTitle(1)}</h5>
            <p className="text-sm text-gray-300">
              Set up your business profile, industry type, and contact information.
            </p>
            <Button
              onClick={() => setActiveTab('settings')}
              className="mt-4 btn-primary"
            >
              Configure Business Info
            </Button>
          </div>
        </Card>

        <Card className="card card-hover">
          <div className="p-6">
            <h5 className="font-semibold text-white mb-2">{getStepTitle(2)}</h5>
            <p className="text-sm text-gray-300">
              Upload documents, crawl your website, and build your knowledge base.
            </p>
            <Button
              onClick={() => setActiveTab('settings')}
              className="mt-4 btn-primary"
            >
              Upload Files
            </Button>
          </div>
        </Card>
      </div>

      {/* Continue Button */}
      {progress < 100 && (
        <div className="text-center">
          <Button
            onClick={() => setActiveTab('settings')}
            className="btn-primary"
            size="lg"
          >
            Continue Onboarding
          </Button>
        </div>
      )}

      {/* Completion Message */}
      {progress === 100 && (
        <Card className="card card-hover border-success-500/30">
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Onboarding Complete!</h3>
            <p className="text-gray-300 mb-4">
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