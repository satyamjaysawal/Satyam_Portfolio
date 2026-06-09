import React from 'react';
import { School, Calendar, GraduationCap, BookOpen, Award } from 'lucide-react';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';

const educationDetails = [
  {
    id: 1,
    degree: 'B.Tech — Computer Science',
    institution: 'Rajkiya Engineering College, Mainpuri (AKTU UP)',
    duration: 'Aug 2018 – Jul 2022',
    score: 'CGPA 7.57',
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-600',
    tags: ['Data Structures', 'Algorithms', 'Embedded Systems', 'IoT'],
  },
  {
    id: 2,
    degree: 'Class 12th (Intermediate)',
    institution: 'S J G S S I C Sahunagar Gaderiha, Jaunpur (UP Board)',
    duration: 'Jul 2017 – Apr 2018',
    score: '79.8%',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-600',
    tags: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    id: 3,
    degree: 'Class 10th (High School)',
    institution: 'S M P Y U M V M K B Shankar Ganj, Jaunpur (UP Board)',
    duration: 'May 2015 – Apr 2016',
    score: '83.5%',
    icon: Award,
    color: 'from-pink-500 to-orange-500',
    tags: ['Mathematics', 'Science'],
  },
];

const Education = () => {
  return (
    <SectionShell id="education" accent="blue">
        <SectionHeader
          label="Academic Journey"
          title="Educational Background"
          description="UP Board to B.Tech in Computer Science"
          descriptionMaxWidth="max-w-md"
        />

        <div className="grid md:grid-cols-3 gap-2.5 md:gap-3">
          {educationDetails.map((edu) => (
            <div
              key={edu.id}
              className="card-surface rounded-lg p-3 hover:border-purple-400/40 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`shrink-0 w-8 h-8 rounded-md bg-gradient-to-br ${edu.color} flex items-center justify-center`}>
                  <edu.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${edu.color} leading-tight`}>
                    {edu.degree}
                  </h3>
                  <span className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-px rounded bg-gradient-to-r ${edu.color} text-white`}>
                    {edu.score}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-muted flex items-start gap-1 mb-1.5 line-clamp-2 leading-snug">
                <School className="w-3 h-3 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>{edu.institution}</span>
              </p>

              <div className="flex items-center gap-1 text-[10px] text-subtle mb-2">
                <Calendar className="w-2.5 h-2.5 text-pink-500 dark:text-pink-400 shrink-0" />
                <span>{edu.duration}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto">
                {edu.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="skill-chip-sm">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
    </SectionShell>
  );
};

export default Education;