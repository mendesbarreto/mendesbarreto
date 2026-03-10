import type { ProfessionalExperience } from 'module-personal-profile-js-sdk';
import { formatDate } from './dates';

export function formatProfessionalExperience(experiences: ProfessionalExperience[]): string {
  const formattedExperiences = experiences.map((exp, index) => {
    let expText = `**${exp.title}**

*${exp.company} - ${exp.companyDescription}*

${exp.size}`;

    if (exp.location) {
      expText += `

${exp.location}`;
    }

    expText += `

${formatDate(exp.startDate)} – ${exp.endDate ? formatDate(exp.endDate) : 'Present'}

${exp.highlights.map(h => `- ${h}`).join('\n')}
`;

    return expText + '\n---\n';
  });
  
  return formattedExperiences.join('\n');
}
