export const educationLevels = [
  { id: "primary", name: "Primary School", icon: "school-outline", focus: "Reading, number skills, and science" },
  { id: "secondary", name: "Secondary School", icon: "library-outline", focus: "Algebra, science, and writing" },
  { id: "college", name: "College", icon: "briefcase-outline", focus: "Practice, research, and exams" },
  { id: "university", name: "University", icon: "ribbon-outline", focus: "Critical reading and independent study" },
] as const;

export const quizQuestions = [
  {
    subject: "Science",
    prompt: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars",
    explanation: "Iron minerals in Martian soil give Mars its reddish color.",
  },
  {
    subject: "Mathematics",
    prompt: "What is 3/4 expressed as a percentage?",
    options: ["25%", "50%", "75%", "80%"],
    answer: "75%",
    explanation: "Divide 3 by 4, then multiply by 100.",
  },
  {
    subject: "Science",
    prompt: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
    explanation: "Plants use carbon dioxide, water, and light to make sugars.",
  },
] as const;

export const resources = [
  { id: "ck12", title: "CK-12 Flexible Learning", subject: "Science", description: "Free textbooks, simulations, and practice.", url: "https://www.ck12.org/" },
  { id: "khan", title: "Khan Academy", subject: "Mathematics", description: "Video lessons and interactive exercises.", url: "https://www.khanacademy.org/" },
  { id: "openstax", title: "OpenStax", subject: "University", description: "Peer-reviewed open textbooks.", url: "https://openstax.org/" },
];
