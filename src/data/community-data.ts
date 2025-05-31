import {
  LuUsers as Users,
  LuBaby as Baby,
  LuBrain as Brain,
  LuZap as Zap,
} from "react-icons/lu";

export const communityData = {
  categories: [
    {
      name: "All",
      icon: Users,
      color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    },
    {
      name: "Support Groups",
      icon: Users,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      name: "Pregnancy",
      icon: Baby,
      color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    },
    {
      name: "Mental Health",
      icon: Brain,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      name: "Energy & Sleep",
      icon: Zap,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
  ],

  posts: [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "👩🏻",
      time: "2h",
      category: "Mental Health",
      content:
        "Anyone else feeling completely overwhelmed at 28 weeks? Having panic attacks about labor and feeling like I can't cope. My midwife says it's normal but I feel so alone.",
      tags: ["anxiety", "support-needed"],
      likes: 24,
      comments: 18,
      isSupported: true,
      location: "London",
    },
    {
      id: 2,
      user: "Emma K.",
      avatar: "👩🏽",
      time: "4h",
      category: "Pregnancy",
      content:
        "Week 32 with my second baby and my toddler is being so clingy. Feeling guilty that I can't give him the attention he needs while dealing with severe fatigue. How are other mums managing?",
      tags: ["second-pregnancy", "toddler"],
      likes: 31,
      comments: 22,
      isSupported: false,
      location: "Manchester",
    },
    {
      id: 3,
      user: "Dr. Lisa Chen",
      avatar: "👩🏻‍⚕️",
      time: "6h",
      category: "Mental Health",
      content:
        "Reminder: Perinatal anxiety affects 1 in 5 women. If you're experiencing racing thoughts, difficulty sleeping, or constant worry about your baby, please reach out. You're not alone and help is available. 💜",
      tags: ["professional-advice", "anxiety"],
      likes: 89,
      comments: 12,
      isSupported: false,
      isProfessional: true,
      location: "NHS",
    },
    {
      id: 4,
      user: "Aisha R.",
      avatar: "👩🏾",
      time: "8h",
      category: "Support Groups",
      content:
        "Starting a WhatsApp group for mums in South London dealing with HG (hyperemesis gravidarum). Currently 24 weeks and still struggling. Would love to connect with others who understand this hell.",
      tags: ["HG", "support-group", "south-london"],
      likes: 16,
      comments: 9,
      isSupported: true,
      location: "South London",
    },
    {
      id: 5,
      user: "Maria S.",
      avatar: "👩🏻",
      time: "1d",
      category: "Energy & Sleep",
      content:
        "3 months postpartum and my mood tracking shows I'm getting 3-4 hours of broken sleep. Feeling like a zombie. When does it get better? My partner doesn't understand how exhausted I am.",
      tags: ["postpartum", "sleep-deprivation"],
      likes: 42,
      comments: 28,
      isSupported: false,
      location: "Birmingham",
    },
    {
      id: 6,
      user: "Anonymous",
      avatar: "🎭",
      time: "1d",
      category: "Mental Health",
      content:
        "Having thoughts about terminating my pregnancy due to severe HG at 16 weeks. Can't keep anything down, lost 2 stone, and feeling suicidal. Please tell me it gets better. I'm scared.",
      tags: ["crisis-support", "HG", "anonymous"],
      likes: 67,
      comments: 45,
      isSupported: true,
      isCrisis: true,
    },
    {
      id: 7,
      user: "Rachel T.",
      avatar: "👩🏼",
      time: "2d",
      category: "Pregnancy",
      content:
        "First time mum at 35 weeks and terrified about breastfeeding. Everyone makes it sound so natural but what if I can't do it? Looking for honest experiences and tips from other mums.",
      tags: ["first-time-mum", "breastfeeding", "anxiety"],
      likes: 19,
      comments: 15,
      isSupported: false,
      location: "Edinburgh",
    },
    {
      id: 8,
      user: "Jade W.",
      avatar: "👩🏿",
      time: "3d",
      category: "Energy & Sleep",
      content:
        "Anyone else struggling with insomnia in third trimester? I'm 36 weeks and haven't had a proper night's sleep in weeks. Baby's movements keep me up all night. Any tips that actually work?",
      tags: ["insomnia", "third-trimester", "sleep-tips"],
      likes: 33,
      comments: 21,
      isSupported: false,
      location: "Bristol",
    },
  ],

  supportGroups: [
    {
      name: "HG Warriors London",
      members: 127,
      nextMeeting: "Tomorrow 7pm",
      location: "Virtual",
      description: "Support for severe pregnancy sickness",
    },
    {
      name: "Anxiety in Pregnancy",
      members: 243,
      nextMeeting: "Wed 6pm",
      location: "Birmingham",
      description: "Managing worry and panic during pregnancy",
    },
    {
      name: "Second Time Mums",
      members: 89,
      nextMeeting: "Fri 11am",
      location: "Manchester",
      description: "Balancing pregnancy with existing children",
    },
    {
      name: "New Mums Circle",
      members: 156,
      nextMeeting: "Sat 2pm",
      location: "London",
      description: "Support for first-time mothers",
    },
    {
      name: "Postpartum Recovery",
      members: 201,
      nextMeeting: "Mon 10am",
      location: "Virtual",
      description: "Healing and recovery after birth",
    },
  ],
};
