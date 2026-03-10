export interface APIResponse {
  user: UserProfile;
  experience: Experience[];
  achievements: Achievement[];
  projects: Project[];
  techSkills: TechSkillCategory[];
  managementSkills: ManagementSkill[];
}

export interface UserProfile {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  profile: {
    currentRole: string;
    education: Education;
    languages: Language[];
    yearsOfExperience: number;
    bio: string;
    goal: string;
    linkedInUrl: string;
    githubUrl: string;
    twitterUrl: string;
    facebookUrl: string;
    websiteUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  title: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Experience {
  _id: string;
  userId: string;
  title: string;
  company: string;
  companyDescription: string;
  size: string;
  startDate: string;
  endDate: string | null;
  isCurrentJob: boolean;
  location: string;
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  _id: string;
  userId: string;
  icon: string;
  title: string;
  value: string;
  label: string;
  description: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  userId: string;
  name: string;
  shortDescription: string;
  techStack: string[];
  company?: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isCurrentProject: boolean;
  link?: string;
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TechSkillCategory {
  _id: string;
  userId: string;
  title: string;
  skills: Array<{
    name: string;
    experienceYears: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ManagementSkill {
  _id: string;
  userId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
