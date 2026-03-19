import { getApiProfileUserId, getServiceUrl, type GetApiProfileUserId200 } from 'module-personal-profile-js-sdk';
import { formatProfessionalExperience } from './formatters/experience';
import { formatMainProjects } from './formatters/projects';
import { formatTechSkills, formatManagementSkills, formatLanguages } from './formatters/skills';
import { formatYear } from './formatters/dates';

const USER_ID = '69aa3ae146d8807e7f4071ee';
const TEMPLATE_SUFFIX = '-TEMPLATE.md';
const SKIP_API_FLAG = '--skip-api';

async function fetchProfileData(): Promise<GetApiProfileUserId200> {
  console.log('Fetching profile data from API...');
  
  const { apiUrl, env } = getServiceUrl();
  console.log(`Using API URL: ${apiUrl} (env: ${env})`);
  
  const data = await getApiProfileUserId(USER_ID) as unknown as GetApiProfileUserId200;
  console.log('✓ Profile data fetched successfully');
  return data;
}

function replacePlaceholders(template: string, data: GetApiProfileUserId200): string {
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

function getTemplateFiles(): string[] {
  return Array.from(new Bun.Glob(`CV*${TEMPLATE_SUFFIX}`).scanSync('.')).sort();
}

function getMarkdownSourceFiles(): string[] {
  return Array.from(new Bun.Glob('CV*.md').scanSync('.'))
    .filter((file) => !file.endsWith(TEMPLATE_SUFFIX))
    .sort();
}

async function main() {
  try {
    console.log('Starting CV generation...\n');

    if (Bun.argv.includes(SKIP_API_FLAG)) {
      const markdownFiles = getMarkdownSourceFiles();

      if (markdownFiles.length === 0) {
        throw new Error('No markdown CV files found matching CV*.md');
      }

      console.log(`Skipping API fetch because ${SKIP_API_FLAG} was provided.`);
      console.log('Using the existing markdown files as the source of truth:\n');

      for (const markdownFile of markdownFiles) {
        console.log(`- ${markdownFile}`);
      }

      console.log('\n✅ No API generation performed.');
      return;
    }

    const data = await fetchProfileData();

    const templateFiles = getTemplateFiles();

    if (templateFiles.length === 0) {
      throw new Error(`No templates found matching CV*${TEMPLATE_SUFFIX}`);
    }

    console.log(`Found ${templateFiles.length} template(s)\n`);

    for (const templatePath of templateFiles) {
      const outputPath = templatePath.replace(TEMPLATE_SUFFIX, '.md');

      console.log(`Reading template: ${templatePath}`);
      const template = await Bun.file(templatePath).text();
      console.log('✓ Template loaded');

      console.log(`Generating content for ${outputPath}...`);
      const generatedCV = replacePlaceholders(template, data);
      console.log('✓ CV content generated');

      console.log(`Writing ${outputPath}...`);
      await Bun.write(outputPath, generatedCV);
      console.log('✓ CV written successfully\n');
    }

    console.log('✅ CV generation completed for all templates!');
  } catch (error) {
    console.error('❌ Error generating CV:', error);
    process.exit(1);
  }
}

main();
