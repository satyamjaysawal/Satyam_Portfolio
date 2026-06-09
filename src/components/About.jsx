import React from "react";
import { Mail, ArrowRight, Code, Brain, Cloud, ChevronRight, ExternalLink } from "lucide-react";
import { getExperienceLabel, getExperienceText } from "../utils/experience";
import SectionShell from "./SectionShell";
import SectionHeader from "./SectionHeader";
import SectionStats from "./SectionStats";

const expertiseAreas = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "RESTful APIs, microservices, React/Next.js frontends, FastAPI/Django backends, and end-to-end SDLC delivery with Agile/Scrum.",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/10 hover:border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Brain,
    title: "GenAI, RAG & Agentic AI",
    description: "LangChain, LangGraph, AutoGen, multi-agent orchestration, RAG pipelines, prompt engineering, and GPT-4, Claude, Gemini integrations.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/10 hover:border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Cloud,
    title: "Cloud, DevOps & MLOps",
    description: "AWS Bedrock, SageMaker, Azure AI Foundry, Docker, Kubernetes, CI/CD pipelines, and LLMOps with evaluation & monitoring.",
    gradient: "from-teal-500/10 to-green-500/10",
    border: "border-teal-500/10 hover:border-teal-500/30",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-400",
  },
];

const About = () => {
  return (
    <SectionShell id="about" maxWidth="max-w-6xl">
        <SectionHeader
          label="About Me"
          title="Satyam Jaysawal"
          description="Full Stack Python Developer & AI Engineer"
        />

        <SectionStats
          stats={[
            { label: "Experience", value: getExperienceLabel() },
            { label: "Location", value: "Mumbai" },
            { label: "Certifications", value: "13+" },
            { label: "Current Role", value: "Deloitte USI" },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-50" />
                <img src="/profile/satyam-profile.jpg" alt="Satyam Jaysawal" className="relative w-32 h-40 sm:w-36 sm:h-44 object-cover object-top rounded-2xl border-2 border-purple-500/30 shadow-xl" />
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-md opacity-50" />
                <img src="/profile/satyam-profile-2.jpg" alt="Satyam Jaysawal at Deloitte" className="relative w-32 h-40 sm:w-36 sm:h-44 object-cover object-top rounded-2xl border-2 border-blue-500/30 shadow-xl" />
              </div>
            </div>

            <div className="card-surface rounded-2xl p-6 space-y-4">
              <p className="text-muted leading-relaxed text-sm md:text-base">
                Full Stack Python Developer &amp; AI Engineer with <strong className="text-purple-300">{getExperienceText()}</strong> of experience designing and deploying scalable web applications, Generative AI solutions, and machine learning systems in production environments.
              </p>
              <p className="text-subtle leading-relaxed text-sm">
                Specialized in end-to-end software development — from RESTful APIs and microservices to Agentic AI, RAG pipelines, and multi-agent LLM systems on AWS and Azure. Proficient in Haystack, DSPy, NLP, deep learning, prompt engineering, and MLOps/LLMOps with hands-on experience building intelligent chatbots and integrating GPT-4, Claude, Claude Code CLI, Anthropic Playground, and Gemini into enterprise SaaS applications.
              </p>
              <p className="text-subtle leading-relaxed text-sm">
                Proven track record of Agile/Scrum delivery, CI/CD implementation, and cross-functional collaboration across the full SDLC. Currently at <strong className="text-cyan-300">Deloitte USI</strong> building intelligent talent hiring platforms.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {expertiseAreas.map((area, i) => (
              <div key={i} className={`group bg-gradient-to-r ${area.gradient} backdrop-blur-xl rounded-2xl p-6 border ${area.border} transition-all duration-300 hover:shadow-lg`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 ${area.iconBg} rounded-xl`}>
                    <area.icon className={`w-6 h-6 ${area.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">{area.title}</h3>
                </div>
                <p className="text-subtle text-sm leading-relaxed">{area.description}</p>
                <div className="flex items-center text-purple-400 mt-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4" />
                  <span>Core expertise area</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#projects" className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
            View My Work
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="group px-6 py-3 border border-purple-500/30 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2">
            Contact Me
            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </a>
          <a href="https://github.com/satyamjaysawal" target="_blank" rel="noopener noreferrer" className="group px-6 py-3 border border-cyan-500/30 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2">
            GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
    </SectionShell>
  );
};

export default About;