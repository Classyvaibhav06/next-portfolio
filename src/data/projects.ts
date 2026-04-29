import { Gamepad2, Code2, Bell, Wrench, Globe, Zap, Video, Users, LucideIcon } from "lucide-react";

export interface ProjectDetail {
  title: string;
  subtitle?: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  category: string;
  categoryLabel: string;
  stars: number;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  slug: string;
  achievements?: {
    title: string;
    description: string;
  }[];
  techStack?: string[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "grindsync",
    title: "GrindSync",
    subtitle: "Productive Social Media",
    description: "A high-performance social platform designed for productivity, featuring real-time chat, GitHub sync, and LeetCode integration.",
    fullDescription: "GrindSync is a productivity-focused social media platform designed for developers and tech enthusiasts. It combines the community aspects of social media with tools that help users stay on track with their coding goals. Built with a high-performance architecture, it features seamless GitHub activity synchronization and daily LeetCode challenges to keep the 'grind' consistent.",
    icon: Zap,
    category: "web",
    categoryLabel: "FULL STACK",
    stars: 5,
    tags: ["Node.js", "Redis", "WebSockets", "React", "OOD"],
    demoUrl: "https://grindsync.vercel.app/",
    imageUrl: "/project1.png",
    featured: true,
    achievements: [
      {
        title: "High-Performance Architecture",
        description: "Designed a scalable REST API using Object Oriented Design (OOD) principles in Node.js for robust and maintainable code.",
      },
      {
        title: "Sub-millisecond Caching",
        description: "Implemented Redis caching to serve leaderboards and frequently accessed data with sub-millisecond latency.",
      },
      {
        title: "Automatic GitHub Sync",
        description: "Integrated GitHub APIs to automatically sync user activity and contributions directly to their profile.",
      },
      {
        title: "Real-time Processing",
        description: "Engineered a real-time update system using WebSockets for instant chat messaging and live status changes.",
      },
      {
        title: "LeetCode Integration",
        description: "Developed a LeetCode integration that fetches daily questions and provides solution verification services.",
      }
    ],
    techStack: ["Node.js", "Express", "Redis", "Socket.io", "React", "PostgreSQL", "GitHub API", "LeetCode API"]
  },
  {
    slug: "desi-movies",
    title: "Desi Movies Stream",
    subtitle: "Premium Entertainment Platform",
    description: "A high-fidelity movie streaming platform featuring AI-assisted search and TMDB integration for a seamless cinematic experience.",
    fullDescription: "Desi Movies Stream is a premium, high-fidelity movie streaming platform built to provide a seamless cinematic experience. It leverages the TMDB API for real-time data fetching and features an AI-assisted search mechanism to ensure high accuracy in content retrieval. Designed with a Netflix-inspired aesthetic, it provides categorized content rails and instant video streaming integration.",
    icon: Globe,
    category: "web",
    categoryLabel: "FULL STACK",
    stars: 8,
    tags: ["Next.js 15", "AI Search", "TMDB API", "Tailwind CSS"],
    demoUrl: "https://desimovies.vercel.app/",
    imageUrl: "/PROJECT2.png",
    featured: false,
    achievements: [
      {
        title: "AI-Powered Search Intelligence",
        description: "Implemented an AI resolver that translates natural language queries into precise TMDB IDs, significantly improving search accuracy.",
      },
      {
        title: "Dynamic Content Discovery",
        description: "Built categorized rails (Trending, Popular, Desi Picks) that fetch real-time data using TMDB API.",
      },
      {
        title: "Seamless Streaming Integration",
        description: "Integrated a dynamic video player that loads content instantly based on TMDB IDs for a one-click play experience.",
      },
      {
        title: "Premium Glassmorphic UI",
        description: "Designed a modern, dark-themed interface with smooth transitions and glassmorphism effects.",
      },
      {
        title: "Direct TMDB ID Lookup",
        description: "Added a utility feature for instant access to specific content via direct TMDB ID input.",
      }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "TMDB API", "NVIDIA/OpenAI API", "VidKing Embed"]
  },
  {
    slug: "reel-vault",
    title: "Reel Vault",
    subtitle: "AI-Powered Content Curator",
    description: "A personal library for Instagram Reels with AI-generated metadata, automated categorization, and Android Share Target integration.",
    fullDescription: "Reel Vault is a sophisticated Next.js application designed to help users organize and curate their favorite Instagram Reels. It leverages Google's Gemini AI to automatically generate clean titles, engaging captions, and relevant tags for saved content. The app is built as a Progressive Web App (PWA), featuring an Android Share Target that allows users to save reels directly from the Instagram app's share sheet for a seamless mobile experience.",
    icon: Video,
    category: "web",
    categoryLabel: "FULL STACK / PWA",
    stars: 15,
    tags: ["Next.js 14", "MongoDB", "Gemini AI", "PWA"],
    imageUrl: "/PROJECT3.png",
    featured: false,
    achievements: [
      {
        title: "Android Share Target Integration",
        description: "Developed a custom PWA share target that allows users to save Reels directly from the native Android share sheet, bypassing manual copy-pasting.",
      },
      {
        title: "AI Metadata Automation",
        description: "Integrated Google Gemini Pro to automatically analyze reel content and generate SEO-friendly titles, descriptions, and category tags.",
      },
      {
        title: "Robust Auth & Security",
        description: "Implemented a secure JWT-based authentication system with MongoDB to provide private, user-specific reel vaults.",
      },
      {
        title: "Smart Filtering & Search",
        description: "Built an advanced discovery system using category chips and tag-based indexing for rapid content retrieval.",
      },
      {
        title: "Optimized PWA Experience",
        description: "Engineered a responsive, mobile-first UI with offline support and app-like navigation using PWA technologies.",
      }
    ],
    techStack: ["Next.js 14", "React 18", "Tailwind CSS", "MongoDB", "Mongoose", "JWT", "Google Gemini API", "next-pwa"]
  },
  {
    slug: "desimedia",
    title: "DesiMedia",
    subtitle: "Real-time Collaboration & Social Ecosystem",
    description: "A high-performance social platform featuring WebRTC video calls, real-time messaging with Socket.io, and a collaborative content engine.",
    fullDescription: "DesiMedia is a full-stack, high-performance social platform designed for real-time engagement and community building. Inspired by premium interfaces like Netflix and Discord, it bridges the gap between messaging, video collaboration, and content sharing. It features a low-latency messaging engine, high-fidelity video/voice calls, and a sophisticated social graph.",
    icon: Users,
    category: "web",
    categoryLabel: "FULL STACK",
    stars: 12,
    tags: ["Next.js 16", "Socket.io", "LiveKit", "Prisma"],
    demoUrl: "https://desimedia.onrender.com/chat",
    imageUrl: "/PROJECT4.png",
    featured: false,
    achievements: [
      {
        title: "Real-Time Messaging Architecture",
        description: "Developed a low-latency messaging engine using Socket.io and Redis, supporting DMs and group chats with typing indicators.",
      },
      {
        title: "High-Fidelity Video/Voice Calls",
        description: "Integrated LiveKit for WebRTC-powered group calls with active speaker detection and adaptive bitrate streaming.",
      },
      {
        title: "Sophisticated Social Graph",
        description: "Designed a complex relationship schema (Followers/Following) using Prisma, optimized with composite indices.",
      },
      {
        title: "Premium UI/UX Design",
        description: "Built a Netflix-inspired high-fidelity interface with glassmorphism, smooth micro-animations, and bento-grid layouts.",
      },
      {
        title: "Collaborative Content Sharing",
        description: "Implemented a native Meme-Sharing engine and GIPHY integration for instant media exchange within chat rooms.",
      },
      {
        title: "Intelligent Notification Engine",
        description: "Engineered a real-time notification system tracking missed calls, followers, and group invites.",
      }
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Zustand", "Socket.io", "LiveKit", "Redis", "Prisma", "PostgreSQL", "NextAuth.js"]
  },
  {
    slug: "flying-modi",
    title: "Flying Modi Game",
    description: "Trending flying Modi game recreated with JavaScript. Fun browser-based game with smooth animations.",
    fullDescription: "A playful recreation of the trending flying game mechanics, built entirely with vanilla JavaScript and HTML5 Canvas. It features physics-based movement, collision detection, and a high-score system.",
    icon: Gamepad2,
    category: "web",
    categoryLabel: "GAME",
    stars: 12,
    tags: ["JavaScript", "HTML5", "Canvas", "Game Dev"],
    demoUrl: "https://modi-flyin.netlify.app/",
    imageUrl: "/brave_screenshot_modi-flyin.netlify.app.png",
    featured: false,
    achievements: [
      {
        title: "Custom Physics Engine",
        description: "Built a lightweight 2D physics engine for smooth character movement and gravity effects."
      }
    ]
  },
  {
    slug: "dsa-cpp",
    title: "DSA with C++",
    description: "Daily DSA practice repository with C++ solutions and algorithms",
    fullDescription: "A comprehensive repository of Data Structures and Algorithms implemented in C++. Covers everything from basic arrays to advanced graph algorithms and dynamic programming.",
    icon: Code2,
    category: "oss",
    categoryLabel: "OSS",
    stars: 45,
    tags: ["C++", "Algorithms", "DSA"],
    repoUrl: "https://github.com/Classyvaibhav06/dsa-with-cpp",
    imageUrl: "/image.png",
  },
  {
    slug: "notification-popup",
    title: "Notification Popup",
    description: "Clean and modern notification popup component with smooth animations.",
    fullDescription: "A reusable UI component for modern web applications, focusing on accessibility and slick entrance/exit animations.",
    icon: Bell,
    category: "web",
    categoryLabel: "UI/UX",
    stars: 8,
    tags: ["HTML", "CSS", "UI Design"],
    demoUrl: "https://github.com/Classyvaibhav06/notification_popup",
    repoUrl: "https://github.com/Classyvaibhav06/notification_popup",
    imageUrl: "/image.png",
  }
];
