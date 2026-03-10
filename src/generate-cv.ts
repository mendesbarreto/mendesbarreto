import type { APIResponse } from './types';
import { formatProfessionalExperience } from './formatters/experience';
import { formatMainProjects } from './formatters/projects';
import { formatTechSkills, formatManagementSkills, formatLanguages } from './formatters/skills';
import { formatYear } from './formatters/dates';

const API_URL = 'https://api.mendesbarreto.gobit.dev/api/profile/69aa3ae146d8807e7f4071ee';
const TEMPLATE_PATH = 'CV-TEMPLATE.md';
const OUTPUT_PATH = 'CV.md';

async function fetchProfileData(): Promise<APIResponse> {
  console.log('Fetching profile data from API...');
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  const data = await response.json() as APIResponse;
  console.log('✓ Profile data fetched successfully');
  return data;
}

function replacePlaceholders(template: string, data: APIResponse): string {
  const { user, experience, projects, techSkills, managementSkills } = data;
  
  let content = template.replace('[PROFILE_SUMMARY]', user.profile.bio);
  
  content = content.replace('[PROFILE_GOAL]', user.profile.goal);
  
  content = content.replace('[MANAGEMENT_SKILLS]', formatManagementSkills(managementSkills));
  
  content = content.replace('[TEC_SKILLS]', formatTechSkills(techSkills));
  
  content = content.replace('[PROFESSIONAL_EXPERIENCE]', formatProfessionalExperience(experience));
  
  content = content.replace('[EDUCATION_INSTITUTION]', user.profile.education.institution);
  content = content.replace('[EDUCATION_TITLE]', user.profile.education.title);
  content = content.replace('[EDUCATION_YEAR]', formatYear(user.profile.education.endDate));
  
  if (user.profile.languages.length > 0) {
    const languagesSection = formatLanguages(user.profile.languages);
    const languageRegex = /\[LANGUAGE_1\] : \[LANGUAGE_1_LEVEL\]/;
    content = content.replace(languageRegex, languagesSection);
  }
  
  content = content.replace('[MAIN_PROJECTS]', formatMainProjects(projects));
  
  return content;
}

async function main() {
  try {
    console.log('Starting CV generation...\n');
    
    const data = await fetchProfileData();
    
    console.log('Reading CV template...');
    const template = await Bun.file(TEMPLATE_PATH).text();
    console.log('✓ Template loaded\n');
    
    console.log('Generating CV content...');
    const generatedCV = replacePlaceholders(template, data);
    console.log('✓ CV content generated\n');
    
    console.log('Writing CV to file...');
    await Bun.write(OUTPUT_PATH, generatedCV);
    console.log('✓ CV written successfully\n');
    
    console.log('✅ CV generation completed!');
  } catch (error) {
    console.error('❌ Error generating CV:', error);
    process.exit(1);
  }
}

main();
