export interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  image: string;
  type: "video" | "audio";
  duration?: string;
  category?: string;
}

export const experts: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    title: "Obstetrician",
    specialty: "Pregnancy & Birth",
    avatar:
      "https://media.istockphoto.com/id/2148188827/es/foto/una-mujer-se-pone-seria-cuando-una-doctora-irreconocible-da-consejos.webp?a=1&b=1&s=612x612&w=0&k=20&c=TbIO4FWoJDoTX4ikY3u9ofgAyAkQIwNGvRRILjNAA1o=",
  },
  {
    id: "2",
    name: "Emma Thompson",
    title: "Certified Midwife",
    specialty: "Prenatal Care",
    avatar:
      "https://media.istockphoto.com/id/2148188827/es/foto/una-mujer-se-pone-seria-cuando-una-doctora-irreconocible-da-consejos.webp?a=1&b=1&s=612x612&w=0&k=20&c=TbIO4FWoJDoTX4ikY3u9ofgAyAkQIwNGvRRILjNAA1o=",
  },
  {
    id: "3",
    name: "Dr. Lisa Chen",
    title: "Perinatal Psychologist",
    specialty: "Mental Health",
    avatar:
      "https://media.istockphoto.com/id/2148188827/es/foto/una-mujer-se-pone-seria-cuando-una-doctora-irreconocible-da-consejos.webp?a=1&b=1&s=612x612&w=0&k=20&c=TbIO4FWoJDoTX4ikY3u9ofgAyAkQIwNGvRRILjNAA1o=",
  },
];

export const pregnancyWellnessCourses: Course[] = [
  {
    id: "1",
    title: "Managing Morning Sickness",
    description: "Natural remedies and coping strategies for nausea",
    image:
      "https://cdn.dribbble.com/userupload/40377769/file/original-f3c5121199b67a6c2bd5c1a75feeaae5.png?resize=1504x1128&vertical=center",
    type: "video",
    duration: "18 min",
    category: "wellness",
  },
  {
    id: "2",
    title: "Safe Exercise During Pregnancy",
    description: "Gentle workouts for each trimester",
    image:
      "https://cdn.dribbble.com/userupload/30052580/file/original-05f1931912b0f6c0c34d1a969fe16762.jpg?resize=2048x1536&vertical=center",
    type: "video",
    duration: "25 min",
    category: "wellness",
  },
];

export const mentalHealthCourses: Course[] = [
  {
    id: "3",
    title: "Pregnancy Anxiety Relief",
    description: "Breathing techniques and mindfulness practices",
    image:
      "https://cdn.dribbble.com/userupload/40377769/file/original-f3c5121199b67a6c2bd5c1a75feeaae5.png?resize=1504x1128&vertical=center",
    type: "audio",
    duration: "15 min",
    category: "mental-health",
  },
  {
    id: "4",
    title: "Sleep Better While Pregnant",
    description: "Relaxation techniques for restful nights",
    image:
      "https://cdn.dribbble.com/userupload/40377769/file/original-f3c5121199b67a6c2bd5c1a75feeaae5.png?resize=1504x1128&vertical=center",
    type: "audio",
    duration: "20 min",
    category: "mental-health",
  },
];

export const birthPrepCourses: Course[] = [
  {
    id: "5",
    title: "Understanding Labor Signs",
    description: "Know when it's time to head to the hospital",
    image:
      "https://cdn.dribbble.com/userupload/23639949/file/original-fdd539b20e9f6f1729968ee198784d29.jpg?resize=2048x1536&vertical=center",
    type: "video",
    duration: "22 min",
    category: "birth-prep",
  },
  {
    id: "6",
    title: "Pain Management Options",
    description: "Exploring natural and medical pain relief",
    image:
      "https://cdn.dribbble.com/userupload/40377769/file/original-f3c5121199b67a6c2bd5c1a75feeaae5.png?resize=1504x1128&vertical=center",
    type: "video",
    duration: "30 min",
    category: "birth-prep",
  },
];

// Helper functions
export const getAllCourses = (): Course[] => {
  return [
    ...pregnancyWellnessCourses,
    ...mentalHealthCourses,
    ...birthPrepCourses,
  ];
};

export const getCoursesByCategory = (category: string): Course[] => {
  return getAllCourses().filter((course) => course.category === category);
};

export const getCourseById = (id: string): Course | undefined => {
  return getAllCourses().find((course) => course.id === id);
};

export const getExpertById = (id: string): Expert | undefined => {
  return experts.find((expert) => expert.id === id);
};
