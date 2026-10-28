import type { ResumeData } from '../types/resume'

export const defaultResumeData: ResumeData = {
  personal: {
    name: 'Chris Earl Amar',
    title: 'Systems Developer',
    email: 'chrisearlamar@gmail.com',
    phone: '+639770494633',
    location: 'Davao City, Philippines',
    linkedin: 'linkedin.com/in/chris-earl-amar-945a7a226',
    github: 'github.com/ChrisEarlAmar',
    website: 'https://chrisearlamar.github.io/ChrisEarlAmar/',
  },
  summary:
    'Systems Developer at DecoArts Marketing, Inc. with nearly three years building Laravel and React tools for CitiHardware. My work includes REST APIs, Oracle ERP reports, and a customer experience platform used across 140 stores.',
  experience: [
    {
      id: 'experience-decoarts-citihardware',
      company: 'DecoArts Marketing, Inc.',
      position: 'Systems Developer',
      location: '',
      startDate: 'Feb 2024',
      endDate: '',
      current: true,
      highlights: [
        'Built Oracle ERP accounting exception reports with SQL for audit and compliance.',
        'Integrated REST APIs between Laravel back ends and React applications.',
        'Packaged web applications for desktop with Electron and mobile with Capacitor.',
        "Built CitiHardware's customer experience platform for 140 stores and continue to add live updates, access controls, filters, and PDF export.",
        'Built a point-of-sale display for transaction items, campaign videos, and static banners.',
      ],
    },
  ],
  education: [
    {
      id: 'education-usep',
      institution: 'University of Southeastern Philippines',
      degree: 'Bachelor of Science in Information Technology',
      field: 'Major in Information Security',
      startDate: '',
      endDate: 'Jun 2023',
      description: 'Cum Laude',
    },
  ],
  skillGroups: [
    {
      id: 'skills-languages',
      name: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL', 'HTML/CSS'],
    },
    {
      id: 'skills-frameworks-ui',
      name: 'Frameworks & UI',
      skills: ['React', 'Next.js', 'Laravel', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'shadcn/ui'],
    },
    {
      id: 'skills-desktop-mobile',
      name: 'Desktop & Mobile',
      skills: ['Electron', 'Capacitor'],
    },
    {
      id: 'skills-data-tools',
      name: 'Data & Tools',
      skills: ['MySQL', 'Oracle SQL Developer', 'GitLab', 'Docker'],
    },
    {
      id: 'skills-ai-agents-tools',
      name: 'AI Agents & Tools',
      skills: ['OpenAI Codex', 'Claude Code', 'DeepSeek', 'Kimi'],
    },
  ],
  projects: [
    {
      id: 'project-batch-manager',
      name: 'Batch Manager',
      description:
        'Windows utility for PHP Artisan commands, queues, and WebSocket servers.',
      technologies: ['Python', 'PHP Artisan', 'WebSockets'],
      link: 'https://github.com/ChrisEarlAmar/cea-batch-manager',
    },
    {
      id: 'project-mvp-survey-tool',
      name: 'MVP Survey Tool',
      description:
        'Survey-system prototype for branch and store data collection.',
      technologies: ['Laravel', 'React', 'WebSockets', 'Material UI'],
      link: 'https://github.com/ChrisEarlAmar/cea-mvp-survey',
    },
    {
      id: 'project-quizey',
      name: 'Quizey',
      description:
        'No-sign-in quiz app with IndexedDB, custom .qzy sharing, and Android APK builds using Capacitor and Android Studio.',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Dexie.js', 'Capacitor', 'Android Studio'],
      link: 'https://chrisearlamar.github.io/Quizey/',
    },
  ],
  certifications: [],
}

export const cloneDefaultResume = (): ResumeData => structuredClone(defaultResumeData)
