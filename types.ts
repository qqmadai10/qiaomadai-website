export interface Education {
  period: string;
  school: string;
  college: string;
  degree: string;
  details: string;
}

export interface Project {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Hobby {
  id: number;
  name: string;
  details: string;
  images: string[];
}

export interface Contact {
  email: string;
  github: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  birthdate: string;
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
  photoUrl: string;
  contact: Contact;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}