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
          <h3 className="text-lg font-semibold text-white mb-4">Analytics Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Conversations */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Total Conversations <Tooltip text="Total number of conversations handled by your AI agent."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <p className="text-5xl font-bold text-primary-400 mb-4">{metrics.totalConversations}</p>
            </div>

            {/* Total Messages */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Total Messages <Tooltip text="Total number of messages exchanged."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <p className="text-5xl font-bold text-accent-400 mb-4">{metrics.totalMessages}</p>
            </div>

            {/* Average Message Length */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Average Message Length <Tooltip text="Average character length of messages."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <p className="text-5xl font-bold text-green-400 mb-4">{metrics.averageMessageLength} chars</p>
            </div>

            {/* Conversations Over Time (using derived mock data for now) */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Conversations Over Time <Tooltip text="Shows the number of conversations your AI agent handled each day. (Derived from total conversations for demonstration)"><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={conversationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversations" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Satisfaction Rate Pie (using placeholder for now) */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Satisfaction Rate <Tooltip text="Breakdown of user satisfaction with your AI agent. (Requires additional data collection)"><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              {metrics.satisfactionRate !== 'N/A' ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={satisfactionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-400 mt-8">
                  <p>Data not available. Implement satisfaction feedback to populate this metric.</p>
                </div>
              )}
            </div>

            {/* Channel Breakdown Bar (using derived mock data for now) */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Channel Breakdown <Tooltip text="Distribution of conversations by communication channel. (Derived from total conversations for demonstration)"><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={channelData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1">
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Intents/Questions (placeholder) */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Top Intents / Questions <Tooltip text="Most common user questions or intents. (Requires advanced NLP processing of conversation logs)"><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <div className="text-center text-gray-400 mt-8">
                <p>Data not available. Implement advanced NLP for intent recognition to populate this metric.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 