// Frontend fallback blog data — runtime data is fetched from MongoDB via API.
// This file is kept as a static reference and is only used if the API is unreachable.
// The actual seed data is maintained in BE/api/lib/defaults_blogs.js

export const blogData = [
    {
        id: 1,
        title: "Top 10 Cyber Security Career Paths in 2026",
        slug: "top-10-cybersecurity-career-paths-2026",
        date: "June 10, 2026",
        readTime: "7 min read",
        category: "Cyber Security",
        author: "Cybersecurity Board, Ethnotech",
        coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        excerpt: "Discover the most rewarding and critical cyber security roles in 2026. From ethical hacking to cloud security architecture, learn what it takes to protect the future digital infrastructure.",
        seoTitle: "Top 10 Cyber Security Career Paths in 2026 | Ethnotech Academy",
        seoDescription: "Explore the highest paying and most in-demand Cyber Security career paths in 2026.",
        keywords: "cybersecurity careers, ethical hacker, cloud security architect, information security",
        content: `<p>The cybersecurity landscape has undergone a monumental shift heading into 2026.</p><h2>Top 10 Cybersecurity Careers</h2><p>AI Security Engineer, Cloud Security Architect, Penetration Tester, Incident Responder, DevSecOps Engineer, CISO, Cryptographer, Threat Intelligence Analyst, AppSec Engineer, Cyber Forensic Analyst.</p>`
    },
    {
        id: 2,
        title: "How to Become a SOC Analyst",
        slug: "how-to-become-soc-analyst",
        date: "June 12, 2026",
        readTime: "8 min read",
        category: "Cyber Security",
        author: "SOC Team Leads, Ethnotech",
        coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        excerpt: "A step-by-step roadmap to launch your career as a Security Operations Center (SOC) Analyst.",
        seoTitle: "How to Become a SOC Analyst | Ethnotech Academy",
        seoDescription: "Step-by-step guide to becoming a SOC Analyst.",
        keywords: "SOC Analyst, Security Operations Center, SIEM tools",
        content: `<p>SOC analysts monitor networks, detect anomalies, and defend corporate infrastructure.</p><p>Includes a 45-day bootcamp roadmap.</p>`
    },
    {
        id: 3,
        title: "Java Full Stack Roadmap for Beginners",
        slug: "java-full-stack-roadmap-beginners",
        date: "June 14, 2026",
        readTime: "10 min read",
        category: "Software Development",
        author: "Dev Faculty, Ethnotech",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        excerpt: "Learn how to go from absolute beginner to a job-ready Java Full Stack developer with a structured 45-day roadmap.",
        seoTitle: "Java Full Stack Developer Roadmap | Ethnotech",
        seoDescription: "Complete roadmap to become a Java Full Stack Developer.",
        keywords: "Java Full Stack, Spring Boot, React, web development",
        content: `<p>Java remains one of the most widely adopted programming languages in enterprise environments.</p><p>Includes a 45-day learning roadmap.</p>`
    },
    {
        id: 4,
        title: "AI Skills Every Engineering Student Needs",
        slug: "ai-skills-every-engineering-student-needs",
        date: "June 15, 2026",
        readTime: "7 min read",
        category: "Artificial Intelligence",
        author: "AI/ML Lab Director, Ethnotech",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800",
        excerpt: "AI is rewriting every branch of engineering. Check out the core ML, prompt engineering, and data tools you must learn.",
        seoTitle: "AI Skills Every Engineering Student Needs | Ethnotech",
        seoDescription: "Essential AI skills for engineering students in 2026.",
        keywords: "AI skills, machine learning, Python for AI, LLM APIs",
        content: `<p>AI tools and analytical models are now deeply embedded into engineering workflows.</p><p>Includes a 30-day crash course roadmap.</p>`
    },
    {
        id: 5,
        title: "Resume Building Guide for Freshers",
        slug: "resume-building-guide-freshers",
        date: "June 16, 2026",
        readTime: "5 min read",
        category: "Career Advice",
        author: "Placement Bureau, Ethnotech",
        coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
        excerpt: "An ultimate guide to creating a high-impact, recruiter-approved resume as a fresher.",
        seoTitle: "Resume Building Guide for Freshers | Ethnotech Academy",
        seoDescription: "Build a high-scoring resume as a fresher.",
        keywords: "fresher resume guide, ATS friendly resume",
        content: `<p>Your resume is your first impression in the corporate recruitment process.</p>`
    }
];
