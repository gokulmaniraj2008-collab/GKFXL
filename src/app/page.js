"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession:true, autoRefreshToken:true, detectSessionInUrl:true, storageKey:"gkfxl-auth" } }
);

/* ─── Design Tokens ────────────────────────────────────────────────────────── */
const T = {
  /* base */
  white:"#ffffff", bg:"#f8f8f6", surface:"#f2f2ef",
  border:"#e4e4e0", borderStrong:"#d0d0ca",
  text:"#111110", textMid:"#555552", textDim:"#999994",
  /* accents */
  navy:"#0d1b3e",   navyDim:"#0d1b3e12",
  indigo:"#4f46e5", indigoDim:"#4f46e512",
  emerald:"#059669",emeraldDim:"#05966912",
  amber:"#d97706",  amberDim:"#d9770612",
  rose:"#e11d48",   roseDim:"#e11d4812",
  /* dark dashboard */
  dark:"#09090f", darkSurface:"#111118", darkCard:"#18181f",
  darkBorder:"#27272f", darkText:"#e8e8f0", darkDim:"#8888aa",
};

/* ─── Responsive Hook ───────────────────────────────────────────────────────── */
const useWidth = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
};

/* ─── SVG Icon Library ──────────────────────────────────────────────────────── */
const Icon = ({ n, size=20, color="currentColor", strokeWidth=1.8 }) => {
  const paths = {
    logo:      <><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    builder:   <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    bot:       <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M12 2v5"/><circle cx="8.5" cy="13.5" r="1.5"/><circle cx="15.5" cy="13.5" r="1.5"/><path d="M8 17h8"/></>,
    projects:  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>,
    analytics: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout:    <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrow:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrowUp:   <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    chevronR:  <polyline points="9 18 15 12 9 6"/>,
    chevronL:  <polyline points="15 18 9 12 15 6"/>,
    chevronD:  <polyline points="6 9 12 15 18 9"/>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    copy:      <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    menu:      <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    code:      <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    whatsapp:  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>,
    mail:      <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    github:    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,
    gamepad:   <><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></>,
    school:    <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    calendar:  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    user:      <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    utensils:  <><line x1="18" y1="2" x2="18" y2="9"/><path d="M14 2v4a4 4 0 004 4"/><line x1="10" y1="2" x2="10" y2="7"/><path d="M6 2v4a4 4 0 004 4v9"/><line x1="10" y1="15" x2="10" y2="22"/></>,
    layers:    <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    send:      <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    external:  <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    home:      <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    phone:     <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 013.1 4.2 2 2 0 015 2h3a2 2 0 012 1.7 12.1 12.1 0 00.7 2.8 2 2 0 01-.45 2.1L9.1 9.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.33 1.84.57 2.8.7A2 2 0 0122 17z"/>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    tag:       <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    cpu:       <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[n]}
    </svg>
  );
};

const Spinner = ({ size=20, color=T.indigo }) => (
  <div style={{ width:size, height:size, border:`2px solid ${color}25`, borderTopColor:color, borderRadius:"50%", animation:"spin 0.7s linear infinite", flexShrink:0 }}/>
);

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { font-size:16px; -webkit-text-size-adjust:100%; }
    body { background:#f8f8f6; font-family:'DM Sans',sans-serif; color:#111110; -webkit-font-smoothing:antialiased; }
    @keyframes spin    { to { transform:rotate(360deg); } }
    @keyframes fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
    @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
    @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    input:focus, textarea:focus, button:focus { outline:none; }
    button { font-family:'DM Sans',sans-serif; cursor:pointer; }
    a { text-decoration:none; color:inherit; }
    ::-webkit-scrollbar { width:4px; height:4px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#d0d0ca; border-radius:4px; }
    .card-hover { transition: box-shadow 0.2s, transform 0.2s; }
    .card-hover:hover { box-shadow:0 8px 32px rgba(0,0,0,0.1); transform:translateY(-2px); }
    .btn-hover { transition: opacity 0.15s, transform 0.15s; }
    .btn-hover:hover { opacity:0.88; transform:translateY(-1px); }
    .btn-hover:active { transform:scale(0.97); }
  `}</style>
);

/* ─── Projects Data ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  { id:"architect", category:"AI SaaS Platform", appName:"AI Website Architect", date:"June 2026",
    accent:T.indigo, accentDim:T.indigoDim, icon:"builder",
    tagline:"AI interview-based website builder and chatbot builder SaaS",
    description:"Full SaaS platform where users build websites through a 7-phase AI interview. Generates complete workflow plans using Groq AI. Includes chatbot builder with FAQ knowledge base, live preview, and embed code. Supabase Google OAuth with RLS-protected database.",
    features:["7-phase AI interview — one question at a time","10 website types with dynamic branching","Groq AI workflow generator — pages, features, colours, launch plan","AI Chatbot builder with FAQ knowledge base","Live chatbot preview inside dashboard","Embed code generator for any website","Supabase Google OAuth + RLS database"],
    tech:["Next.js","React","Supabase","Groq AI","Vercel"],
    integrations:["Supabase Auth (Google OAuth)","Supabase Database (RLS)","Groq API (llama-3.1-8b-instant)"],
    url:"https://gkfxl.vercel.app" },
  { id:"gkfxl-site", category:"Business Portfolio Website", appName:"GKFXL Business Website", date:"June 2026",
    accent:T.navy, accentDim:T.navyDim, icon:"layers",
    tagline:"Professional freelance portfolio — white + multicolor, mobile-first",
    description:"Gokul's personal freelance business website. Clean white background with navy and blue accents. Showcases all 7 projects with full detail views, pricing packages, tech stack, and contact links. Mobile-first with bottom navigation and SVG-only icons.",
    features:["Home hero with availability status","7-project portfolio with full detail slide views","Pricing packages — Basic, Business, Premium","Services section with 4-step process","About section with honest developer note","Contact — WhatsApp, Email, Instagram, GitHub","Bottom navigation — mobile-first","SVG icons only — zero emojis"],
    tech:["Next.js","React","Vercel"],
    integrations:["Vercel (deployment)","Google Fonts (Syne + DM Sans)"],
    url:null },
  { id:"gge", category:"AI Civic Platform", appName:"GGE — Guide · Grow · Earn", date:"June 2026",
    accent:"#0d3b66", accentDim:"#0d3b6612", icon:"globe",
    tagline:"Rural empowerment platform — AI chat in Tamil, English and Tanglish",
    description:"Comprehensive civic platform for farmers, students, job seekers across Tamil Nadu. AI guidance in 3 languages. Government scheme finder, Skill Bazaar marketplace, learning paths with certificates. 8,494 lines of code with 351 async API calls.",
    features:["AI chat in Tamil, English, Tanglish — Groq API","Government scheme finder (PM-KISAN, Ayushman Bharat)","Skill Bazaar — list skills, connect with buyers","Direct Harvest — farmers sell crops without middlemen","12 learning paths with completion certificates","Daily challenges with GGE points and leaderboard","Automated welcome email on signup (Nodemailer + Gmail SMTP)","WhatsApp notification on registration (Twilio)","Google Sheets auto-sync via Apps Script","8,494 lines — 351 async API calls"],
    tech:["Next.js","React","TypeScript","Supabase","Groq AI","Nodemailer","Twilio","Vercel"],
    integrations:["Groq API (multilingual AI)","Gmail SMTP via Nodemailer","Twilio WhatsApp API","Google Sheets Apps Script","Supabase Auth + Database"],
    url:"https://srwp.vercel.app" },
  { id:"game", category:"Game Development", appName:"FlamZone", date:"April 2026",
    accent:"#6d28d9", accentDim:"#6d28d912", icon:"gamepad",
    tagline:"Multiplayer social game platform with real-time WebRTC voice and video",
    description:"Full multiplayer game web app — rooms, FLAMES, Truth or Dare, real-time WebRTC calls. No third-party call service. Every feature built from scratch using Firebase and native WebRTC.",
    features:["Multiplayer room creation and joining","FLAMES calculator — relationship status game","Truth or Dare — randomised question generator","Spin-wheel Calls — picks a random player","Real-time group chat within rooms","WebRTC peer-to-peer voice and video calling","Incoming call overlay with Web Audio API ringtone","Google authentication","Confetti animations on game results"],
    tech:["JavaScript","Firebase Realtime Database","Firebase Auth","WebRTC","HTML","CSS"],
    integrations:["Firebase Realtime Database","Google Auth","WebRTC STUN/TURN servers","Web Audio API"],
    url:null },
  { id:"nexus", category:"Education Management", appName:"NEXUS — Gkfxl Teams Academy", date:"April 2026",
    accent:T.emerald, accentDim:T.emeraldDim, icon:"school",
    tagline:"Complete school management — attendance, results, chat, leaderboard",
    description:"Full school management platform with Admin and Student roles. Timetable, attendance tracking, result viewing, polls, and community chat. Local cache layer — zero extra Firestore reads after first load.",
    features:["Student and subject management with marks","Timetable — day-wise scheduling with breaks","Attendance marking — period-by-period per student","Colour-coded analytics — green/yellow/red thresholds","Student results with instant search from local cache","Class leaderboard ranked by average marks","Polls, surveys, group chat","Role-based access — Admin vs Student"],
    tech:["JavaScript","Firebase Firestore","Firebase Auth","HTML","CSS"],
    integrations:["Firebase Firestore (with local cache)","Google Auth"],
    url:null },
  { id:"tanne", category:"Restaurant Management", appName:"TANNE RESTOBAR", date:"May 2026",
    accent:T.rose, accentDim:T.roseDim, icon:"utensils",
    tagline:"Full restaurant POS — table management, billing and live Telegram alerts",
    description:"Complete restaurant order management system deployed live at TANNE Restobar. Staff log in, select a table, browse the menu, add items to cart, save orders, and generate bills. Every order triggers an instant Telegram bot notification.",
    features:["Google authentication for staff login","Table grid dashboard — visual table selection","Full menu — 15+ categories including cocktails, mocktails, food","Cart with item quantity controls and bill generation","Admin panel — manage menu items and prices","Telegram bot notification on every order","Firebase Realtime Database — live sync across devices","Mobile responsive for staff phones"],
    tech:["JavaScript","Firebase Realtime Database","Firebase Auth","Telegram Bot API","HTML","CSS"],
    integrations:["Firebase Realtime Database (live sync)","Google Auth","Telegram Bot API (instant notifications)"],
    url:"https://tanne-95rt.vercel.app" },
  { id:"samvidhan", category:"AI Legal Assistant", appName:"Samvidhan AI", date:"March 2026",
    accent:T.amber, accentDim:T.amberDim, icon:"briefcase",
    tagline:"AI-powered Indian Constitution guide — Tamil + English",
    description:"AI platform making the Indian Constitution accessible. Ask legal questions in plain language. Supports English, Tamil, and Tanglish. Groq API with model fallback chain for reliability. Node.js/Express backend on Render.",
    features:["AI chat for Indian constitutional law questions","Multilingual — English, Tamil, Tanglish","Groq API with model fallback chain","Fundamental rights in plain language","Legal procedure and consumer rights guidance","Supabase authentication","Node.js/Express backend on Render"],
    tech:["Next.js","React","Node.js","Express","Groq AI","Supabase"],
    integrations:["Groq AI API","Supabase Auth","Render (Node.js backend)","Vercel (frontend)"],
    url:null },
];

const WEBSITE_TYPES = ["Restaurant","Portfolio","Business","Ecommerce","Hospital","School","Agency","Real Estate","Landing Page","Custom Website"];
const WEBSITE_TYPE_ICONS = { Restaurant:"utensils",Portfolio:"user",Business:"briefcase",Ecommerce:"layers",Hospital:"plus",School:"school",Agency:"zap","Real Estate":"globe","Landing Page":"external","Custom Website":"code" };

const PHASES = [
  { label:"Business Basics", questions:[
    { id:"company_name", type:"text",    question:"What is the name of your business or project?", placeholder:"e.g. Sunrise Bakery" },
    { id:"owner_name",   type:"text",    question:"What is your name?", placeholder:"e.g. Gokul M" },
    { id:"location",     type:"text",    question:"Where is your business located?", placeholder:"e.g. Coimbatore, Tamil Nadu" },
    { id:"business_age", type:"choice",  question:"How long has your business been running?", options:["Just starting out","Less than 1 year","1–3 years","3+ years"] },
    { id:"business_goal",type:"choice",  question:"What is your main goal for this website?", options:["Get more customers","Showcase my work","Sell products online","Build credibility"] },
  ]},
  { label:"Target Audience", questions:[
    { id:"audience_age",   type:"choice", question:"Who is your primary audience?", options:["Teenagers (13–18)","Young adults (18–30)","Adults (30–50)","Seniors (50+)","All ages"] },
    { id:"audience_loc",   type:"choice", question:"Where is your audience based?", options:["Local city","Tamil Nadu","All of India","International"] },
    { id:"audience_device",type:"choice", question:"How will most visitors access your site?", options:["Mostly mobile","Mostly desktop","Both equally"] },
    { id:"competitor",     type:"text",   question:"Name one competitor or website you admire.", placeholder:"e.g. Zomato, a local bakery website" },
  ]},
  { label:"Design Preferences", questions:[
    { id:"style",        type:"choice", question:"What design style appeals to you most?", options:["Clean and minimal","Bold and colourful","Professional and corporate","Fun and playful"] },
    { id:"primary_color",type:"choice", question:"Pick your preferred primary colour.", options:["Blue","Green","Red / Orange","Purple","Black and White","Decide later"] },
    { id:"font_feel",    type:"choice", question:"What typography feel do you want?", options:["Modern and sharp","Classic and elegant","Friendly and rounded","Technical"] },
    { id:"imagery",      type:"choice", question:"What kind of visuals will your site use?", options:["My own photos","Stock photos","Illustrations / icons","Mostly text"] },
  ]},
  { label:"Content and Pages", questions:[
    { id:"page_count",type:"choice",   question:"How many pages do you need?", options:["1 page (landing)","3–5 pages","6–10 pages","10+ pages"] },
    { id:"has_blog",  type:"choice",   question:"Do you need a blog or news section?", options:["Yes","No","Maybe later"] },
    { id:"languages", type:"choice",   question:"What language(s) should the website support?", options:["English only","Tamil only","English + Tamil","English + Hindi","Other"] },
    { id:"cta",       type:"text",     question:"What is the main action you want visitors to take?", placeholder:"e.g. Call us, Book a table, Buy now" },
  ]},
  { label:"Features and Functions", questions:[
    { id:"contact_method",type:"multiselect", question:"How should visitors contact you?", options:["WhatsApp button","Contact form","Phone number","Email","Book an appointment"] },
    { id:"user_accounts", type:"choice",      question:"Do users need to log in or create accounts?", options:["Yes — Google login","Yes — email and password","No login needed","Not sure"] },
    { id:"payments",      type:"choice",      question:"Do you need online payment integration?", options:["Yes — Razorpay / UPI","Yes — international","No","Not yet"] },
    { id:"notifications", type:"multiselect", question:"What notification systems do you need?", options:["WhatsApp alerts","Telegram bot alerts","Email notifications","SMS","None"] },
  ]},
  { label:"Type-Specific Details", questions:[] },
  { label:"Launch and Timeline", questions:[
    { id:"deadline",    type:"choice",   question:"When do you need the website live?", options:["ASAP (within 5 days)","Within 2 weeks","Within a month","No fixed deadline"] },
    { id:"budget",      type:"choice",   question:"What is your budget range?", options:["Rs. 3,000 (Basic)","Rs. 6,000 (Business)","Rs. 10,000 (Premium)","Discuss after seeing plan"] },
    { id:"maintenance", type:"choice",   question:"Will you need ongoing support after launch?", options:["Yes — monthly updates","Yes — occasional changes","No — I'll manage","Not sure"] },
    { id:"extra_notes", type:"textarea", question:"Anything else you want to tell me about your project?", placeholder:"e.g. WhatsApp order system, loyalty cards, booking form..." },
  ]},
];

const PHASE6_QUESTIONS = {
  Restaurant:[ { id:"cuisine",    type:"text",        question:"What type of cuisine does your restaurant serve?",       placeholder:"e.g. South Indian, Multi-cuisine" }, { id:"seating",    type:"choice",      question:"Do you need online table booking?",                      options:["Yes","No","Maybe later"] }, { id:"menu_online",type:"choice",      question:"Should the full menu be visible online?",                options:["Yes with prices","Yes without prices","Just categories","No"] }, { id:"order_type", type:"multiselect", question:"What ordering features do you need?",                    options:["Dine-in table ordering","Takeaway / parcel orders","Home delivery","WhatsApp orders"] } ],
  Portfolio:[   { id:"profession", type:"text",        question:"What is your profession or skill?",                      placeholder:"e.g. Graphic Designer, Photographer" }, { id:"work_count", type:"choice",      question:"How many projects will you showcase?",                   options:["1–5","6–15","16–30","30+"] }, { id:"hire_cta",   type:"choice",      question:"What should visitors do after viewing your portfolio?",  options:["Contact via WhatsApp","Email me","Fill a hire form","Book a call"] }, { id:"resume",     type:"choice",      question:"Do you want a downloadable CV on the site?",             options:["Yes","No"] } ],
  Business:[    { id:"service_list",type:"textarea",   question:"List your main products or services.",                   placeholder:"e.g. Web design, logo design, branding" }, { id:"team_page",  type:"choice",      question:"Do you need a team or about us page?",                   options:["Yes","No"] }, { id:"testimonials",type:"choice",     question:"Do you have customer testimonials to display?",          options:["Yes — I'll provide them","Not yet but I want the section","No"] }, { id:"enquiry_form",type:"choice",     question:"Do you need a quote or enquiry form?",                   options:["Yes","No","Prefer WhatsApp instead"] } ],
  Ecommerce:[   { id:"product_count",type:"choice",   question:"How many products will you list?",                      options:["Under 20","20–100","100–500","500+"] }, { id:"variants",   type:"choice",      question:"Do your products have variants like size or colour?",    options:["Yes","No"] }, { id:"payment_gw", type:"choice",      question:"Which payment gateway do you want?",                    options:["Razorpay","PayU","COD only","Razorpay + COD","Not decided"] }, { id:"shipping",   type:"choice",      question:"How will orders be delivered?",                         options:["Self delivery","Third-party courier","Store pickup only","Digital — no shipping"] } ],
  Hospital:[    { id:"specialty",   type:"text",       question:"What is your hospital or clinic specialty?",             placeholder:"e.g. Dental, Orthopaedic, General Medicine" }, { id:"appointments",type:"choice",    question:"Do you need an online appointment booking system?",      options:["Yes","No","WhatsApp booking only"] }, { id:"doctor_list",type:"choice",     question:"Should the website list individual doctors?",            options:["Yes","No"] }, { id:"insurance",  type:"choice",      question:"Do you accept health insurance?",                        options:["Yes — show accepted insurers","Yes — mention generally","No insurance"] } ],
  School:[      { id:"school_type", type:"choice",     question:"What type of institution is this?",                     options:["Primary school","Secondary school","College / University","Coaching centre","Online course platform"] }, { id:"admissions", type:"choice",     question:"Do you need an online admissions or enquiry form?",     options:["Yes","No","Just a contact form"] }, { id:"portal",     type:"choice",     question:"Do you need a student or parent login portal?",         options:["Yes","No","Maybe later"] }, { id:"events",     type:"choice",     question:"Do you want an events or notice board section?",        options:["Yes","No"] } ],
  Agency:[      { id:"agency_type", type:"text",       question:"What type of agency are you?",                          placeholder:"e.g. Digital marketing, Creative, IT services" }, { id:"case_studies",type:"choice",   question:"Do you want to display case studies or client work?",   options:["Yes — full case studies","Yes — brief project cards","No"] }, { id:"team_size",  type:"choice",     question:"How many team members will be listed?",                 options:["Just me","2–5","6–15","15+"] }, { id:"careers",    type:"choice",     question:"Do you need a careers or hiring page?",                options:["Yes","No"] } ],
  "Real Estate":[ { id:"property_type",type:"multiselect", question:"What types of properties will you list?",           options:["Residential","Commercial","Land / Plots","Rental","PG / Hostels"] }, { id:"listing_count",type:"choice",  question:"How many properties will you list initially?",          options:["Under 10","10–50","50–200","200+"] }, { id:"map_embed",  type:"choice",     question:"Should each property have a map view?",                 options:["Yes","No"] }, { id:"agent_contact",type:"choice",  question:"How should buyers contact you?",                        options:["WhatsApp","Phone call","Email form","All of the above"] } ],
  "Landing Page":[ { id:"offer",     type:"text",      question:"What is the main offer on this landing page?",          placeholder:"e.g. Free consultation, Product launch" }, { id:"lead_capture",type:"choice",   question:"What lead capture do you need?",                        options:["Name + phone form","Email signup","WhatsApp link","Google Form embed"] }, { id:"countdown",  type:"choice",    question:"Do you need a countdown timer for urgency?",            options:["Yes","No"] }, { id:"video",      type:"choice",    question:"Will you include a product or explainer video?",        options:["Yes — YouTube embed","Yes — I'll upload","No"] } ],
  "Custom Website":[ { id:"unique_desc",type:"textarea", question:"Describe your website idea in your own words.",       placeholder:"e.g. A community platform where farmers post crop prices..." }, { id:"similar_site",type:"text",   question:"Is there any existing website similar to what you want?", placeholder:"e.g. something like OLX but for tools" }, { id:"complexity", type:"choice",   question:"How complex is your platform?",                         options:["Simple — mostly static","Medium — user accounts + basic features","Complex — marketplace / real-time","Very complex — custom AI or automation"] }, { id:"phases",     type:"choice",   question:"Do you want to build this in phases?",                  options:["Yes — start small, add later","No — build everything at once","Not sure"] } ],
};

/* ─── Splash Screen ─────────────────────────────────────────────────────────── */
const SplashScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2600);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);
  return (
    <div style={{ minHeight:"100vh", background:T.white, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24, maxWidth:360, width:"100%", textAlign:"center" }}>
        {/* Logo */}
        <div style={{ width:72, height:72, background:T.navy, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", animation:"scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both", flexShrink:0 }}>
          <Icon n="logo" size={32} color="#fff"/>
        </div>
        {/* Name */}
        {step>=1 && (
          <div style={{ animation:"fadeUp 0.5s ease both" }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:40, fontWeight:800, color:T.text, letterSpacing:-2, lineHeight:1 }}>GKFXL</p>
            <p style={{ fontSize:11, color:T.textDim, letterSpacing:3, marginTop:8, textTransform:"uppercase" }}>Learn · Build · Earn</p>
          </div>
        )}
        {/* Tagline */}
        {step>=2 && (
          <p style={{ fontSize:15, color:T.textMid, lineHeight:1.75, animation:"fadeUp 0.5s ease both" }}>
            AI-powered website architect. Build websites through a smart interview. Deploy chatbots. Built by Gokul M, Coimbatore.
          </p>
        )}
        {/* CTA */}
        {step>=3 && (
          <button onClick={onDone} className="btn-hover" style={{ padding:"14px 40px", background:T.navy, color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:700, fontFamily:"'Syne',sans-serif", animation:"fadeUp 0.4s ease both", cursor:"pointer" }}>
            Get Started
          </button>
        )}
      </div>
      {/* Bottom wordmark */}
      <p style={{ position:"absolute", bottom:24, fontSize:11, color:T.textDim, letterSpacing:1 }}>gkfxl.vercel.app</p>
    </div>
  );
};

/* ─── Project Detail Modal ──────────────────────────────────────────────────── */
const ProjectModal = ({ project:p, onClose }) => {
  const w = useWidth();
  const isMobile = w < 640;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, overflowY:"auto", padding:isMobile?"0":"24px 16px", display:"flex", alignItems:isMobile?"flex-end":"center", justifyContent:"center" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:520, background:T.white, borderRadius:isMobile?"20px 20px 0 0":"20px", overflow:"hidden", animation:isMobile?"slideUp 0.3s ease":"scaleIn 0.2s ease", maxHeight:isMobile?"92vh":"90vh", display:"flex", flexDirection:"column" }}>
        {/* Header strip */}
        <div style={{ background:p.accent, padding:"24px 20px 20px", flexShrink:0 }}>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, padding:"6px 14px", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
            <Icon n="chevronL" size={13} color="#fff"/> Back
          </button>
          <div style={{ width:44, height:44, background:"rgba(255,255,255,0.2)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
            <Icon n={p.icon} size={20} color="#fff"/>
          </div>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{p.category}</p>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#fff", marginBottom:6 }}>{p.appName}</h3>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>{p.tagline}</p>
        </div>
        {/* Body */}
        <div style={{ padding:"20px", overflowY:"auto", flex:1 }}>
          <p style={{ fontSize:13, color:T.textMid, lineHeight:1.85, marginBottom:20 }}>{p.description}</p>

          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.text, marginBottom:12, textTransform:"uppercase", letterSpacing:0.5 }}>Features</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
            {p.features.map((f,i)=>(
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:p.accentDim, border:`1.5px solid ${p.accent}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <Icon n="check" size={10} color={p.accent} strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize:13, color:T.textMid, lineHeight:1.6 }}>{f}</span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.text, marginBottom:10, textTransform:"uppercase", letterSpacing:0.5 }}>Tech Stack</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
            {p.tech.map(t=><span key={t} style={{ background:p.accentDim, color:p.accent, border:`1px solid ${p.accent}30`, borderRadius:6, padding:"3px 10px", fontSize:12, fontWeight:600 }}>{t}</span>)}
          </div>

          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.text, marginBottom:10, textTransform:"uppercase", letterSpacing:0.5 }}>Integrations</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:20 }}>
            {p.integrations.map((ig,i)=>(
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center", background:T.surface, borderRadius:8, padding:"8px 12px", border:`1px solid ${T.border}` }}>
                <Icon n="zap" size={12} color={p.accent}/>
                <span style={{ fontSize:12, color:T.textMid }}>{ig}</span>
              </div>
            ))}
          </div>

          {p.url
            ? <a href={p.url} target="_blank" rel="noreferrer" className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:p.accent, color:"#fff", borderRadius:12, padding:"14px", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13 }}>
                View Live <Icon n="external" size={15} color="#fff"/>
              </a>
            : <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"13px", textAlign:"center" }}>
                <span style={{ fontSize:12, color:T.textDim }}>Deployment in progress</span>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

/* ─── Landing Page ──────────────────────────────────────────────────────────── */
const LandingPage = ({ onGetStarted }) => {
  const w = useWidth();
  const isMobile = w < 768;
  const [section, setSection] = useState("home");
  const [selProject, setSelProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const go = (s) => { setSection(s); setMobileMenuOpen(false); window.scrollTo({ top:0, behavior:"smooth" }); };

  const navItems = [
    { id:"home",      icon:"home",      label:"Home" },
    { id:"portfolio", icon:"layers",    label:"Work" },
    { id:"services",  icon:"tag",       label:"Services" },
    { id:"about",     icon:"user",      label:"About" },
    { id:"contact",   icon:"phone",     label:"Contact" },
  ];

  const stats = [
    { n:"7",   l:"Projects Built",  color:T.indigo },
    { n:"10+", l:"APIs Integrated", color:T.emerald },
    { n:"17",  l:"Years Old",       color:T.amber },
    { n:"3",   l:"Live Today",      color:T.rose },
  ];

  const techStack = ["Next.js","React","TypeScript","Node.js","Supabase","Firebase","Groq AI","WebRTC","Twilio","Nodemailer","Vercel","Render"];

  const services = [
    { name:"Basic",    price:"3,000",  delivery:"5 days",  support:"1 month",   pages:"Up to 3 pages",  best:"Shops, personal brands",    hot:false, accentColor:T.navy,
      features:["Responsive design","Contact section","WhatsApp button","Basic animations","Vercel deployment"] },
    { name:"Business", price:"6,000",  delivery:"10 days", support:"3 months",  pages:"Up to 7 pages",  best:"Restaurants, schools, clinics", hot:true, accentColor:T.indigo,
      features:["Everything in Basic","Admin panel","Database integration","Email notifications","2 revision rounds"] },
    { name:"Premium",  price:"10,000", delivery:"15 days", support:"6 months",  pages:"Unlimited",      best:"Full business systems",      hot:false, accentColor:T.emerald,
      features:["Everything in Business","AI integration","WhatsApp + Telegram alerts","Google Sheets sync","Custom integrations"] },
  ];

  const contacts = [
    { icon:"whatsapp",  label:"WhatsApp",  value:"+91 99447 61306",          href:"https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website", color:T.emerald },
    { icon:"mail",      label:"Email",     value:"gokulmaniraj2008@gmail.com",href:"mailto:gokulmaniraj2008@gmail.com",                           color:T.rose },
    { icon:"instagram", label:"Instagram", value:"@__gk.__.fxl__",           href:"https://www.instagram.com/__gk.__.fxl__",                     color:"#7c3aed" },
    { icon:"github",    label:"GitHub",    value:"gokulmaniraj2008-collab",   href:"https://github.com/gokulmaniraj2008-collab",                  color:T.navy },
  ];

  const px = isMobile ? "16px" : "32px";
  const maxW = 960;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:T.bg, minHeight:"100vh", color:T.text }}>
      {selProject && <ProjectModal project={selProject} onClose={()=>setSelProject(null)}/>}

      {/* ── Desktop Nav ── */}
      {!isMobile && (
        <nav style={{ position:"sticky", top:0, zIndex:500, background:`${T.white}ee`, backdropFilter:"blur(12px)", borderBottom:`1px solid ${T.border}`, padding:`0 ${px}` }}>
          <div style={{ maxWidth:maxW, margin:"0 auto", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, background:T.navy, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon n="logo" size={16} color="#fff"/>
              </div>
              <div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:T.text, lineHeight:1 }}>GKFXL</p>
                <p style={{ fontSize:9, color:T.textDim, letterSpacing:1 }}>Learn · Build · Earn</p>
              </div>
            </div>
            <div style={{ display:"flex", gap:2 }}>
              {navItems.map(n=>(
                <button key={n.id} onClick={()=>go(n.id)} style={{ background:section===n.id?T.navyDim:"none", border:"none", borderRadius:8, padding:"7px 14px", fontSize:13, fontWeight:section===n.id?600:400, color:section===n.id?T.navy:T.textMid, cursor:"pointer" }}>
                  {n.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={onGetStarted} className="btn-hover" style={{ padding:"9px 16px", background:T.indigoDim, border:`1.5px solid ${T.indigo}30`, borderRadius:9, fontSize:13, fontWeight:600, color:T.indigo, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
                <Icon n="builder" size={14} color={T.indigo}/> AI Builder
              </button>
              <button onClick={()=>go("contact")} className="btn-hover" style={{ padding:"9px 16px", background:T.navy, border:"none", borderRadius:9, fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer" }}>Hire Me</button>
            </div>
          </div>
        </nav>
      )}

      {/* ── Mobile Top Bar ── */}
      {isMobile && (
        <div style={{ position:"sticky", top:0, zIndex:500, background:`${T.white}ee`, backdropFilter:"blur(12px)", borderBottom:`1px solid ${T.border}`, padding:"0 16px", height:54, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:30, height:30, background:T.navy, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon n="logo" size={14} color="#fff"/>
            </div>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:T.text }}>GKFXL</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={onGetStarted} style={{ padding:"7px 12px", background:T.indigoDim, border:`1px solid ${T.indigo}25`, borderRadius:8, fontSize:12, fontWeight:600, color:T.indigo, cursor:"pointer" }}>AI Builder</button>
            <button onClick={()=>go("contact")} style={{ padding:"7px 12px", background:T.navy, border:"none", borderRadius:8, fontSize:12, fontWeight:600, color:"#fff", cursor:"pointer" }}>Hire</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════ HOME ═══════════════════════ */}
      {section==="home" && (
        <div style={{ animation:"fadeIn 0.4s ease" }}>
          {/* Hero */}
          <div style={{ maxWidth:maxW, margin:"0 auto", padding:isMobile?"48px 16px 40px":`80px ${px} 64px` }}>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?40:64, alignItems:"center" }}>
              {/* Left */}
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:T.emeraldDim, border:`1px solid ${T.emerald}30`, borderRadius:20, padding:"5px 12px", marginBottom:22 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:T.emerald }}/>
                  <span style={{ fontSize:11, color:T.emerald, fontWeight:600 }}>Available for projects</span>
                </div>
                <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?34:48, fontWeight:800, color:T.text, lineHeight:1.08, letterSpacing:isMobile?-1:-2, marginBottom:18 }}>
                  I Build Real<br/>
                  <span style={{ color:T.indigo }}>Web Apps</span><br/>
                  That Work.
                </h1>
                <p style={{ fontSize:15, color:T.textMid, lineHeight:1.8, marginBottom:28, maxWidth:360 }}>
                  Full-stack developer, 17, Coimbatore. Real databases, AI integrations, automated notifications — not templates.
                </p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:36 }}>
                  <button onClick={()=>go("portfolio")} className="btn-hover" style={{ padding:"13px 22px", background:T.navy, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                    View Work <Icon n="arrow" size={15} color="#fff"/>
                  </button>
                  <button onClick={()=>go("contact")} className="btn-hover" style={{ padding:"13px 22px", background:T.white, color:T.textMid, border:`1.5px solid ${T.border}`, borderRadius:11, fontSize:14, fontWeight:600, cursor:"pointer" }}>Hire Me</button>
                </div>
                {/* Stats */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {stats.map((s,i)=>(
                    <div key={i} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                      <p style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:s.color, marginBottom:2 }}>{s.n}</p>
                      <p style={{ fontSize:9, color:T.textDim, lineHeight:1.3 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — AI Builder preview */}
              <div style={{ background:T.white, border:`1.5px solid ${T.border}`, borderRadius:20, padding:isMobile?20:28, boxShadow:"0 4px 32px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:18 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:T.emerald, animation:"pulse 2s ease infinite" }}/>
                  <span style={{ fontSize:12, color:T.textMid, fontWeight:500 }}>AI Consultant is ready</span>
                </div>
                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px", marginBottom:16 }}>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:T.text, lineHeight:1.5 }}>
                    "What type of website do you want to build?"
                  </p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
                  {["Restaurant","Portfolio","Business","Ecommerce"].map(opt=>(
                    <button key={opt} onClick={onGetStarted} style={{ padding:"10px 12px", background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:9, fontSize:13, color:T.textMid, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:8, transition:"border-color 0.15s" }}>
                      <Icon n={WEBSITE_TYPE_ICONS[opt]} size={14} color={T.indigo}/> {opt}
                    </button>
                  ))}
                </div>
                <button onClick={onGetStarted} className="btn-hover" style={{ width:"100%", padding:"14px", background:T.navy, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:9, fontFamily:"'Syne',sans-serif" }}>
                  Start Free AI Interview <Icon n="arrow" size={16} color="#fff"/>
                </button>
                <p style={{ fontSize:11, color:T.textDim, textAlign:"center", marginTop:10 }}>Sign in with Google — no password needed</p>
              </div>
            </div>
          </div>

          {/* Tech strip */}
          <div style={{ borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"24px 0", background:T.white }}>
            <div style={{ maxWidth:maxW, margin:"0 auto", padding:`0 ${px}` }}>
              <p style={{ fontSize:10, color:T.textDim, textAlign:"center", marginBottom:14, textTransform:"uppercase", letterSpacing:1.5 }}>Technologies in production</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {techStack.map(s=>(
                  <span key={s} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:7, padding:"6px 12px", fontSize:12, fontWeight:500, color:T.textMid }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA pair */}
          <div style={{ maxWidth:maxW, margin:"0 auto", padding:isMobile?`32px 16px 80px`:`48px ${px} 64px` }}>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16 }}>
              <div style={{ background:T.navy, borderRadius:20, padding:"32px 28px" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#fff", marginBottom:8 }}>Need a website built?</p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", marginBottom:22, lineHeight:1.75 }}>Starting at Rs. 3,000. Delivered in 5 days. Real features — not templates.</p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <a href="https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website" target="_blank" rel="noreferrer" className="btn-hover" style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.white, color:T.navy, borderRadius:10, padding:"11px 18px", fontSize:13, fontWeight:700 }}>
                    <Icon n="whatsapp" size={15} color={T.emerald}/> WhatsApp
                  </a>
                  <button onClick={()=>go("services")} style={{ padding:"11px 18px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, fontSize:13, fontWeight:500, color:"#fff", cursor:"pointer" }}>View Pricing</button>
                </div>
              </div>
              <div style={{ background:T.white, border:`1.5px solid ${T.border}`, borderRadius:20, padding:"32px 28px", boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:T.text, marginBottom:8 }}>Build it yourself — free</p>
                <p style={{ fontSize:13, color:T.textMid, marginBottom:22, lineHeight:1.75 }}>Use AI Website Architect. Answer questions, get a full plan and website code — for free.</p>
                <button onClick={onGetStarted} className="btn-hover" style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.indigo, color:"#fff", border:"none", borderRadius:10, padding:"11px 18px", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                  <Icon n="builder" size={15} color="#fff"/> Try Free Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ PORTFOLIO ═══════════════════════ */}
      {section==="portfolio" && (
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:isMobile?`32px 16px 96px`:`48px ${px} 64px`, animation:"fadeIn 0.4s ease" }}>
          <div style={{ marginBottom:32 }}>
            <p style={{ fontSize:11, color:T.indigo, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Portfolio</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?26:32, fontWeight:800, color:T.text, marginBottom:8 }}>7 Real Projects</h2>
            <p style={{ fontSize:14, color:T.textMid }}>All built and deployed independently. Tap any project for full details.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {PROJECTS.map((p,i)=>(
              <button key={p.id} onClick={()=>setSelProject(p)} className="card-hover" style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:18, overflow:"hidden", cursor:"pointer", textAlign:"left", width:"100%", padding:0, animation:`fadeUp 0.4s ease ${i*0.06}s both` }}>
                {/* Coloured top strip */}
                <div style={{ background:p.accent, padding:"18px 20px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:38, height:38, background:"rgba(255,255,255,0.2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon n={p.icon} size={18} color="#fff"/>
                    </div>
                    <div>
                      <p style={{ fontSize:9, color:"rgba(255,255,255,0.55)", fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, marginBottom:2 }}>{p.category}</p>
                      <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:"#fff" }}>{p.appName}</p>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding:"14px 20px 16px" }}>
                  <p style={{ fontSize:13, color:T.textMid, lineHeight:1.65, marginBottom:12 }}>{p.tagline}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                      {p.tech.slice(0,4).map(t=><span key={t} style={{ background:p.accentDim, color:p.accent, borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:600 }}>{t}</span>)}
                      {p.tech.length>4 && <span style={{ background:T.surface, color:T.textDim, borderRadius:5, padding:"2px 8px", fontSize:10 }}>+{p.tech.length-4}</span>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ fontSize:12, fontWeight:600, color:p.accent }}>View details</span>
                      <Icon n="chevronR" size={13} color={p.accent}/>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════ SERVICES ═══════════════════════ */}
      {section==="services" && (
        <div style={{ maxWidth:maxW, margin:"0 auto", padding:isMobile?`32px 16px 96px`:`48px ${px} 64px`, animation:"fadeIn 0.4s ease" }}>
          <div style={{ marginBottom:32 }}>
            <p style={{ fontSize:11, color:T.indigo, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Services</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?26:32, fontWeight:800, color:T.text, marginBottom:8 }}>Pricing</h2>
            <p style={{ fontSize:14, color:T.textMid }}>50% upfront. 50% on delivery. 2 revisions. No hidden charges.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:40 }}>
            {services.map((s,i)=>(
              <div key={i} style={{ background:s.hot?T.navy:T.white, border:`2px solid ${s.hot?T.indigo:T.border}`, borderRadius:18, padding:"24px 20px", position:"relative" }}>
                {s.hot && <div style={{ position:"absolute", top:16, right:16, background:T.indigo, color:"#fff", borderRadius:20, padding:"2px 12px", fontSize:9, fontWeight:800, letterSpacing:0.5, textTransform:"uppercase" }}>Popular</div>}
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:s.hot?"#fff":T.text }}><span style={{ fontSize:13, fontWeight:500 }}>Rs. </span>{s.price}</p>
                  <span style={{ fontSize:12, color:s.hot?"rgba(255,255,255,0.5)":T.textDim }}>/ project</span>
                </div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:s.hot?"#fff":T.text, marginBottom:2 }}>{s.name}</p>
                <p style={{ fontSize:12, color:s.hot?"rgba(255,255,255,0.55)":T.textDim, marginBottom:3 }}>{s.pages} · {s.delivery} · {s.support} support</p>
                <p style={{ fontSize:12, color:s.hot?"rgba(255,255,255,0.45)":T.textDim, marginBottom:16 }}>Best for: {s.best}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:20 }}>
                  {s.features.map(f=>(
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <div style={{ width:17, height:17, borderRadius:"50%", background:s.hot?"rgba(255,255,255,0.1)":T.indigoDim, border:`1.5px solid ${s.hot?"rgba(255,255,255,0.2)":T.indigo+"40"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon n="check" size={10} color={s.hot?"#fff":T.indigo} strokeWidth={2.5}/>
                      </div>
                      <span style={{ fontSize:13, color:s.hot?"rgba(255,255,255,0.7)":T.textMid }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/919944761306?text=Hi+Gokul,+I+want+the+${s.name}+package`} target="_blank" rel="noreferrer" className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:s.hot?T.white:T.navy, color:s.hot?T.navy:"#fff", borderRadius:11, padding:"13px", fontSize:13, fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                  <Icon n="whatsapp" size={15} color={T.emerald}/> Get Started on WhatsApp
                </a>
              </div>
            ))}
          </div>
          {/* How it works */}
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?18:22, fontWeight:800, color:T.text, marginBottom:16 }}>How It Works</p>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:12 }}>
            {[{n:"01",t:"Contact",d:"WhatsApp or email. Tell me what you need."},{n:"02",t:"Discuss",d:"Scope, price, timeline. Pay 50% upfront."},{n:"03",t:"Build",d:"Real features — not templates."},{n:"04",t:"Deliver",d:"2 revisions, pay balance, go live."}].map((s,i)=>(
              <div key={i} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 16px" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:T.border, marginBottom:8 }}>{s.n}</p>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.text, marginBottom:4 }}>{s.t}</p>
                <p style={{ fontSize:12, color:T.textMid, lineHeight:1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════ ABOUT ═══════════════════════ */}
      {section==="about" && (
        <div style={{ maxWidth:680, margin:"0 auto", padding:isMobile?`32px 16px 96px`:`48px ${px} 64px`, animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11, color:T.indigo, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>About</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?26:32, fontWeight:800, color:T.text, marginBottom:24 }}>Gokul M</h2>
          <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:16, padding:"22px", marginBottom:14, boxShadow:"0 1px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:14, color:T.textMid, lineHeight:1.85, marginBottom:14 }}>17-year-old full-stack developer from Coimbatore, Tamil Nadu. I build real web applications — not template sites — with actual databases, authentication, AI integrations, and automated notifications.</p>
            <p style={{ fontSize:14, color:T.textMid, lineHeight:1.85 }}>Every project is deployed and solving real problems. GGE serves rural Tamil Nadu with AI guidance. TANNE manages real restaurant orders. FlamZone runs real-time multiplayer games with WebRTC calls. AI Website Architect lets anyone build a website through a smart interview.</p>
          </div>
          <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:16, padding:"22px", marginBottom:14, boxShadow:"0 1px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.text, marginBottom:16, textTransform:"uppercase", letterSpacing:0.5 }}>Key Facts</p>
            {["17 years old, Coimbatore, Tamil Nadu","Self-taught full-stack developer","7 real deployed applications built independently","WhatsApp, Telegram, Gmail, Google Sheets, AI — all in production","Focused on civic tech, education, and business tools for India","Founder of GKFXL — Learn, Build, Earn"].map((f,i)=>(
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:T.indigoDim, border:`1.5px solid ${T.indigo}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                  <Icon n="check" size={10} color={T.indigo} strokeWidth={2.5}/>
                </div>
                <span style={{ fontSize:13, color:T.textMid, lineHeight:1.6 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ background:T.navy, borderRadius:16, padding:"22px", marginBottom:14 }}>
            <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Current Status</p>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:"#fff", marginBottom:4 }}>Open for client projects</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Websites, apps, management systems, AI integrations</p>
          </div>
          <div style={{ background:T.indigoDim, border:`1px solid ${T.indigo}20`, borderRadius:14, padding:"16px" }}>
            <p style={{ fontSize:11, color:T.indigo, fontWeight:700, marginBottom:4 }}>Honest Note</p>
            <p style={{ fontSize:13, color:T.textMid, lineHeight:1.65 }}>Zero paying clients yet. Seven real deployed projects. All the skills. Looking for the first client who wants a developer that builds systems that actually work.</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════ CONTACT ═══════════════════════ */}
      {section==="contact" && (
        <div style={{ maxWidth:680, margin:"0 auto", padding:isMobile?`32px 16px 96px`:`48px ${px} 64px`, animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11, color:T.indigo, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Contact</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?26:32, fontWeight:800, color:T.text, marginBottom:8 }}>Get in Touch</h2>
          <p style={{ fontSize:14, color:T.textMid, marginBottom:28 }}>Fastest reply on WhatsApp. I respond within 24 hours.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
            {contacts.map((ct,i)=>(
              <a key={i} href={ct.href} target="_blank" rel="noreferrer" className="card-hover" style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${ct.color}12`, border:`1px solid ${ct.color}25`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon n={ct.icon} size={20} color={ct.color}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:10, color:T.textDim, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8, marginBottom:2 }}>{ct.label}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ct.value}</p>
                </div>
                <Icon n="chevronR" size={14} color={T.textDim}/>
              </a>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
            <div style={{ background:T.navy, borderRadius:16, padding:"22px", textAlign:"center" }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:"#fff", marginBottom:6 }}>Ready to hire?</p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:18, lineHeight:1.65 }}>Send your business name and what you need.</p>
              <a href="https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website" target="_blank" rel="noreferrer" className="btn-hover" style={{ display:"inline-flex", alignItems:"center", gap:7, background:T.white, color:T.navy, borderRadius:9, padding:"10px 16px", fontSize:13, fontWeight:700 }}>
                <Icon n="whatsapp" size={14} color={T.emerald}/> WhatsApp
              </a>
            </div>
            <div style={{ background:T.indigoDim, border:`1px solid ${T.indigo}20`, borderRadius:16, padding:"22px", textAlign:"center" }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:T.text, marginBottom:6 }}>Build it yourself?</p>
              <p style={{ fontSize:12, color:T.textMid, marginBottom:18, lineHeight:1.65 }}>AI Website Architect — free forever.</p>
              <button onClick={onGetStarted} className="btn-hover" style={{ background:T.indigo, color:"#fff", border:"none", borderRadius:9, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:7 }}>
                <Icon n="builder" size={14} color="#fff"/> Try Free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Bottom Tab Nav ── */}
      {isMobile && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:500, background:`${T.white}f5`, backdropFilter:"blur(12px)", borderTop:`1px solid ${T.border}`, display:"flex", padding:"8px 0 max(8px,env(safe-area-inset-bottom))" }}>
          {navItems.map(n=>(
            <button key={n.id} onClick={()=>go(n.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:"4px 0" }}>
              <Icon n={n.icon} size={20} color={section===n.id?T.navy:T.textDim}/>
              <span style={{ fontSize:9, fontWeight:section===n.id?700:400, color:section===n.id?T.navy:T.textDim, letterSpacing:0.3 }}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Login Page ────────────────────────────────────────────────────────────── */
const LoginPage = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGoogle = async () => {
    setLoading(true); setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:window.location.origin } });
      if (error) setError(error.message);
    } catch { setError("Login failed. Please try again."); }
    finally { setLoading(false); }
  };
  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div style={{ width:"100%", maxWidth:380, animation:"fadeUp 0.4s ease" }}>
        <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:20, padding:"32px 28px", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", marginBottom:14 }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:52, height:52, background:T.navy, borderRadius:14, marginBottom:16 }}>
              <Icon n="logo" size={22} color="#fff"/>
            </div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:T.text, marginBottom:6 }}>Welcome back</h2>
            <p style={{ fontSize:13, color:T.textMid }}>Sign in to AI Website Architect</p>
          </div>
          <button onClick={handleGoogle} disabled={loading} className="btn-hover" style={{ width:"100%", padding:"14px 20px", background:T.white, border:`1.5px solid ${T.border}`, borderRadius:12, fontSize:14, fontWeight:600, color:T.text, cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16, opacity:loading?0.6:1 }}>
            {loading ? <Spinner size={18} color={T.indigo}/> : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
          {error && (
            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", gap:8, alignItems:"center" }}>
              <Icon n="info" size={14} color={T.rose}/>
              <p style={{ fontSize:12, color:T.rose, margin:0 }}>{error}</p>
            </div>
          )}
          <p style={{ fontSize:11, color:T.textDim, textAlign:"center", lineHeight:1.7 }}>No password stored — Google login only.</p>
        </div>
        <button onClick={onBack} style={{ width:"100%", padding:"12px", background:"none", border:`1px solid ${T.border}`, borderRadius:12, fontSize:13, color:T.textMid, cursor:"pointer", background:T.white }}>
          ← Back
        </button>
      </div>
    </div>
  );
};

/* ─── Dashboard Sidebar ─────────────────────────────────────────────────────── */
const Sidebar = ({ page, setPage, user, onLogout, collapsed, setCollapsed }) => {
  const C = T; // use dark tokens for sidebar
  const nav = [
    { id:"dashboard", icon:"dashboard", label:"Dashboard" },
    { id:"builder",   icon:"builder",   label:"Website Builder" },
    { id:"chatbot",   icon:"bot",       label:"Chatbot Builder" },
    { id:"projects",  icon:"projects",  label:"My Projects" },
    { id:"analytics", icon:"analytics", label:"Analytics" },
    { id:"settings",  icon:"settings",  label:"Settings" },
  ];
  return (
    <div style={{ width:collapsed?64:216, flexShrink:0, background:T.dark, borderRight:`1px solid ${T.darkBorder}`, display:"flex", flexDirection:"column", height:"100vh", position:"sticky", top:0, transition:"width 0.22s ease", overflow:"hidden" }}>
      <div style={{ padding:collapsed?"16px 12px":"16px", borderBottom:`1px solid ${T.darkBorder}`, display:"flex", alignItems:"center", gap:10, minHeight:60 }}>
        <div style={{ width:32, height:32, background:T.indigo, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Icon n="logo" size={15} color="#fff"/>
        </div>
        {!collapsed && (
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:800, color:T.darkText, lineHeight:1.1 }}>AI Architect</p>
            <p style={{ fontSize:9, color:T.darkDim }}>Website Builder</p>
          </div>
        )}
        <button onClick={()=>setCollapsed(!collapsed)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, flexShrink:0, marginLeft:collapsed?"auto":0 }}>
          <Icon n={collapsed?"menu":"x"} size={15} color={T.darkDim}/>
        </button>
      </div>
      <div style={{ flex:1, padding:"10px 8px", display:"flex", flexDirection:"column", gap:2, overflowY:"auto" }}>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>setPage(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:9, border:"none", background:page===item.id?"rgba(79,70,229,0.15)":"none", color:page===item.id?"#818cf8":T.darkDim, cursor:"pointer", textAlign:"left", position:"relative" }}>
            <Icon n={item.icon} size={17} color={page===item.id?"#818cf8":T.darkDim}/>
            {!collapsed && <span style={{ fontSize:13, fontWeight:page===item.id?600:400, whiteSpace:"nowrap" }}>{item.label}</span>}
            {page===item.id && <div style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-50%)", width:3, height:18, background:"#818cf8", borderRadius:"0 3px 3px 0" }}/>}
          </button>
        ))}
      </div>
      <div style={{ padding:"10px 8px", borderTop:`1px solid ${T.darkBorder}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", marginBottom:4 }}>
          <div style={{ width:30, height:30, borderRadius:"50%", background:T.indigo, overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {user?.photo ? <img src={user.photo} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{(user?.name||"U")[0]}</span>}
          </div>
          {!collapsed && (
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:11, fontWeight:600, color:T.darkText, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name||"User"}</p>
              <p style={{ fontSize:9, color:T.darkDim, margin:0 }}>Free Plan</p>
            </div>
          )}
        </div>
        <button onClick={onLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, border:"none", background:"none", color:T.darkDim, cursor:"pointer" }}>
          <Icon n="logout" size={15} color={T.darkDim}/>
          {!collapsed && <span style={{ fontSize:13 }}>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

/* ─── Mobile Dashboard Bottom Nav ──────────────────────────────────────────── */
const MobileDashNav = ({ page, setPage }) => {
  const nav = [
    { id:"dashboard", icon:"dashboard", label:"Home" },
    { id:"builder",   icon:"builder",   label:"Builder" },
    { id:"chatbot",   icon:"bot",       label:"Chatbot" },
    { id:"projects",  icon:"projects",  label:"Projects" },
    { id:"settings",  icon:"settings",  label:"Settings" },
  ];
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:600, background:`${T.dark}f8`, backdropFilter:"blur(12px)", borderTop:`1px solid ${T.darkBorder}`, display:"flex", padding:`8px 0 max(8px,env(safe-area-inset-bottom))` }}>
      {nav.map(n=>(
        <button key={n.id} onClick={()=>setPage(n.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"2px 0" }}>
          <Icon n={n.icon} size={20} color={page===n.id?"#818cf8":T.darkDim}/>
          <span style={{ fontSize:9, fontWeight:page===n.id?700:400, color:page===n.id?"#818cf8":T.darkDim }}>{n.label}</span>
        </button>
      ))}
    </div>
  );
};

/* ─── Project Card (dashboard) ──────────────────────────────────────────────── */
const ST = { interview:{ label:"In Progress", color:"#f59e0b", bg:"#f59e0b15" }, workflow:{ label:"Workflow Ready", color:"#818cf8", bg:"#818cf815" }, generated:{ label:"Generated", color:"#22c55e", bg:"#22c55e15" } };
const DashProjectCard = ({ project, onDelete }) => {
  const st = ST[project.status]||ST.interview;
  return (
    <div style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:13, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:40, height:40, background:T.darkSurface, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Icon n={WEBSITE_TYPE_ICONS[project.website_type]||"globe"} size={18} color="#818cf8"/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.darkText, marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {project.project_name||project.website_type||"Untitled"}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:10, background:st.bg, color:st.color, padding:"2px 7px", borderRadius:5, fontWeight:600 }}>{st.label}</span>
          <span style={{ fontSize:10, color:T.darkDim }}>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      {onDelete && (
        <button onClick={()=>onDelete(project.id)} style={{ padding:"6px 8px", background:"#ef444415", border:"1px solid #ef444430", borderRadius:8, cursor:"pointer" }}>
          <Icon n="trash" size={13} color="#ef4444"/>
        </button>
      )}
    </div>
  );
};

/* ─── Dashboard Page ────────────────────────────────────────────────────────── */
const DashboardPage = ({ user, setPage, projects, chatbots }) => {
  const w = useWidth();
  const isMobile = w < 768;
  const hour = new Date().getHours();
  const greeting = hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  const stats = [
    { label:"Projects",     value:projects.length,                                                      icon:"projects",  color:"#818cf8" },
    { label:"Chatbots",     value:chatbots.length,                                                      icon:"bot",       color:"#22c55e" },
    { label:"Workflows",    value:projects.filter(p=>p.status==="workflow"||p.status==="generated").length, icon:"globe",  color:"#f59e0b" },
    { label:"AI Credits",   value:"∞",                                                                  icon:"zap",       color:T.darkDim  },
  ];
  const qa = [
    { label:"Build a Website",  desc:"Start AI interview",  icon:"builder",  page:"builder",  color:"#818cf8", bg:"#818cf815" },
    { label:"Create a Chatbot", desc:"Deploy in minutes",   icon:"bot",      page:"chatbot",  color:"#22c55e", bg:"#22c55e15" },
    { label:"View Projects",    desc:"All your work",       icon:"projects", page:"projects", color:"#f59e0b", bg:"#f59e0b15" },
  ];
  return (
    <div style={{ padding:isMobile?"20px 16px 88px":"28px", maxWidth:860 }}>
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:12, color:T.darkDim, marginBottom:3 }}>{greeting}</p>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?22:26, fontWeight:800, color:T.darkText }}>{user?.name?.split(" ")[0]||"Welcome"}</h1>
        <p style={{ fontSize:13, color:T.darkDim, marginTop:2 }}>Your AI website workspace</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:24 }}>
        {stats.map((s,i)=>(
          <div key={i} style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:13, padding:"16px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <Icon n={s.icon} size={16} color={s.color}/>
              <div style={{ width:6, height:6, borderRadius:"50%", background:s.color }}/>
            </div>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?20:24, fontWeight:800, color:T.darkText, marginBottom:3 }}>{s.value}</p>
            <p style={{ fontSize:10, color:T.darkDim }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:24 }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.darkText, marginBottom:12 }}>Quick Actions</p>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr 1fr":"repeat(3,1fr)", gap:10 }}>
          {qa.map((a,i)=>(
            <button key={i} onClick={()=>setPage(a.page)} style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:14, padding:isMobile?"14px 12px":"18px 16px", cursor:"pointer", textAlign:"left", display:"flex", flexDirection:"column", gap:isMobile?8:10 }}>
              <div style={{ width:38, height:38, background:a.bg, border:`1px solid ${a.color}30`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon n={a.icon} size={18} color={a.color}/>
              </div>
              <div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?12:13, fontWeight:700, color:T.darkText, marginBottom:2 }}>{a.label}</p>
                {!isMobile && <p style={{ fontSize:11, color:T.darkDim }}>{a.desc}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.darkText }}>Recent Projects</p>
          <button onClick={()=>setPage("projects")} style={{ background:"none", border:"none", fontSize:12, color:"#818cf8", cursor:"pointer" }}>View all</button>
        </div>
        {projects.length===0 ? (
          <div style={{ background:T.darkCard, border:`1px dashed ${T.darkBorder}`, borderRadius:14, padding:"36px 20px", textAlign:"center" }}>
            <div style={{ width:44, height:44, background:"#818cf815", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
              <Icon n="builder" size={20} color="#818cf8"/>
            </div>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:T.darkText, marginBottom:5 }}>No projects yet</p>
            <p style={{ fontSize:12, color:T.darkDim, marginBottom:16 }}>Start your first AI website interview</p>
            <button onClick={()=>setPage("builder")} style={{ padding:"10px 20px", background:"#818cf8", color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer" }}>Build First Website</button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {projects.slice(0,4).map(p=><DashProjectCard key={p.id} project={p}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Builder Page ──────────────────────────────────────────────────────────── */
const BuilderPage = ({ user, onProjectSaved }) => {
  const w = useWidth(); const isMobile = w < 768;
  const [step, setStep] = useState("type");
  const [websiteType, setWebsiteType] = useState("");
  const [phase, setPhase] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [curAnswer, setCurAnswer] = useState("");
  const [selOpts, setSelOpts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [workflow, setWorkflow] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [copied, setCopied] = useState(false);

  const getPhaseQs = (ph) => ph===5 ? (PHASE6_QUESTIONS[websiteType]||[]) : PHASES[ph].questions;
  const phaseQs = getPhaseQs(phase);
  const curQ = phaseQs[qIdx];
  const answered = Object.keys(answers).length;
  const totalQ = PHASES.reduce((s,_,i)=>s+(i===5?(PHASE6_QUESTIONS[websiteType]?.length||0):PHASES[i].questions.length),0);

  const saveProgress = async (upd, status="interview") => {
    setSaving(true);
    try {
      if (projectId) {
        await supabase.from("website_projects").update({ answers:upd,current_phase:phase,current_question:qIdx,status,updated_at:new Date().toISOString() }).eq("id",projectId);
      } else {
        const { data } = await supabase.from("website_projects").insert([{ user_id:user.id,website_type:websiteType,project_name:upd.company_name||websiteType+" Website",answers:upd,status,current_phase:phase,current_question:qIdx }]).select().single();
        if (data) setProjectId(data.id);
      }
    } catch(e){ console.error(e); }
    setSaving(false);
  };

  const handleAnswer = async (answer) => {
    const upd = { ...answers, [curQ.id]:answer };
    setAnswers(upd); setCurAnswer(""); setSelOpts([]);
    const nextQ = qIdx+1; const nextPh = phase+1;
    if (nextQ < phaseQs.length) { setQIdx(nextQ); }
    else if (nextPh < 7) { setPhase(nextPh); setQIdx(0); await saveProgress(upd); }
    else { await saveProgress(upd,"workflow"); generateWorkflow(upd); }
  };

  const goBack = () => {
    if (qIdx>0) { setQIdx(qIdx-1); }
    else if (phase>0) { const p=phase-1; setPhase(p); setQIdx(getPhaseQs(p).length-1); }
  };

  const generateWorkflow = async (all) => {
    setStep("workflow"); setGenerating(true);
    try {
      const res = await fetch("/api/groq",{ method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ messages:[{ role:"user",content:`You are an expert website architect. Based on these interview answers, generate a complete website plan.\n\nWebsite Type: ${websiteType}\nAnswers: ${JSON.stringify(all,null,2)}\n\nRespond ONLY with valid JSON (no markdown, no backticks):\n{\n  "projectName":"...",\n  "websiteType":"...",\n  "pages":["Home","About",...],\n  "features":["Feature 1",...],\n  "techStack":["React","Next.js",...],\n  "colorScheme":{"primary":"#hex","secondary":"#hex","bg":"#hex","text":"#hex"},\n  "fontPairing":{"heading":"font name","body":"font name"},\n  "seoKeywords":["keyword1",...],\n  "estimatedTime":"X weeks",\n  "launchPlan":["Step 1","Step 2",...],\n  "summary":"One paragraph describing the complete website plan"\n}` }], userName:user?.name||"User" })
      });
      const data = await res.json();
      const text = (data.reply||"").replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(text);
      setWorkflow(parsed);
      if (projectId) await supabase.from("website_projects").update({ workflow:parsed,status:"workflow" }).eq("id",projectId);
    } catch { setWorkflow({ error:"Could not generate workflow. Please try again." }); }
    setGenerating(false);
  };

  const pad = isMobile?"20px 16px 88px":"28px";

  if (step==="type") return (
    <div style={{ padding:pad, maxWidth:680 }}>
      <p style={{ fontSize:10, color:T.darkDim, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Step 1 of 7</p>
      <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?20:22, fontWeight:800, color:T.darkText, marginBottom:6 }}>What type of website?</h2>
      <p style={{ fontSize:13, color:T.darkDim, marginBottom:20 }}>I will customise the interview questions based on your choice.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
        {WEBSITE_TYPES.map((type,i)=>(
          <button key={type} onClick={()=>{ setWebsiteType(type); setStep("interview"); }} style={{ background:T.darkCard, border:`1.5px solid ${websiteType===type?"#818cf8":T.darkBorder}`, borderRadius:13, padding:"15px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, background:"#818cf815", border:"1px solid #818cf825", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon n={WEBSITE_TYPE_ICONS[type]} size={16} color="#818cf8"/>
            </div>
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.darkText, marginBottom:1 }}>{type}</p>
              <p style={{ fontSize:10, color:T.darkDim }}>Customised</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if (step==="interview") {
    const phaseInfo = PHASES[phase]||{ label:"Type-Specific Details" };
    return (
      <div style={{ padding:pad, maxWidth:600 }}>
        {/* Phase progress */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ display:"flex", gap:4 }}>
              {PHASES.map((_,i)=><div key={i} style={{ height:3, width:i<phase?24:i===phase?32:12, borderRadius:3, background:i<phase?"#22c55e":i===phase?"#818cf8":T.darkBorder, transition:"all 0.3s" }}/>)}
            </div>
            <span style={{ fontSize:10, color:T.darkDim }}>{answered}/{totalQ}</span>
          </div>
          <p style={{ fontSize:11, color:"#818cf8", fontWeight:600, textTransform:"uppercase", letterSpacing:0.5 }}>Phase {phase+1}: {phaseInfo.label}</p>
        </div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#818cf815", border:"1px solid #818cf825", borderRadius:9, padding:"6px 12px", marginBottom:18 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", animation:"pulse 2s ease infinite" }}/>
          <span style={{ fontSize:11, color:"#818cf8", fontWeight:600 }}>AI Consultant — {websiteType} Specialist</span>
        </div>
        {curQ ? (
          <div>
            <div style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:16, padding:"24px 20px", marginBottom:18 }}>
              <p style={{ fontSize:10, color:T.darkDim, marginBottom:8 }}>Q{qIdx+1} of {phaseQs.length}</p>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?17:20, fontWeight:700, color:T.darkText, lineHeight:1.4 }}>{curQ.question}</h3>
            </div>
            {(curQ.type==="text") && (
              <>
                <input value={curAnswer} onChange={e=>setCurAnswer(e.target.value)} onKeyDown={e=>e.key==="Enter"&&curAnswer.trim()&&handleAnswer(curAnswer.trim())} placeholder={curQ.placeholder} autoFocus
                  style={{ width:"100%", padding:"14px 16px", background:T.darkCard, border:`1.5px solid ${T.darkBorder}`, borderRadius:12, fontSize:14, color:T.darkText, fontFamily:"'DM Sans',sans-serif", marginBottom:10 }}/>
                <button onClick={()=>curAnswer.trim()&&handleAnswer(curAnswer.trim())} disabled={!curAnswer.trim()} style={{ width:"100%", padding:"13px", background:curAnswer.trim()?"#818cf8":T.darkBorder, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:600, cursor:curAnswer.trim()?"pointer":"not-allowed" }}>Continue</button>
              </>
            )}
            {curQ.type==="textarea" && (
              <>
                <textarea value={curAnswer} onChange={e=>setCurAnswer(e.target.value)} placeholder={curQ.placeholder} rows={4} autoFocus
                  style={{ width:"100%", padding:"14px 16px", background:T.darkCard, border:`1.5px solid ${T.darkBorder}`, borderRadius:12, fontSize:14, color:T.darkText, fontFamily:"'DM Sans',sans-serif", resize:"none", marginBottom:10 }}/>
                <button onClick={()=>curAnswer.trim()&&handleAnswer(curAnswer.trim())} disabled={!curAnswer.trim()} style={{ width:"100%", padding:"13px", background:curAnswer.trim()?"#818cf8":T.darkBorder, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:600, cursor:curAnswer.trim()?"pointer":"not-allowed" }}>Continue</button>
              </>
            )}
            {curQ.type==="choice" && (
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {curQ.options.map((opt,i)=>(
                  <button key={i} onClick={()=>handleAnswer(opt)} style={{ padding:"14px 16px", background:T.darkCard, border:`1.5px solid ${T.darkBorder}`, borderRadius:12, fontSize:14, color:T.darkText, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:26, height:26, borderRadius:7, background:T.darkSurface, border:`1px solid ${T.darkBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:T.darkDim }}>{["A","B","C","D","E"][i]}</span>
                    </div>
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {curQ.type==="multiselect" && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                  {curQ.options.map((opt,i)=>{ const sel=selOpts.includes(opt); return (
                    <button key={i} onClick={()=>setSelOpts(p=>sel?p.filter(o=>o!==opt):[...p,opt])}
                      style={{ padding:"12px 13px", background:sel?"#818cf815":T.darkCard, border:`1.5px solid ${sel?"#818cf8":T.darkBorder}`, borderRadius:11, fontSize:13, color:sel?"#818cf8":T.darkText, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:15, height:15, borderRadius:4, border:`1.5px solid ${sel?"#818cf8":T.darkBorder}`, background:sel?"#818cf8":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {sel && <Icon n="check" size={9} color="#fff" strokeWidth={3}/>}
                      </div>
                      {opt}
                    </button>
                  );})}
                </div>
                <button onClick={()=>selOpts.length&&handleAnswer(selOpts)} disabled={!selOpts.length} style={{ width:"100%", padding:"13px", background:selOpts.length?"#818cf8":T.darkBorder, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:600, cursor:selOpts.length?"pointer":"not-allowed" }}>
                  Continue with {selOpts.length} selected
                </button>
              </>
            )}
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              {(phase>0||qIdx>0) && <button onClick={goBack} style={{ padding:"9px 14px", background:"none", border:`1px solid ${T.darkBorder}`, borderRadius:9, fontSize:12, color:T.darkDim, cursor:"pointer" }}>Back</button>}
              <button onClick={()=>handleAnswer("Skip")} style={{ padding:"9px 14px", background:"none", border:"none", fontSize:12, color:T.darkDim, cursor:"pointer" }}>Skip</button>
              {saving && <Spinner size={15} color="#818cf8"/>}
            </div>
          </div>
        ) : <div style={{ textAlign:"center", padding:"40px 0" }}><Spinner size={28} color="#818cf8"/></div>}
      </div>
    );
  }

  if (step==="workflow") return (
    <div style={{ padding:pad, maxWidth:700 }}>
      <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?20:22, fontWeight:800, color:T.darkText, marginBottom:20 }}>Your Website Workflow</h2>
      {generating ? (
        <div style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:16, padding:"48px 20px", textAlign:"center" }}>
          <Spinner size={32} color="#818cf8"/><p style={{ fontSize:14, fontWeight:600, color:T.darkText, marginTop:14, marginBottom:5 }}>AI is building your workflow...</p>
          <p style={{ fontSize:12, color:T.darkDim }}>Analysing your answers</p>
        </div>
      ) : workflow && !workflow.error ? (
        <div>
          <div style={{ background:"#818cf815", border:"1px solid #818cf825", borderRadius:14, padding:"18px 20px", marginBottom:14 }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:T.darkText, marginBottom:6 }}>{workflow.projectName}</p>
            <p style={{ fontSize:12, color:T.darkDim, lineHeight:1.7 }}>{workflow.summary}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12, marginBottom:14 }}>
            {[
              { title:`Pages (${workflow.pages?.length})`, items:workflow.pages, bg:"#818cf815", color:"#818cf8" },
              { title:`Features (${workflow.features?.length})`, items:workflow.features, bg:"#22c55e15", color:"#22c55e" },
            ].map((block,i)=>(
              <div key={i} style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:13, padding:"16px" }}>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.darkText, marginBottom:10 }}>{block.title}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {block.items?.map((it,j)=><span key={j} style={{ fontSize:10, background:block.bg, color:block.color, padding:"2px 8px", borderRadius:5 }}>{it}</span>)}
                </div>
              </div>
            ))}
            <div style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:13, padding:"16px" }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.darkText, marginBottom:10 }}>Colour Scheme</p>
              <div style={{ display:"flex", gap:7 }}>
                {workflow.colorScheme && Object.entries(workflow.colorScheme).slice(0,4).map(([k,v])=>(
                  <div key={k} style={{ flex:1, textAlign:"center" }}>
                    <div style={{ height:28, background:v, borderRadius:7, marginBottom:4, border:`1px solid ${T.darkBorder}` }}/>
                    <p style={{ fontSize:8, color:T.darkDim }}>{k}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:13, padding:"16px" }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.darkText, marginBottom:10 }}>Launch Plan</p>
              {workflow.launchPlan?.map((s,i)=>(
                <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start", marginBottom:5 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:"#818cf815", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:8, fontWeight:700, color:"#818cf8" }}>{i+1}</span>
                  </div>
                  <p style={{ fontSize:11, color:T.darkDim, lineHeight:1.5 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>{setStep("type");setPhase(0);setQIdx(0);setAnswers({});setWorkflow(null);}} style={{ flex:1, padding:"12px", background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:11, fontSize:13, color:T.darkDim, cursor:"pointer" }}>Start Over</button>
            <button onClick={()=>{if(navigator.clipboard){navigator.clipboard.writeText(JSON.stringify(workflow,null,2));setCopied(true);setTimeout(()=>setCopied(false),2000);}}} style={{ padding:"12px 16px", background:T.darkCard, border:`1px solid ${T.darkBorder}`, borderRadius:11, fontSize:12, color:T.darkDim, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
              <Icon n="copy" size={13} color={T.darkDim}/> {copied?"Copied!":"Export"}
            </button>
            <button onClick={onProjectSaved} style={{ flex:2, padding:"12px", background:"#818cf8", color:"#fff", border:"none", borderRadius:11, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
              <Icon n="code" size={15} color="#fff"/> Save to Projects
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background:"#ef444415", border:"1px solid #ef444430", borderRadius:13, padding:"22px", textAlign:"center" }}>
          <p style={{ color:"#ef4444", marginBottom:12 }}>{workflow?.error||"Something went wrong."}</p>
          <button onClick={()=>generateWorkflow(answers)} style={{ padding:"10px 20px", background:"#818cf8", color:"#fff", border:"none", borderRadius:9, cursor:"pointer" }}>Try Again</button>
        </div>
      )}
    </div>
  );
  return null;
};

/* ─── Projects Page ─────────────────────────────────────────────────────────── */
const ProjectsPage = ({ user, projects, setProjects, setPage }) => {
  const w = useWidth(); const isMobile = w < 768;
  const deleteProject = async (id) => { await supabase.from("website_projects").delete().eq("id",id); setProjects(prev=>prev.filter(p=>p.id!==id)); };
  return (
    <div style={{ padding:isMobile?"20px 16px 88px":"28px", maxWidth:760 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:isMobile?20:22, fontWeight:800, color:T.darkText, marginBottom:3 }}>My Projects</h2>
          <p style={{ fontSize:12, color:T.darkDim }}>{projects.length} project{projects.length!==1?"s":""}</p>
        </div>
        <button onClick={()=>setPage("builder")} style={{ padding:"9px 16px", background:"#818cf8", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
          <Icon n="plus" size={14} color="#fff"/> New
        </button>
      </div>
      {projects.length===0 ? (
        <div style={{ background:T.darkCard, border:`1px dashed ${T.darkBorder}`, borderRadius:16, padding:"48px 20px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:T.darkText, marginBottom:5 }}>No projects yet</p>
          <p style={{ fontSize:12, color:T.darkDim, marginBottom:16 }}>Start your first AI interview</p>
          <button onClick={()=>setPage("builder")} style={{ padding:"10px 20px", background:"#818cf8", color:"#fff", border:"none", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer" }}>Build First Website</button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {projects.map(p=><DashProjectCard key={p.id} project={p} onDelete={deleteProject}/>)}
        </div>
      )}
    </div>
  );
};

/* ─── Chatbot Builder Page ──────────────────────────────────────────────────── */
const ChatbotPage = ({ user, chatbots, setChatbots }) => {
  const w = useWidth(); const isMobile = w < 768;
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ bot_name:"", business_name:"", system_prompt:"", theme_color:"#818cf8" });
  const [faq, setFaq] = useState([{ question:"", answer:"" }]);
  const [saving, setSaving] = useState(false);
  const [previewBot, setPreviewBot] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const chatEndRef = useRef(null);
  useEffect(()=>{ chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); },[chatMessages]);

  const createBot = async () => {
    if (!form.bot_name) return;
    setSaving(true);
    try {
      const { data } = await supabase.from("chatbots").insert([{ user_id:user.id,...form,faq:faq.filter(f=>f.question&&f.answer) }]).select().single();
      if (data) { setChatbots(prev=>[data,...prev]); setView("list"); setForm({ bot_name:"",business_name:"",system_prompt:"",theme_color:"#818cf8" }); setFaq([{question:"",answer:""}]); }
    } catch(e){ console.error(e); }
    setSaving(false);
  };

  const deleteBot = async (id) => { await supabase.from("chatbots").delete().eq("id",id); setChatbots(prev=>prev.filter(b=>b.id!==id)); };

  const sendMessage = async () => {
    if (!chatInput.trim()||!previewBot) return;
    const userMsg = { role:"user", content:chatInput };
    setChatMessages(prev=>[...prev,userMsg]); setChatInput(""); setChatLoading(true);
    try {
      const faqText = previewBot.faq?.map(f=>`Q: ${f.question}\nA: ${f.answer}`).join("\n\n")||"";
      const res = await fetch("/api/groq",{ method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ messages:[...chatMessages.slice(-8),userMsg],
          systemPrompt:`You are ${previewBot.bot_name}, a helpful AI assistant for ${previewBot.business_name||"this business"}.\n${previewBot.system_prompt||"Be helpful and professional."}\n${faqText?`\nFAQ:\n${faqText}`:""}\nAnswer concisely and helpfully.` })
      });
      const data = await res.json();
      setChatMessages(prev=>[...prev,{ role:"assistant",content:data.reply||"How can I help you?" }]);
    } catch { setChatMessages(prev=>[...prev,{ role:"assistant",content:"Sorry, I encountered an error." }]); }
    setChatLoading(false);
  };

  const pad = isMobile?"20px 16px 88px":"28px";
  const themeColors = ["#818cf8","#22c55e","#f59e0b","#ef4444","#0ea5e9","#ec4899","#0d1b3e"];

  if (view==="create") return (
    <div style={{ padding:pad, maxWidth:620 }}>
      <button onClick={()=>setView("list")} style={{ background:"none",border:"none",color:T.darkDim,cursor:"pointer",fontSize:13,marginBottom:18,display:"flex",alignItems:"center",gap:6 }}><Icon n="chevronL" size={13} color={T.darkDim}/> Back</button>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?20:22,fontWeight:800,color:T.darkText,marginBottom:22 }}>Create AI Chatbot</h2>
      <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
        {[{label:"Bot Name *",key:"bot_name",placeholder:"e.g. Alex — Support Bot"},{label:"Business Name",key:"business_name",placeholder:"e.g. Gokul Tech"}].map(f=>(
          <div key={f.key}>
            <label style={{ fontSize:11,fontWeight:600,color:T.darkDim,marginBottom:5,display:"block",textTransform:"uppercase",letterSpacing:0.5 }}>{f.label}</label>
            <input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
              style={{ width:"100%",padding:"12px 14px",background:T.darkCard,border:`1.5px solid ${T.darkBorder}`,borderRadius:11,fontSize:14,color:T.darkText,fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
        ))}
        <div>
          <label style={{ fontSize:11,fontWeight:600,color:T.darkDim,marginBottom:5,display:"block",textTransform:"uppercase",letterSpacing:0.5 }}>System Prompt</label>
          <textarea value={form.system_prompt} onChange={e=>setForm(p=>({...p,system_prompt:e.target.value}))} placeholder="How should your bot behave?" rows={3}
            style={{ width:"100%",padding:"12px 14px",background:T.darkCard,border:`1.5px solid ${T.darkBorder}`,borderRadius:11,fontSize:14,color:T.darkText,fontFamily:"'DM Sans',sans-serif",resize:"none" }}/>
        </div>
        <div>
          <label style={{ fontSize:11,fontWeight:600,color:T.darkDim,marginBottom:10,display:"block",textTransform:"uppercase",letterSpacing:0.5 }}>FAQ Knowledge Base</label>
          {faq.map((item,i)=>(
            <div key={i} style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:11,padding:"12px",marginBottom:8 }}>
              <input value={item.question} onChange={e=>setFaq(prev=>prev.map((f,j)=>j===i?{...f,question:e.target.value}:f))} placeholder={`Question ${i+1}`}
                style={{ width:"100%",padding:"9px 11px",background:T.darkSurface,border:`1px solid ${T.darkBorder}`,borderRadius:8,fontSize:13,color:T.darkText,fontFamily:"'DM Sans',sans-serif",marginBottom:7 }}/>
              <input value={item.answer} onChange={e=>setFaq(prev=>prev.map((f,j)=>j===i?{...f,answer:e.target.value}:f))} placeholder="Answer"
                style={{ width:"100%",padding:"9px 11px",background:T.darkSurface,border:`1px solid ${T.darkBorder}`,borderRadius:8,fontSize:13,color:T.darkText,fontFamily:"'DM Sans',sans-serif" }}/>
            </div>
          ))}
          <button onClick={()=>setFaq(prev=>[...prev,{question:"",answer:""}])} style={{ fontSize:12,color:"#818cf8",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
            <Icon n="plus" size={13} color="#818cf8"/> Add FAQ
          </button>
        </div>
        <div>
          <label style={{ fontSize:11,fontWeight:600,color:T.darkDim,marginBottom:8,display:"block",textTransform:"uppercase",letterSpacing:0.5 }}>Theme Colour</label>
          <div style={{ display:"flex",gap:9,flexWrap:"wrap" }}>
            {themeColors.map(col=>(
              <button key={col} onClick={()=>setForm(p=>({...p,theme_color:col}))} style={{ width:30,height:30,borderRadius:"50%",background:col,border:`3px solid ${form.theme_color===col?"#fff":"transparent"}`,cursor:"pointer" }}/>
            ))}
          </div>
        </div>
        <button onClick={createBot} disabled={!form.bot_name||saving} style={{ padding:"13px",background:form.bot_name?"#818cf8":T.darkBorder,color:"#fff",border:"none",borderRadius:11,fontSize:14,fontWeight:600,cursor:form.bot_name?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          {saving&&<Spinner size={16} color="#fff"/>}{saving?"Creating...":"Create Chatbot"}
        </button>
      </div>
    </div>
  );

  if (view==="preview"&&previewBot) return (
    <div style={{ padding:pad, maxWidth:620 }}>
      <button onClick={()=>{setView("list");setPreviewBot(null);setChatMessages([]);}} style={{ background:"none",border:"none",color:T.darkDim,cursor:"pointer",fontSize:13,marginBottom:18,display:"flex",alignItems:"center",gap:6 }}><Icon n="chevronL" size={13} color={T.darkDim}/> Back to bots</button>
      <div style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:16,overflow:"hidden",marginBottom:18 }}>
        <div style={{ padding:"14px 18px",background:previewBot.theme_color,display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}><Icon n="bot" size={17} color="#fff"/></div>
          <div>
            <p style={{ fontSize:14,fontWeight:700,color:"#fff",margin:0 }}>{previewBot.bot_name}</p>
            <p style={{ fontSize:11,color:"rgba(255,255,255,0.65)",margin:0 }}>{previewBot.business_name}</p>
          </div>
          <div style={{ marginLeft:"auto",width:8,height:8,borderRadius:"50%",background:"#4ade80" }}/>
        </div>
        <div style={{ height:280,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:8 }}>
          {chatMessages.length===0 && <div style={{ textAlign:"center",padding:"32px 16px" }}><p style={{ fontSize:12,color:T.darkDim }}>Start a conversation with {previewBot.bot_name}</p></div>}
          {chatMessages.map((msg,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"78%",padding:"9px 13px",background:msg.role==="user"?previewBot.theme_color:T.darkSurface,borderRadius:msg.role==="user"?"13px 13px 3px 13px":"13px 13px 13px 3px",fontSize:13,color:"#fff",lineHeight:1.5 }}>{msg.content}</div>
            </div>
          ))}
          {chatLoading && <div style={{ display:"flex",gap:5,padding:"9px 13px",background:T.darkSurface,borderRadius:"13px 13px 13px 3px",width:"fit-content" }}>{[0,1,2].map(i=><div key={i} style={{ width:5,height:5,borderRadius:"50%",background:T.darkDim,animation:`pulse 1.2s ease ${i*0.2}s infinite` }}/>)}</div>}
          <div ref={chatEndRef}/>
        </div>
        <div style={{ padding:"10px 14px",borderTop:`1px solid ${T.darkBorder}`,display:"flex",gap:8 }}>
          <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!chatLoading&&sendMessage()} placeholder="Type a message..."
            style={{ flex:1,padding:"9px 13px",background:T.darkSurface,border:`1px solid ${T.darkBorder}`,borderRadius:9,fontSize:13,color:T.darkText,fontFamily:"'DM Sans',sans-serif" }}/>
          <button onClick={sendMessage} disabled={chatLoading||!chatInput.trim()} style={{ padding:"9px 14px",background:previewBot.theme_color,border:"none",borderRadius:9,cursor:"pointer" }}><Icon n="send" size={15} color="#fff"/></button>
        </div>
      </div>
      <div style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:13,padding:"16px 18px" }}>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:T.darkText,marginBottom:5,textTransform:"uppercase",letterSpacing:0.5 }}>Embed Code</p>
        <p style={{ fontSize:11,color:T.darkDim,marginBottom:10,lineHeight:1.6 }}>Add this to any HTML page. Requires widget.js deployed at the endpoint.</p>
        <div style={{ background:T.darkSurface,border:`1px solid ${T.darkBorder}`,borderRadius:9,padding:"12px",marginBottom:10,overflow:"auto" }}>
          <code style={{ fontSize:10,color:"#818cf8",fontFamily:"monospace",lineHeight:1.85,whiteSpace:"pre",display:"block" }}>{`<div id="gkfxl-chat"></div>\n<script>\n  window.GKFXL_BOT = {\n    id: "${previewBot.id}",\n    name: "${previewBot.bot_name}",\n    color: "${previewBot.theme_color}",\n    apiEndpoint: "https://gkfxl.vercel.app/api/groq"\n  };\n</script>\n<script src="https://gkfxl.vercel.app/widget.js" defer></script>`}</code>
        </div>
        <button onClick={()=>{ navigator.clipboard?.writeText(`<div id="gkfxl-chat"></div>`); setCopied(previewBot.id); setTimeout(()=>setCopied(""),2000); }}
          style={{ background:"#818cf815",border:"1px solid #818cf825",borderRadius:7,padding:"7px 14px",fontSize:11,color:"#818cf8",cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
          <Icon n="copy" size={11} color="#818cf8"/> {copied===previewBot.id?"Copied!":"Copy Code"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:pad, maxWidth:760 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22 }}>
        <div>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?20:22,fontWeight:800,color:T.darkText,marginBottom:3 }}>AI Chatbot Builder</h2>
          <p style={{ fontSize:12,color:T.darkDim }}>{chatbots.length} chatbot{chatbots.length!==1?"s":""}</p>
        </div>
        <button onClick={()=>setView("create")} style={{ padding:"9px 16px",background:"#818cf8",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:7 }}>
          <Icon n="plus" size={14} color="#fff"/> New
        </button>
      </div>
      {chatbots.length===0 ? (
        <div style={{ background:T.darkCard,border:`1px dashed ${T.darkBorder}`,borderRadius:16,padding:"48px 20px",textAlign:"center" }}>
          <div style={{ width:44,height:44,background:"#22c55e15",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px" }}><Icon n="bot" size={20} color="#22c55e"/></div>
          <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:T.darkText,marginBottom:5 }}>No chatbots yet</p>
          <p style={{ fontSize:12,color:T.darkDim,marginBottom:16 }}>Create your first AI chatbot in minutes</p>
          <button onClick={()=>setView("create")} style={{ padding:"10px 20px",background:"#818cf8",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:600,cursor:"pointer" }}>Create First Chatbot</button>
        </div>
      ) : (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {chatbots.map((bot,i)=>(
            <div key={bot.id} style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:13,padding:"14px 16px",display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:40,height:40,borderRadius:11,background:bot.theme_color+"25",border:`1px solid ${bot.theme_color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Icon n="bot" size={18} color={bot.theme_color}/>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:T.darkText,marginBottom:2 }}>{bot.bot_name}</p>
                <p style={{ fontSize:11,color:T.darkDim }}>{bot.business_name||"No business name"} · {bot.faq?.length||0} FAQs</p>
              </div>
              <div style={{ display:"flex",gap:7 }}>
                <button onClick={()=>{setPreviewBot(bot);setView("preview");}} style={{ padding:"6px 12px",background:"#818cf815",border:"1px solid #818cf825",borderRadius:8,fontSize:11,fontWeight:600,color:"#818cf8",cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
                  <Icon n="eye" size={12} color="#818cf8"/> Preview
                </button>
                <button onClick={()=>deleteBot(bot.id)} style={{ padding:"6px 9px",background:"#ef444415",border:"1px solid #ef444430",borderRadius:8,cursor:"pointer" }}>
                  <Icon n="trash" size={13} color="#ef4444"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Analytics ─────────────────────────────────────────────────────────────── */
const AnalyticsPage = ({ projects, chatbots }) => {
  const w = useWidth(); const isMobile = w < 768;
  return (
    <div style={{ padding:isMobile?"20px 16px 88px":"28px", maxWidth:760 }}>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?20:22,fontWeight:800,color:T.darkText,marginBottom:22 }}>Analytics</h2>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20 }}>
        {[
          { label:"Total Projects",     value:projects.length,                                              color:"#818cf8" },
          { label:"Workflows Generated",value:projects.filter(p=>p.status==="workflow"||p.status==="generated").length, color:"#22c55e" },
          { label:"Active Chatbots",    value:chatbots.length,                                              color:"#f59e0b"  },
          { label:"Total FAQ Entries",  value:chatbots.reduce((s,b)=>s+(b.faq?.length||0),0),              color:T.darkDim  },
        ].map((s,i)=>(
          <div key={i} style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:13,padding:"18px 16px" }}>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:s.color,marginBottom:5 }}>{s.value}</p>
            <p style={{ fontSize:12,color:T.darkDim }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:13,padding:"32px",textAlign:"center" }}>
        <Icon n="analytics" size={28} color={T.darkBorder}/>
        <p style={{ fontSize:13,color:T.darkDim,marginTop:10 }}>Detailed analytics coming soon</p>
      </div>
    </div>
  );
};

/* ─── Settings ──────────────────────────────────────────────────────────────── */
const SettingsPage = ({ user }) => {
  const w = useWidth(); const isMobile = w < 768;
  return (
    <div style={{ padding:isMobile?"20px 16px 88px":"28px", maxWidth:560 }}>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?20:22,fontWeight:800,color:T.darkText,marginBottom:22 }}>Settings</h2>
      <div style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:14,padding:"20px",marginBottom:14 }}>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:T.darkText,marginBottom:14,textTransform:"uppercase",letterSpacing:0.5 }}>Account</p>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:48,height:48,borderRadius:"50%",background:"#818cf8",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            {user?.photo?<img src={user.photo} alt="avatar" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:<span style={{ fontSize:18,fontWeight:700,color:"#fff" }}>{(user?.name||"U")[0]}</span>}
          </div>
          <div>
            <p style={{ fontSize:14,fontWeight:600,color:T.darkText,marginBottom:2 }}>{user?.name}</p>
            <p style={{ fontSize:12,color:T.darkDim }}>{user?.email}</p>
          </div>
        </div>
      </div>
      <div style={{ background:T.darkCard,border:`1px solid ${T.darkBorder}`,borderRadius:14,padding:"20px" }}>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:T.darkText,marginBottom:14,textTransform:"uppercase",letterSpacing:0.5 }}>AI Configuration</p>
        {[["AI Provider","Groq"],["Model","llama-3.1-8b-instant"],["Database","Supabase"],["Plan","Free"]].map(([k,v],i)=>(
          <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${T.darkBorder}`:"none" }}>
            <span style={{ fontSize:13,color:T.darkDim }}>{k}</span>
            <span style={{ fontSize:13,color:T.darkText,fontWeight:500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Root App ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [chatbots, setChatbots] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const w = useWidth(); const isMobile = w < 768;

  useEffect(() => {
    const { data:{ subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const su = session.user;
        setUser({ id:su.id, email:su.email, name:su.user_metadata?.full_name||su.user_metadata?.name||su.email?.split("@")[0], photo:su.user_metadata?.avatar_url||su.user_metadata?.picture||null });
        setScreen("dashboard");
        loadUserData(su.id);
      } else {
        setUser(null);
        setScreen(s => s==="dashboard" ? "landing" : s);
      }
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    const [{ data:proj },{ data:bots }] = await Promise.all([
      supabase.from("website_projects").select("*").eq("user_id",userId).order("created_at",{ ascending:false }),
      supabase.from("chatbots").select("*").eq("user_id",userId).order("created_at",{ ascending:false }),
    ]);
    if (proj) setProjects(proj);
    if (bots) setChatbots(bots);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setScreen("landing"); };
  const handleSplashDone = () => setScreen(user ? "dashboard" : "landing");

  const renderPage = () => {
    switch(page) {
      case "dashboard":  return <DashboardPage user={user} setPage={setPage} projects={projects} chatbots={chatbots}/>;
      case "builder":    return <BuilderPage user={user} onProjectSaved={()=>{ loadUserData(user.id); setPage("projects"); }}/>;
      case "chatbot":    return <ChatbotPage user={user} chatbots={chatbots} setChatbots={setChatbots}/>;
      case "projects":   return <ProjectsPage user={user} projects={projects} setProjects={setProjects} setPage={setPage}/>;
      case "analytics":  return <AnalyticsPage projects={projects} chatbots={chatbots}/>;
      case "settings":   return <SettingsPage user={user}/>;
      default:           return <DashboardPage user={user} setPage={setPage} projects={projects} chatbots={chatbots}/>;
    }
  };

  return (
    <>
      <GS/>
      {screen==="splash" && <SplashScreen onDone={handleSplashDone}/>}
      {screen==="landing" && <LandingPage onGetStarted={()=>setScreen("login")}/>}
      {screen==="login" && <LoginPage onBack={()=>setScreen("landing")}/>}
      {screen==="dashboard" && (
        isMobile ? (
          <div style={{ minHeight:"100vh", background:T.dark }}>
            <div style={{ padding:0 }}>{renderPage()}</div>
            <MobileDashNav page={page} setPage={setPage}/>
          </div>
        ) : (
          <div style={{ display:"flex", minHeight:"100vh" }}>
            <Sidebar page={page} setPage={setPage} user={user} onLogout={handleLogout} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}/>
            <main style={{ flex:1, overflowY:"auto", background:T.dark }}>
              {renderPage()}
            </main>
          </div>
        )
      )}
    </>
  );
}
