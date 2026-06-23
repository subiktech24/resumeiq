/**
 * resumeAnalyzer.js  –  ResumeIQ v2
 * ATS Scoring + Job Role Match Engine
 */

/* ── Skill Registry ── */
export const ALL_SKILLS = [
  { id: 'python',          label: 'Python',          icon: '🐍', cat: 'Programming' },
  { id: 'javascript',      label: 'JavaScript',      icon: '⚡', cat: 'Programming' },
  { id: 'react',           label: 'React',           icon: '⚛️', cat: 'Frontend'    },
  { id: 'sql',             label: 'SQL',             icon: '🗄️', cat: 'Database'    },
  { id: 'nodejs',          label: 'Node.js',         icon: '🟢', cat: 'Backend'     },
  { id: 'aws',             label: 'AWS',             icon: '☁️', cat: 'Cloud'       },
  { id: 'docker',          label: 'Docker',          icon: '🐳', cat: 'DevOps'      },
  { id: 'ml',              label: 'Machine Learning',icon: '🤖', cat: 'AI/ML'       },
  { id: 'dl',              label: 'Deep Learning',   icon: '🧬', cat: 'AI/ML'       },
  { id: 'ai',              label: 'AI',              icon: '🧠', cat: 'AI/ML'       },
  { id: 'communication',   label: 'Communication',   icon: '💬', cat: 'Soft Skills' },
  { id: 'problemsolving',  label: 'Problem Solving', icon: '🧩', cat: 'Soft Skills' },
  { id: 'leadership',      label: 'Leadership',      icon: '🎯', cat: 'Soft Skills' },
  { id: 'teamwork',        label: 'Teamwork',        icon: '🤝', cat: 'Soft Skills' },
  { id: 'git',             label: 'Git',             icon: '🔀', cat: 'DevOps'      },
  { id: 'restapi',         label: 'REST API',        icon: '🔌', cat: 'Backend'     },
];

/* ── Skill Detection Patterns ── */
const PATTERNS = {
  python:         /\bpython\b/i,
  javascript:     /\b(javascript|js|es6|typescript|ts)\b/i,
  react:          /\b(react\.?js?|react|jsx|redux|zustand|next\.?js)\b/i,
  sql:            /\b(sql|mysql|postgresql|postgres|sqlite|oracle|nosql|mongodb)\b/i,
  nodejs:         /\b(node\.?js|nodejs|express\.?js|express|fastify|nestjs)\b/i,
  aws:            /\b(aws|amazon web services|ec2|s3|lambda|rds|cloudfront|eks)\b/i,
  docker:         /\b(docker|kubernetes|k8s|container|helm|compose|devops)\b/i,
  ml:             /\b(machine learning|ml|scikit|sklearn|xgboost|lightgbm|random forest)\b/i,
  dl:             /\b(deep learning|dl|tensorflow|keras|pytorch|neural network|cnn|rnn|lstm|transformer)\b/i,
  ai:             /\b(artificial intelligence|ai|llm|gpt|nlp|computer vision|generative ai|langchain)\b/i,
  communication:  /\b(communication|presentation|stakeholder|client|verbal|written|articulate)\b/i,
  problemsolving: /\b(problem.?solving|analytical|critical thinking|debugging|troubleshoot|algorithm)\b/i,
  leadership:     /\b(leadership|lead|managed|mentored|team lead|mentor|directed|architected)\b/i,
  teamwork:       /\b(teamwork|collaboration|agile|scrum|cross.?functional|pair programming|sprint)\b/i,
  git:            /\b(git|github|gitlab|bitbucket|version control|ci\/cd|cicd|pipeline)\b/i,
  restapi:        /\b(rest.?api|restful|api|graphql|grpc|microservice|webhook|swagger|openapi)\b/i,
};

/* ── Job Role Definitions ── */
export const JOB_ROLES = [
  {
    id: 'ai-engineer',
    label: 'AI Engineer',
    icon: '🧠',
    color: '#8b5cf6',
    skills: ['python','ml','dl','ai','sql','aws','git'],
    description: 'Builds and deploys AI/ML systems at scale',
  },
  {
    id: 'frontend-developer',
    label: 'Frontend Developer',
    icon: '⚛️',
    color: '#06b6d4',
    skills: ['javascript','react','git','restapi','problemsolving','communication'],
    description: 'Crafts exceptional user interfaces and experiences',
  },
  {
    id: 'backend-developer',
    label: 'Backend Developer',
    icon: '🟢',
    color: '#10b981',
    skills: ['python','nodejs','sql','restapi','docker','aws','git'],
    description: 'Engineers scalable server-side systems and APIs',
  },
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    icon: '📊',
    color: '#f59e0b',
    skills: ['python','sql','ml','communication','problemsolving','git'],
    description: 'Transforms raw data into actionable business insights',
  },
  {
    id: 'fullstack-developer',
    label: 'Full Stack Developer',
    icon: '⚡',
    color: '#6366f1',
    skills: ['javascript','react','nodejs','sql','restapi','git','docker'],
    description: 'Builds complete web products from UI to infrastructure',
  },
  {
    id: 'ml-engineer',
    label: 'ML Engineer',
    icon: '🤖',
    color: '#ec4899',
    skills: ['python','ml','dl','sql','aws','git','docker'],
    description: 'Productionizes ML models into reliable, scalable services',
  },
  {
    id: 'devops-engineer',
    label: 'DevOps Engineer',
    icon: '🐳',
    color: '#14b8a6',
    skills: ['docker','aws','git','nodejs','python','problemsolving','teamwork'],
    description: 'Owns CI/CD pipelines, infrastructure, and deployment',
  },
  {
    id: 'data-scientist',
    label: 'Data Scientist',
    icon: '🔬',
    color: '#a855f7',
    skills: ['python','ml','dl','sql','ai','communication','problemsolving'],
    description: 'Researches and develops data-driven solutions',
  },
];

/* ── Suggestion Database ── */
const SUGGESTION_DB = {
  python:         'Showcase Python projects with real-world datasets or automation scripts. Mention frameworks like FastAPI, Django, or Pandas.',
  javascript:     'Include ES6+ JavaScript experience. Highlight async/await patterns, modern tooling (Vite, Webpack), and TypeScript usage.',
  react:          'Demonstrate React proficiency via state management (Redux/Zustand), custom hooks, performance optimization, and testing.',
  sql:            'Add database work — complex queries, indexing, ORM usage (SQLAlchemy/Sequelize), or schema design experience.',
  nodejs:         'Include backend Node.js projects — RESTful APIs, Express.js middleware design, or microservices architecture.',
  aws:            'Cloud certifications (AWS Cloud Practitioner or Solutions Architect) can dramatically boost your ATS ranking.',
  docker:         'Mention containerization — Dockerfile authoring, Docker Compose, and container orchestration with Kubernetes.',
  ml:             'Showcase end-to-end ML projects: data preprocessing → model training → evaluation → deployment. Mention Scikit-learn.',
  dl:             'Add neural network projects using PyTorch or TensorFlow. Even fine-tuning a pre-trained model counts significantly.',
  ai:             'Highlight LLM/GenAI work — prompt engineering, RAG pipelines, fine-tuning, or building AI-powered product features.',
  communication:  'Quantify soft skills: "Presented to 30+ stakeholders", "Led weekly sprint reviews", or "Authored technical documentation".',
  problemsolving: 'Mention competitive programming (LeetCode, HackerRank), open-source contributions, or complex bug-fix case studies.',
  leadership:     'Use action verbs: "Led a team of 5 engineers", "Mentored 3 junior devs", "Architected the core authentication system".',
  teamwork:       'Highlight Agile/Scrum experience, cross-functional collaborations, pair programming sessions, or hackathon projects.',
  git:            'Mention Git workflows (GitFlow, trunk-based), CI/CD pipelines (GitHub Actions, Jenkins), and code review practices.',
  restapi:        'Show REST API design skills — OpenAPI docs, authentication (JWT/OAuth), rate limiting, versioning, and testing.',
};

/* ── Strong/Weak Area Messages ── */
const STRENGTH_BY_LEVEL = {
  excellent: [
    'Exceptional technical breadth — your skill set is a powerful differentiator in competitive markets.',
    'Your profile strongly aligns with industry demands. Senior-level roles are well within reach.',
    'Outstanding resume strength. You demonstrate the multi-stack expertise top employers seek.',
  ],
  average: [
    'Solid technical foundation with clear, targeted areas for growth.',
    'Good core competencies — closing 2–3 skill gaps will significantly accelerate your job search.',
    'Promising profile. Adding cloud and DevOps depth will push your score into the excellent tier.',
  ],
  poor: [
    'Focus on building 2–3 strong portfolio projects that demonstrate in-demand technologies.',
    'Targeted upskilling in Python, JavaScript, or Cloud will have the highest ROI for your career.',
    'Your resume needs strategic optimization — start with the high-priority suggestions below.',
  ],
};

/* ── File Reader ── */
const readFileAsText = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result || '');
    reader.onerror = () => resolve('');
    reader.readAsText(file, 'utf-8');
  });

/* ── Main Analysis Engine ── */
export const analyzeResume = async (file, jobRoleId) => {
  await new Promise(r => setTimeout(r, 3600)); // Realistic delay

  const text = await readFileAsText(file);

  // ─ Detect all skills ─
  const foundSkills = [];
  const missingSkills = [];

  ALL_SKILLS.forEach(skill => {
    if (PATTERNS[skill.id]?.test(text)) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // ─ ATS Score ─
  const baseATS = Math.round((foundSkills.length / ALL_SKILLS.length) * 100);
  const textBonus = Math.min((text.length / 8000) * 6, 6);
  const atsScore = Math.min(Math.round(baseATS + textBonus), 100);

  // ─ Job Match Score ─
  const jobRole = JOB_ROLES.find(r => r.id === jobRoleId) || JOB_ROLES[0];
  const requiredSkillIds = jobRole.skills;
  const matchedJobSkills = foundSkills.filter(s => requiredSkillIds.includes(s.id));
  const missingJobSkills = ALL_SKILLS.filter(
    s => requiredSkillIds.includes(s.id) && !foundSkills.find(f => f.id === s.id)
  );
  const jobMatchScore = Math.round((matchedJobSkills.length / requiredSkillIds.length) * 100);

  // ─ Strength level ─
  const level = atsScore >= 70 ? 'excellent' : atsScore >= 42 ? 'average' : 'poor';
  const msgs = STRENGTH_BY_LEVEL[level];
  const strengthMessage = msgs[Math.floor(Math.random() * msgs.length)];

  // ─ Strong Areas (categories well represented) ─
  const catCounts = {};
  foundSkills.forEach(s => { catCounts[s.cat] = (catCounts[s.cat] || 0) + 1; });
  const strongAreas = Object.entries(catCounts)
    .filter(([, c]) => c >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([cat, count]) => ({ cat, count }));

  // ─ Weak Areas (categories missing) ─
  const allCats = [...new Set(ALL_SKILLS.map(s => s.cat))];
  const weakAreas = allCats
    .filter(cat => !catCounts[cat])
    .map(cat => ({
      cat,
      missing: ALL_SKILLS.filter(s => s.cat === cat),
    }));

  // ─ Suggestions (missing skills, job-role misses first) ─
  const suggestions = missingSkills.map(skill => ({
    ...skill,
    suggestion: SUGGESTION_DB[skill.id] || `Add ${skill.label} to your resume with concrete project examples.`,
    priority: missingJobSkills.find(s => s.id === skill.id) ? 'critical' : 'recommended',
  })).sort((a, b) => {
    const order = { critical: 0, recommended: 1 };
    return order[a.priority] - order[b.priority];
  });

  // ─ Score labels ─
  const scoreLabel = (s) =>
    s >= 75 ? 'Excellent' : s >= 50 ? 'Average' : 'Needs Work';
  const scoreColor = (s) =>
    s >= 75 ? 'var(--color-success)' : s >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';

  return {
    atsScore,
    atsLabel:       scoreLabel(atsScore),
    atsColor:       scoreColor(atsScore),
    jobMatchScore,
    jobMatchLabel:  scoreLabel(jobMatchScore),
    jobMatchColor:  scoreColor(jobMatchScore),
    jobRole,
    matchedJobSkills,
    missingJobSkills,
    foundSkills,
    missingSkills,
    strongAreas,
    weakAreas,
    suggestions,
    strengthMessage,
    strengthLevel: level,
    stats: {
      totalSkills:   ALL_SKILLS.length,
      skillsFound:   foundSkills.length,
      skillsMissing: missingSkills.length,
      jobMatch:      jobMatchScore,
    },
    meta: {
      fileName:   file.name,
      fileSize:   `${(file.size / 1024).toFixed(1)} KB`,
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  };
};
