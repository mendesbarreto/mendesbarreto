import type { TechSkillCategory, ManagementSkill, Language } from '../types';

export function formatTechSkills(skills: TechSkillCategory[]): string {
  const skillLines = [
    '- AI-Powered Development Tools: GitHub Copilot, Claude Code, OpenCode, Codex, copilot-cli.',
    '- Technology Polyglot: Knowledgeable in a wide range of programming languages and frameworks, including Python, JavaScript/TypeScript, Go, C++, C#, Ruby, Swift, Objective-C, and more.',
    '- GraphQL, RESTful APIs, Microservices Architecture, Event-Driven Systems.',
    '- Node.js, Next.js, React Native, Native iOS/Android Development.',
    '- Docker, Kubernetes, CI/CD Pipelines (Jenkins, GitHub Actions).',
    '- MySQL, PostgreSQL, MongoDB, Redis.',
    '- Automation, Testing (Unit, Integration, E2E), TDD/BDD.',
    '- Design Patterns, SOLID Principles, Agile Methodologies (Scrum, Kanban).'
  ];
  
  return skillLines.join('\n');
}

export function formatManagementSkills(skills: ManagementSkill[]): string {
  return skills.map(skill => `- ${skill.description}`).join('\n');
}

export function formatLanguages(languages: Language[]): string {
  return languages.map(lang => `- ${lang.name}: ${lang.proficiency}`).join('\n');
}
