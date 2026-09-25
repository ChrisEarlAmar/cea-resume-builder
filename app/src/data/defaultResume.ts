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
    'Full-stack web developer experienced in building and maintaining back-office applications with Laravel, React, TypeScript, SQL, and Oracle ERP data. Experience includes REST APIs, audit and compliance reporting, and multi-store survey tools with real-time updates, access controls, filtering, and PDF export.',
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
        'Developed back-office applications, including accounting exception report generators, using optimized SQL queries on Oracle ERP data to support auditing and compliance.',
        'Built and integrated RESTful APIs for Laravel and React applications.',
        'Maintained and enhanced a customer-data collection survey tool used by 120+ stores, adding PDF export, real-time updates, access controls, and advanced filtering.',
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
        'Built a Windows utility, compiled as an executable, to manage and run batch scripts for PHP Artisan commands, queues, and WebSocket servers.',
      technologies: ['Python', 'PHP Artisan', 'WebSockets'],
      link: '',
    },
    {
      id: 'project-mvp-survey-tool',
      name: 'MVP Survey Tool',
      description:
        'Built an MVP survey platform for branch and store data collection and monitoring, with real-time WebSocket updates and a modern user interface.',
      technologies: ['Laravel', 'React', 'WebSockets', 'Material UI'],
      link: '',
    },
  ],
  certifications: [],
}

export const cloneDefaultResume = (): ResumeData => structuredClone(defaultResumeData)
