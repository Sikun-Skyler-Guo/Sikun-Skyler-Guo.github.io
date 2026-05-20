export const site = {
  title: 'Sikun Guo',
  nativeTitle: '郭司坤',
  fullTitle: 'Sikun Guo (郭司坤)',
  homeTitle: 'Sikun Guo (郭司坤) | PhD Candidate at the University of Virginia',
  description:
    'Sikun Guo (郭司坤) is a PhD Candidate in Computer Science at the University of Virginia studying reasoning with large language models, in-context learning, knowledge recruitment, and foundation models for scientific discovery.',
  url: 'https://sikun-skyler-guo.github.io',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/publications', label: 'Publications' },
    { href: '/projects', label: 'Projects' },
    { href: '/cv', label: 'CV' },
  ],
};

export const profile = {
  name: 'Sikun Guo',
  nativeName: '郭司坤',
  displayName: 'Sikun Guo (郭司坤)',
  role: 'PhD Candidate in Computer Science, University of Virginia',
  location: 'Charlottesville, VA',
  country: 'United States',
  email: 'qkm6sq@virginia.edu',
  tagline:
    'I study how large language models recruit, refine, and use their internal knowledge for scientific reasoning and discovery.',
  intro:
    'I am Sikun Guo (郭司坤), a PhD Candidate in Computer Science at the University of Virginia in the RealAI Lab, advised by Prof. Aidong Zhang. My research studies reasoning with large language models, theories of in-context learning, knowledge recruitment failures, and foundation models for scientific discovery. Recent work includes causal evidence that models can know the clue while missing the answer, curiosity-driven questioning for research ideation, inference-time adversarial and reinforcement learning for idea optimization, truthfulness evaluation for scientific hypotheses, and graph-based biomedical discovery. Outside research, I follow financial markets and trading, play table tennis, sing, and enjoy road trips.',
  advisorName: 'Prof. Aidong Zhang',
  advisorUrl: 'https://www.cs.virginia.edu/~az9eg/website/home.html',
  affiliation: 'RealAI Lab, University of Virginia',
  worksFor: 'University of Virginia',
  alumniOf: ['University of Virginia', 'Nankai University'],
  cvHref: '/Sikun_Guo_CV.pdf',
  collaborationNote:
    'Research areas: LLM reasoning, knowledge recruitment and in-context learning, inference-time learning, graph neural networks, AI for Science, and autonomous AI research systems.',
  links: [
    { label: 'Email', href: 'mailto:qkm6sq@virginia.edu', tracking: 'click-email' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=h2oGOaQAAAAJ', tracking: 'click-google-scholar' },
    { label: 'GitHub', href: 'https://github.com/Sikun-Skyler-Guo', tracking: 'click-github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sikun-guo/en', tracking: 'click-linkedin' },
  ],
  sameAs: [
    'https://scholar.google.com/citations?user=h2oGOaQAAAAJ',
    'https://github.com/Sikun-Skyler-Guo',
    'https://www.linkedin.com/in/sikun-guo/en',
  ],
  researchAreas: [
    'Reasoning with large language models',
    'Knowledge recruitment and in-context learning',
    'Inference-time learning for research ideation',
    'Foundation models for scientific discovery',
    'Graph neural networks and structured scientific knowledge',
  ],
  recentWork: [
    'NeurIPS 2026 under review',
    'KDD 2026',
    'IEEE ICDM 2025 Best Paper Award',
    'Bioinformatics 2025',
    'EMNLP 2025',
    'IJCAI 2025',
    'SDM 2025',
    'IEEE BigData 2024',
  ],
};

export const homepage = {
  heroEyebrow:
    'LLM reasoning · knowledge recruitment · inference-time learning · AI for Science',
  heroTitle:
    'Studying how language models recruit knowledge for scientific discovery',
  heroBody:
    'My research asks why large language models can appear to know the right clues but still fail to produce reliable scientific answers. I study knowledge recruitment, in-context learning, and inference-time optimization so foundation models can better generate, critique, and refine research ideas and hypotheses. The broader goal is to make AI systems more capable scientific collaborators: grounded, inspectable, and useful in real research workflows.',
  metaDescription:
    'Sikun Guo (郭司坤) is a PhD Candidate at the University of Virginia working on large language model reasoning, knowledge recruitment, in-context learning, inference-time learning, graph neural networks, and AI for Science.',
  agendaTitle: 'One research problem, several technical fronts',
  agendaIntro:
    'I work on a single underlying question: how can foundation models reliably use the knowledge they already contain? That question appears in different forms—causal analysis of knowledge recruitment failures, curiosity-driven ideation, inference-time optimization, truthfulness evaluation, and graph-based scientific modeling—but the agenda is consistent.',
  visionTitle: 'Long-term direction',
  visionBody:
    'My long-term goal is to help build autonomous AI research systems that make serious research more widely accessible. High-quality research capacity is still concentrated in a relatively small number of institutions and teams. If AI systems can better use learned knowledge, reason more reliably, and interact productively with structured scientific evidence, they can broaden who gets to do meaningful research and at what scale.',
  openclawTitle: 'OpenClaw: designing an operating system for AI agent organizations',
  openclawBody:
    'OpenClaw is where I turn ideas about long-horizon reasoning, coordination, and memory into an actual system. The operating-system design is organized around three principles: departmentalized agents instead of one monolithic assistant, layered external memory instead of hidden context, and self-evolution through explicit write-back to skills, docs, and workspace artifacts. In practice, the system learns from user–agent interaction and from the outcomes of agent–agent collaboration, which makes it feel much closer to an in-context reinforcement-learning loop than to a static prompt wrapper. I include it here because it reflects a style of work I care about: turning research questions into concrete, inspectable systems.',
};

export const cvData = {
  education: [
    {
      institution: 'University of Virginia',
      degree: 'PhD in Computer Science',
      years: '08/2023–Present',
      details:
        'GPA 4.000 · Research focus: reasoning with large language models, theories of in-context learning, and foundation models for scientific discovery · Advisor: Prof. Aidong Zhang',
    },
    {
      institution: 'University of Virginia',
      degree: 'M.S. in Computer Science',
      years: '08/2021–12/2022',
      details:
        'GPA 3.918 · Thesis: robust graph neural networks via adaptive aggregator selection and long-range dependency modeling · Advisor: Prof. Hongning Wang',
    },
    {
      institution: 'Nankai University',
      degree: 'B.S. in Electronic Information Science and Technology',
      years: '08/2017–06/2021',
      details:
        'GPA: top 33% · Thesis: low-pass filters based on ferromagnetic substance powder · Advisor: Prof. Lu Ji',
    },
  ],
  experience: [
    {
      org: 'RealAI Lab, University of Virginia',
      title: 'Research Assistant',
      years: '01/2024–Present',
      bullets: [
        'Studies foundation models for scientific discovery, including research ideation, hypothesis generation, and scientific reasoning.',
        'Released IdeaBench for benchmarking LLM-based research idea generation.',
        'Developed inference-time adversarial and reinforcement learning approaches for improving ideation quality.',
        'Proposed curiosity-driven questioning for engine-agnostic research ideation and studied knowledge recruitment failures in LLMs.',
      ],
    },
    {
      org: 'Autoscience Institute',
      title: 'Research Scientist Intern',
      years: '07/2025–08/2025',
      bullets: [
        'Automated scientific ideation rating with LLMs by building an agentic evaluation system for automatic scientific ideation rating.',
      ],
    },
    {
      org: 'Information and Language Processing Lab, University of Virginia',
      title: 'Research Assistant',
      years: '08/2023–12/2023',
      bullets: [
        'Studied hallucination mechanisms in large language models.',
        'Designed an inter-layer token-probability total-variation decoding strategy for inducing hallucination behavior.',
      ],
    },
    {
      org: 'Human-Centric Data Mining Group, University of Virginia',
      title: 'Research Assistant',
      years: '01/2022–08/2023',
      bullets: [
        'Designed GalNN, a robust graph neural network using PyTorch and PyG for adversarial structural attacks across homophily regimes.',
      ],
    },
    {
      org: 'Sensing Systems for Health Lab, University of Virginia',
      title: 'Research Assistant',
      years: '01/2022–06/2022',
      bullets: [
        'Worked on RadioSleep, a non-contact sleep-monitoring project using radio waves for patients with sleep disorders.',
        'Published a survey on graph neural networks in IoT with collaborators.',
      ],
    },
    {
      org: 'Radio Frequency Electromagnetic Waves and Superconductor Lab, Nankai University',
      title: 'Research Assistant',
      years: '08/2018–06/2021',
      bullets: [
        'Developed low-pass filters based on ferromagnetic substance powder for cryogenic quantum experiments and contributed to the issued patent CN111540984B.',
        'Led a four-person undergraduate research team that won first prize in the National Undergraduates’ Innovation and Entrepreneurship Training Program.',
        'Studied macroscopic quantum tunneling in high-temperature superconductors using MATLAB and Mathematica.',
      ],
    },
  ],
  teaching: [
    'Teaching Assistant, Artificial Intelligence (CS4710), University of Virginia, Spring 2026',
  ],
  patents: [
    'Low Pass Filter for Cryogenic Quantum Experiments Based on Ferromagnetic Substance Powder, CN111540984B',
  ],
  awards: [
    'ICDM 2025 Best Paper Award',
    'IEEE BigData 2024 Student Travel Award',
    'Third-class Scholarship in LinkedIn China’s Workplace Trainee Boot Camp Season One',
    'Excellent Undergraduate Thesis, top 3% at Nankai University',
    '1st Prize, National Undergraduates’ Innovation and Entrepreneurship Training Program',
    '2nd Prize in Tianjin and No. 2 at Nankai University, National University Students Ecommerce Innovation, Creativity, and Entrepreneurship Competition',
  ],
  service: [
    'Reviewer: NeurIPS 2026, KDD 2026, ICDM 2025, KDD 2025',
    'Student Volunteer: IEEE BigData 2024',
  ],
  skills: {
    languages: ['Python', 'MATLAB', 'C/C++', 'Java'],
    tools: ['OpenClaw Agentic AI System', 'PyTorch', 'TensorFlow 2', 'scikit-learn', 'pandas', 'AWS', 'Docker', 'Git'],
  },
};
