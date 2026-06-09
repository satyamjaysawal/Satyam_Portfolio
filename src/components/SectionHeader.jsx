import React from 'react';

const accentPresets = {
  purple: {
    accentText: 'text-purple-700 dark:text-purple-400',
    lineFrom: 'from-transparent to-purple-400',
    lineTo: 'from-transparent to-purple-400',
  },
  amber: {
    accentText: 'text-amber-700 dark:text-amber-400',
    lineFrom: 'from-transparent to-amber-400',
    lineTo: 'from-transparent to-amber-400',
  },
  cyan: {
    accentText: 'text-cyan-700 dark:text-cyan-400',
    lineFrom: 'from-transparent to-cyan-400',
    lineTo: 'from-transparent to-cyan-400',
  },
  violet: {
    accentText: 'text-violet-700 dark:text-violet-400',
    lineFrom: 'from-transparent to-violet-400',
    lineTo: 'from-transparent to-violet-400',
  },
  emerald: {
    accentText: 'text-emerald-700 dark:text-emerald-400',
    lineFrom: 'from-transparent to-emerald-400',
    lineTo: 'from-transparent to-emerald-400',
  },
  orange: {
    accentText: 'text-orange-700 dark:text-orange-400',
    lineFrom: 'from-transparent to-orange-400',
    lineTo: 'from-transparent to-orange-400',
  },
  pink: {
    accentText: 'text-pink-700 dark:text-pink-400',
    lineFrom: 'from-transparent to-pink-400',
    lineTo: 'from-transparent to-pink-400',
  },
};

const SectionHeader = ({
  label,
  title,
  description,
  accent = 'purple',
  config,
  descriptionMaxWidth = 'max-w-lg',
  className = 'mb-5',
}) => {
  const theme = config
    ? {
        accentText: config.accentText,
        lineFrom: config.lineFrom,
        lineTo: config.lineTo,
        titleGradient: config.headingGradient,
      }
    : {
        ...accentPresets[accent],
        titleGradient: null,
      };

  const headingClass = theme.titleGradient
    ? `font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} text-2xl sm:text-3xl md:text-4xl mb-2`
    : 'heading-gradient text-2xl sm:text-3xl md:text-4xl font-bold mb-2';

  return (
    <header className={`text-center ${className}`}>
      <div className="inline-flex items-center justify-center gap-3 mb-3">
        <div className={`h-px w-8 sm:w-10 bg-gradient-to-r ${theme.lineFrom}`} />
        <span className={`${theme.accentText} font-medium tracking-wider text-[10px] sm:text-xs uppercase`}>
          {config?.label ?? label}
        </span>
        <div className={`h-px w-8 sm:w-10 bg-gradient-to-l ${theme.lineTo}`} />
      </div>
      <h2 className={headingClass}>
        {config?.title ?? title}
      </h2>
      {(config?.description ?? description) && (
        <p className={`text-muted text-xs sm:text-sm ${descriptionMaxWidth} mx-auto`}>
          {config?.description ?? description}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;