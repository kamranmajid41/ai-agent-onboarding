import React from 'react';
import { Card, Badge, ProgressBar, Button } from '../ui';
import MetricsCard from './MetricsCard';
import { isStepComplete } from '../../pages/dashboard';

export default function DashboardOverview({ 
  user, 
  metrics, 
  onboardingData, 
  getOnboardingProgress, 
  getStepTitle,
  setActiveTab 
}) {
  const progress = getOnboardingProgress();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.firstName}!</h2>
        <p className="text-gray-300">Here's what's happening with your AI agent today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Conversations"
          value={metrics.totalConversations}
          change="+12%"
          changeType="positive"
          icon="💬"
          tooltip="Total number of conversations handled by your AI agent."
        />
        <MetricsCard
          title="Avg Response Time"
          value={metrics.avgResponseTime}
          change="-8%"
          changeType="positive"
          icon="⚡"
          tooltip="Average time your agent takes to respond to a message."
        />
        <MetricsCard
          title="Satisfaction Rate"
          value={`${metrics.satisfactionRate}%`}
          change="+3%"
          changeType="positive"
          icon="😊"
          tooltip="Percentage of users who rated their experience as positive."
        />
        <MetricsCard
          title="Active Agents"
          value={metrics.activeAgents}
          change="+1"
          changeType="positive"
          icon="🤖"
          tooltip="Number of AI agents currently active for your business."
        />
      </div>

      {/* Company Information */}
      <Card title="Company Information" subtitle="Your business details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Company Name</label>
            <p className="mt-1 text-sm text-white">{user?.company?.name || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Website</label>
            <p className="mt-1 text-sm text-white">{user?.company?.website || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Industry</label>
            <p className="mt-1 text-sm text-white">{user?.company?.industry || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-sm text-white">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Onboarding Progress */}
      <Card title="Onboarding Progress" subtitle="Complete your AI agent setup">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Setup Progress</span>
            <span className="text-sm text-gray-300">{progress}% Complete</span>
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
              return (
                <div
                  key={step}
                  className={`text-center p-3 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-success-900/30 border-success-700/50 text-success-300'
                      : 'bg-surface-700/50 border-surface-600/50 text-gray-400'
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

          {progress < 100 && (
            <div className="text-center pt-4">
              <Button
                onClick={() => setActiveTab('onboarding')}
                className="btn-primary"
              >
                Continue Setup
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">View Agent</h3>
            <p className="text-sm text-gray-300 mb-4">
              Check your AI agent's status and performance
            </p>
            <Button
              onClick={() => setActiveTab('agents')}
              variant="outline"
              className="w-full border-primary-500 text-primary-400 hover:bg-primary-900/20"
            >
              Go to Agents
            </Button>
          </div>
        </Card>

        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-accent-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-sm text-gray-300 mb-4">
              Monitor conversations and chat with your agent
            </p>
            <Button
              onClick={() => setActiveTab('conversations')}
              variant="outline"
              className="w-full border-accent-500 text-accent-400 hover:bg-accent-900/20"
            >
              View Conversations
            </Button>
          </div>
        </Card>

        <Card className="card card-hover">
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-success-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="text-sm text-gray-300 mb-4">
              View detailed analytics and performance metrics
            </p>
            <Button
              onClick={() => setActiveTab('analytics')}
              variant="outline"
              className="w-full border-success-500 text-success-400 hover:bg-success-900/20"
            >
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 