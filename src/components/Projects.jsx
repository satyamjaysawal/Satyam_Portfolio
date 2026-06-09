import React, { useState } from 'react';
import { Building2, MapPin, Calendar, ChevronRight, Brain, Sparkles } from 'lucide-react';
import { getEnterpriseProjects } from '../data/companyProjects';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import SectionStats from './SectionStats';

// Live links sourced from each repo README (frontend/app URL preferred)
const README_LIVE_LINKS = {
  'AI-Noteboook-Board': 'https://ai-noteboook-board.onrender.com',
  'Ecommerce-website-Reactjs-Vite-frontend': 'https://ecommerce-website-reactjs-vite-frontend.onrender.com',
  'MovieFlix-App-Dataset': 'https://movie-flix-app-dataset.vercel.app',
  'Student-Records-App-Frontend': 'https://student-records-app-frontend.vercel.app',
  'GEMINI_multimodel_app': 'https://gemini-multimodel-app.onrender.com',
  'CarCatalog_MyGarage-Frontend': 'https://car-catalog-my-garage-frontend.vercel.app',
  'TodoList-with-Auth-Assign-Frontend': 'https://todo-list-with-auth-assign-frontend.vercel.app',
  'T-A-Data-Submission-Form---Frontend': 'https://t-a-data-submission-form-frontend.vercel.app',
  'FlaskAdminPost': 'https://flaskadminpost.onrender.com',
  'satyamjaysawal-Responsive-Portfolio-using-HTML-CSS-JS': 'https://satyam-portfolio-website.vercel.app',
};

// Verified broken/unavailable demos — hide Live/Demo buttons for these URLs
const INVALID_DEPLOYED_LINKS = new Set([
  'https://make-my-trip-frontend-shi.vercel.app',
  'https://mml-test.vercel.app',
  'https://chatapp-websocket-server.vercel.app',
  'https://blog-app-python.vercel.app',
]);

const sanitizeDeployedLink = (link = '') => {
  const normalized = link.trim().replace(/\/$/, '');
  return normalized && !INVALID_DEPLOYED_LINKS.has(normalized) ? link.trim() : '';
};

const GITHUB_TOP_PRIORITY = [
  'AI Notebook Board',
  'E-Commerce Website',
  'MakeMyTrip Clone',
  'MovieFlix App Dataset',
  'Student Records App',
  'Flask GenAI Learning Tasks',
];

const getRepoSlug = (githubLink = '') => githubLink.split('/').filter(Boolean).pop() || '';

const applyReadmeLiveLinks = (projects) =>
  projects.map((project) => ({
    ...project,
    deployedLink: sanitizeDeployedLink(
      README_LIVE_LINKS[getRepoSlug(project.githubLink)] || project.deployedLink || '',
    ),
  }));

const sortGithubProjects = (projects) =>
  [...projects].sort((a, b) => {
    const aPriority = GITHUB_TOP_PRIORITY.indexOf(a.title);
    const bPriority = GITHUB_TOP_PRIORITY.indexOf(b.title);
    const aRank = aPriority !== -1 ? aPriority : a.deployedLink ? 100 : 200;
    const bRank = bPriority !== -1 ? bPriority : b.deployedLink ? 100 : 200;
    if (aRank !== bRank) return aRank - bRank;
    return a.title.localeCompare(b.title);
  });

const githubProjectsData = [
  {
    id: 30,
    title: 'AI Notebook Board',
    description: 'AI-powered notebook application with intelligent note-taking, organization, and backend API integration.',
    category: 'Full Stack',
    tech: ['JavaScript', 'React', 'Node.js', 'AI'],
    imageUrl: '/projects/github/ai-notebook-board.jpg',
    githubLink: 'https://github.com/satyamjaysawal/AI-Noteboook-Board',
    deployedLink: 'https://ai-noteboook-board.onrender.com',
  },
  {
    id: 29,
    title: 'E-Commerce Website',
    description: 'Full-stack e-commerce with FastAPI, React, Next.js, Neon PostgreSQL, JWT auth, payment gateway, chatbot UI, analytics dashboard, and multi-role admin/vendor/customer flows.',
    category: 'Full Stack',
    tech: ['React', 'Vite', 'Flask', 'Python'],
    imageUrl: '/projects/github/ecommerce-website.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Ecommerce-website-Reactjs-Vite-frontend',
    deployedLink: 'https://ecommerce-website-reactjs-vite-frontend.onrender.com',
  },
  {
    id: 31,
    title: 'MakeMyTrip Clone',
    description: 'Full-stack travel booking app with React, Redux, Node, Express, MongoDB, JWT auth, Razorpay payments, Nodemailer notifications, and Vercel deployment.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    imageUrl: '/projects/github/makemytrip-clone.jpg',
    githubLink: 'https://github.com/satyamjaysawal/MakeMyTrip_Frontend',
    deployedLink: '',
  },
  {
    id: 37,
    title: 'MovieFlix App Dataset',
    description: 'Movie discovery platform with Flask, MongoDB, personalized recommendations, secure auth, dynamic search, and review functionalities.',
    category: 'Web App',
    tech: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/projects/github/movieflix-app.jpg',
    githubLink: 'https://github.com/satyamjaysawal/MovieFlix-App-Dataset',
    deployedLink: 'https://movie-flix-app-dataset.vercel.app',
  },
  {
    id: 28,
    title: 'Student Records App',
    description: 'Full-stack student records management system with CRUD operations, search functionality, and responsive UI.',
    category: 'Full Stack',
    tech: ['JavaScript', 'HTML', 'Node.js', 'REST API'],
    imageUrl: '/projects/github/student-records-app.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Student-Records-App-Frontend',
    deployedLink: 'https://student-records-app-frontend.vercel.app',
  },
  {
    id: 27,
    title: 'Flask GenAI Learning Tasks',
    description: 'Hands-on Flask projects integrating Generative AI capabilities for learning and experimentation with LLM APIs.',
    category: 'GenAI',
    tech: ['Python', 'Flask', 'GenAI', 'Jupyter'],
    imageUrl: '/projects/github/flask-genai-tasks.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Flask_GenAI_Learning_Tasks',
    deployedLink: '',
  },
  {
    id: 26,
    title: 'Gemini Multimodel App',
    description: 'Multimodal AI application powered by Google Gemini supporting text, image, and multi-format input processing.',
    category: 'GenAI',
    tech: ['Python', 'Gemini API', 'Multimodal AI'],
    imageUrl: '/projects/github/gemini-multimodel-app.jpg',
    githubLink: 'https://github.com/satyamjaysawal/GEMINI_multimodel_app',
    deployedLink: 'https://gemini-multimodel-app.onrender.com',
  },
  {
    id: 22,
    title: 'Multiple Model RAG Usecases',
    description: 'Retrieval-Augmented Generation application demonstrating multiple LLM models for context-aware question answering.',
    category: 'RAG / LLM',
    tech: ['Python', 'RAG', 'LLM', 'HTML'],
    imageUrl: '/projects/github/multiple-model-rag.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Multiple-Model-RAG-Usecases',
    deployedLink: '',
  },
  {
    id: 32,
    title: 'Car Catalog - MyGarage',
    description: 'Car catalog and garage management app with frontend UI and backend API for browsing and managing vehicle listings.',
    category: 'Full Stack',
    tech: ['React', 'JavaScript', 'Node.js', 'REST API'],
    imageUrl: '/projects/github/car-catalog-mygarage.jpg',
    githubLink: 'https://github.com/satyamjaysawal/CarCatalog_MyGarage-Frontend',
    deployedLink: 'https://car-catalog-my-garage-frontend.vercel.app',
  },
  {
    id: 34,
    title: 'TodoList with Auth & Assignment',
    description: 'Collaborative todo application with user authentication, task assignment, and separate frontend-backend services.',
    category: 'Full Stack',
    tech: ['JavaScript', 'Node.js', 'Authentication', 'REST API'],
    imageUrl: '/projects/github/todolist-auth-assign.jpg',
    githubLink: 'https://github.com/satyamjaysawal/TodoList-with-Auth-Assign-Frontend',
    deployedLink: 'https://todo-list-with-auth-assign-frontend.vercel.app',
  },
  {
    id: 35,
    title: 'T&A Data Submission Form',
    description: 'Data submission portal with form validation, backend processing, and deployed frontend for collecting structured data.',
    category: 'Full Stack',
    tech: ['JavaScript', 'Python', 'Flask', 'REST API'],
    imageUrl: '/projects/github/ta-data-submission.jpg',
    githubLink: 'https://github.com/satyamjaysawal/T-A-Data-Submission-Form---Frontend',
    deployedLink: 'https://t-a-data-submission-form-frontend.vercel.app',
  },
  {
    id: 36,
    title: 'Chat App with WebSocket',
    description: 'Real-time chat application using WebSocket for instant messaging with server-side event handling.',
    category: 'Real-Time App',
    tech: ['JavaScript', 'WebSocket', 'Node.js'],
    imageUrl: '/projects/github/chatapp-websocket.jpg',
    githubLink: 'https://github.com/satyamjaysawal/chatapp-websocket',
    deployedLink: '',
  },
  {
    id: 38,
    title: 'Blog App - Python',
    description: 'Blog publishing platform built with Python featuring post creation, management, and deployed web interface.',
    category: 'Web App',
    tech: ['Python', 'Flask', 'HTML'],
    imageUrl: '/projects/github/blog-app-python.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Blog-App-Python',
    deployedLink: '',
  },
  {
    id: 41,
    title: 'Flask Admin Post',
    description: 'Content management system with Flask admin panel for creating and managing blog posts.',
    category: 'Web App',
    tech: ['Python', 'Flask', 'HTML'],
    imageUrl: '/projects/github/flask-admin-post.jpg',
    githubLink: 'https://github.com/satyamjaysawal/FlaskAdminPost',
    deployedLink: 'https://flaskadminpost.onrender.com',
  },
  {
    id: 42,
    title: 'Responsive Portfolio (HTML/CSS/JS)',
    description: 'An earlier responsive portfolio website built with vanilla HTML, CSS, and JavaScript.',
    category: 'Portfolio',
    tech: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/projects/github/responsive-portfolio.jpg',
    githubLink: 'https://github.com/satyamjaysawal/satyamjaysawal-Responsive-Portfolio-using-HTML-CSS-JS',
    deployedLink: 'https://satyam-portfolio-website.vercel.app',
  },
  {
    id: 19,
    title: 'Invoice OCR Extractor',
    description: 'Python-based OCR system that extracts structured data from invoice documents using computer vision and text recognition.',
    category: 'AI / OCR',
    tech: ['Python', 'OCR', 'Computer Vision'],
    imageUrl: '/projects/github/invoice-ocr-extractor.jpg',
    githubLink: 'https://github.com/satyamjaysawal/invoice-ocr-extractor-assignment',
    deployedLink: '',
  },
  {
    id: 20,
    title: 'LangGraph AI Agent with Weather & Calculator MCP',
    description: 'Interactive AI agent built with LangGraph, integrating Weather MCP and Calculator MCP tools for real-time queries and computations.',
    category: 'AI Agent',
    tech: ['Python', 'LangGraph', 'MCP', 'LLM'],
    imageUrl: '/projects/github/langgraph-ai-agent.jpg',
    githubLink: 'https://github.com/satyamjaysawal/LangGraph-Powered-Interactive-AI-Agent-with-Weather-MCP-and-Calculator-MCP',
    deployedLink: '',
  },
  {
    id: 21,
    title: 'AUTOGEN Usecases',
    description: 'Collection of multi-agent AI use cases built with Microsoft AutoGen for collaborative agent workflows and task automation.',
    category: 'AI Agent',
    tech: ['Python', 'AutoGen', 'Multi-Agent AI'],
    imageUrl: '/projects/github/autogen-usecases.jpg',
    githubLink: 'https://github.com/satyamjaysawal/AUTOGEN-Usecases',
    deployedLink: '',
  },
  {
    id: 23,
    title: 'RAG Based Knowledge System on AWS',
    description: 'Cloud-based RAG knowledge base deployed on AWS for intelligent document retrieval and AI-powered responses.',
    category: 'RAG / Cloud',
    tech: ['Python', 'RAG', 'AWS', 'LLM'],
    imageUrl: '/projects/github/rag-knowledge-aws.jpg',
    githubLink: 'https://github.com/satyamjaysawal/RAG-Based-Knowledge-AWS',
    deployedLink: '',
  },
  {
    id: 24,
    title: 'RAG Agentic AI for Documents',
    description: 'Agentic AI system using RAG to process, understand, and answer questions from Word documents intelligently.',
    category: 'RAG / Agentic AI',
    tech: ['Python', 'RAG', 'Agentic AI', 'Jupyter'],
    imageUrl: '/projects/github/rag-agentic-ai-docx.jpg',
    githubLink: 'https://github.com/satyamjaysawal/RAG_Agentic_AI_Docx',
    deployedLink: '',
  },
  {
    id: 25,
    title: 'Azure AI Foundry',
    description: 'Exploration of Azure AI Foundry services including model deployment, prompt engineering, and AI application development.',
    category: 'Cloud AI',
    tech: ['Azure AI', 'Python', 'Jupyter', 'LLM'],
    imageUrl: '/projects/github/azure-ai-foundry.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Azure-AI-Foundry',
    deployedLink: '',
  },
  {
    id: 33,
    title: 'Firebase Task Management',
    description: 'Task management application with Firebase authentication, real-time database, and full-stack frontend-backend architecture.',
    category: 'Full Stack',
    tech: ['JavaScript', 'Firebase', 'React', 'Python'],
    imageUrl: '/projects/github/firebase-task-management.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Firebase-Frontend-Task-Management',
    deployedLink: '',
  },
  {
    id: 39,
    title: 'Expense Tracker',
    description: 'Personal expense tracking application for logging, categorizing, and managing daily financial transactions.',
    category: 'Utility App',
    tech: ['Python'],
    imageUrl: '/projects/github/expense-tracker.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Expense-Tracker',
    deployedLink: '',
  },
  {
    id: 40,
    title: 'Django Phone Directory',
    description: 'Phone directory management system built with Django framework featuring contact CRUD and search functionality.',
    category: 'Web App',
    tech: ['Python', 'Django', 'SQLite'],
    imageUrl: '/projects/github/django-phone-directory.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Django---Phone-Directory-Project',
    deployedLink: '',
  },
  {
    id: 43,
    title: 'MERN Projects Collection',
    description: 'Collection of MongoDB, Express, React, and Node.js full-stack projects covering various web development use cases.',
    category: 'Full Stack',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    imageUrl: '/projects/github/mern-projects.jpg',
    githubLink: 'https://github.com/satyamjaysawal/MERN_PROJECTS',
    deployedLink: '',
  },
  {
    id: 44,
    title: 'FullStack Java Project',
    description: 'Full-stack Java application demonstrating frontend-backend integration with Java-based server technologies.',
    category: 'Full Stack',
    tech: ['Java', 'JavaScript', 'Spring'],
    imageUrl: '/projects/github/fullstack-java.jpg',
    githubLink: 'https://github.com/satyamjaysawal/FullStack_Java_Project',
    deployedLink: '',
  },
  {
    id: 45,
    title: 'Spring Boot Batch Processing',
    description: 'Spring Boot projects demonstrating batch processing, scheduled jobs, and large-scale data handling patterns.',
    category: 'Java / Backend',
    tech: ['Java', 'Spring Boot', 'Spring Batch'],
    imageUrl: '/projects/github/spring-boot-batch.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Spring-Boot-Spring-Batch-Processing-Projects',
    deployedLink: '',
  },
  {
    id: 46,
    title: 'Spring MVC, Boot, Cloud & API Testing',
    description: 'Java enterprise projects covering Struts, Spring MVC, Spring Boot, Spring Cloud, and Postman API testing.',
    category: 'Java / Backend',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Postman'],
    imageUrl: '/projects/github/spring-mvc-cloud.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Struts-SpringMVC-SpringBoot-SpringCloud-PostManAPI-Testing-Task-List',
    deployedLink: '',
  },
  {
    id: 47,
    title: 'Java Servlet, JSP, Struts & Hibernate',
    description: 'Comprehensive Java web development examples using Servlet, JSP, Struts, Spring, and Hibernate frameworks.',
    category: 'Java / Backend',
    tech: ['Java', 'Servlet', 'JSP', 'Hibernate', 'Struts'],
    imageUrl: '/projects/github/java-servlet-hibernate.jpg',
    githubLink: 'https://github.com/satyamjaysawal/JavaServletJspStrutsSpringHibernateProjectExamples',
    deployedLink: '',
  },
  {
    id: 48,
    title: 'DevOps with Terraform',
    description: 'Infrastructure as Code projects using Terraform for provisioning and managing cloud resources.',
    category: 'DevOps',
    tech: ['Terraform', 'HCL', 'AWS', 'DevOps'],
    imageUrl: '/projects/github/devops-terraform.jpg',
    githubLink: 'https://github.com/satyamjaysawal/DevOps_Terraform',
    deployedLink: '',
  },
  {
    id: 49,
    title: 'JavaScript Chunk Projects',
    description: 'Collection of small JavaScript practice projects for learning DOM manipulation, events, and core JS concepts.',
    category: 'Practice',
    tech: ['JavaScript', 'HTML', 'CSS'],
    imageUrl: '/projects/github/javascript-chunk-projects.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Javascript-Chunk-Projects-Practices',
    deployedLink: '',
  },
  {
    id: 50,
    title: 'Python Practice Projects',
    description: 'Python programming exercises and practice scripts for learning core concepts and problem solving.',
    category: 'Practice',
    tech: ['Python'],
    imageUrl: '/projects/github/python-practice.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Practice-Python-Pycharm-Vscode',
    deployedLink: '',
  },
];

const githubProjects = sortGithubProjects(applyReadmeLiveLinks(githubProjectsData));

const featuredProjects = [
  {
    id: 'fp-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack platform with customer, vendor, and admin roles — product browsing, cart, payment gateway, order tracking, chatbot support, analytics dashboard, and real-time notifications.',
    highlights: ['JWT Authentication', 'Payment Gateway', 'Chatbot UI', 'Analytics Dashboard', 'Multi-role Access'],
    category: 'Full Stack',
    tech: ['FastAPI', 'React.js', 'Next.js', 'PostgreSQL', 'SQLAlchemy', 'Matplotlib', 'NumPy', 'Pandas'],
    imageUrl: '/projects/github/ecommerce-website.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Ecommerce-website-Reactjs-Vite-frontend',
    deployedLink: 'https://ecommerce-website-reactjs-vite-frontend.onrender.com',
  },
  {
    id: 'fp-2',
    title: 'MakeMyTrip App',
    description: 'Travel booking application for real-time flight and hotel booking with login/register, JWT session handling, cookies, Razorpay payments, and email notifications via Nodemailer.',
    highlights: ['Flight & Hotel Booking', 'Razorpay Integration', 'JWT & Cookies', 'Email Notifications'],
    category: 'Full Stack',
    tech: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    imageUrl: '/projects/github/makemytrip-clone.jpg',
    githubLink: 'https://github.com/satyamjaysawal/MakeMyTrip_Frontend',
    deployedLink: '',
  },
  {
    id: 'fp-3',
    title: 'MovieFlix – Movie Review & Discovery',
    description: 'Movie discovery platform with personalized recommendation system based on user preferences and genres, secure authentication, dynamic search, and review features.',
    highlights: ['Recommendation Engine', 'User Reviews', 'Dynamic Search', 'Secure Auth'],
    category: 'Web App',
    tech: ['Flask', 'MongoDB', 'Pandas', 'Python'],
    imageUrl: '/projects/github/movieflix-app.jpg',
    githubLink: 'https://github.com/satyamjaysawal/MovieFlix-App-Dataset',
    deployedLink: 'https://movie-flix-app-dataset.vercel.app',
  },
  {
    id: 'fp-4',
    title: 'Multimodel Gemini AI App',
    description: 'Streamlit app with chatbot, image captioning, text embedding, PDF chat, voice assistant, and audio/video transcription using Google Generative AI and FAISS.',
    highlights: ['PDF Chat', 'Voice Assistant', 'Image Captioning', 'Audio/Video Transcription'],
    category: 'GenAI',
    tech: ['Python', 'Streamlit', 'Gemini API', 'FAISS', 'RAG'],
    imageUrl: '/projects/github/gemini-multimodel-app.jpg',
    githubLink: 'https://github.com/satyamjaysawal/Multiple-Model-RAG-Usecases',
    deployedLink: '',
  },
  {
    id: 'fp-5',
    title: 'CRUD with Multiple Technologies',
    description: 'Multiple CRUD systems built with AngularJS, Next.js, Servlet, JSP, Struts, Spring Boot, Spring Security, Spring Batch, Hibernate, JDBC, and MySQL with Bootstrap UI.',
    highlights: ['Spring Security', 'Spring Batch', 'Hibernate', 'Multi-framework CRUD'],
    category: 'Backend',
    tech: ['Spring Boot', 'Hibernate', 'JSP', 'Servlet', 'MySQL', 'AngularJS', 'Next.js'],
    imageUrl: '/projects/github/java-servlet-hibernate.jpg',
    githubLink: 'https://github.com/satyamjaysawal/JavaServletJspStrutsSpringHibernateProjectExamples',
    deployedLink: '',
  },
  {
    id: 'fp-6',
    title: 'Personal Portfolio (HTML/CSS/JS)',
    description: 'Responsive portfolio with day/night mode, multiple color templates for navbar and footer, dynamic buttons, and media queries for optimal viewing across devices.',
    highlights: ['Dark/Light Mode', 'Color Templates', 'Responsive Design', 'DOM Manipulation'],
    category: 'Portfolio',
    tech: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/projects/github/responsive-portfolio.jpg',
    githubLink: 'https://github.com/satyamjaysawal/satyamjaysawal-Responsive-Portfolio-using-HTML-CSS-JS',
    deployedLink: 'https://satyam-portfolio-website.vercel.app',
  },
];

const mlProjects = [
  { title: 'Handwritten Digit Recognition', description: 'CNN on MNIST dataset achieving 98%+ accuracy with TensorFlow and Keras.', category: 'Computer Vision', tech: ['TensorFlow', 'Keras', 'CNN', 'MNIST'], imageUrl: '/projects/ml/handwritten-digit-recognition.svg' },
  { title: 'Movie Recommendation System', description: 'Collaborative and content-based filtering on MovieLens using Scikit-learn.', category: 'Recommendation', tech: ['Python', 'Pandas', 'Scikit-learn'], imageUrl: '/projects/ml/movie-recommendation.svg' },
  { title: 'Spam Email Classifier', description: 'Naive Bayes and Logistic Regression with TF-IDF on SMS Spam Collection dataset.', category: 'NLP', tech: ['NLP', 'TF-IDF', 'Scikit-learn'], imageUrl: '/projects/ml/spam-email-classifier.svg' },
  { title: 'House Price Prediction', description: 'XGBoost and Random Forest regression with feature engineering on Ames Housing.', category: 'Regression', tech: ['XGBoost', 'Random Forest', 'Feature Engineering'], imageUrl: '/projects/ml/house-price-prediction.svg' },
  { title: 'Financial News Sentiment Analyzer', description: 'FinBERT and LSTM to classify market sentiment from news headlines for trading signals.', category: 'NLP / FinTech', tech: ['FinBERT', 'LSTM', 'NLP'], imageUrl: '/projects/ml/financial-news-sentiment.svg' },
  { title: 'Face Recognition Attendance', description: 'OpenCV and FaceNet with Flask web interface for real-time attendance logging.', category: 'Computer Vision', tech: ['OpenCV', 'FaceNet', 'Flask'], imageUrl: '/projects/ml/face-recognition-attendance.svg' },
  { title: 'Real-Time Object Detection', description: 'YOLOv8 on webcam and edge devices optimized with PyTorch and ONNX.', category: 'Computer Vision', tech: ['YOLOv8', 'PyTorch', 'ONNX'], imageUrl: '/projects/ml/real-time-object-detection.svg' },
  { title: 'Stock Price Forecasting', description: 'LSTM and Transformer attention mechanisms with interactive Plotly dashboard.', category: 'Time Series', tech: ['LSTM', 'Transformers', 'Plotly'], imageUrl: '/projects/ml/stock-price-forecasting.svg' },
  { title: 'AI Image Generation App', description: 'Stable Diffusion and Diffusers library served through Gradio UI with FastAPI backend.', category: 'GenAI', tech: ['Stable Diffusion', 'Gradio', 'FastAPI'], imageUrl: '/projects/ml/ai-image-generation.svg' },
  { title: 'Fraud Detection System', description: 'XGBoost with SMOTE oversampling and SHAP explainability dashboards on imbalanced data.', category: 'Explainable AI', tech: ['XGBoost', 'SMOTE', 'SHAP'], imageUrl: '/projects/ml/fraud-detection.svg' },
];

const ML_CATEGORY_STYLES = {
  'Computer Vision': { badge: 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300', accent: 'border-l-blue-500' },
  Recommendation: { badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300', accent: 'border-l-indigo-500' },
  NLP: { badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300', accent: 'border-l-emerald-500' },
  'NLP / FinTech': { badge: 'bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300', accent: 'border-l-teal-500' },
  Regression: { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300', accent: 'border-l-amber-500' },
  'Time Series': { badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300', accent: 'border-l-cyan-500' },
  GenAI: { badge: 'bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300', accent: 'border-l-orange-500' },
  'Explainable AI': { badge: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300', accent: 'border-l-rose-500' },
};

const htmlCssProjects = [
  {
    id: 1,
    title: 'PROJECT 3 - Tailwind CSS : Røde Clone',
    description: 'A modern clone of the RODE microphone website, featuring a stunning UI and smooth animations.',
    category: 'UI Design',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/ca91ea1c-6fe0-4803-8fdd-a7dbd829c968',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-3-Rode-clone-main',
    deployedLink: 'https://html-css-projects-3-rode-clone.vercel.app/',
    featured: true
  },
  {
    id: 2,
    title: 'PROJECT 2 - Tailwind : Shopify Clone',
    description: 'A full-featured Shopify clone with a responsive design, animations, and modern e-commerce components.',
    category: 'E-commerce',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/005e9077-626f-4aec-a2a5-45147dfe0a0d',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-2-Shopify-clone-main',
    deployedLink: 'https://html-css-projects-2-shopify-clone.vercel.app/',
    featured: true
  },
  {
    id: 3,
    title: 'PROJECT 1 - Tailwind CSS : Paytm Clone',
    description: 'A pixel-perfect clone of Paytm, built using Tailwind CSS, featuring responsive design and modern UI components.',
    category: 'UI Design',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/50b8dfb9-ea5a-4263-ab74-281862b4658c',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-TAILWIND-CSS-PROJECT-1-paytm-clone-main',
    deployedLink: 'https://html-css-projects-1-paytm-clone.vercel.app/',
    featured: true
  },
  {
    id: 4,
    title: 'PROJECT 15 : Responsive Portfolio',
    description: 'An interactive portfolio with dark mode, analytics, and real-time data visualization.',
    category: 'Portfolio',
    tech: ['Tailwind CSS', 'HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/e567d1ac-c074-4a5b-81e9-6304fbede686',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-15-main',
    deployedLink: 'https://html-css-projects-15.vercel.app/',
    featured: true
  },
  {
    id: 5,
    title: 'PROJECT 14 : Responsive Dance Home Page',
    description: 'A responsive homepage for a dance website, featuring smooth animations and modern design.',
    category: 'Web Design',
    tech: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://github.com/user-attachments/assets/6e82f5ad-7b98-47b9-b538-feb3a8a4a023',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-14-main',
    deployedLink: 'https://html-css-projects-14.vercel.app/',
    featured: true
  },
  {
    id: 6,
    title: 'PROJECT 13 : SAAS Landing Page',
    description: 'A modern and responsive landing page for a SAAS product, designed with HTML and CSS.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/ffe7e443-3acc-45fb-a9d6-f8d046ce8b00',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-13-main',
    deployedLink: 'https://html-css-projects-13.vercel.app/',
    featured: true
  },
  {
    id: 7,
    title: 'PROJECT 12 : Business Landing Page',
    description: 'A responsive landing page designed for a fictional business.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS', 'JavaScript'],
    videoUrl: 'https://github.com/user-attachments/assets/51021c9e-8a83-4d73-a4f8-afce62764bbe',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-12-main',
    deployedLink: 'https://html-css-projects-12.vercel.app/',
    featured: true
  },
  {
    id: 8,
    title: 'PROJECT 11 : Hosting Landing Page',
    description: 'A professional landing page designed for hosting services, with modern web technologies.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/6121134d-37c0-4c15-8790-214803127ba8',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-11-to-15/tree/main/HTML-CSS-PROJECT-11-main',
    deployedLink: 'https://html-css-projects-11.vercel.app/',
    featured: true
  },
  {
    id: 9,
    title: 'PROJECT 10 : Interior Design Page',
    description: 'A landing page for an interior design service, featuring a responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/788a76d9-fe09-4182-8233-e97f32135171',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-10-main',
    deployedLink: 'https://html-css-projects-10.vercel.app/',
    featured: true
  },
  {
    id: 10,
    title: 'PROJECT 9 : Developer Landing Page',
    description: 'A landing page showcasing a developer’s portfolio with responsive design and modern features.',
    category: 'Portfolio',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/17b25cdd-64ed-407b-a4e2-b4a84a538583',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-9-main',
    deployedLink: 'https://html-css-projects-9.vercel.app/',
    featured: true
  },
  {
    id: 11,
    title: 'PROJECT 8 : Web Design Page',
    description: 'A professional landing page for developers to showcase their work with modern web design principles.',
    category: 'Portfolio',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/db5a70dc-262c-4718-843b-5ce8af4895a9',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-8-main',
    deployedLink: 'https://html-css-projects-8.vercel.app/',
    featured: true
  },
  {
    id: 12,
    title: 'PROJECT 7 : Product Home Page',
    description: 'A simple landing page for a product with clean, minimal design and responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: 'https://github.com/user-attachments/assets/fdb4b3ed-10bb-4302-bc95-3209d1e688e7',
    imageUrl: '',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-7-main',
    deployedLink: 'https://html-css-projects-7.vercel.app/',
    featured: true
  },
  {
    id: 13,
    title: 'PROJECT 6 : Plant Home Page',
    description: 'A landing page for a plant shop, with modern design and user-friendly interface.',
    category: 'E-commerce',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/01b582e4-8bf0-43a7-8d1a-577152638524',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-6-main',
    deployedLink: 'https://html-css-projects-6.vercel.app/',
    featured: true
  },
  {
    id: 14,
    title: 'PROJECT 5 : Crypto Landing Page',
    description: 'A homepage designed for a cryptocurrency-related product, with modern UI and responsive design.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/d013409e-11af-41a2-96d1-87f27d5585db',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-5-main',
    deployedLink: 'https://html-css-projects-5.vercel.app/',
    featured: true
  },
  {
    id: 15,
    title: 'PROJECT 4 : Digital Marketing Page',
    description: 'A landing page for a digital marketing service, designed with modern web technologies.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/a921e5c7-5903-4548-819b-689554d054d7',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-4-main',
    deployedLink: 'https://html-css-projects-4.vercel.app/',
    featured: true
  },
  {
    id: 16,
    title: 'PROJECT 3 : Law Home Page',
    description: 'A landing page designed for a law firm or legal service provider with a modern, responsive design.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/1423ff14-f8a3-4fde-9714-ecd1779d9bb9',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-3-main',
    deployedLink: 'https://html-css-projects-3.vercel.app/',
    featured: true
  },
  {
    id: 17,
    title: 'PROJECT 2 : Food Restaurant Page',
    description: 'A landing page designed for a restaurant with an interactive and responsive layout.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/9ff55d20-aee7-4a52-b236-1223cbe8eb4a',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-2-main',
    deployedLink: 'https://html-css-projects-2-phi.vercel.app/',
    featured: true
  },
  {
    id: 18,
    title: 'PROJECT 1 : Street Style Landing Page',
    description: 'A modern landing page with street style aesthetics, perfect for a fashion-related service or product.',
    category: 'Landing Page',
    tech: ['HTML', 'CSS'],
    videoUrl: '',
    imageUrl: 'https://github.com/user-attachments/assets/19498af8-db54-46d1-bfc3-bc360bfa098e',
    githubLink: 'https://github.com/satyamjaysawal/HTML_CSS_PROJECTS-1-to-10/tree/main/HTML-CSS-PROJECT-1-main',
    deployedLink: 'https://html-css-projects-1-eight.vercel.app/',
    featured: true
  }
];


const enterpriseProjects = getEnterpriseProjects();

const sectionThemes = {
  company: {
    label: 'Enterprise Work',
    title: 'Company Projects',
    description: 'Production GenAI & full-stack solutions delivered at Deloitte USI & Capgemini',
    accentText: 'text-violet-700 dark:text-violet-400',
    lineFrom: 'from-transparent to-violet-400',
    lineTo: 'from-transparent to-violet-400',
    headingGradient: 'from-violet-600 via-indigo-600 to-violet-600 dark:from-violet-400 dark:via-indigo-400 dark:to-violet-400',
    underline: 'from-violet-500 via-indigo-500 to-violet-500',
    cardShadow: 'hover:shadow-violet-500/20',
    badge: 'from-violet-500 to-indigo-500 shadow-violet-500/20 group-hover:shadow-violet-500/40',
    titleHover: 'group-hover:from-violet-400 group-hover:to-indigo-400',
    techHover: 'hover:from-violet-600/20 hover:to-indigo-600/20',
    mediaShadow: 'shadow-violet-500/10 group-hover:shadow-violet-500/30',
    corner: 'border-violet-400',
    codeHover: 'hover:text-violet-400',
    demoBtn: 'from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 shadow-violet-500/20 hover:shadow-violet-500/40',
    bottomBar: 'from-violet-500 to-indigo-500',
    cta: 'from-violet-500/10 to-indigo-500/10 hover:shadow-violet-500/20',
    ctaHover: 'from-violet-600 to-indigo-600',
  },
  github: {
    label: 'GitHub Repositories',
    title: 'GitHub Projects',
    description: 'Priority repos on top · README live links · then other demos · practice repos last',
    accentText: 'text-cyan-700 dark:text-cyan-400',
    lineFrom: 'from-transparent to-cyan-400',
    lineTo: 'from-transparent to-cyan-400',
    headingGradient: 'from-cyan-600 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400',
    underline: 'from-cyan-500 via-blue-500 to-cyan-500',
    cardShadow: 'hover:shadow-cyan-500/20',
    badge: 'from-cyan-500 to-blue-500 shadow-cyan-500/20 group-hover:shadow-cyan-500/40',
    titleHover: 'group-hover:from-cyan-400 group-hover:to-blue-400',
    techHover: 'hover:from-cyan-600/20 hover:to-blue-600/20',
    mediaShadow: 'shadow-cyan-500/10 group-hover:shadow-cyan-500/30',
    corner: 'border-cyan-400',
    codeHover: 'hover:text-cyan-400',
    demoBtn: 'from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/20 hover:shadow-cyan-500/40',
    bottomBar: 'from-cyan-500 to-blue-500',
    cta: 'from-cyan-500/10 to-blue-500/10 hover:shadow-cyan-500/20',
    ctaHover: 'from-cyan-600 to-blue-600',
  },
  featured: {
    label: 'Personal Projects',
    title: 'Featured Personal Projects',
    description: 'Full-stack apps, GenAI tools & portfolio builds with production-ready features',
    accentText: 'text-emerald-700 dark:text-emerald-400',
    lineFrom: 'from-transparent to-emerald-400',
    lineTo: 'from-transparent to-emerald-400',
    headingGradient: 'from-emerald-600 via-teal-600 to-emerald-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400',
    underline: 'from-emerald-500 via-teal-500 to-emerald-500',
    cardShadow: 'hover:shadow-emerald-500/20',
    badge: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 group-hover:shadow-emerald-500/40',
    titleHover: 'group-hover:from-emerald-400 group-hover:to-teal-400',
    techHover: 'hover:from-emerald-600/20 hover:to-teal-600/20',
    mediaShadow: 'shadow-emerald-500/10 group-hover:shadow-emerald-500/30',
    corner: 'border-emerald-400',
    codeHover: 'hover:text-emerald-400',
    demoBtn: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20 hover:shadow-emerald-500/40',
    bottomBar: 'from-emerald-500 to-teal-500',
    cta: 'from-emerald-500/10 to-teal-500/10 hover:shadow-emerald-500/20',
    ctaHover: 'from-emerald-600 to-teal-600',
  },
  ml: {
    label: 'AI / ML / GenAI',
    title: 'Applied AI, ML & GenAI Projects',
    description: 'CNN, NLP, time-series, GenAI & explainable ML — hands-on applied projects',
    accentText: 'text-orange-700 dark:text-orange-400',
    lineFrom: 'from-transparent to-orange-400',
    lineTo: 'from-transparent to-orange-400',
    headingGradient: 'from-orange-600 via-amber-600 to-orange-600 dark:from-orange-400 dark:via-amber-400 dark:to-orange-400',
    underline: 'from-orange-500 via-amber-500 to-orange-500',
    cardShadow: 'hover:shadow-orange-500/20',
    badge: 'from-orange-500 to-amber-500 shadow-orange-500/20 group-hover:shadow-orange-500/40',
    titleHover: 'group-hover:from-orange-400 group-hover:to-amber-400',
    techHover: 'hover:from-orange-600/20 hover:to-amber-600/20',
    mediaShadow: 'shadow-orange-500/10 group-hover:shadow-orange-500/30',
    corner: 'border-orange-400',
    codeHover: 'hover:text-orange-400',
    demoBtn: 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20 hover:shadow-orange-500/40',
    bottomBar: 'from-orange-500 to-amber-500',
    cta: 'from-orange-500/10 to-amber-500/10 hover:shadow-orange-500/20',
    ctaHover: 'from-orange-600 to-amber-600',
  },
  html: {
    label: 'Frontend Showcase',
    title: 'HTML & CSS Projects',
    description: 'Responsive landing pages, UI clones & Tailwind designs',
    accentText: 'text-purple-700 dark:text-purple-400',
    lineFrom: 'from-transparent to-purple-400',
    lineTo: 'from-transparent to-purple-400',
    headingGradient: 'from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400',
    underline: 'from-purple-500 via-pink-500 to-purple-500',
    cardShadow: 'hover:shadow-purple-500/20',
    badge: 'from-purple-500 to-pink-500 shadow-purple-500/20 group-hover:shadow-purple-500/40',
    titleHover: 'group-hover:from-purple-400 group-hover:to-pink-400',
    techHover: 'hover:from-purple-600/20 hover:to-pink-600/20',
    mediaShadow: 'shadow-purple-500/10 group-hover:shadow-purple-500/30',
    corner: 'border-purple-400',
    codeHover: 'hover:text-purple-400',
    demoBtn: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/20 hover:shadow-purple-500/40',
    bottomBar: 'from-purple-500 to-pink-500',
    cta: 'from-purple-500/10 to-pink-500/10 hover:shadow-purple-500/20',
    ctaHover: 'from-purple-600 to-pink-600',
  },
};

const SectionDivider = ({ label }) => (
  <div className="relative my-10">
    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
    <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 px-3 bg-white dark:bg-gray-950 text-subtle text-[10px] tracking-widest uppercase">
      {label}
    </div>
  </div>
);

const CompanyProjectCard = ({ project }) => (
  <article
    className={`group relative card-surface rounded-xl overflow-hidden border-l-[3px] ${project.borderAccent} hover:border-violet-400/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
  >
    {project.logoUrl && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <img
          src={project.logoUrl}
          alt=""
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 opacity-25 dark:opacity-30 select-none object-contain"
        />
      </div>
    )}

    <div className="relative z-10 px-3.5 py-2.5 border-b border-gray-200/80 dark:border-gray-700/50 bg-white/92 dark:bg-gray-900/88">
      <div className="flex items-center gap-2.5">
        {project.logoUrl ? (
          <div className="shrink-0 w-11 h-11 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center p-1.5">
            <img
              src={project.logoUrl}
              alt={project.company}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
            <Building2 className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{project.company}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-subtle">
            <span className="flex items-center gap-0.5">
              <Calendar className="w-2.5 h-2.5" />
              {project.duration}
            </span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" />
              {project.location}
            </span>
          </div>
        </div>
        <span className={`shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full ${project.badgeBg} ${project.badgeText}`}>
          Enterprise
        </span>
      </div>
    </div>

    <div className="relative z-10 p-3.5 flex flex-col flex-1 bg-white/88 dark:bg-gray-900/80">
      <h3 className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.color} leading-snug mb-1`}>
        {project.projectName}
      </h3>
      <p className="text-[11px] text-cyan-700 dark:text-cyan-300 mb-2.5">{project.role}</p>

      <ul className="space-y-1.5 flex-1">
        {project.description.map((line, idx) => (
          <li key={idx} className="flex items-start text-[11px] text-muted leading-snug">
            <ChevronRight className="w-3 h-3 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
            <span className="ml-1">{line}</span>
          </li>
        ))}
      </ul>

      {project.dataSources?.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-700/50">
          <p className="text-[9px] font-semibold text-subtle uppercase tracking-wider mb-2">
            {project.dataSourceTheme === 'purple'
              ? 'Knowledge Bases & Integrations'
              : 'Labor Market & Talent Data Sources'}
          </p>
          <div className="space-y-1.5">
            {project.dataSources.map((source) => (
              <div
                key={source.platform}
                className={
                  project.dataSourceTheme === 'purple'
                    ? 'rounded-lg bg-purple-50/80 dark:bg-purple-500/5 border border-purple-200/60 dark:border-purple-500/15 px-2.5 py-2'
                    : 'rounded-lg bg-emerald-50/80 dark:bg-emerald-500/5 border border-emerald-200/60 dark:border-emerald-500/15 px-2.5 py-2'
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                  <p
                    className={
                      project.dataSourceTheme === 'purple'
                        ? 'text-[11px] font-semibold text-purple-800 dark:text-purple-300'
                        : 'text-[11px] font-semibold text-emerald-800 dark:text-emerald-300'
                    }
                  >
                    {source.platform}
                  </p>
                  <span
                    className={
                      project.dataSourceTheme === 'purple'
                        ? 'text-[9px] font-medium text-purple-700/80 dark:text-purple-400/80 bg-purple-100 dark:bg-purple-500/10 px-1.5 py-px rounded'
                        : 'text-[9px] font-medium text-emerald-700/80 dark:text-emerald-400/80 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-px rounded'
                    }
                  >
                    {source.frequency}
                  </span>
                </div>
                <p className="text-[10px] text-muted leading-snug mb-1">{source.dataType}</p>
                <p className="text-[9px] text-subtle">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Ingestion:</span> {source.ingestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-700/50">
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span key={tech} className="skill-chip-sm">{tech}</span>
          ))}
        </div>
      </div>
    </div>

    <div className={`relative h-0.5 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
  </article>
);

const FeaturedProjectCard = ({ project, config }) => (
  <div className={`group relative card-surface rounded-xl overflow-hidden hover:border-emerald-400/40 hover:-translate-y-0.5 hover:shadow-lg ${config.cardShadow} transition-all duration-300 flex flex-col h-full`}>
    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className={`absolute top-2 left-2 text-[10px] font-medium rounded-full bg-gradient-to-r ${config.badge} text-white px-2 py-0.5 shadow-sm`}>
        {project.category}
      </span>
      {project.deployedLink && (
        <a
          href={project.deployedLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-gradient-to-r ${config.demoBtn} transition-all`}
        >
          Live
        </a>
      )}
    </div>

    <div className="p-3.5 flex flex-col flex-1">
      <h3 className={`text-sm font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${config.titleHover} transition-all mb-1 leading-snug`}>
        {project.title}
      </h3>
      <p className="text-[11px] text-muted leading-snug line-clamp-2 mb-2">{project.description}</p>

      <div className="flex flex-wrap gap-1 mb-2">
        {project.highlights.slice(0, 3).map((item) => (
          <span
            key={item}
            className="text-[9px] text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 px-1.5 py-px rounded"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 5).map((tech) => (
          <span key={tech} className="skill-chip-sm">{tech}</span>
        ))}
        {project.tech.length > 5 && (
          <span className="skill-chip-sm">+{project.tech.length - 5}</span>
        )}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-200 dark:border-gray-700/50">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-[11px] text-subtle ${config.codeHover} transition-colors`}
        >
          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        {project.deployedLink && (
          <a
            href={project.deployedLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-[11px] font-medium px-2.5 py-1 rounded-md bg-gradient-to-r ${config.demoBtn} text-white hover:opacity-90 transition-all`}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>

    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.bottomBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
  </div>
);

const MLProjectCard = ({ project, config }) => {
  const style = ML_CATEGORY_STYLES[project.category] || ML_CATEGORY_STYLES.GenAI;

  return (
    <article
      className={`group relative card-surface rounded-xl overflow-hidden border-l-[3px] ${style.accent} hover:border-orange-400/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full`}
    >
      <div className="relative h-28 sm:h-32 overflow-hidden shrink-0 bg-gray-900">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-amber-600/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-black/25 to-transparent" />

        <div className="relative z-10 flex items-start justify-between gap-2 p-2.5">
          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${style.badge}`}>
            {project.category}
          </span>
          <div className="w-7 h-7 rounded-md bg-white/90 dark:bg-gray-900/80 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            {project.category === 'GenAI' ? (
              <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            ) : (
              <Brain className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            )}
          </div>
        </div>
      </div>

      <div className="relative p-3.5 flex flex-col flex-1 bg-white/95 dark:bg-gray-900/90">
        <h3
          className={`text-sm font-bold text-gray-900 dark:text-white mb-1.5 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${config.titleHover} transition-all`}
        >
          {project.title}
        </h3>
        <p className="text-[11px] text-muted leading-snug line-clamp-3 mb-3 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-200 dark:border-gray-700/50">
          {project.tech.map((tech) => (
            <span key={tech} className="skill-chip-sm">{tech}</span>
          ))}
        </div>
      </div>

      <div className={`h-0.5 bg-gradient-to-r ${config.bottomBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
    </article>
  );
};

const ProjectCard = ({ project, theme, index, setActiveProject, compact = false, showDemo = true }) => {
  const config = sectionThemes[theme];

  return (
    <div
      className={`group relative card-surface ${compact ? 'p-3 rounded-lg hover:-translate-y-1' : 'p-6 rounded-xl hover:-translate-y-2'} hover:shadow-xl ${config.cardShadow} transition-all duration-500`}
      style={{
        animationDelay: `${index * 100}ms`,
        transitionDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setActiveProject(project.id)}
      onMouseLeave={() => setActiveProject(null)}
    >
      <div className={compact ? 'mb-2' : 'mb-4'}>
        <span className={`inline-block font-medium rounded-full bg-gradient-to-r ${config.badge} text-white shadow-lg transition-all duration-300 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`}>
          {project.category}
        </span>
      </div>

      <h3 className={`font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${config.titleHover} transition-all duration-300 ${compact ? 'text-sm mb-1.5 line-clamp-2' : 'text-xl mb-3'}`}>
        {project.title}
      </h3>

      {!compact && (
        <p className="text-muted text-sm mb-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{project.description}</p>
      )}

      <div className={`flex flex-wrap gap-1.5 ${compact ? 'mb-2' : 'gap-2 mb-6'}`}>
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className={`rounded-md bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-transparent hover:bg-gradient-to-r ${config.techHover} hover:text-gray-900 dark:hover:text-white transition-all duration-300 ${compact ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'}`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className={`relative rounded-lg overflow-hidden ${compact ? 'mb-2' : 'mb-6'}`}>
        {project.videoUrl && (
          <div className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-lg ${config.mediaShadow} transition-all duration-500 ${compact ? 'aspect-[4/3]' : 'aspect-video'}`}>
            <video
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              controls
              loop
              muted
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!compact && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${config.demoBtn} text-white group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        {project.imageUrl && !project.videoUrl && (
          <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${config.mediaShadow} transition-all duration-500 ${compact ? 'aspect-[4/3]' : 'aspect-video'}`}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </div>
        )}
      </div>

      <div className={`flex justify-between items-center mt-auto ${compact ? 'gap-1' : ''}`}>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-gray-400 ${config.codeHover} transition-colors duration-300 ${compact ? 'text-[10px]' : 'text-sm'}`}
        >
          <svg className={`mr-0.5 group-hover:animate-bounce ${compact ? 'w-3 h-3' : 'w-4 h-4 mr-1'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Code
        </a>
        {showDemo && project.deployedLink && (
          <a
            href={project.deployedLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center font-medium rounded-lg bg-gradient-to-r ${config.demoBtn} text-white transition-all duration-300 shadow-lg hover:scale-105 ${compact ? 'px-2 py-1 text-[10px]' : 'px-4 py-2 text-sm'}`}
          >
            <svg className={`${compact ? 'w-2.5 h-2.5 mr-0.5' : 'w-4 h-4 mr-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            {compact ? 'Demo' : 'Live Demo'}
          </a>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bottomBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl`}></div>
    </div>
  );
};

const Projects = () => {
  const [, setActiveProject] = useState(null);
  const companyConfig = sectionThemes.company;
  const githubConfig = sectionThemes.github;
  const featuredConfig = sectionThemes.featured;
  const mlConfig = sectionThemes.ml;
  const htmlConfig = sectionThemes.html;
  const liveDemoCount = githubProjects.filter((p) => p.deployedLink).length;

  return (
    <SectionShell id="projects" maxWidth="max-w-7xl" accent="violet">
        <div id="company-projects">
          <SectionHeader config={companyConfig} />

          <SectionStats
            stats={[
              { label: 'Companies', value: '2' },
              { label: 'Enterprise', value: enterpriseProjects.length },
              { label: 'Stack', value: 'AWS · Azure' },
            ]}
          />

          <div className="grid sm:grid-cols-2 gap-3 mb-2">
            {enterpriseProjects.map((project) => (
              <CompanyProjectCard key={project.id} project={project} />
            ))}
          </div>

          <p className="text-center text-[10px] text-subtle mb-2">
            Detailed timeline in{' '}
            <a href="#experience" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
              Work Experience
            </a>
          </p>
        </div>

        <div id="ml-projects">
          <SectionDivider label="AI / ML / GenAI" />

          <SectionHeader config={mlConfig} />

          <SectionStats
            stats={[
              { label: 'Projects', value: mlProjects.length },
              { label: 'Domains', value: '8' },
              { label: 'Focus', value: 'CV · NLP · GenAI' },
            ]}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
            {mlProjects.map((project) => (
              <MLProjectCard key={project.title} project={project} config={mlConfig} />
            ))}
          </div>
        </div>

        <SectionDivider label="Open Source" />

        <SectionHeader config={githubConfig} />

        <SectionStats
          stats={[
            { label: 'Repositories', value: githubProjects.length },
            { label: 'Live Demos', value: liveDemoCount },
            { label: 'GenAI / ML', value: '12+' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {githubProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              theme="github"
              index={index}
              setActiveProject={setActiveProject}
              compact
              showDemo
            />
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-12">
          <a
            href="https://github.com/satyamjaysawal"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${githubConfig.demoBtn} text-white text-xs font-medium hover:opacity-90 transition-all`}
          >
            View All on GitHub
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <SectionDivider label="Personal Projects" />

        <SectionHeader config={featuredConfig} />

        <SectionStats
          stats={[
            { label: 'Projects', value: featuredProjects.length },
            { label: 'Full Stack', value: '4' },
            { label: 'GenAI', value: '2' },
          ]}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} config={featuredConfig} />
          ))}
        </div>

        <SectionDivider label="Frontend Projects" />

        <SectionHeader config={htmlConfig} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {htmlCssProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              theme="html"
              index={index}
              setActiveProject={setActiveProject}
              compact
            />
          ))}
        </div>
    </SectionShell>
  );
};

export default Projects;