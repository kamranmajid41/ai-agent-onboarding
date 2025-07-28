import React from 'react';
import { Card } from '../ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import TooltipComponent from '../ui/Tooltip';

export default function DashboardAnalytics({ metrics }) {
  // Mock analytics data (will eventually be replaced by more complex backend aggregation)
  const conversationData = [
    { date: 'Mon', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 : 0 },
    { date: 'Tue', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 * 1.2 : 0 },
    { date: 'Wed', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 * 0.8 : 0 },
    { date: 'Thu', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 * 1.5 : 0 },
    { date: 'Fri', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 * 1.1 : 0 },
    { date: 'Sat', conversations: metrics.totalConversations > 0 ? metrics.totalConversations / 7 * 0.9 : 0 },
    { date: 'Sun', conversations: metrics.totalConversations || 0 },
  ];

  const satisfactionData = [
    { name: 'Satisfied', value: metrics.satisfactionRate !== 'N/A' ? metrics.satisfactionRate : 82 },
    { name: 'Neutral', value: metrics.satisfactionRate !== 'N/A' ? (100 - metrics.satisfactionRate) / 2 : 10 },
    { name: 'Unsatisfied', value: metrics.satisfactionRate !== 'N/A' ? (100 - metrics.satisfactionRate) / 2 : 8 },
  ];

  const channelData = [
    { name: 'Web', value: metrics.totalConversations > 0 ? metrics.totalConversations * 0.4 : 0 },
    { name: 'SMS', value: metrics.totalConversations > 0 ? metrics.totalConversations * 0.3 : 0 },
    { name: 'Facebook', value: metrics.totalConversations > 0 ? metrics.totalConversations * 0.2 : 0 },
    { name: 'WhatsApp', value: metrics.totalConversations > 0 ? metrics.totalConversations * 0.1 : 0 },
  ];

  const COLORS = ['#34d399', '#fbbf24', '#f87171', '#60a5fa'];

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-3xl font-bold text-surface-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600 mb-4">See how your AI agent is performing over time.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-surface-900 mb-2 flex items-center gap-2">Total Conversations <Tooltip text="Total number of conversations handled by your AI agent."><AiOutlineInfoCircle className="w-4 h-4 text-primary-500 cursor-pointer" /></Tooltip></h4>
              <p className="text-4xl font-bold text-primary-600 mb-2">{metrics.totalConversations}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-surface-900 mb-2 flex items-center gap-2">Total Messages <Tooltip text="Total number of messages exchanged."><AiOutlineInfoCircle className="w-4 h-4 text-primary-500 cursor-pointer" /></Tooltip></h4>
              <p className="text-4xl font-bold text-accent-600 mb-2">{metrics.totalMessages}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-surface-900 mb-2 flex items-center gap-2">Avg Message Length <Tooltip text="Average character length of messages."><AiOutlineInfoCircle className="w-4 h-4 text-primary-500 cursor-pointer" /></Tooltip></h4>
              <p className="text-4xl font-bold text-secondary-600 mb-2">{metrics.averageMessageLength !== 'N/A' ? `${metrics.averageMessageLength} chars` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </Card>
      {/* Add more Card sections for charts, trends, etc. as needed, using the same conventions */}
    </div>
  );
} 