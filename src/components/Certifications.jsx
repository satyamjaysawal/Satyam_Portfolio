import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import SectionStats from './SectionStats';

const certifications = [
  { name: 'AWS Cloud Practitioner', category: 'Cloud' },
  { name: 'Azure Administration Associate (AZ-104)', category: 'Cloud' },
  { name: 'Microsoft Azure AI (AI-900)', category: 'AI / Azure' },
  { name: 'Azure AI Studio (AI Foundry): Prompt Flow, LLMOps & RAG', category: 'AI / Azure' },
  { name: "Google's Gemini AI with Streamlit", category: 'GenAI' },
  { name: "Learn Google's Gemini and Anthropic's Claude API with Python", category: 'GenAI' },
  { name: 'Agile Software Development', category: 'Methodology' },
  { name: 'Python PCEP Certificate', category: 'Python' },
  { name: 'Python, Flask, and SQLAlchemy', category: 'Python' },
  { name: 'Scalable Web Applications with Python Flask and SQLAlchemy', category: 'Python' },
  { name: 'JSP Servlet JDBC Udemy Certificate', category: 'Java' },
  { name: 'Spring-Batch Processing with Spring-Boot', category: 'Java' },
  { name: 'Enhancing Soft Skills And Personality (NPTEL)', category: 'Professional' },
];

const categoryColors = {
  Cloud: 'from-sky-500 to-blue-600',
  'AI / Azure': 'from-violet-500 to-purple-600',
  GenAI: 'from-fuchsia-500 to-pink-600',
  Python: 'from-emerald-500 to-teal-600',
  Java: 'from-orange-500 to-red-500',
  Methodology: 'from-cyan-500 to-blue-500',
  Professional: 'from-indigo-500 to-violet-500',
};

const Certifications = () => {
  return (
    <SectionShell id="certifications" maxWidth="max-w-7xl" accent="amber">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          description="Industry-recognized certifications across cloud, AI, Python, Java, and agile delivery"
          accent="amber"
          descriptionMaxWidth="max-w-2xl"
        />

        <SectionStats
          stats={[
            { label: 'Total', value: certifications.length },
            { label: 'Cloud', value: '2' },
            { label: 'AI / GenAI', value: '4' },
            { label: 'Python', value: '3' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative card-surface rounded-xl p-5 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${categoryColors[cert.category] || 'from-gray-500 to-gray-600'} shadow-lg`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${categoryColors[cert.category] || 'from-gray-500 to-gray-600'} text-white mb-2`}>
                    {cert.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {cert.name}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
    </SectionShell>
  );
};

export default Certifications;