export const site = {
  title: 'Sikun Guo',
  description:
    'PhD Candidate at the University of Virginia studying parametric knowledge optimization in large language models, inference-time learning, graph neural networks, and AI for Science.',
  url: 'https://sikun-skyler-guo.github.io',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/publications', label: 'Publications' },
    { href: '/cv', label: 'CV' },
  ],
};

export const profile = {
  name: 'Sikun Guo',
  role: 'PhD Candidate in Computer Science, University of Virginia',
  location: 'Charlottesville, VA',
  email: 'qkm6sq@virginia.edu',
  tagline:
    'I study how to optimize the parametric knowledge learned by large language models so they can better activate, refine, and use what they already know for scientific reasoning.',
  intro:
    'I am a PhD Candidate in Computer Science at the University of Virginia in the RealAI Lab. My research asks how foundation models can become more capable scientific reasoners: not only by accessing external information, but by making better use of the knowledge already encoded in their parameters. Recent work includes benchmarking research idea generation, improving ideation quality at inference time, evaluating truthfulness in model-generated scientific hypotheses, and using structured scientific representations for discovery. Outside research, I follow financial markets and trading, play table tennis, sing, and enjoy road trips.',
  advisorName: 'Prof. Aidong Zhang',
  advisorUrl: 'https://www.cs.virginia.edu/~az9eg/website/home.html',
  affiliation: 'RealAI Lab, University of Virginia',
  cvHref: '/Sikun_Guo_Resume_2026-03-12.pdf',
  collaborationNote:
    'Research areas: LLM parametric knowledge optimization, inference-time learning, graph neural networks, AI for Science, and the path toward autonomous AI research systems.',
  links: [
    { label: 'Email', href: 'mailto:qkm6sq@virginia.edu', tracking: 'click-email' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=h2oGOaQAAAAJ', tracking: 'click-google-scholar' },
    { label: 'GitHub', href: 'https://github.com/Sikun-Skyler-Guo', tracking: 'click-github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sikun-guo/en', tracking: 'click-linkedin' },
  ],
  researchAreas: [
    'LLM parametric knowledge optimization',
    'Inference-time learning',
    'Graph neural networks',
    'AI for Science',
    'Autonomous AI research systems',
  ],
  recentWork: [
    'KDD 2025',
    'EMNLP Findings 2025',
    'IJCAI 2025',
    'IEEE ICDM 2025',
    'Bioinformatics 2025',
    'SDM 2025',
    'IEEE BigData 2024',
  ],
};

export const homepage = {
  heroEyebrow:
    'LLM parametric knowledge optimization · inference-time learning · AI for Science',
  heroTitle:
    'Optimizing Parametric Knowledge in Large Language Models for Scientific Discovery',
  heroBody:
    'I study how large language models can better activate, refine, and use the knowledge they acquire during training. Rather than treating scientific reasoning as only a scaling or retrieval problem, I focus on the internal knowledge already encoded in model parameters and on methods that make it more usable at inference time. My work spans parametric knowledge optimization, inference-time learning, graph neural networks, and AI for Science, with the long-term goal of autonomous AI research systems.',
  agendaTitle: 'One research problem, several technical fronts',
  agendaIntro:
    'I work on a single underlying question: how can foundation models make better scientific use of the knowledge they already contain? That question appears in different technical forms—benchmarking research ideation, improving inference-time behavior, grounding scientific hypotheses, evaluating truthfulness, and modeling evolving scientific concepts—but the agenda is consistent.',
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
      years: '2023–Present',
      details:
        'GPA 4.000 · Focus: reasoning with large language models, in-context learning, and foundation models for scientific discovery',
    },
    {
      institution: 'University of Virginia',
      degree: 'M.S. in Computer Science',
      years: '2021–2022',
      details:
        'GPA 3.918 · Thesis on robust graph neural networks via adaptive aggregator selection and long-range dependency modeling · Advisor: Prof. Hongning Wang',
    },
    {
      institution: 'Nankai University',
      degree: 'B.S. in Electronic Information Science and Technology',
      years: '2017–2021',
      details:
        'Top 33% · Thesis on low-pass filters based on ferromagnetic substance powder · Advisor: Prof. Lu Ji',
    },
  ],
  experience: [
    {
      org: 'RealAI Lab, University of Virginia',
      title: 'Research Assistant',
      years: '2024–Present',
      bullets: [
        'Studies foundation models for scientific discovery with emphasis on research ideation.',
        'Released IdeaBench for benchmarking LLM-based research idea generation.',
        'Developed inference-time adversarial and reinforcement learning approaches for improving ideation quality.',
      ],
    },
    {
      org: 'Information and Language Processing Lab, University of Virginia',
      title: 'Research Assistant',
      years: '2023',
      bullets: [
        'Studied hallucination mechanisms in large language models.',
        'Designed an inter-layer token-probability total-variation decoding strategy for inducing hallucination behavior.',
      ],
    },
    {
      org: 'Autoscience Institute',
      title: 'Research Scientist Intern',
      years: 'Summer 2025',
      bullets: ['Automated scientific ideation rating with LLMs by building an agentic evaluation system.'],
    },
  ],
  awards: [
    'ICDM 2025 Best Student Paper Award',
    'IEEE BigData 2024 Student Travel Award',
    'Excellent Undergraduate Thesis at Nankai University',
  ],
  service: ['Reviewer: ICDM 2025, KDD 2025, KDD 2026'],
  skills: {
    languages: ['Python', 'MATLAB', 'C/C++', 'Java'],
    tools: ['PyTorch', 'TensorFlow 2', 'scikit-learn', 'pandas', 'Docker', 'AWS', 'Git', 'OpenClaw'],
  },
};
