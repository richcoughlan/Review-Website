import React from 'react';
import { BarChart, ThumbsUp, ThumbsDown, Users } from 'lucide-react';
import { useBusinessStore } from '../../store/businessStore';

export const BusinessStats = () => {
  const { reviews } = useBusinessStore();
  
  const positiveReviews = reviews.filter(r => r.type === 'positive').length;
  const negativeReviews = reviews.filter(r => r.type === 'negative').length;
  const totalCustomers = reviews.filter(r => r.customerEmail).length;

  const stats = [
    {
      name: 'Positive Reviews',
      value: positiveReviews,
      icon: ThumbsUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Feedback Received',
      value: negativeReviews,
      icon: ThumbsDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      name: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
}