import React from 'react';

const SectionStats = ({ stats, className = 'mb-5' }) => {
  if (!stats?.length) return null;

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="card-surface rounded-lg px-3 py-1.5 text-center min-w-[72px]">
          <p className="text-xs font-bold text-gray-900 dark:text-white">{stat.value}</p>
          <p className="text-[9px] text-subtle uppercase tracking-wide">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SectionStats;