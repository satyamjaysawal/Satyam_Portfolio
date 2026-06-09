import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown, Building2 } from "lucide-react";
import { getExperienceText, CAREER_START_LABEL } from "../utils/experience";
import { COMPANIES } from "../data/companyProjects";
import SectionShell from "./SectionShell";
import SectionHeader from "./SectionHeader";
import SectionStats from "./SectionStats";

const VISIBLE_BULLETS = 3;

const ProjectCard = ({ project, companyColor, defaultOpen = false }) => {
  const [expanded, setExpanded] = useState(defaultOpen);
  const hasMore = project.description.length > VISIBLE_BULLETS;
  const visibleBullets = expanded ? project.description : project.description.slice(0, VISIBLE_BULLETS);

  return (
    <div className="inner-card hover:border-purple-400/30 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${companyColor} leading-snug`}>
            {project.projectName}
          </h4>
          <p className="text-[11px] text-cyan-700 dark:text-cyan-300 mt-0.5">{project.role}</p>
        </div>
        <Briefcase className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
      </div>

      <ul className="space-y-1.5">
        {visibleBullets.map((line, idx) => (
          <li key={idx} className="flex items-start text-[11px] sm:text-xs text-muted leading-snug">
            <ChevronRight className="w-3 h-3 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
            <span className="ml-1.5">{line}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-[10px] font-medium text-purple-600 dark:text-purple-400 hover:underline"
        >
          {expanded ? "Show less" : `+${project.description.length - VISIBLE_BULLETS} more highlights`}
        </button>
      )}

      {project.dataSources?.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700/40">
          <p className="text-[9px] font-semibold text-subtle uppercase tracking-wider mb-1.5">
            {project.dataSourceTheme === 'purple' ? 'Knowledge Bases & Integrations' : 'Labor Market Data Sources'}
          </p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {project.dataSources.map((source) => (
              <div
                key={source.platform}
                className={
                  project.dataSourceTheme === 'purple'
                    ? 'rounded-md bg-purple-50/80 dark:bg-purple-500/5 border border-purple-200/60 dark:border-purple-500/15 px-2 py-1.5'
                    : 'rounded-md bg-emerald-50/80 dark:bg-emerald-500/5 border border-emerald-200/60 dark:border-emerald-500/15 px-2 py-1.5'
                }
              >
                <p
                  className={
                    project.dataSourceTheme === 'purple'
                      ? 'text-[10px] font-semibold text-purple-800 dark:text-purple-300'
                      : 'text-[10px] font-semibold text-emerald-800 dark:text-emerald-300'
                  }
                >
                  {source.platform}
                </p>
                <p className="text-[9px] text-muted leading-snug">{source.dataType}</p>
                <p className="text-[9px] text-subtle">{source.ingestion} · {source.frequency}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700/40">
        <p className="text-[9px] font-semibold text-subtle uppercase tracking-wider mb-1.5">Tech Stack</p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span key={tech} className="skill-chip-sm">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [expandedCompanies, setExpandedCompanies] = useState({ deloitte: true, capgemini: false });

  const toggleCompany = (id) => setExpandedCompanies((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalProjects = COMPANIES.reduce((sum, c) => sum + c.projects.length, 0);

  return (
    <SectionShell id="experience">
        <SectionHeader
          label="Professional Journey"
          title="Work Experience"
          description={`${getExperienceText()} building enterprise AI solutions at Deloitte & Capgemini (since ${CAREER_START_LABEL})`}
        />

        <SectionStats
          stats={[
            { label: "Companies", value: COMPANIES.length },
            { label: "Projects", value: totalProjects },
            { label: "Focus", value: "GenAI & Full Stack" },
          ]}
        />

        <div className="space-y-3">
          {COMPANIES.map((company) => (
            <div
              key={company.id}
              className={`card-surface rounded-xl overflow-hidden border-l-[3px] ${company.borderAccent}`}
            >
              <button
                type="button"
                onClick={() => toggleCompany(company.id)}
                className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center`}>
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                      {company.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[10px] sm:text-[11px] text-subtle">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {company.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {company.location}
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 font-medium">
                        {company.projects.length} project{company.projects.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expandedCompanies[company.id] ? "rotate-180" : ""}`}
                />
              </button>

              {expandedCompanies[company.id] && (
                <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 space-y-2.5 border-t border-gray-200 dark:border-gray-700/50">
                  {company.projects.map((project, pIdx) => (
                    <ProjectCard
                      key={pIdx}
                      project={project}
                      companyColor={company.color}
                      defaultOpen={pIdx === 0 && company.id === "deloitte"}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
    </SectionShell>
  );
};

export default Experience;