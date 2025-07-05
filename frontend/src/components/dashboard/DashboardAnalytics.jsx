import React from 'react';
import { Card } from '../ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import TooltipComponent from '../ui/Tooltip';

export default function DashboardAnalytics() {
  // Mock analytics data
  const conversationData = [
    { date: 'Mon', conversations: 120 },
    { date: 'Tue', conversations: 200 },
    { date: 'Wed', conversations: 150 },
    { date: 'Thu', conversations: 278 },
    { date: 'Fri', conversations: 189 },
    { date: 'Sat', conversations: 239 },
    { date: 'Sun', conversations: 349 },
  ];

  const satisfactionData = [
    { name: 'Satisfied', value: 82 },
    { name: 'Neutral', value: 10 },
    { name: 'Unsatisfied', value: 8 },
  ];

  const channelData = [
    { name: 'Web', value: 400 },
    { name: 'SMS', value: 300 },
    { name: 'Facebook', value: 200 },
    { name: 'WhatsApp', value: 100 },
  ];

  const COLORS = ['#34d399', '#fbbf24', '#f87171', '#60a5fa'];

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Analytics Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Conversations Over Time */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Conversations Over Time <Tooltip text="Shows the number of conversations your AI agent handled each day."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
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

            {/* Satisfaction Rate Pie */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Satisfaction Rate <Tooltip text="Breakdown of user satisfaction with your AI agent."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Channel Breakdown Bar */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Channel Breakdown <Tooltip text="Distribution of conversations by communication channel."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
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

            {/* Top Intents/Questions */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">Top Intents / Questions <Tooltip text="Most common user questions or intents."><AiOutlineInfoCircle className="w-4 h-4 text-primary-200 cursor-pointer" /></Tooltip></h4>
              <ul className="divide-y divide-surface-600 bg-surface-800 rounded-lg p-4 text-gray-200">
                <li className="py-2 flex justify-between">
                  <span>Book Appointment</span>
                  <span className="font-semibold text-primary-600">124</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Pricing Inquiry</span>
                  <span className="font-semibold text-primary-600">98</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Business Hours</span>
                  <span className="font-semibold text-primary-600">76</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Location</span>
                  <span className="font-semibold text-primary-600">54</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span>Speak to Human</span>
                  <span className="font-semibold text-primary-600">39</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 