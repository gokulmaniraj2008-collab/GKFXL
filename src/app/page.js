"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "gkfxl-auth" } }
);

const C = {
  dark:"#09090f", darkSurface:"#111118", darkCard:"#18181f", darkBorder:"#27272f",
  indigo:"#6366f1", indigoDim:"#6366f115", indigoHover:"#818cf8",
  green:"#22c55e", greenDim:"#22c55e15", amber:"#f59e0b", amberDim:"#f59e0b15",
  navy:"#0d1b3e", navyMid:"#1a2d5a", blue:"#1847b0", blueSoft:"#e8eef8",
  white:"#ffffff", accentBg:"#eaf0fb",
  gray50:"#f0f2f5", gray100:"#e2e6ed", gray400:"#8a94a6", gray600:"#4a5568",
  text:"#e8e8f0", textDim:"#8888aa", red:"#ef4444", redDim:"#ef444415",
};

const Icon = ({ n, size = 20, color = "currentColor" }) => {
  const p = {
    logo:     <><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></>,
    dashboard:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    builder:  <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    bot:      <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M12 2v5"/><circle cx="8.5" cy="13.5" r="1.5"/><circle cx="15.5" cy="13.5" r="1.5"/><path d="M8 17h8"/></>,
    projects: <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></>,
    analytics:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout:   <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    arrow:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    chevronR: <polyline points="9 18 15 12 9 6"/>,
    chevronL: <polyline points="15 18 9 12 15 6"/>,
    check:    <polyline points="20 6 9 17 4 12"/>,
    zap:      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    globe:    <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    trash:    <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
    eye:      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    copy:     <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    menu:     <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    code:     <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    info:     <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    whatsapp: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>,
    mail:     <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    instagram:<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    github:   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,
    gamepad:  <><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></>,
    school:   <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    user:     <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    vercel:   <path d="M12 2L2 19.5h20L12 2z"/>,
    render:   <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M8 8h8M8 16h5"/></>,
    utensils: <><line x1="18" y1="2" x2="18" y2="9"/><path d="M14 2v4a4 4 0 004 4"/><line x1="10" y1="2" x2="10" y2="7"/><path d="M6 2v4a4 4 0 004 4v9"/><line x1="10" y1="15" x2="10" y2="22"/></>,
    phone:    <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 013.1 4.2 2 2 0 015 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.45 2.1L9.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.45c.9.34 1.8.57 2.8.7A2 2 0 0122 17z"/>,
    star:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

const Spinner = ({ size = 20, color = C.indigo }) => (
  <div style={{ width:size, height:size, border:`2px solid ${color}30`, borderTopColor:color, borderRadius:"50%", animation:"spin 0.7s linear infinite", flexShrink:0 }} />
);

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${C.dark};}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
    @keyframes slideIn{from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);}}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px ${C.indigo}40;}50%{box-shadow:0 0 40px ${C.indigo}80;}}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:${C.darkSurface};}
    ::-webkit-scrollbar-thumb{background:${C.darkBorder};border-radius:4px;}
    input:focus,textarea:focus{outline:none!important;}
    button{font-family:'DM Sans',sans-serif;}
    a{text-decoration:none;}
  `}</style>
);

// ── Projects data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:"architect", category:"AI SaaS Platform", appName:"AI Website Architect", date:"June 2026", color:"#3730a3", icon:"logo",
    tagline:"AI interview-based website builder + chatbot builder SaaS",
    description:"Full SaaS platform where users build websites through a 7-phase AI interview. Generates complete workflow plans using Groq AI. Includes chatbot builder with FAQ system and embed widget.",
    features:["7-phase AI interview — one question at a time","10 website types with dynamic branching","Groq AI workflow generator (llama-3.1-8b-instant)","AI Chatbot builder with FAQ knowledge base","Embed code generator for any website","Supabase Google OAuth + RLS-protected database","Dark glassmorphism dashboard UI"],
    tech:["Next.js","React","Supabase","Groq AI","Vercel"],
    integrations:["Supabase Auth (Google OAuth)","Supabase Database (RLS)","Groq API (llama-3.1-8b-instant)"],
    url:"https://gkfxl.vercel.app" },
  { id:"gge", category:"AI Civic Platform", appName:"GGE — Guide · Grow · Earn", date:"June 2026", color:"#0d3b66", icon:"globe",
    tagline:"Rural empowerment platform — AI chat in Tamil, English & Tanglish",
    description:"Comprehensive civic platform for farmers, students, job seekers across Tamil Nadu. AI guidance in 3 languages. Government scheme finder, Skill Bazaar marketplace, learning paths with certificates. 8,494 lines of code.",
    features:["AI chat in Tamil, English, Tanglish","Government scheme finder (PM-KISAN, Ayushman Bharat)","Skill Bazaar marketplace","Learning paths + certificates","Automated Gmail + WhatsApp on signup","Google Sheets auto-sync via Apps Script","351 async API calls"],
    tech:["Next.js","Supabase","Groq AI","Nodemailer","Twilio"],
    integrations:["Groq API","Nodemailer + Gmail SMTP","Twilio WhatsApp","Google Sheets Apps Script"],
    url:null },
  { id:"game", category:"Game Development", appName:"FlamZone", date:"April 2026", color:"#3b0764", icon:"gamepad",
    tagline:"Multiplayer social game platform with real-time WebRTC voice + video",
    description:"Full multiplayer game web app — rooms, FLAMES, Truth or Dare, real-time WebRTC calls. No third-party call service. Built entirely from scratch.",
    features:["Multiplayer room creation + joining","FLAMES calculator + Truth or Dare","WebRTC peer-to-peer voice + video calling","Real-time group chat","Admin controls — kick, clear chat","Confetti animations","Google authentication"],
    tech:["JavaScript","Firebase","WebRTC","HTML/CSS"],
    integrations:["Firebase Realtime Database","Google Auth","WebRTC STUN/TURN","Web Audio API"],
    url:null },
  { id:"nexus", category:"Education Management", appName:"NEXUS — Gkfxl Teams Academy", date:"April 2026", color:"#064e3b", icon:"school",
    tagline:"Complete school management — attendance, results, chat, leaderboard",
    description:"Full school management platform with Admin + Student roles. Timetable, attendance tracking, result viewing, polls, community chat. Optimised with local cache — zero extra Firestore reads after first load.",
    features:["Student + Subject management","Attendance marking + subject-wise reports","Class leaderboard ranked by marks","Polls, surveys, group chat","Role-based access (Admin/Student)","QR code generator","Local cache layer for performance"],
    tech:["JavaScript","Firebase Firestore","Firebase Auth"],
    integrations:["Firebase Firestore (with local cache)","Google Auth"],
    url:null },
  { id:"tanne", category:"Restaurant Management", appName:"TANNE", date:"May 2026", color:"#7c2d12", icon:"utensils",
    tagline:"Full restaurant ordering system with WhatsApp + Telegram alerts",
    description:"Complete restaurant platform. Customers browse menu, place orders. Real-time admin dashboard. Every order triggers instant WhatsApp + Telegram notifications.",
    features:["Digital menu with categories","Real-time order dashboard","WhatsApp notification per order (Twilio)","Telegram bot notification per order","Bill generation","Table management","Sales analytics"],
    tech:["Next.js","Supabase","Twilio","Telegram Bot"],
    integrations:["Supabase Realtime","Twilio WhatsApp","Telegram Bot API","Google Auth"],
    url:null },
  { id:"samvidhan", category:"Legal AI Platform", appName:"Samvidhan AI", date:"March 2026", color:"#1e3a5f", icon:"briefcase",
    tagline:"AI-powered Indian Constitution guide — Tamil + English",
    description:"AI platform making the Indian Constitution accessible. Ask legal questions in plain language. Supports Tamil and English. Express.js backend on Render.",
    features:["AI constitutional guidance","Fundamental rights in plain language","Tamil + English support","Consumer rights + RTI guidance","Case law references","Express.js backend on Render"],
    tech:["Next.js","Express.js","Groq AI","Render"],
    integrations:["Groq API","Render (Node.js backend)","Vercel (frontend)"],
    url:null },
];

const WEBSITE_TYPES = ["Restaurant","Portfolio","Business","Ecommerce","Hospital","School","Agency","Real Estate","Landing Page","Custom Website"];
const TYPE_ICONS = { Restaurant:"🍽️",Portfolio:"🎨",Business:"💼",Ecommerce:"🛒",Hospital:"🏥",School:"🏫",Agency:"🚀","Real Estate":"🏠","Landing Page":"📄","Custom Website":"⚡" };

// ── Project Modal ──────────────────────────────────────────────────────────────
const ProjectModal = ({ project:p, onClose }) => (
  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1000,overflowY:"auto",padding:"20px 16px" }} onClick={onClose}>
    <div style={{ maxWidth:520,margin:"0 auto",background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:20,overflow:"hidden",animation:"fadeIn 0.3s ease" }} onClick={e=>e.stopPropagation()}>
      <div style={{ background:p.color,padding:"24px 20px 20px" }}>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"6px 14px",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:16,display:"flex",alignItems:"center",gap:6 }}>
          <Icon n="chevronL" size={13} color="#fff"/> Back
        </button>
        <div style={{ width:46,height:46,background:"rgba(255,255,255,0.15)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
          <Icon n={p.icon} size={22} color="#fff"/>
        </div>
        <p style={{ fontSize:10,color:"rgba(255,255,255,0.5)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4 }}>{p.category}</p>
        <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff",marginBottom:6 }}>{p.appName}</h3>
        <p style={{ fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.65 }}>{p.tagline}</p>
      </div>
      <div style={{ padding:"20px" }}>
        <p style={{ fontSize:13,color:C.textDim,lineHeight:1.8,marginBottom:18 }}>{p.description}</p>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#fff",marginBottom:12 }}>Features ({p.features.length})</p>
        <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:18 }}>
          {p.features.map((f,i)=>(
            <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
              <div style={{ width:18,height:18,borderRadius:"50%",background:C.indigoDim,border:`1px solid ${C.indigo}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                <Icon n="check" size={10} color={C.indigo}/>
              </div>
              <span style={{ fontSize:12,color:C.textDim,lineHeight:1.55 }}>{f}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#fff",marginBottom:10 }}>Tech Stack</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:7,marginBottom:18 }}>
          {p.tech.map(t=><span key={t} style={{ background:C.indigoDim,color:C.indigo,border:`1px solid ${C.indigo}30`,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:600 }}>{t}</span>)}
        </div>
        <p style={{ fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#fff",marginBottom:10 }}>Integrations</p>
        <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:20 }}>
          {p.integrations.map((ig,i)=>(
            <div key={i} style={{ display:"flex",gap:8,alignItems:"center" }}>
              <div style={{ width:5,height:5,borderRadius:"50%",background:C.indigo,flexShrink:0 }}/>
              <span style={{ fontSize:12,color:C.textDim }}>{ig}</span>
            </div>
          ))}
        </div>
        {p.url
          ? <a href={p.url} target="_blank" rel="noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:C.indigo,color:"#fff",borderRadius:12,padding:"13px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13 }}>
              View Live <Icon n="arrow" size={16} color="#fff"/>
            </a>
          : <div style={{ background:C.darkSurface,border:`1px solid ${C.darkBorder}`,borderRadius:12,padding:"12px",textAlign:"center" }}>
              <span style={{ fontSize:12,color:C.textDim }}>Deployment in progress</span>
            </div>
        }
      </div>
    </div>
  </div>
);

// ── Landing Page ───────────────────────────────────────────────────────────────
const LandingPage = ({ onStartBuilder }) => {
  const [section, setSection] = useState("home");
  const [selProject, setSelProject] = useState(null);
  const skills = ["Next.js","React","TypeScript","Node.js","Express","Supabase","Firebase","Groq AI","WebRTC","Twilio","Nodemailer","Vercel","Render","GitHub"];
  const stats = [{ n:"6",l:"Projects" },{ n:"8+",l:"APIs Used" },{ n:"17",l:"Age" },{ n:"2026",l:"Active" }];
  const services = [
    { name:"Basic",price:"3,000",pages:"Up to 3 pages",delivery:"5 days",support:"1 month",best:"Small shops, personal brands",features:["Responsive design","Contact section","WhatsApp button","Basic animations","Vercel deployment"],hot:false },
    { name:"Business",price:"6,000",pages:"Up to 7 pages",delivery:"10 days",support:"3 months",best:"Restaurants, schools, clinics",features:["Everything in Basic","Admin panel","Database integration","Email notifications","2 revision rounds"],hot:true },
    { name:"Premium",price:"10,000",pages:"Unlimited",delivery:"15 days",support:"6 months",best:"Full business systems",features:["Everything in Business","AI integration","WhatsApp + Telegram alerts","Google Sheets sync","Custom integrations"],hot:false },
  ];
  const contacts = [
    { icon:"whatsapp",label:"WhatsApp",value:"+91 99447 61306",href:"https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website",color:"#15803d" },
    { icon:"mail",label:"Email",value:"gokulmaniraj2008@gmail.com",href:"mailto:gokulmaniraj2008@gmail.com",color:"#b91c1c" },
    { icon:"instagram",label:"Instagram",value:"@__gk.__.fxl__",href:"https://www.instagram.com/__gk.__.fxl__",color:"#7c3aed" },
    { icon:"github",label:"GitHub",value:"gokulmaniraj2008-collab",href:"https://github.com/gokulmaniraj2008-collab",color:C.navyMid },
  ];
  const navItems = ["home","portfolio","services","about","contact"];
  const go = (s) => { setSection(s); window.scrollTo({ top:0,behavior:"smooth" }); };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:C.dark,minHeight:"100vh",color:C.text }}>
      {selProject && <ProjectModal project={selProject} onClose={()=>setSelProject(null)}/>}

      {/* NAV */}
      <nav style={{ position:"sticky",top:0,zIndex:500,background:`${C.dark}ee`,backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.darkBorder}`,padding:"0 24px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,background:C.indigo,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",animation:"glow 3s ease infinite" }}>
            <Icon n="logo" size={16} color="#fff"/>
          </div>
          <div>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:"#fff",lineHeight:1 }}>GKFXL</p>
            <p style={{ fontSize:9,color:C.textDim }}>Learn · Build · Earn</p>
          </div>
        </div>
        <div style={{ display:"flex",gap:2 }}>
          {navItems.map(n=>(
            <button key={n} onClick={()=>go(n)} style={{ background:section===n?C.indigoDim:"none",border:"none",borderRadius:8,padding:"7px 13px",fontSize:12,fontWeight:section===n?700:500,color:section===n?C.indigo:C.textDim,cursor:"pointer",textTransform:"capitalize" }}>
              {n}
            </button>
          ))}
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={onStartBuilder} style={{ padding:"8px 14px",background:C.indigoDim,border:`1px solid ${C.indigo}40`,borderRadius:9,fontSize:12,fontWeight:700,color:C.indigo,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
            <Icon n="builder" size={13} color={C.indigo}/> AI Builder
          </button>
          <button onClick={()=>go("contact")} style={{ padding:"8px 14px",background:C.navy,border:"none",borderRadius:9,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer" }}>
            Hire Me
          </button>
        </div>
      </nav>

      {/* HOME — SPLIT HERO */}
      {section==="home" && (
        <div style={{ animation:"fadeIn 0.5s ease" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"91vh",maxWidth:1100,margin:"0 auto",padding:"0 32px",alignItems:"center" }}>

            {/* LEFT — Freelancer */}
            <div style={{ padding:"60px 48px 60px 0",borderRight:`1px solid ${C.darkBorder}` }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:20,padding:"5px 14px",marginBottom:24 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}` }}/>
                <span style={{ fontSize:11,color:C.green,fontWeight:600 }}>Available for projects</span>
              </div>
              <h1 style={{ fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,color:"#fff",lineHeight:1.12,marginBottom:18,letterSpacing:-1.5 }}>
                I Build Real<br/><span style={{ color:"#7eb3ff" }}>Web Apps</span><br/>That Work.
              </h1>
              <p style={{ fontSize:14,color:C.textDim,lineHeight:1.85,marginBottom:28,maxWidth:320 }}>
                Full-stack developer, 17, Coimbatore. Real databases, AI integrations, automated notifications — not templates.
              </p>
              <div style={{ display:"flex",gap:10,marginBottom:36 }}>
                <button onClick={()=>go("portfolio")} style={{ padding:"13px 22px",background:C.navy,color:"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}>
                  View Work <Icon n="chevronR" size={14} color="#fff"/>
                </button>
                <button onClick={()=>go("contact")} style={{ padding:"13px 22px",background:"none",color:C.textDim,border:`1.5px solid ${C.darkBorder}`,borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer" }}>
                  Hire Me
                </button>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12 }}>
                {stats.map((s,i)=>(
                  <div key={i} style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:12,padding:"14px 8px",textAlign:"center" }}>
                    <p style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff",marginBottom:2 }}>{s.n}</p>
                    <p style={{ fontSize:9,color:C.textDim }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — AI SaaS */}
            <div style={{ padding:"60px 0 60px 48px" }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:C.indigoDim,border:`1px solid ${C.indigo}30`,borderRadius:20,padding:"5px 14px",marginBottom:24 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:C.indigo,animation:"pulse 2s ease infinite" }}/>
                <span style={{ fontSize:11,color:C.indigo,fontWeight:600 }}>AI Website Architect — Free</span>
              </div>
              <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,color:"#fff",lineHeight:1.12,marginBottom:18,letterSpacing:-1.5 }}>
                Build Your<br/><span style={{ color:C.indigo }}>Website</span><br/>With AI.
              </h2>
              <p style={{ fontSize:14,color:C.textDim,lineHeight:1.85,marginBottom:28,maxWidth:320 }}>
                Answer questions. AI creates your website plan. No code. No agency. 7-phase interview — one question at a time.
              </p>
              <div style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:16,padding:"20px",marginBottom:18 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:C.green,animation:"pulse 2s ease infinite" }}/>
                  <span style={{ fontSize:12,color:C.indigo,fontWeight:600 }}>AI Consultant is ready</span>
                </div>
                <div style={{ background:C.darkSurface,border:`1px solid ${C.darkBorder}`,borderRadius:11,padding:"13px 15px",marginBottom:12 }}>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.5 }}>
                    "What type of website do you want to build?"
                  </p>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {["🍽️ Restaurant","🎨 Portfolio","💼 Business","🛒 Ecommerce"].map(opt=>(
                    <button key={opt} onClick={onStartBuilder} style={{ padding:"9px 12px",background:C.darkSurface,border:`1px solid ${C.darkBorder}`,borderRadius:9,fontSize:12,color:C.textDim,cursor:"pointer",textAlign:"left" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={onStartBuilder} style={{ width:"100%",padding:"14px",background:C.indigo,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"'Syne',sans-serif" }}>
                Start Free AI Interview <Icon n="arrow" size={18} color="#fff"/>
              </button>
              <p style={{ fontSize:11,color:C.textDim,textAlign:"center",marginTop:10 }}>Sign in with Google — no password needed</p>
            </div>
          </div>

          {/* Skills strip */}
          <div style={{ borderTop:`1px solid ${C.darkBorder}`,padding:"32px 32px",maxWidth:1100,margin:"0 auto" }}>
            <p style={{ fontSize:11,color:C.textDim,textAlign:"center",marginBottom:16,textTransform:"uppercase",letterSpacing:1 }}>Technologies used in production</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center" }}>
              {skills.map(s=>(
                <div key={s} style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,color:C.textDim }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom dual CTA */}
          <div style={{ maxWidth:1100,margin:"0 auto",padding:"32px 32px 64px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
            <div style={{ background:`linear-gradient(135deg,${C.navy},#1e3a8a)`,borderRadius:20,padding:"32px 28px" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff",marginBottom:8 }}>Need a website built?</p>
              <p style={{ fontSize:13,color:"rgba(255,255,255,0.55)",marginBottom:22,lineHeight:1.7 }}>Starting at Rs. 3,000. Delivered in 5 days. Real features, not templates.</p>
              <div style={{ display:"flex",gap:10 }}>
                <a href="https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website" target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:C.navy,borderRadius:10,padding:"11px 18px",fontSize:13,fontWeight:700 }}>
                  <Icon n="whatsapp" size={15} color="#15803d"/> WhatsApp
                </a>
                <button onClick={()=>go("services")} style={{ padding:"11px 18px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer" }}>
                  View Pricing
                </button>
              </div>
            </div>
            <div style={{ background:`linear-gradient(135deg,#3730a3,${C.indigo})`,borderRadius:20,padding:"32px 28px" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff",marginBottom:8 }}>Build it yourself — free</p>
              <p style={{ fontSize:13,color:"rgba(255,255,255,0.55)",marginBottom:22,lineHeight:1.7 }}>Use AI Website Architect. Answer questions, get a full plan and generated website code.</p>
              <button onClick={onStartBuilder} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:C.indigo,border:"none",borderRadius:10,padding:"11px 18px",fontSize:13,fontWeight:700,cursor:"pointer" }}>
                <Icon n="builder" size={15} color={C.indigo}/> Try Free Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO */}
      {section==="portfolio" && (
        <div style={{ maxWidth:760,margin:"0 auto",padding:"40px 28px 80px",animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11,color:C.indigo,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Portfolio</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#fff",marginBottom:8 }}>6 Real Projects</h2>
          <p style={{ fontSize:14,color:C.textDim,marginBottom:28 }}>All live or fully deployed. Tap any project to see full development details.</p>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {PROJECTS.map((p,i)=>(
              <button key={p.id} onClick={()=>setSelProject(p)} style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:18,padding:0,cursor:"pointer",textAlign:"left",overflow:"hidden",width:"100%",animation:`fadeIn 0.4s ease ${i*0.07}s both` }}>
                <div style={{ background:p.color,padding:"20px 18px 16px" }}>
                  <div style={{ width:40,height:40,background:"rgba(255,255,255,0.15)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10 }}>
                    <Icon n={p.icon} size={20} color="#fff"/>
                  </div>
                  <p style={{ fontSize:10,color:"rgba(255,255,255,0.5)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:3 }}>{p.category}</p>
                  <p style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#fff" }}>{p.appName}</p>
                </div>
                <div style={{ padding:"14px 18px 16px" }}>
                  <p style={{ fontSize:12,color:C.textDim,lineHeight:1.6,marginBottom:12 }}>{p.tagline}</p>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:12 }}>
                    {p.tech.slice(0,4).map(t=><span key={t} style={{ background:C.indigoDim,color:C.indigo,borderRadius:6,padding:"2px 9px",fontSize:10,fontWeight:600 }}>{t}</span>)}
                    {p.tech.length>4 && <span style={{ background:C.darkSurface,color:C.textDim,borderRadius:6,padding:"2px 9px",fontSize:10 }}>+{p.tech.length-4}</span>}
                  </div>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                      <Icon n="calendar" size={11} color={C.textDim}/>
                      <span style={{ fontSize:10,color:C.textDim }}>{p.date}</span>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                      <span style={{ fontSize:12,fontWeight:700,color:C.indigo }}>Full Details</span>
                      <Icon n="chevronR" size={13} color={C.indigo}/>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES */}
      {section==="services" && (
        <div style={{ maxWidth:760,margin:"0 auto",padding:"40px 28px 80px",animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11,color:C.indigo,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Services</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#fff",marginBottom:8 }}>Pricing</h2>
          <p style={{ fontSize:14,color:C.textDim,marginBottom:28 }}>50% upfront. 50% on delivery. 2 revisions. No hidden charges.</p>
          <div style={{ background:`linear-gradient(135deg,#3730a3,${C.indigo})`,borderRadius:16,padding:"20px",marginBottom:28,display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ width:46,height:46,background:"rgba(255,255,255,0.15)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Icon n="builder" size={22} color="#fff"/>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:"#fff",marginBottom:3 }}>Not sure what you need? Use AI Website Architect — Free</p>
              <p style={{ fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:12 }}>Answer questions, get a full website plan, then decide.</p>
              <button onClick={onStartBuilder} style={{ background:"#fff",color:C.indigo,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                Try AI Builder Free →
              </button>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:36 }}>
            {services.map((s,i)=>(
              <div key={i} style={{ background:s.hot?C.navy:C.darkCard,border:`2px solid ${s.hot?C.indigo:C.darkBorder}`,borderRadius:18,padding:"24px 20px",position:"relative" }}>
                {s.hot && <div style={{ position:"absolute",top:16,right:16,background:C.indigo,color:"#fff",borderRadius:20,padding:"2px 12px",fontSize:9,fontWeight:800,letterSpacing:0.5,textTransform:"uppercase" }}>Popular</div>}
                <p style={{ fontSize:11,fontWeight:700,color:C.textDim,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6 }}>{s.name}</p>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#fff",marginBottom:4 }}><span style={{ fontSize:14,fontWeight:600 }}>Rs. </span>{s.price}</p>
                <p style={{ fontSize:11,color:C.textDim,marginBottom:3 }}>{s.pages} · {s.delivery} · {s.support} support</p>
                <p style={{ fontSize:11,color:C.textDim,marginBottom:18 }}>Best for: {s.best}</p>
                <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:20 }}>
                  {s.features.map(f=>(
                    <div key={f} style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <div style={{ width:18,height:18,borderRadius:"50%",background:C.indigoDim,border:`1px solid ${C.indigo}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <Icon n="check" size={10} color={C.indigo}/>
                      </div>
                      <span style={{ fontSize:12,color:C.textDim }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/919944761306?text=Hi+Gokul,+I+want+the+${s.name}+package`} target="_blank" rel="noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:s.hot?C.indigo:C.darkSurface,color:"#fff",border:`1px solid ${s.hot?C.indigo:C.darkBorder}`,borderRadius:11,padding:"12px",fontSize:13,fontWeight:700,fontFamily:"'Syne',sans-serif" }}>
                  <Icon n="whatsapp" size={15} color="#fff"/> Get Started on WhatsApp
                </a>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:"#fff",marginBottom:16 }}>How It Works</p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {[{ step:"01",title:"Contact",desc:"WhatsApp or email. Tell me what you need." },{ step:"02",title:"Discuss",desc:"Scope, price, timeline. Pay 50% upfront." },{ step:"03",title:"Build",desc:"Real features — not templates." },{ step:"04",title:"Deliver",desc:"2 revisions, pay balance, go live." }].map((s,i)=>(
              <div key={i} style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:14,padding:"18px 16px" }}>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:C.darkBorder,marginBottom:8 }}>{s.step}</p>
                <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#fff",marginBottom:5 }}>{s.title}</p>
                <p style={{ fontSize:12,color:C.textDim,lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT */}
      {section==="about" && (
        <div style={{ maxWidth:760,margin:"0 auto",padding:"40px 28px 80px",animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11,color:C.indigo,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>About</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#fff",marginBottom:24 }}>Gokul M</h2>
          <div style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:16,padding:"22px",marginBottom:16 }}>
            <p style={{ fontSize:13,color:C.textDim,lineHeight:1.85,marginBottom:14 }}>
              I am a 17-year-old full-stack developer from Coimbatore, Tamil Nadu. I build real web applications — not template sites — with actual databases, authentication, AI integrations, and automated notifications.
            </p>
            <p style={{ fontSize:13,color:C.textDim,lineHeight:1.85 }}>
              Every project I've built is deployed and live. GGE serves rural Tamil Nadu users with AI guidance. TANNE manages real restaurant orders. FlamZone runs real-time multiplayer games with WebRTC. AI Website Architect lets anyone build a website through an AI interview.
            </p>
          </div>
          <div style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:16,padding:"22px",marginBottom:16 }}>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#fff",marginBottom:16 }}>Key Facts</p>
            {["17 years old, Coimbatore, Tamil Nadu","Self-taught full-stack developer","6 real deployed applications built independently","WhatsApp, Telegram, Gmail, Google Sheets, AI — all in production","Focused on civic tech, education, and business tools for India","Founder of GKFXL — Learn, Build, Earn","Deployed on GitHub, Vercel, and Render"].map((f,i)=>(
              <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:10 }}>
                <div style={{ width:20,height:20,borderRadius:"50%",background:C.indigoDim,border:`1px solid ${C.indigo}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                  <Icon n="check" size={10} color={C.indigo}/>
                </div>
                <span style={{ fontSize:12,color:C.textDim,lineHeight:1.55 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ background:`linear-gradient(135deg,${C.navy},#1e3a8a)`,borderRadius:16,padding:"22px",marginBottom:16 }}>
            <p style={{ fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:0.5,marginBottom:4 }}>Current Status</p>
            <p style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#fff",marginBottom:4 }}>Open for client projects</p>
            <p style={{ fontSize:12,color:"rgba(255,255,255,0.5)" }}>Websites, apps, management systems, AI integrations</p>
          </div>
          <div style={{ background:C.indigoDim,border:`1px solid ${C.indigo}25`,borderRadius:14,padding:"16px" }}>
            <p style={{ fontSize:11,color:C.indigo,fontWeight:700,marginBottom:4 }}>Honest Note</p>
            <p style={{ fontSize:12,color:C.textDim,lineHeight:1.65 }}>Zero paying clients yet. Six real deployed projects. All the skills. Looking for the first client who wants a developer that builds systems that actually work.</p>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {section==="contact" && (
        <div style={{ maxWidth:760,margin:"0 auto",padding:"40px 28px 80px",animation:"fadeIn 0.4s ease" }}>
          <p style={{ fontSize:11,color:C.indigo,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Contact</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#fff",marginBottom:8 }}>Get in Touch</h2>
          <p style={{ fontSize:14,color:C.textDim,marginBottom:28 }}>Fastest reply on WhatsApp. I respond within 24 hours.</p>
          <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
            {contacts.map((ct,i)=>(
              <a key={i} href={ct.href} target="_blank" rel="noreferrer" style={{ background:C.darkCard,border:`1px solid ${C.darkBorder}`,borderRadius:14,padding:"16px",display:"flex",alignItems:"center",gap:14,animation:`fadeIn 0.4s ease ${i*0.08}s both` }}>
                <div style={{ width:44,height:44,borderRadius:12,background:`${ct.color}18`,border:`1px solid ${ct.color}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Icon n={ct.icon} size={20} color={ct.color}/>
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <p style={{ fontSize:10,color:C.textDim,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:2 }}>{ct.label}</p>
                  <p style={{ fontSize:13,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{ct.value}</p>
                </div>
                <Icon n="chevronR" size={14} color={C.textDim}/>
              </a>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            <div style={{ background:`linear-gradient(135deg,${C.navy},#1e3a8a)`,borderRadius:18,padding:"24px 20px",textAlign:"center" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#fff",marginBottom:6 }}>Ready to hire?</p>
              <p style={{ fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:18,lineHeight:1.6 }}>Send your business name and what you need.</p>
              <a href="https://wa.me/919944761306?text=Hi+Gokul,+I+need+a+website" target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:7,background:"#fff",color:C.navy,borderRadius:9,padding:"10px 16px",fontSize:12,fontWeight:700 }}>
                <Icon n="whatsapp" size={14} color="#15803d"/> WhatsApp
              </a>
            </div>
            <div style={{ background:C.indigoDim,border:`1px solid ${C.indigo}30`,borderRadius:18,padding:"24px 20px",textAlign:"center" }}>
              <p style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#fff",marginBottom:6 }}>Build it yourself?</p>
              <p style={{ fontSize:12,color:C.textDim,marginBottom:18,lineHeight:1.6 }}>Use AI Website Architect — free forever.</p>
              <button onClick={onStartBuilder} style={{ background:C.indigo,color:"#fff",border:"none",borderRadius:9,padding:"10px 16px",fontSize:12,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:7 }}>
                <Icon n="builder" size={14} color="#fff"/> Try Free
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LoginPage = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) setError(error.message);
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.darkBorder}40 1px, transparent 1px), linear-gradient(90deg, ${C.darkBorder}40 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 400, height: 300, background: `radial-gradient(ellipse, ${C.indigo}15 0%, transparent 70%)` }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, animation: "fadeIn 0.5s ease" }}>
        <div style={{ background: C.darkSurface, border: `1px solid ${C.darkBorder}`, borderRadius: 20, padding: "32px 28px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, background: C.indigo, borderRadius: 14, marginBottom: 16 }}>
              <Icon n="logo" size={22} color="#fff" />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: -0.5 }}>Welcome back</h2>
            <p style={{ fontSize: 13, color: C.textDim }}>Sign in to AI Website Architect</p>
          </div>

          {/* Google Button */}
          <button onClick={handleGoogle} disabled={loading} style={{ width: "100%", padding: "14px 20px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16, opacity: loading ? 0.7 : 1, transition: "border-color 0.2s" }}>
            {loading ? <Spinner size={18} /> : (
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
            <div style={{ background: C.redDim, border: `1px solid ${C.red}40`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
              <Icon n="info" size={14} color={C.red} />
              <p style={{ fontSize: 12, color: C.red, margin: 0 }}>{error}</p>
            </div>
          )}

          <p style={{ fontSize: 11, color: C.gray400, textAlign: "center", lineHeight: 1.6 }}>
            By continuing, you agree to our Terms & Privacy Policy.<br />No password stored — Google login only.
          </p>
        </div>

        <button onClick={onBack} style={{ width: "100%", marginTop: 14, padding: "12px", background: "none", border: `1px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
          ← Back
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════════════════════════════════════
const Sidebar = ({ page, setPage, user, onLogout, collapsed, setCollapsed }) => {
  const nav = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "builder",   icon: "builder",   label: "Website Builder" },
    { id: "chatbot",   icon: "bot",       label: "Chatbot Builder" },
    { id: "projects",  icon: "projects",  label: "My Projects" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
    { id: "settings",  icon: "settings",  label: "Settings" },
  ];

  return (
    <div style={{ width: collapsed ? 68 : 220, flexShrink: 0, background: C.darkSurface, borderRight: `1px solid ${C.darkBorder}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, transition: "width 0.25s ease", overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 14px" : "20px 20px", borderBottom: `1px solid ${C.darkBorder}`, display: "flex", alignItems: "center", gap: 12, minHeight: 68 }}>
        <div style={{ width: 36, height: 36, background: C.indigo, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n="logo" size={16} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>AI Architect</p>
            <p style={{ fontSize: 10, color: C.textDim, lineHeight: 1 }}>Website Builder</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.gray400, padding: 4, flexShrink: 0 }}>
          <Icon n={collapsed ? "menu" : "x"} size={16} color={C.gray400} />
        </button>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {nav.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "11px 14px" : "11px 14px", borderRadius: 10, border: "none", background: page === item.id ? C.indigoDim : "none", color: page === item.id ? C.indigo : C.textDim, cursor: "pointer", transition: "all 0.15s", textAlign: "left", position: "relative" }}>
            <Icon n={item.icon} size={18} color={page === item.id ? C.indigo : C.textDim} />
            {!collapsed && (
              <span style={{ fontSize: 13, fontWeight: page === item.id ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>
            )}
            {page === item.id && (
              <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: C.indigo, borderRadius: "0 3px 3px 0" }} />
            )}
          </button>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${C.darkBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.indigo, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {user?.photo
              ? <img src={user.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0]}</span>
            }
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "User"}</p>
              <p style={{ fontSize: 10, color: C.textDim, margin: 0 }}>Free Plan</p>
            </div>
          )}
        </div>
        <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, border: "none", background: "none", color: C.gray400, cursor: "pointer" }}>
          <Icon n="logout" size={16} color={C.gray400} />
          {!collapsed && <span style={{ fontSize: 13 }}>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD HOME PAGE
// ══════════════════════════════════════════════════════════════════════════════
const DashboardPage = ({ user, setPage, projects, chatbots }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { label: "Total Projects",  value: projects.length, icon: "projects",  color: C.indigo },
    { label: "Active Chatbots", value: chatbots.length, icon: "bot",       color: C.green },
    { label: "Websites Built",  value: projects.filter(p => p.status === "generated").length, icon: "globe", color: C.amber },
    { label: "AI Credits",      value: "∞",             icon: "zap",       color: C.textDim },
  ];

  const quickActions = [
    { label: "Build a Website",  desc: "Start AI interview", icon: "builder", page: "builder", color: C.indigo,  bg: C.indigoDim },
    { label: "Create a Chatbot", desc: "Deploy in minutes",  icon: "bot",     page: "chatbot", color: C.green,   bg: C.greenDim },
    { label: "View Projects",    desc: "All your work",      icon: "projects",page: "projects",color: C.amber,   bg: C.amberDim },
  ];

  return (
    <div style={{ padding: "32px 28px", maxWidth: 900, animation: "fadeIn 0.4s ease" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: C.textDim, marginBottom: 4 }}>{greeting} 👋</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
          {user?.name?.split(" ")[0] || "Welcome"}
        </h1>
        <p style={{ fontSize: 14, color: C.textDim, marginTop: 4 }}>Here's your AI website workspace</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px 16px", animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Icon n={s.icon} size={18} color={s.color} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: C.textDim }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Quick Actions</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setPage(a.page)} style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 16, padding: "20px 18px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s", animation: `fadeIn 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ width: 44, height: 44, background: a.bg, border: `1px solid ${a.color}40`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n={a.icon} size={20} color={a.color} />
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{a.label}</p>
                <p style={{ fontSize: 12, color: C.textDim }}>{a.desc}</p>
              </div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, color: a.color, fontWeight: 600 }}>Get started</span>
                <Icon n="arrow" size={12} color={a.color} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Recent Projects</p>
          <button onClick={() => setPage("projects")} style={{ background: "none", border: "none", fontSize: 12, color: C.indigo, cursor: "pointer" }}>View all →</button>
        </div>

        {projects.length === 0 ? (
          <div style={{ background: C.darkCard, border: `1px dashed ${C.darkBorder}`, borderRadius: 16, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, background: C.indigoDim, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Icon n="builder" size={24} color={C.indigo} />
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>No projects yet</p>
            <p style={{ fontSize: 13, color: C.textDim, marginBottom: 18 }}>Start your first AI website interview</p>
            <button onClick={() => setPage("builder")} style={{ padding: "10px 20px", background: C.indigo, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Build First Website
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {projects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Builder Page ───────────────────────────────────────────────────────────────
// ── Project Card ──────────────────────────────────────────────────────────────
const ST = {
  interview: { label:"In Progress", color:C.amber, bg:C.amberDim },
  workflow:  { label:"Workflow Ready", color:C.indigo, bg:C.indigoDim },
  generated: { label:"Generated", color:C.green, bg:C.greenDim },
  published: { label:"Published", color:C.green, bg:C.greenDim },
};

const ProjectCard = ({ project, onDelete }) => {
  const st = ST[project.status] || ST.interview;
  return (
    <div style={{ background:C.darkCard, border:`1px solid ${C.darkBorder}`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:44, height:44, background:C.darkSurface, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
        {TYPE_ICONS[project.website_type] || "🌐"}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:"#fff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {project.project_name || project.website_type || "Untitled"}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:11, background:st.bg, color:st.color, padding:"2px 8px", borderRadius:6, fontWeight:600 }}>{st.label}</span>
          <span style={{ fontSize:11, color:C.textDim }}>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      {onDelete && (
        <button onClick={()=>onDelete(project.id)} style={{ padding:"7px 10px", background:C.redDim, border:`1px solid ${C.red}30`, borderRadius:9, cursor:"pointer" }}>
          <Icon n="trash" size={14} color={C.red}/>
        </button>
      )}
    </div>
  );
};

const BuilderPage = ({ user, onDone }) => {
  const [step, setStep] = useState("type");      // type | interview | workflow | generated
  const [websiteType, setWebsiteType] = useState("");
  const [phase, setPhase] = useState(0);         // 0-6 (phases 1-7)
  const [questionIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [workflow, setWorkflow] = useState(null);
  const [generatingWorkflow, setGeneratingWorkflow] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [copied, setCopied] = useState(false);

  // Get current phase questions (phase 6 is dynamic)
  const getPhaseQuestions = (phaseIdx) => {
    if (phaseIdx === 5) return PHASE6_QUESTIONS[websiteType] || [];
    return PHASES[phaseIdx].questions;
  };

  const totalPhases = 7;
  const phaseQuestions = getPhaseQuestions(phase);
  const currentQ = phaseQuestions[questionIndex];
  const totalQuestionsInPhase = phaseQuestions.length;

  // Overall progress
  const totalQuestions = PHASES.reduce((sum, _, i) => sum + (i === 5 ? (PHASE6_QUESTIONS[websiteType]?.length || 0) : PHASES[i].questions.length), 0);
  const answeredCount = Object.keys(answers).length;

  const saveProgress = async (updatedAnswers, newStatus = "interview") => {
    setSaving(true);
    try {
      if (projectId) {
        await supabase.from("website_projects").update({
          answers: updatedAnswers,
          current_phase: phase,
          current_question: questionIndex,
          status: newStatus,
          updated_at: new Date().toISOString(),
        }).eq("id", projectId);
      } else {
        const { data } = await supabase.from("website_projects").insert([{
          user_id: user.id,
          website_type: websiteType,
          project_name: updatedAnswers.company_name || websiteType + " Website",
          answers: updatedAnswers,
          status: newStatus,
          current_phase: phase,
          current_question: questionIndex,
        }]).select().single();
        if (data) setProjectId(data.id);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleAnswer = async (answer) => {
    const key = currentQ.id;
    const updatedAnswers = { ...answers, [key]: answer };
    setAnswers(updatedAnswers);
    setCurrentAnswer("");
    setSelectedOptions([]);

    // Move to next question or next phase
    if (questionIndex < totalQuestionsInPhase - 1) {
      setQIndex(questionIndex + 1);
    } else if (phase < totalPhases - 1) {
      setPhase(phase + 1);
      setQIndex(0);
      await saveProgress(updatedAnswers);
    } else {
      // All done — generate workflow
      await saveProgress(updatedAnswers, "workflow");
      generateWorkflow(updatedAnswers);
    }
  };

  const goBack = () => {
    if (questionIndex > 0) {
      setQIndex(questionIndex - 1);
    } else if (phase > 0) {
      const prevPhase = phase - 1;
      const prevQuestions = getPhaseQuestions(prevPhase);
      setPhase(prevPhase);
      setQIndex(prevQuestions.length - 1);
    }
  };

  const generateWorkflow = async (allAnswers) => {
    setStep("workflow");
    setGeneratingWorkflow(true);
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `You are an expert website architect. Based on these interview answers, generate a website workflow plan.

Website Type: ${websiteType}
Answers: ${JSON.stringify(allAnswers, null, 2)}

Return ONLY valid JSON with this structure:
{
  "projectName": "...",
  "websiteType": "...",
  "pages": ["Home","About",...],
  "features": ["Feature1","Feature2",...],
  "techStack": ["React","Next.js",...],
  "colorScheme": {"primary":"#hex","secondary":"#hex","bg":"#hex","text":"#hex"},
  "fontPairing": {"heading":"font name","body":"font name"},
  "seoKeywords": ["keyword1","keyword2",...],
  "estimatedTime": "X weeks",
  "launchPlan": ["Step 1","Step 2","Step 3",...],
  "summary": "One paragraph describing the website plan"
}`
          }],
          userName: user?.name || "User",
        }),
      });
      const data = await res.json();
      const text = (data.reply || "").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setWorkflow(parsed);
      if (projectId) {
        await supabase.from("website_projects").update({ workflow: parsed, status: "workflow" }).eq("id", projectId);
      }
    } catch (e) {
      setWorkflow({ error: "Could not generate workflow. Please try again.", pages: [], features: [] });
    }
    setGeneratingWorkflow(false);
  };

  // ── STEP: Choose Website Type ──
  if (step === "type") return (
    <div style={{ padding: "32px 28px", maxWidth: 700, animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: C.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Step 1 of 8</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>What type of website do you want?</h2>
        <p style={{ fontSize: 14, color: C.textDim }}>I'll customize the interview questions based on your choice.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {WEBSITE_TYPES.map((type, i) => (
          <button key={type} onClick={() => { setWebsiteType(type); setStep("interview"); }} style={{ background: C.darkCard, border: `1.5px solid ${websiteType === type ? C.indigo : C.darkBorder}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, animation: `fadeIn 0.4s ease ${i * 0.05}s both`, transition: "border-color 0.2s" }}>
            <span style={{ fontSize: 24 }}>{WEBSITE_TYPE_ICONS[type]}</span>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{type}</p>
              <p style={{ fontSize: 11, color: C.textDim }}>Customized questions</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── STEP: Interview ──
  if (step === "interview") {
    const phaseInfo = PHASES[phase];
    return (
      <div style={{ padding: "32px 28px", maxWidth: 640, animation: "fadeIn 0.3s ease" }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {PHASES.map((p, i) => (
                <div key={i} style={{ height: 4, width: i < phase ? 28 : i === phase ? 36 : 16, borderRadius: 4, background: i < phase ? C.green : i === phase ? C.indigo : C.darkBorder, transition: "all 0.3s" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: C.textDim }}>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <p style={{ fontSize: 12, color: C.indigo, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>
            Phase {phase + 1}: {phaseInfo.label}
          </p>
        </div>

        {/* Consultant badge */}
        <div style={{ background: C.indigoDim, border: `1px solid ${C.indigo}30`, borderRadius: 10, padding: "8px 14px", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s ease infinite" }} />
          <span style={{ fontSize: 12, color: C.indigo, fontWeight: 600 }}>AI Consultant — {websiteType} Specialist</span>
        </div>

        {/* Question */}
        {currentQ ? (
          <div style={{ animation: "slideIn 0.3s ease" }}>
            <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 18, padding: "28px 24px", marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Q{questionIndex + 1} of {totalQuestionsInPhase}</p>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 0 }}>
                {currentQ.question}
              </h3>
            </div>

            {/* Text input */}
            {currentQ.type === "text" && (
              <div style={{ marginBottom: 16 }}>
                <input
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && currentAnswer.trim() && handleAnswer(currentAnswer.trim())}
                  placeholder={currentQ.placeholder}
                  style={{ width: "100%", padding: "16px 18px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 14, fontSize: 15, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
                  autoFocus
                />
                <button onClick={() => currentAnswer.trim() && handleAnswer(currentAnswer.trim())} disabled={!currentAnswer.trim()} style={{ width: "100%", marginTop: 12, padding: "14px", background: currentAnswer.trim() ? C.indigo : C.darkBorder, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: currentAnswer.trim() ? "pointer" : "not-allowed" }}>
                  Continue →
                </button>
              </div>
            )}

            {/* Textarea */}
            {currentQ.type === "textarea" && (
              <div style={{ marginBottom: 16 }}>
                <textarea
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  placeholder={currentQ.placeholder}
                  rows={4}
                  style={{ width: "100%", padding: "14px 18px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 14, fontSize: 14, color: "#fff", fontFamily: "'DM Sans', sans-serif", resize: "none" }}
                  autoFocus
                />
                <button onClick={() => currentAnswer.trim() && handleAnswer(currentAnswer.trim())} disabled={!currentAnswer.trim()} style={{ width: "100%", marginTop: 10, padding: "14px", background: currentAnswer.trim() ? C.indigo : C.darkBorder, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: currentAnswer.trim() ? "pointer" : "not-allowed" }}>
                  Continue →
                </button>
              </div>
            )}

            {/* Single choice */}
            {currentQ.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: "16px 18px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 14, fontSize: 14, color: "#fff", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, animation: `slideIn 0.3s ease ${i * 0.06}s both` }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.darkSurface, border: `1px solid ${C.darkBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.textDim }}>{["A","B","C","D","E"][i]}</span>
                    </div>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Multi select */}
            {currentQ.type === "multiselect" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 16 }}>
                  {currentQ.options.map((opt, i) => {
                    const selected = selectedOptions.includes(opt);
                    return (
                      <button key={i} onClick={() => setSelectedOptions(prev => selected ? prev.filter(o => o !== opt) : [...prev, opt])} style={{ padding: "13px 14px", background: selected ? C.indigoDim : C.darkCard, border: `1.5px solid ${selected ? C.indigo : C.darkBorder}`, borderRadius: 12, fontSize: 13, color: selected ? C.indigo : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${selected ? C.indigo : C.darkBorder}`, background: selected ? C.indigo : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {selected && <Icon n="check" size={10} color="#fff" />}
                        </div>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => selectedOptions.length && handleAnswer(selectedOptions)} disabled={!selectedOptions.length} style={{ width: "100%", padding: "14px", background: selectedOptions.length ? C.indigo : C.darkBorder, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: selectedOptions.length ? "pointer" : "not-allowed" }}>
                  Continue with {selectedOptions.length} selected →
                </button>
              </div>
            )}

            {/* Back + Skip */}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {(phase > 0 || questionIndex > 0) && (
                <button onClick={goBack} style={{ padding: "10px 16px", background: "none", border: `1px solid ${C.darkBorder}`, borderRadius: 10, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
                  ← Back
                </button>
              )}
              <button onClick={() => handleAnswer("Skip")} style={{ padding: "10px 16px", background: "none", border: "none", fontSize: 12, color: C.gray400, cursor: "pointer" }}>
                Skip this question
              </button>
              {saving && <Spinner size={16} />}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spinner size={32} />
            <p style={{ fontSize: 14, color: C.textDim, marginTop: 16 }}>Loading next phase...</p>
          </div>
        )}
      </div>
    );
  }

  // ── STEP: Workflow ──
  if (step === "workflow") return (
    <div style={{ padding: "32px 28px", maxWidth: 720, animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: C.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Interview Complete</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff" }}>Your Website Workflow</h2>
      </div>

      {generatingWorkflow ? (
        <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <Spinner size={36} />
          <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginTop: 16, marginBottom: 6 }}>AI is building your workflow...</p>
          <p style={{ fontSize: 13, color: C.textDim }}>Analyzing your answers and generating your website plan</p>
        </div>
      ) : workflow && !workflow.error ? (
        <div>
          {/* Summary Card */}
          <div style={{ background: C.indigoDim, border: `1px solid ${C.indigo}40`, borderRadius: 16, padding: "20px 22px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{workflow.projectName}</p>
            <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{workflow.summary}</p>
          </div>

          {/* Grid info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {/* Pages */}
            <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>📄 Pages ({workflow.pages?.length})</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {workflow.pages?.map((p, i) => (
                  <span key={i} style={{ fontSize: 11, background: C.darkSurface, color: C.textDim, padding: "3px 10px", borderRadius: 6, border: `1px solid ${C.darkBorder}` }}>{p}</span>
                ))}
              </div>
            </div>
            {/* Features */}
            <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>⚡ Features ({workflow.features?.length})</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {workflow.features?.map((f, i) => (
                  <span key={i} style={{ fontSize: 11, background: C.greenDim, color: C.green, padding: "3px 10px", borderRadius: 6, border: `1px solid ${C.green}30` }}>{f}</span>
                ))}
              </div>
            </div>
            {/* Colors */}
            <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>🎨 Color Scheme</p>
              <div style={{ display: "flex", gap: 8 }}>
                {workflow.colorScheme && Object.entries(workflow.colorScheme).slice(0, 4).map(([k, v]) => (
                  <div key={k} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 32, background: v, borderRadius: 8, marginBottom: 4, border: `1px solid ${C.darkBorder}` }} />
                    <p style={{ fontSize: 9, color: C.textDim }}>{k}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Launch Plan */}
            <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>🚀 Launch Plan</p>
              {workflow.launchPlan?.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.indigoDim, border: `1px solid ${C.indigo}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.indigo }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.4 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => { setStep("type"); setPhase(0); setQIndex(0); setAnswers({}); setWorkflow(null); }} style={{ flex: 1, padding: "13px", background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
              ← Start Over
            </button>
            <button onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(JSON.stringify(workflow, null, 2));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }} style={{ padding: "13px 20px", background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon n="copy" size={14} color={C.textDim} />
              {copied ? "Copied!" : "Export"}
            </button>
            <button onClick={() => onProjectSaved()} style={{ flex: 2, padding: "13px", background: C.indigo, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon n="code" size={16} color="#fff" />
              Save to Projects →
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}40`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
          <p style={{ color: C.red, marginBottom: 12 }}>{workflow?.error}</p>
          <button onClick={() => generateWorkflow(answers)} style={{ padding: "10px 20px", background: C.indigo, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>Try Again</button>
        </div>
      )}
    </div>
  );

  return null;
};

// ══════════════════════════════════════════════════════════════════════════════
// MY PROJECTS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ProjectsPage = ({ user, projects, setProjects, setPage }) => {
  const deleteProject = async (id) => {
    await supabase.from("website_projects").delete().eq("id", id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: "32px 28px", maxWidth: 800, animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>My Projects</h2>
          <p style={{ fontSize: 14, color: C.textDim }}>{projects.length} project{projects.length !== 1 ? "s" : ""} total</p>
        </div>
        <button onClick={() => setPage("builder")} style={{ padding: "11px 18px", background: C.indigo, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon n="plus" size={16} color="#fff" /> New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ background: C.darkCard, border: `1px dashed ${C.darkBorder}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>No projects yet</p>
          <p style={{ fontSize: 13, color: C.textDim, marginBottom: 20 }}>Start your first AI interview to create a website</p>
          <button onClick={() => setPage("builder")} style={{ padding: "12px 24px", background: C.indigo, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Build First Website
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
          ))}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// CHATBOT BUILDER PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ChatbotPage = ({ user, chatbots, setChatbots }) => {
  const [view, setView] = useState("list"); // list | create | preview
  const [form, setForm] = useState({ bot_name: "", business_name: "", system_prompt: "", custom_instructions: "", theme_color: "#6366f1" });
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [saving, setSaving] = useState(false);
  const [previewBot, setPreviewBot] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const createBot = async () => {
    if (!form.bot_name) return;
    setSaving(true);
    try {
      const { data } = await supabase.from("chatbots").insert([{
        user_id: user.id,
        ...form,
        faq: faq.filter(f => f.question && f.answer),
      }]).select().single();
      if (data) {
        setChatbots(prev => [data, ...prev]);
        setView("list");
        setForm({ bot_name: "", business_name: "", system_prompt: "", custom_instructions: "", theme_color: "#6366f1" });
        setFaq([{ question: "", answer: "" }]);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const deleteBot = async (id) => {
    await supabase.from("chatbots").delete().eq("id", id);
    setChatbots(prev => prev.filter(b => b.id !== id));
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !previewBot) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const faqText = previewBot.faq?.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n") || "";
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: chatInput }
          ],
          systemPrompt: `You are ${previewBot.bot_name}, a helpful AI assistant for ${previewBot.business_name || "this business"}.

${previewBot.system_prompt || "Be helpful, friendly, and professional."}

${faqText ? `FAQ Knowledge Base:\n${faqText}` : ""}

${previewBot.custom_instructions || ""}

Answer concisely and helpfully. If you don't know something, say so politely.`,
        }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "assistant", content: data.reply || "I'm here to help! How can I assist you?" }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }
    setChatLoading(false);
  };

  const getEmbedCode = (bot) => `<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'}/widget.js"></script>
<script>
  ChatBot.init({ botId: "${bot.id}", theme: "${bot.theme_color}" });
</script>`;

  if (view === "create") return (
    <div style={{ padding: "32px 28px", maxWidth: 680, animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer", fontSize: 13, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to bots
        </button>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>Create AI Chatbot</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Bot Name *", key: "bot_name", placeholder: "e.g. Alex — Support Bot" },
          { label: "Business Name", key: "business_name", placeholder: "e.g. Gokul Tech Solutions" },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>{f.label}</label>
            <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
              style={{ width: "100%", padding: "13px 16px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 14, color: "#fff", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        ))}

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>System Prompt</label>
          <textarea value={form.system_prompt} onChange={e => setForm(p => ({ ...p, system_prompt: e.target.value }))} placeholder="Tell the bot how to behave e.g. You are a friendly support agent. Always be polite and helpful."
            rows={3} style={{ width: "100%", padding: "13px 16px", background: C.darkCard, border: `1.5px solid ${C.darkBorder}`, borderRadius: 12, fontSize: 14, color: "#fff", fontFamily: "'DM Sans', sans-serif", resize: "none" }} />
        </div>

        {/* FAQ Section */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 10, display: "block" }}>FAQ Knowledge Base</label>
          {faq.map((item, i) => (
            <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 12, padding: "14px", marginBottom: 10 }}>
              <input value={item.question} onChange={e => setFaq(prev => prev.map((f, j) => j === i ? { ...f, question: e.target.value } : f))} placeholder={`Question ${i + 1}`}
                style={{ width: "100%", padding: "10px 12px", background: C.darkSurface, border: `1px solid ${C.darkBorder}`, borderRadius: 9, fontSize: 13, color: "#fff", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }} />
              <input value={item.answer} onChange={e => setFaq(prev => prev.map((f, j) => j === i ? { ...f, answer: e.target.value } : f))} placeholder="Answer"
                style={{ width: "100%", padding: "10px 12px", background: C.darkSurface, border: `1px solid ${C.darkBorder}`, borderRadius: 9, fontSize: 13, color: "#fff", fontFamily: "'DM Sans', sans-serif" }} />
            </div>
          ))}
          <button onClick={() => setFaq(prev => [...prev, { question: "", answer: "" }])} style={{ fontSize: 12, color: C.indigo, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon n="plus" size={14} color={C.indigo} /> Add FAQ
          </button>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>Theme Color</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {["#6366f1","#22c55e","#f59e0b","#ef4444","#0ea5e9","#ec4899","#000000"].map(col => (
              <button key={col} onClick={() => setForm(p => ({ ...p, theme_color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: `3px solid ${form.theme_color === col ? "#fff" : "transparent"}`, cursor: "pointer" }} />
            ))}
          </div>
        </div>

        <button onClick={createBot} disabled={!form.bot_name || saving} style={{ padding: "14px", background: form.bot_name ? C.indigo : C.darkBorder, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: form.bot_name ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {saving ? <Spinner size={18} /> : null}
          {saving ? "Creating..." : "Create Chatbot"}
        </button>
      </div>
    </div>
  );

  if (view === "preview" && previewBot) return (
    <div style={{ padding: "32px 28px", maxWidth: 680, animation: "fadeIn 0.4s ease" }}>
      <button onClick={() => { setView("list"); setPreviewBot(null); setChatMessages([]); }} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer", fontSize: 13, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
        ← Back to bots
      </button>

      {/* Chat preview */}
      <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 18, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "16px 20px", background: previewBot.theme_color, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="bot" size={18} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>{previewBot.bot_name}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", margin: 0 }}>{previewBot.business_name}</p>
          </div>
          <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
        </div>
        <div style={{ height: 320, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {chatMessages.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <p style={{ fontSize: 13, color: C.textDim }}>Start a conversation with {previewBot.bot_name}</p>
            </div>
          )}
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "75%", padding: "10px 14px", background: msg.role === "user" ? previewBot.theme_color : C.darkSurface, borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 13, color: "#fff", lineHeight: 1.5 }}>
                {msg.content}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: C.darkSurface, borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.textDim, animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />)}
            </div>
          )}
        </div>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.darkBorder}`, display: "flex", gap: 10 }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", background: C.darkSurface, border: `1px solid ${C.darkBorder}`, borderRadius: 10, fontSize: 13, color: "#fff", fontFamily: "'DM Sans', sans-serif" }} />
          <button onClick={sendMessage} disabled={chatLoading || !chatInput.trim()} style={{ padding: "10px 16px", background: previewBot.theme_color, border: "none", borderRadius: 10, cursor: "pointer" }}>
            <Icon n="arrow" size={16} color="#fff" />
          </button>
        </div>
      </div>

      {/* Embed code */}
      <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>Embed Code</p>
          <button onClick={() => { navigator.clipboard?.writeText(getEmbedCode(previewBot)); setCopied(previewBot.id); setTimeout(() => setCopied(""), 2000); }} style={{ background: C.indigoDim, border: `1px solid ${C.indigo}40`, borderRadius: 8, padding: "5px 12px", fontSize: 11, color: C.indigo, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon n="copy" size={12} color={C.indigo} />
            {copied === previewBot.id ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre style={{ fontSize: 11, color: C.textDim, background: C.darkSurface, padding: "14px", borderRadius: 10, overflowX: "auto", lineHeight: 1.7, fontFamily: "monospace" }}>
          {getEmbedCode(previewBot)}
        </pre>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", maxWidth: 800, animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>AI Chatbot Builder</h2>
          <p style={{ fontSize: 14, color: C.textDim }}>{chatbots.length} chatbot{chatbots.length !== 1 ? "s" : ""} created</p>
        </div>
        <button onClick={() => setView("create")} style={{ padding: "11px 18px", background: C.indigo, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon n="plus" size={16} color="#fff" /> New Chatbot
        </button>
      </div>

      {chatbots.length === 0 ? (
        <div style={{ background: C.darkCard, border: `1px dashed ${C.darkBorder}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, background: C.greenDim, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Icon n="bot" size={24} color={C.green} />
          </div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>No chatbots yet</p>
          <p style={{ fontSize: 13, color: C.textDim, marginBottom: 18 }}>Create your first AI chatbot in minutes</p>
          <button onClick={() => setView("create")} style={{ padding: "12px 24px", background: C.indigo, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Create First Chatbot
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chatbots.map((bot, i) => (
            <div key={bot.id} style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bot.theme_color + "30", border: `1px solid ${bot.theme_color}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n="bot" size={20} color={bot.theme_color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{bot.bot_name}</p>
                <p style={{ fontSize: 12, color: C.textDim }}>{bot.business_name || "No business name"} · {bot.faq?.length || 0} FAQs</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setPreviewBot(bot); setView("preview"); }} style={{ padding: "7px 14px", background: C.indigoDim, border: `1px solid ${C.indigo}40`, borderRadius: 9, fontSize: 12, fontWeight: 600, color: C.indigo, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon n="eye" size={13} color={C.indigo} /> Preview
                </button>
                <button onClick={() => deleteBot(bot.id)} style={{ padding: "7px 10px", background: C.redDim, border: `1px solid ${C.red}30`, borderRadius: 9, cursor: "pointer" }}>
                  <Icon n="trash" size={14} color={C.red} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ANALYTICS PAGE (placeholder)
// ══════════════════════════════════════════════════════════════════════════════
const AnalyticsPage = ({ projects, chatbots }) => (
  <div style={{ padding: "32px 28px", maxWidth: 800, animation: "fadeIn 0.4s ease" }}>
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 24 }}>Analytics</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 24 }}>
      {[
        { label: "Total Projects",    value: projects.length,                                      color: C.indigo },
        { label: "Completed Builds",  value: projects.filter(p => p.status === "generated").length, color: C.green },
        { label: "Active Chatbots",   value: chatbots.length,                                       color: C.amber },
        { label: "Total FAQ Entries", value: chatbots.reduce((s, b) => s + (b.faq?.length || 0), 0), color: C.textDim },
      ].map((s, i) => (
        <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "22px 20px" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</p>
          <p style={{ fontSize: 13, color: C.textDim }}>{s.label}</p>
        </div>
      ))}
    </div>
    <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
      <Icon n="analytics" size={32} color={C.darkBorder} />
      <p style={{ fontSize: 14, color: C.textDim, marginTop: 12 }}>Detailed analytics coming soon</p>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SettingsPage = ({ user }) => (
  <div style={{ padding: "32px 28px", maxWidth: 600, animation: "fadeIn 0.4s ease" }}>
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 24 }}>Settings</h2>
    <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 16, padding: "24px", marginBottom: 16 }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Account</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.indigo, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {user?.photo ? <img src={user.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0]}</span>}
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{user?.name}</p>
          <p style={{ fontSize: 13, color: C.textDim }}>{user?.email}</p>
        </div>
      </div>
    </div>
    <div style={{ background: C.darkCard, border: `1px solid ${C.darkBorder}`, borderRadius: 16, padding: "24px" }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>AI Configuration</p>
      {[["AI Provider", "Groq"], ["Model", "llama-3.1-8b-instant"], ["Database", "Supabase (Gkfxl project)"], ["Plan", "Free"]].map(([k, v], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.darkBorder}` : "none" }}>
          <span style={{ fontSize: 13, color: C.textDim }}>{k}</span>
          <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");  // landing | login | dashboard
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [chatbots, setChatbots] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const su = session.user;
        const profile = {
          id: su.id,
          email: su.email,
          name: su.user_metadata?.full_name || su.user_metadata?.name || su.email?.split("@")[0],
          photo: su.user_metadata?.avatar_url || su.user_metadata?.picture || null,
        };
        setUser(profile);
        setScreen("dashboard");
        loadUserData(su.id);
      } else {
        setUser(null);
        setScreen("landing");
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    const [{ data: proj }, { data: bots }] = await Promise.all([
      supabase.from("website_projects").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("chatbots").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    ]);
    if (proj) setProjects(proj);
    if (bots) setChatbots(bots);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setScreen("landing");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlobalStyles />
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 52, height: 52, background: C.indigo, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", animation: "glow 2s ease infinite" }}>
          <Icon n="logo" size={22} color="#fff" />
        </div>
        <Spinner size={24} />
      </div>
    </div>
  );

  const renderPage = () => {
    switch (page) {
      case "dashboard":  return <DashboardPage user={user} setPage={setPage} projects={projects} chatbots={chatbots} />;
      case "builder":    return <BuilderPage user={user} onProjectSaved={() => { loadUserData(user.id); setPage("projects"); }} />;
      case "chatbot":    return <ChatbotPage user={user} chatbots={chatbots} setChatbots={setChatbots} />;
      case "projects":   return <ProjectsPage user={user} projects={projects} setProjects={setProjects} setPage={setPage} />;
      case "analytics":  return <AnalyticsPage projects={projects} chatbots={chatbots} />;
      case "settings":   return <SettingsPage user={user} />;
      default:           return <DashboardPage user={user} setPage={setPage} projects={projects} chatbots={chatbots} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {screen === "landing"     && <IntroPage onGetStarted={() => setScreen("login")} />}
      {screen === "login"     && <LoginPage onBack={() => setScreen("landing")} />}
      {screen === "dashboard" && (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar page={page} setPage={setPage} user={user} onLogout={handleLogout} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <main style={{ flex: 1, overflowY: "auto", background: C.bg }}>
            {renderPage()}
          </main>
        </div>
      )}
    </>
  );
}
