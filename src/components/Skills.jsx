import React from 'react';
import { Code, Server, Database, Globe, Laptop, Brain, Cloud, Lock, Terminal } from 'lucide-react';

// Separate data into its own file/constant for better organization
const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    icon: Laptop,
    description: "Creating responsive and interactive user interfaces",
    skills: [
      { name: "React", level: 90, color: "from-blue-400 to-cyan-400" },
      { name: "Next.js", level: 85, color: "from-gray-600 to-gray-400" },
      { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-400" },
      { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-teal-400" },
      { name: "HTML/CSS", level: 95, color: "from-orange-500 to-red-400" },
      { name: "JavaScript", level: 85, color: "from-yellow-500 to-yellow-400" },
      { name: "SASS", level: 80, color: "from-pink-500 to-red-400" },
      { name: "UI Libraries", level: 85, color: "from-indigo-500 to-blue-400" },
      { name: "Redux", level: 80, color: "from-purple-500 to-indigo-400" },
      { name: "Bootstrap", level: 85, color: "from-gray-600 to-gray-400" },
      { name: "Material-UI", level: 80, color: "from-blue-500 to-blue-400" },
      { name: "Chakra UI", level: 95, color: "from-cyan-400 to-teal-400" },
      { name: "Styled Components", level: 85, color: "from-yellow-500 to-orange-400" },
      { name: "Responsive Design", level: 90, color: "from-yellow-500 to-orange-400" },

    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    description: "Building robust and scalable server applications",
    skills: [
      { name: "Node.js", level: 85, color: "from-green-500 to-green-400" },
      { name: "Python", level: 80, color: "from-blue-500 to-yellow-400" },
      { name: "Django/Flask", level: 90, color: "from-purple-500 to-indigo-400" },
      { name: "Express", level: 85, color: "from-gray-500 to-gray-400" },
      { name: "MongoDB", level: 75, color: "from-green-600 to-green-500" },
      { name: "Java", level: 80, color: "from-blue-600 to-blue-400" },
      { name: "SQL", level: 90, color: "from-blue-600 to-blue-400" },
      { name: "RESTful APIs", level: 85, color: "from-gray-500 to-gray-400" },
      { name: "FastAPI", level: 80, color: "from-blue-500 to-yellow-400" },
      { name: "GraphQL", level: 80, color: "from-blue-600 to-blue-400" },
      { name: "Microservices", level: 70, color: "from-blue-600 to-blue-400" },
      { name: "Firebase", level: 75, color: "from-purple-500 to-indigo-400" },
      { name: "AWS Lambda", level: 70, color: "from-blue-600 to-blue-400" },
      { name: "Serverless", level: 70, color: "from-blue-500 to-yellow-400" },
    ]
  },
  {
    title: "Data Science & AI",
    icon: Brain,
    description: "Analyzing data and building intelligent systems",
    skills: [
      { name: "Data Analysis", level: 80, color: "from-purple-500 to-purple-400" },
      { name: "Pandas/NumPy", level: 85, color: "from-blue-500 to-indigo-400" },
      { name: "AI & ML", level: 70, color: "from-green-500 to-emerald-400" },
      { name: "Data Visualization", level: 80, color: "from-purple-500 to-indigo-400" },
      { name: "Scikit-Learn", level: 70, color: "from-yellow-500 to-orange-400" },
      { name: "TensorFlow/PyTorch", level: 75, color: "from-yellow-500 to-orange-400" },
      { name: "NLP", level: 70, color: "from-green-500 to-emerald-400" },
      { name: "Computer Vision", level: 65, color: "from-violet-500 to-purple-400" },
      { name: "LLM & RAG", level: 65, color: "from-violet-500 to-purple-400" },
      { name: "Matplotlib", level: 75, color: "from-orange-500 to-red-400" },
      { name: "Seaborn", level: 75, color: "from-orange-500 to-red-400" },
      { name: "OpenAI", level: 65, color: "from-yellow-500 to-orange-400" },
      { name: "Langchain", level: 60, color: "from-yellow-500 to-orange-400" },
      { name: "Chatbot RAG", level: 65, color: "from-violet-500 to-purple-400" },
    ]
  }
];

const ADDITIONAL_SKILLS = [
  { name: "Git", icon: Terminal, color: "from-orange-500 to-red-500" },
  { name: "Docker/K8s", icon: Cloud, color: "from-blue-500 to-cyan-500" },
  { name: "Kubernetes", icon: Terminal, color: "from-green-500 to-emerald-500" },
  { name: "AWS", icon: Cloud, color: "from-yellow-500 to-orange-500" },
  { name: "Azure", icon: Cloud, color: "from-blue-600 to-indigo-500" },
  { name: "Security", icon: Lock, color: "from-green-500 to-emerald-500" },
  { name: "CI/CD", icon: Server, color: "from-blue-500 to-cyan-500" },
  { name: "Agile/Scrum", icon: Brain, color: "from-purple-500 to-indigo-500" },
  { name: "Postman", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { name: "API Testing", icon: Terminal, color: "from-green-500 to-emerald-500" },
  { name: "Logic Apps", icon: Database, color: "from-purple-500 to-indigo-500" },
  { name: "Azure Functions", icon: Terminal, color: "from-yellow-500 to-orange-500" },
  { name: "Swagger", icon: Brain, color: "from-green-500 to-emerald-500" },

];

// Separate components for better organization and reusability
const SkillBar = ({ name, level, color }) => (
  <div className="group/skill">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-300 font-medium">{name}</span>
      <span
        className="text-sm text-gray-400 opacity-0 group-hover/skill:opacity-100 transition-opacity"
        aria-label={`${level}% proficiency`}
      >
        {level}%
      </span>
    </div>
    <div
      className="h-2 bg-gray-700/30 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 group-hover/skill:shadow-[0_0_12px_rgba(168,85,247,0.4)]`}
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillCategory = ({ category }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
    <div className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <category.icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{category.title}</h3>
          <p className="text-sm text-gray-400">{category.description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {category.skills.map((skill, idx) => (
          <SkillBar key={idx} {...skill} />
        ))}
      </div>
    </div>
  </div>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      aria-label="Skills and expertise section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-400 font-medium tracking-wider text-sm">MY EXPERTISE</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Professional Skills
          </h2>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            Mastering modern technologies to create innovative digital solutions
          </p>
        </header>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <SkillCategory key={idx} category={category} />
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-center text-white mb-8">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {ADDITIONAL_SKILLS.map((skill, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-2 bg-gray-800/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <skill.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;