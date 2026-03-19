export type PublicationAuthor = {
  name: string;
  me?: boolean;
};

export type PublicationLink = {
  label: string;
  href: string;
};

export type Publication = {
  title: string;
  authors: PublicationAuthor[];
  venue: string;
  year: number;
  status: 'Published' | 'Under review';
  tag: string;
  summary: string;
  links?: PublicationLink[];
  featured?: boolean;
  group: 'published' | 'working';
  figureLabel?: string;
  figureSrc?: string;
  figureAlt?: string;
};

export const publications: Publication[] = [
  {
    title: 'IdeaBench: Benchmarking Large Language Models for Research Idea Generation',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Guangzhi Xiong' },
      { name: 'Albert Huang' },
      { name: 'Myles Kim' },
      { name: 'Corey Williams' },
      { name: 'Stefan Bekiranov' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'KDD 2025',
    year: 2025,
    status: 'Published',
    tag: 'Benchmark design',
    summary:
      'IdeaBench introduces a benchmark and evaluation framework for LLM-based research idea generation. The core contribution is not only a dataset, but also a way to measure whether generated ideas are insightful, plausible, and meaningfully distinct rather than merely well phrased.',
    links: [
      { label: 'Paper', href: 'https://dl.acm.org/doi/10.1145/3711896.3737419' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2411.02429' },
    ],
    featured: true,
    group: 'published',
    figureLabel: 'IdeaBench dataset construction, idea generation, and evaluation pipeline',
    figureSrc: '/ideabench-figure.png',
    figureAlt: 'IdeaBench pipeline showing dataset construction from Semantic Scholar, idea generation with research agents, and evaluation by quality ranking.',
  },
  {
    title: 'InfAL: Inference Time Adversarial Learning for Improving Research Ideation',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Peng Wang' },
      { name: 'Albert Huang' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'Findings of EMNLP 2025',
    year: 2025,
    status: 'Published',
    tag: 'Inference-time learning',
    summary:
      'InfAL studies how adversarial learning at inference time can improve the quality of model-generated research ideas without changing the base model weights. The paper pushes research ideation beyond prompt engineering toward explicitly optimized test-time behavior.',
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2025.findings-emnlp.667/' },
    ],
    featured: true,
    group: 'published',
    figureLabel: 'Inference-time adversarial learning loop for research ideation refinement',
    figureSrc: '/infal-figure.png',
    figureAlt: 'InfAL pipeline showing initial idea generation followed by iterative critique, revision, and discriminator-guided improvement across multiple steps.',
  },
  {
    title: 'Toward Reliable Scientific Hypothesis Generation: Evaluating Truthfulness and Hallucination in Large Language Models',
    authors: [
      { name: 'Guangzhi Xiong' },
      { name: 'Eric Xie' },
      { name: 'Corey Williams' },
      { name: 'Myles Kim' },
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Sikun Guo', me: true },
      { name: 'Stefan Bekiranov' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'IJCAI 2025',
    year: 2025,
    status: 'Published',
    tag: 'Scientific reasoning evaluation',
    summary:
      'This paper focuses on the reliability of model-generated scientific hypotheses, with particular attention to truthfulness and hallucination. It strengthens the agenda by asking not only whether models can generate hypotheses, but whether those hypotheses remain grounded and trustworthy.',
    links: [
      { label: 'Paper', href: 'https://www.ijcai.org/proceedings/2025/0873' },
    ],
    featured: true,
    group: 'published',
    figureLabel: 'Dataset construction, task formulation, and truthfulness evaluation pipeline for scientific hypothesis generation',
    figureSrc: '/truthhypo-figure.png',
    figureAlt: 'Pipeline for reliable scientific hypothesis generation showing dataset construction, hypothesis generation task formulation, and truthfulness evaluation.',
  },
  {
    title: 'ConceptDrift: Leveraging Spatial, Temporal and Semantic Evolution of Biomedical Concepts for Hypothesis Generation',
    authors: [
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Alireza Jafari' },
      { name: 'Sikun Guo', me: true },
      { name: 'Sneha Srinivasan' },
      { name: 'Nathan C. Sheffield' },
      { name: 'Aidong Zhang' },
      { name: 'Kishlay Jha' },
    ],
    venue: 'Bioinformatics 2025',
    year: 2025,
    status: 'Published',
    tag: 'Graph-based scientific modeling',
    summary:
      'ConceptDrift models biomedical hypothesis generation through the spatial, temporal, and semantic evolution of concepts. It represents a more structured scientific-modeling direction in the broader agenda, showing how graph-based views of evolving knowledge can support discovery.',
    links: [
      { label: 'Paper', href: 'https://academic.oup.com/bioinformatics/article/41/11/btaf563/8305176' },
      { label: 'Code', href: 'https://github.com/amir-hassan25/ConceptDrift' },
    ],
    featured: true,
    group: 'published',
    figureLabel: 'Spatial, temporal, and semantic concept evolution for biomedical hypothesis generation',
    figureSrc: '/conceptdrift-figure.png',
    figureAlt: 'ConceptDrift figure showing semantic evolution over time, temporal semantic contextualization, spatial evolution, and hypothesis generation.',
  },
  {
    title: 'Optimizing External and Internal Knowledge of Foundation Models for Scientific Discovery',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Guangzhi Xiong' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'SDM 2025',
    year: 2025,
    status: 'Published',
    tag: 'Knowledge use in discovery',
    summary:
      'This paper studies how internal parametric knowledge and external knowledge sources should be balanced in scientific-discovery workflows. It connects directly to the broader question of how models should use what they already know instead of relying only on external retrieval.',
    links: [{ label: 'Record', href: 'https://dblp.org/rec/conf/sdm/GuoXZ25.html' }],
    group: 'published',
    figureLabel: 'External and internal knowledge optimization framework for scientific discovery',
    figureSrc: '/sdm-figure.png',
    figureAlt: 'Framework showing external knowledge sources, internal in-context learning, and foundation models for scientific discovery.',
  },
  {
    title: 'Embracing Foundation Models for Advancing Scientific Discovery',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Guangzhi Xiong' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'IEEE BigData 2024',
    year: 2024,
    status: 'Published',
    tag: 'Perspective',
    summary:
      'A perspective on how foundation models can reshape scientific discovery workflows. The paper situates hypothesis generation, knowledge use, and human–AI collaboration within a larger AI-for-science agenda.',
    links: [
      { label: 'Paper', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11923747/' },
      { label: 'IEEE', href: 'https://ieeexplore.ieee.org/document/10825618' },
    ],
    group: 'published',
  },
  {
    title: 'Graph Neural Networks in IoT: A Survey',
    authors: [
      { name: 'Guimin Dong' },
      { name: 'Mingyue Tang' },
      { name: 'Zhiyuan Wang' },
      { name: 'Jiechao Gao' },
      { name: 'Sikun Guo', me: true },
      { name: 'Lihua Cai' },
      { name: 'Robert Gutierrez' },
      { name: 'Bradford Campbell' },
      { name: 'Laura E. Barnes' },
      { name: 'Mehdi Boukhechba' },
    ],
    venue: 'ACM Transactions on Sensor Networks',
    year: 2023,
    status: 'Published',
    tag: 'Survey',
    summary:
      'This survey organizes graph neural network research in IoT around graph modeling choices, node representations, edge semantics, and representative application settings. It reflects an earlier systems-and-graph-learning thread in my work that connects naturally to later interests in structured scientific knowledge.',
    links: [
      { label: 'PDF', href: 'https://dl.acm.org/doi/pdf/10.1145/3565973' },
      { label: 'DOI', href: 'https://dl.acm.org/doi/10.1145/3565973' },
    ],
    group: 'published',
    figureLabel: 'A taxonomy of graph neural network modeling choices and representative applications in IoT',
    figureSrc: '/iot-survey-figure.png',
    figureAlt: 'Survey taxonomy for graph neural networks in IoT, covering graph modeling, node representation, edge connection, and representative work.',
  },
  {
    title: 'Curiosity-Driven Questioning for Engine-Agnostic LLM Research Ideation',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Di Wang' },
      { name: 'Xiaohan Fan' },
      { name: 'Albert Huang' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'Under review at KDD 2026',
    year: 2026,
    status: 'Under review',
    tag: 'Ideation methods',
    summary:
      'Studies whether curiosity-oriented questioning can make research ideation with language models more exploratory, engine-agnostic, and practically useful. The method emphasizes question generation, filtering, and clarity scoring before ideas are handed to downstream ideation engines.',
    group: 'working',
    figureLabel: 'Curiosity-driven questioning loop with evidence packets, two-stage scoring, and top-k question selection',
    figureSrc: '/cdq-figure.png',
    figureAlt: 'Curiosity-driven questioning pipeline with evidence packets, question generation, filtering through gap and disagreement, clarity scoring, and top-k question selection for ideation engines.',
  },
  {
    title: 'InfRL: Inference-time Reinforcement Learning for Research Idea Optimization',
    authors: [
      { name: 'Sikun Guo', me: true },
      { name: 'Amir Hassan Shariatmadari' },
      { name: 'Jiuqi Wang' },
      { name: 'Albert Huang' },
      { name: 'Stefan Bekiranov' },
      { name: 'Shangtong Zhang' },
      { name: 'Aidong Zhang' },
    ],
    venue: 'Under review at KDD 2026',
    year: 2026,
    status: 'Under review',
    tag: 'Inference-time learning',
    summary:
      'Explores inference-time reinforcement learning as a way to optimize the quality of model-generated research ideas without relying only on larger base models. The project frames idea improvement as a trajectory with actions, rewards, and iterative policy updates at test time.',
    group: 'working',
    figureLabel: 'Inference-time reinforcement learning trajectory for iterative research idea optimization',
    figureSrc: '/infrl-figure.png',
    figureAlt: 'InfRL figure showing idea optimization trajectory, state transition agent, policy update agent, and reward agent across multiple iterations.',
  },
];

export const featuredPublications = publications.filter((paper) => paper.featured);
export const publishedPublications = publications.filter((paper) => paper.group === 'published');
export const workingPublications = publications.filter((paper) => paper.group === 'working');
