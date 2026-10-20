import type { ResumeData } from '../types/resume'

export const defaultResumeData: ResumeData = {
  personal: {
    name: 'Chris Earl Amar',
    title: 'Full-Stack Web Developer',
    email: 'chrisearlamar@gmail.com',
    phone: '0977 049 4633',
    location: 'Davao City, Philippines',
    linkedin: 'linkedin.com/in/chris-earl-amar-945a7a226',
    github: 'github.com/ChrisEarlAmar',
    website: '',
  },
  summary:
    'Full-stack web developer building back-office applications with Laravel, React, TypeScript, SQL, and Oracle ERP data. Builds REST APIs and accounting exception reports, and maintains a customer-data survey tool used by 120+ stores with real-time updates, access controls, filtering, and PDF export.',
  experience: [
    {
      id: 'experience-decoarts-citihardware',
      company: 'DecoArts Marketing, Inc. / CitiHardware Inc.',
      position: 'Full-Stack Web Developer',
      location: '',
      startDate: 'Feb 2024',
      endDate: '',
      current: true,
      highlights: [
        'Built accounting exception-report generators that query Oracle ERP data with optimized SQL for audit and compliance work.',
        'Built and integrated REST APIs for Laravel and React applications.',
        'Maintained a customer-data survey tool used by 120+ stores, adding PDF export, real-time updates, access controls, and advanced filtering.',
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
      skills: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML/CSS'],
    },
    {
      id: 'skills-frameworks-ui',
      name: 'Frameworks & UI',
      skills: ['React', 'Laravel', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'shadcn/ui'],
    },
    {
      id: 'skills-data-tools',
      name: 'Data & Tools',
      skills: ['MySQL', 'Oracle SQL Developer', 'GitLab'],
    },
  ],
  projects: [
    {
      id: 'project-batch-manager',
      name: 'Batch Manager',
      description:
        'Windows utility, packaged as an executable, for running and managing batch scripts for PHP Artisan commands, queues, and WebSocket servers.',
      technologies: ['Python', 'PHP Artisan', 'WebSockets'],
      link: '',
    },
    {
      id: 'project-mvp-survey-tool',
      name: 'MVP Survey Tool',
      description:
        'MVP survey platform for branch and store data collection, with WebSocket updates for real-time monitoring.',
      technologies: ['Laravel', 'React', 'WebSockets', 'Material UI'],
      link: '',
    },
  ],
  certifications: [],
}

export const cloneDefaultResume = (): ResumeData => structuredClone(defaultResumeData)
