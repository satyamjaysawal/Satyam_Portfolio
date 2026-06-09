import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { SKILL_CATEGORIES, TOTAL_SKILLS } from '../data/skillsData';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import SectionStats from './SectionStats';

const Skills = () => {
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SKILL_CATEGORIES;

    return SKILL_CATEGORIES.map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) => s.toLowerCase().includes(q)),
    })).filter((cat) => cat.skills.length > 0);
  }, [search]);

  const visibleCount = filteredCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <SectionShell id="skills" maxWidth="max-w-7xl">
        <SectionHeader
          label="Technical Expertise"
          title="Skills & Technologies"
          description={`${SKILL_CATEGORIES.length} domains · ${TOTAL_SKILLS}+ technologies — all skills listed below`}
          descriptionMaxWidth="max-w-2xl"
        />

        <SectionStats
          stats={[
            { label: 'Categories', value: SKILL_CATEGORIES.length },
            { label: 'Skills', value: `${TOTAL_SKILLS}+` },
            { label: 'GenAI', value: '40+' },
            { label: 'Cloud', value: '25+' },
          ]}
        />

        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter skills..."
            className="input-surface w-full pl-8 pr-3 py-2 rounded-lg text-xs"
          />
        </div>

        {search.trim() && (
          <p className="text-center text-subtle text-xs mb-4">
            Showing {visibleCount} matching skills
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCategories.map((cat) => (
            <div key={cat.title} className="card-surface rounded-xl p-3.5 hover:border-purple-400/40 transition-colors">
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-200 dark:border-gray-700/50">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${cat.color} shrink-0`}>
                  <cat.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white leading-tight flex-1">{cat.title}</h3>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-subtle shrink-0">
                  {cat.skills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((skill, idx) => (
                  <span key={idx} className="skill-chip-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <p className="text-center text-subtle text-sm mt-6">No skills match your search.</p>
        )}
    </SectionShell>
  );
};

export default Skills;