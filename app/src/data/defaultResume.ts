import type { ResumeData } from '../types/resume'

export const defaultResumeData: ResumeData = {
  personal: {
    name: 'Chris Earl Amar',
    title: 'Systems Developer',
    email: 'chrisearlamar@gmail.com',
    phone: '0977 049 4633',
    location: 'Davao City, Philippines',
    linkedin: 'linkedin.com/in/chris-earl-amar-945a7a226',
    github: 'github.com/ChrisEarlAmar',
    website: 'https://chrisearlamar.github.io/ChrisEarlAmar/',
  },
  summary:
    "Systems Developer at DecoArts Marketing, Inc., building Laravel and React back-office applications for CitiHardware. Work includes REST APIs, accounting exception reports against Oracle ERP data, and a customer experience management system I built for CitiHardware's 140 stores and continue to develop as the company adds locations.",
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
        'Developed accounting exception reports for CitiHardware that query Oracle ERP data with SQL for audit and compliance reviews.',
        'Integrated REST APIs between Laravel back ends and React applications.',
        "Built the customer experience management system for CitiHardware's 140 stores and continue to add features as the company adds locations, including PDF exports, live updates, access controls, and filtering.",
        'Created a customer-facing point-of-sale display that shows transaction line items alongside campaign videos and static banners.',
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
      skills: ['React', 'Laravel', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'shadcn/ui'],
    },
    {
      id: 'skills-data-tools',
      name: 'Data & Tools',
      skills: ['MySQL', 'Oracle SQL Developer', 'GitLab', 'Docker'],
    },
  ],
  projects: [
    {
      id: 'project-batch-manager',
      name: 'Batch Manager',
      description:
        'Windows utility packaged as an executable to run batch scripts for PHP Artisan commands, queues, and WebSocket servers.',
      technologies: ['Python', 'PHP Artisan', 'WebSockets'],
      link: 'https://github.com/ChrisEarlAmar/cea-batch-manager',
    },
    {
      id: 'project-mvp-survey-tool',
      name: 'MVP Survey Tool',
      description:
        'Survey-system prototype for branch and store data collection, built as an early version of the company’s customer experience management system. Includes WebSocket updates for live monitoring.',
      technologies: ['Laravel', 'React', 'WebSockets', 'Material UI'],
      link: 'https://github.com/ChrisEarlAmar/cea-mvp-survey',
    },
    {
      id: 'project-quizey',
      name: 'Quizey',
      description:
        'Quiz app that lets people create and share quizzes without signing in. It stores quiz data in IndexedDB and uses custom .qzy files for sharing.',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Dexie.js'],
      link: 'https://chrisearlamar.github.io/Quizey/',
    },
  ],
  certifications: [],
}

export const cloneDefaultResume = (): ResumeData => structuredClone(defaultResumeData)
