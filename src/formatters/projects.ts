import type { Project } from '../types';

export function formatMainProjects(projects: Project[]): string {
  const formattedProjects = projects.map((project, index) => {
    let projectText = `**${project.name}${project.company ? ` (${project.company})` : ''}**

${project.shortDescription}

**Tech Stack:** ${project.techStack.join(', ')}  `;

    if (project.link) {
      projectText += `\n**Link:** <${project.link}>`;
    }
    
    projectText += `

${project.highlights.map(h => `- ${h}`).join('\n')}
`;

    let result = projectText + '\n---\n';
    
    if (index === 2) {
      result += '\n<div class="page-break"></div>\n';
    }
    
    return result;
  });
  
  return formattedProjects.join('\n');
}
