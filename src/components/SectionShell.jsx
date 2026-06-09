import React from 'react';

const orbPresets = {
  purple: { top: 'bg-purple-500/8', bottom: 'bg-cyan-500/8' },
  amber: { top: 'bg-amber-500/8', bottom: 'bg-purple-500/8' },
  violet: { top: 'bg-violet-500/8', bottom: 'bg-cyan-500/8' },
  blue: { top: 'bg-purple-500/8', bottom: 'bg-blue-500/8' },
};

const SectionShell = ({
  id,
  children,
  maxWidth = 'max-w-5xl',
  accent = 'purple',
  className = '',
}) => {
  const orbs = orbPresets[accent] ?? orbPresets.purple;

  return (
    <section
      id={id}
      className={`section-surface section-bg relative py-12 md:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-48 h-48 ${orbs.top} rounded-full blur-3xl`} />
        <div className={`absolute bottom-0 left-0 w-48 h-48 ${orbs.bottom} rounded-full blur-3xl`} />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className={`relative z-10 ${maxWidth} mx-auto`}>
        {children}
      </div>
    </section>
  );
};

export default SectionShell;