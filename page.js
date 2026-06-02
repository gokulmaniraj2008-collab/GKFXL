"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase Client ────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "aiarchitect-auth-token",
    },
  }
);

// ── Colors ─────────────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0f",
  surface: "#13131a",
  card: "#1a1a24",
  border: "#2a2a3a",
  borderHover: "#3a3a50",
  accent: "#6366f1",
  accentDim: "#6366f120",
  accentHover: "#818cf8",
  green: "#22c55e",
  greenDim: "#22c55e18",
  red: "#ef4444",
  redDim: "#ef444418",
  amber: "#f59e0b",
  amberDim: "#f59e0b18",
  white: "#ffffff",
  gray100: "#f1f1f3",
  gray300: "#9ca3af",
  gray400: "#6b7280",
  gray500: "#4b5563",
  gray600: "#374151",
  text: "#e8e8f0",
  textDim: "#8888aa",
};

// ── Icons ──────────────────────────────────────────────────────────────────────
const Icon = ({ n, size = 20, color = "currentColor" }) => {
  const paths = {
    logo:      <><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    builder:   <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    bot:       <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M12 2v5"/><circle cx="8.5" cy="13.5" r="1.5"/><circle cx="15.5" cy="13.5" r="1.5"/><path d="M8 17h8"/></>,
    projects:  <><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></>,
    analytics: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout:    <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    copy:      <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    menu:      <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    code:      <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[n]}
    </svg>
  );
};

// ── Spinner ────────────────────────────────────────────────────────────────────
const Spinner = ({ size = 20, color = C.accent }) => (
  <div style={{
    width: size, height: size,
    border: `2px solid ${color}30`,
    borderTopColor: color,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  }} />
);

// ── CSS Keyframes injected once ────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.bg}; color: ${C.text}; font-family: 'DM Sans', sans-serif; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 20px ${C.accent}40; } 50% { box-shadow: 0 0 40px ${C.accent}80; } }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${C.surface}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
    input:focus, textarea:focus, select:focus { outline: none !important; }
    button { font-family: 'DM Sans', sans-serif; }
  `}</style>
);

// ══════════════════════════════════════════════════════════════════════════════
// INTRO PAGE
// ══════════════════════════════════════════════════════════════════════════════
const IntroPage = ({ onGetStarted }) => {
  const features = [
    { icon: "builder", title: "AI Website Builder", desc: "7-phase interview → full website workflow → generated code" },
    { icon: "bot",     title: "AI Chatbot Builder", desc: "Build custom chatbots with FAQ, embed on any website" },
    { icon: "zap",     title: "Powered by Groq",    desc: "llama-3.1-8b-instant — ultra-fast AI responses" },
    { icon: "globe",   title: "Deploy Anywhere",    desc: "Export code, deploy to Vercel in one click" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      {/* BG Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border}40 1px, transparent 1px), linear-gradient(90deg, ${C.border}40 1px, transparent 1px)`, backgroundSize: "48px 48px", zIndex: 0 }} />
      {/* BG Glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: `radial-gradient(ellipse, ${C.accent}18 0%, transparent 70%)`, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, animation: "fadeIn 0.6s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: C.accent, borderRadius: 18, marginBottom: 20, animation: "glow 3s ease infinite" }}>
            <Icon n="logo" size={28} color="#fff" />
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: C.white, letterSpacing: -1, lineHeight: 1.1, marginBottom: 8 }}>
            AI Website Architect
          </h1>
          <p style={{ fontSize: 15, color: C.textDim, lineHeight: 1.6 }}>
            Build websites through AI interviews.<br />No code. No guesswork. Just answers.
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, animation: `fadeIn 0.6s ease ${i * 0.1}s both` }}>
              <div style={{ width: 40, height: 40, background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={f.icon} size={18} color={C.accent} />
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 2 }}>{f.title}</p>
                <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onGetStarted} style={{ width: "100%", padding: "15px 24px", background: C.accent, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'Syne', sans-serif", letterSpacing: 0.3 }}>
          Get Started Free
          <Icon n="arrow" size={18} color="#fff" />
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: C.gray400, marginTop: 12 }}>
          Sign in with Google — no password needed
        </p>
      </div>
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
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border}40 1px, transparent 1px), linear-gradient(90deg, ${C.border}40 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 400, height: 300, background: `radial-gradient(ellipse, ${C.accent}15 0%, transparent 70%)` }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, animation: "fadeIn 0.5s ease" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "32px 28px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, background: C.accent, borderRadius: 14, marginBottom: 16 }}>
              <Icon n="logo" size={22} color="#fff" />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.white, marginBottom: 6, letterSpacing: -0.5 }}>Welcome back</h2>
            <p style={{ fontSize: 13, color: C.textDim }}>Sign in to AI Website Architect</p>
          </div>

          {/* Google Button */}
          <button onClick={handleGoogle} disabled={loading} style={{ width: "100%", padding: "14px 20px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, color: C.white, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16, opacity: loading ? 0.7 : 1, transition: "border-color 0.2s" }}>
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

        <button onClick={onBack} style={{ width: "100%", marginTop: 14, padding: "12px", background: "none", border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
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
    <div style={{ width: collapsed ? 68 : 220, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, transition: "width 0.25s ease", overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 14px" : "20px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, minHeight: 68 }}>
        <div style={{ width: 36, height: 36, background: C.accent, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n="logo" size={16} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, color: C.white, lineHeight: 1.1 }}>AI Architect</p>
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
          <button key={item.id} onClick={() => setPage(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "11px 14px" : "11px 14px", borderRadius: 10, border: "none", background: page === item.id ? C.accentDim : "none", color: page === item.id ? C.accent : C.textDim, cursor: "pointer", transition: "all 0.15s", textAlign: "left", position: "relative" }}>
            <Icon n={item.icon} size={18} color={page === item.id ? C.accent : C.textDim} />
            {!collapsed && (
              <span style={{ fontSize: 13, fontWeight: page === item.id ? 600 : 400, whiteSpace: "nowrap" }}>{item.label}</span>
            )}
            {page === item.id && (
              <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: C.accent, borderRadius: "0 3px 3px 0" }} />
            )}
          </button>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {user?.photo
              ? <img src={user.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0]}</span>
            }
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.white, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "User"}</p>
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
    { label: "Total Projects",  value: projects.length, icon: "projects",  color: C.accent },
    { label: "Active Chatbots", value: chatbots.length, icon: "bot",       color: C.green },
    { label: "Websites Built",  value: projects.filter(p => p.status === "generated").length, icon: "globe", color: C.amber },
    { label: "AI Credits",      value: "∞",             icon: "zap",       color: C.textDim },
  ];

  const quickActions = [
    { label: "Build a Website",  desc: "Start AI interview", icon: "builder", page: "builder", color: C.accent,  bg: C.accentDim },
    { label: "Create a Chatbot", desc: "Deploy in minutes",  icon: "bot",     page: "chatbot", color: C.green,   bg: C.greenDim },
    { label: "View Projects",    desc: "All your work",      icon: "projects",page: "projects",color: C.amber,   bg: C.amberDim },
  ];

  return (
    <div style={{ padding: "32px 28px", maxWidth: 900, animation: "fadeIn 0.4s ease" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: C.textDim, marginBottom: 4 }}>{greeting} 👋</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: C.white, letterSpacing: -0.5 }}>
          {user?.name?.split(" ")[0] || "Welcome"}
        </h1>
        <p style={{ fontSize: 14, color: C.textDim, marginTop: 4 }}>Here's your AI website workspace</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 16px", animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <Icon n={s.icon} size={18} color={s.color} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.white, marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: C.textDim }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 14 }}>Quick Actions</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setPage(a.page)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 18px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s", animation: `fadeIn 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ width: 44, height: 44, background: a.bg, border: `1px solid ${a.color}40`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n={a.icon} size={20} color={a.color} />
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 3 }}>{a.label}</p>
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
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white }}>Recent Projects</p>
          <button onClick={() => setPage("projects")} style={{ background: "none", border: "none", fontSize: 12, color: C.accent, cursor: "pointer" }}>View all →</button>
        </div>

        {projects.length === 0 ? (
          <div style={{ background: C.card, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, background: C.accentDim, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Icon n="builder" size={24} color={C.accent} />
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>No projects yet</p>
            <p style={{ fontSize: 13, color: C.textDim, marginBottom: 18 }}>Start your first AI website interview</p>
            <button onClick={() => setPage("builder")} style={{ padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
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

// ── Project Card (reused across pages) ────────────────────────────────────────
const STATUS_CONFIG = {
  interview:  { label: "In Progress", color: C.amber, bg: C.amberDim },
  workflow:   { label: "Workflow Ready", color: C.accent, bg: C.accentDim },
  generated:  { label: "Generated", color: C.green, bg: C.greenDim },
  published:  { label: "Published", color: C.green, bg: C.greenDim },
};

const WEBSITE_TYPE_ICONS = {
  Restaurant: "🍽️", Portfolio: "🎨", Business: "💼", Ecommerce: "🛒",
  Hospital: "🏥", School: "🏫", Agency: "🚀", "Real Estate": "🏠",
  "Landing Page": "📄", "Custom Website": "⚡",
};

const ProjectCard = ({ project, onContinue, onDelete }) => {
  const st = STATUS_CONFIG[project.status] || STATUS_CONFIG.interview;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, background: C.surface, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
        {WEBSITE_TYPE_ICONS[project.website_type] || "🌐"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {project.project_name || project.website_type || "Untitled Project"}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, background: st.bg, color: st.color, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{st.label}</span>
          <span style={{ fontSize: 11, color: C.textDim }}>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {onContinue && (
          <button onClick={() => onContinue(project)} style={{ padding: "7px 14px", background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 9, fontSize: 12, fontWeight: 600, color: C.accent, cursor: "pointer" }}>
            Continue
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(project.id)} style={{ padding: "7px 10px", background: C.redDim, border: `1px solid ${C.red}30`, borderRadius: 9, cursor: "pointer" }}>
            <Icon n="trash" size={14} color={C.red} />
          </button>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// AI WEBSITE BUILDER — QUESTION ENGINE
// ══════════════════════════════════════════════════════════════════════════════

// Question Tree — Pre-scripted, branching by website type
const QUESTION_TREE = {
  // PHASE 1 — RESEARCH
  phase1: [
    { id: "target_audience",  question: "Who is your target audience?",                    type: "text",    placeholder: "e.g. Young professionals aged 25-40, families, students..." },
    { id: "main_goal",        question: "What is your main business goal?",                type: "text",    placeholder: "e.g. Generate leads, sell products, showcase portfolio..." },
    { id: "competitors",      question: "Do you have competitor websites you like?",        type: "text",    placeholder: "e.g. apple.com, airbnb.com or 'No competitors yet'" },
    { id: "problems_solved",  question: "What problems should this website solve?",         type: "text",    placeholder: "e.g. Make it easy to book appointments, showcase work..." },
    { id: "devices",          question: "What devices do your customers mostly use?",       type: "choice",  options: ["Mobile mainly", "Desktop mainly", "Both equally", "Not sure"] },
  ],
  // PHASE 2 — BUSINESS DETAILS
  phase2: [
    { id: "company_name",  question: "What is your company / business name?",              type: "text",    placeholder: "e.g. Gokul Tech Solutions" },
    { id: "tagline",       question: "What is your business tagline?",                     type: "text",    placeholder: "e.g. 'Building tomorrow, today'" },
    { id: "owner_name",    question: "What is the owner's name?",                          type: "text",    placeholder: "e.g. Gokul Raj" },
    { id: "phone",         question: "Business phone number?",                             type: "text",    placeholder: "e.g. +91 98765 43210" },
    { id: "email",         question: "Business email address?",                            type: "text",    placeholder: "e.g. hello@yourbusiness.com" },
    { id: "address",       question: "Business address / location?",                       type: "text",    placeholder: "e.g. 123 Main St, Chennai, Tamil Nadu" },
    { id: "social_media",  question: "Social media links? (Instagram, Facebook, LinkedIn)", type: "text",   placeholder: "e.g. @yourbusiness or paste links" },
    { id: "working_hours", question: "What are your working hours?",                       type: "text",    placeholder: "e.g. Mon-Fri 9AM-6PM, Sat 10AM-4PM" },
  ],
  // PHASE 3 — PAGES
  phase3: [
    { id: "pages", question: "Which pages do you need?", type: "multiselect", options: ["Home", "About", "Services", "Pricing", "Gallery", "Blog", "FAQ", "Contact", "Booking", "Store", "Portfolio", "Careers"] },
  ],
  // PHASE 4 — BRANDING
  phase4: [
    { id: "logo",        question: "Do you have a logo?",            type: "choice",  options: ["Yes, I have one", "No, need one designed", "Will upload later"] },
    { id: "colors",      question: "What are your brand colors?",    type: "text",    placeholder: "e.g. Navy blue and gold, or #003366 and #FFD700" },
    { id: "fonts",       question: "What font style do you prefer?", type: "choice",  options: ["Modern & Clean", "Classic & Serif", "Bold & Strong", "Elegant & Thin", "No preference"] },
    { id: "theme_style", question: "What theme style fits your brand?", type: "choice", options: ["Modern", "Luxury", "Minimal", "Corporate", "Dark", "Creative", "Startup"] },
  ],
  // PHASE 5 — CONTENT
  phase5: [
    { id: "about_text",    question: "Tell me about your company (About Us text).",      type: "textarea", placeholder: "Describe your company history, mission, values..." },
    { id: "services_list", question: "List your main services or products.",             type: "textarea", placeholder: "e.g. Web Design, SEO, Branding..." },
    { id: "testimonials",  question: "Do you have customer testimonials to show?",       type: "choice",   options: ["Yes, I'll provide them", "No testimonials yet", "Will add later"] },
    { id: "images",        question: "Do you have images/photos for the website?",      type: "choice",   options: ["Yes, professional photos", "Yes, basic photos", "No, need stock images", "Will provide later"] },
    { id: "seo_keywords",  question: "What are your top SEO keywords?",                 type: "text",     placeholder: "e.g. web design Chennai, affordable restaurant Madurai..." },
  ],
  // PHASE 7 — LAUNCH
  phase7: [
    { id: "need_domain",      question: "Do you need a domain name?",         type: "choice", options: ["Yes, help me choose one", "Already have one", "Not sure yet"] },
    { id: "need_hosting",     question: "Do you need hosting?",               type: "choice", options: ["Yes, recommend one", "Already have hosting", "Will decide later"] },
    { id: "seo_setup",        question: "Do you want SEO setup?",             type: "choice", options: ["Yes, full SEO setup", "Basic SEO only", "No SEO for now"] },
    { id: "google_analytics", question: "Do you want Google Analytics?",      type: "choice", options: ["Yes", "No", "Not sure"] },
    { id: "mobile_optimized", question: "Must the site be mobile-optimized?", type: "choice", options: ["Yes, mobile first", "Desktop priority", "Both equally"] },
  ],
};

// Phase 6 — Dynamic by website type
const PHASE6_QUESTIONS = {
  Restaurant: [
    { id: "menu_available",  question: "Do you have a menu to show online?",      type: "choice", options: ["Yes, full menu", "Yes, partial menu", "No menu yet"] },
    { id: "booking_system",  question: "Do you need a table booking system?",     type: "choice", options: ["Yes", "No", "Maybe later"] },
    { id: "delivery",        question: "Do you offer delivery or takeaway?",      type: "choice", options: ["Both delivery & takeaway", "Delivery only", "Takeaway only", "Dine-in only"] },
    { id: "whatsapp_order",  question: "Do you want WhatsApp ordering?",         type: "choice", options: ["Yes", "No"] },
  ],
  Portfolio: [
    { id: "portfolio_type",  question: "What type of portfolio?",               type: "choice",  options: ["Design", "Photography", "Development", "Writing", "Art", "Other"] },
    { id: "projects_count",  question: "How many projects will you showcase?",   type: "choice",  options: ["1-5 projects", "6-15 projects", "15+ projects"] },
    { id: "github_link",     question: "Do you have a GitHub profile to link?",  type: "text",    placeholder: "e.g. github.com/yourusername or 'No'" },
    { id: "resume_download", question: "Do you want a resume download option?",  type: "choice",  options: ["Yes", "No"] },
  ],
  Business: [
    { id: "lead_form",       question: "Do you need a lead capture form?",       type: "choice",  options: ["Yes", "No"] },
    { id: "team_page",       question: "Do you want a team / about us page?",    type: "choice",  options: ["Yes, with photos", "Yes, basic info", "No"] },
    { id: "blog_needed",     question: "Do you need a blog section?",            type: "choice",  options: ["Yes", "No", "Maybe later"] },
    { id: "crm_integration", question: "Do you need CRM integration?",           type: "choice",  options: ["Yes", "No", "Not sure"] },
  ],
  Ecommerce: [
    { id: "product_count",   question: "How many products will you sell?",       type: "choice",  options: ["1-10 products", "11-50 products", "50+ products"] },
    { id: "payment_gateway", question: "Which payment gateway do you prefer?",   type: "choice",  options: ["Razorpay", "Stripe", "PayPal", "Cash on Delivery only", "Not sure"] },
    { id: "cart_wishlist",   question: "Do you need cart and wishlist?",          type: "choice",  options: ["Yes, both", "Cart only", "No"] },
    { id: "inventory",       question: "Do you need inventory management?",      type: "choice",  options: ["Yes", "No", "Later"] },
    { id: "coupons",         question: "Do you want coupon / discount codes?",   type: "choice",  options: ["Yes", "No"] },
  ],
  Hospital: [
    { id: "appointment",     question: "Do you need online appointment booking?", type: "choice", options: ["Yes", "No"] },
    { id: "doctors_page",    question: "Do you want a doctors / team page?",      type: "choice", options: ["Yes, with profiles", "Yes, basic list", "No"] },
    { id: "departments",     question: "How many departments/specialties?",        type: "choice", options: ["1-5", "6-15", "15+"] },
    { id: "emergency_info",  question: "Do you need emergency contact info?",     type: "choice", options: ["Yes", "No"] },
  ],
  School: [
    { id: "admission_form",  question: "Do you need an online admission form?",  type: "choice",  options: ["Yes", "No"] },
    { id: "classes_info",    question: "How many classes/grades to show?",        type: "choice",  options: ["Primary only", "Secondary only", "All grades"] },
    { id: "events_calendar", question: "Do you want an events calendar?",         type: "choice",  options: ["Yes", "No"] },
    { id: "gallery_needed",  question: "Do you need a photo gallery?",            type: "choice",  options: ["Yes", "No"] },
  ],
  Agency: [
    { id: "case_studies",    question: "Do you have case studies to show?",       type: "choice",  options: ["Yes", "Not yet", "Will add later"] },
    { id: "pricing_page",    question: "Do you want a pricing page?",             type: "choice",  options: ["Yes, fixed pricing", "Yes, custom quotes", "No"] },
    { id: "client_logos",    question: "Do you have client logos to display?",    type: "choice",  options: ["Yes", "No", "Will add later"] },
    { id: "proposal_form",   question: "Do you need a proposal request form?",    type: "choice",  options: ["Yes", "No"] },
  ],
  "Real Estate": [
    { id: "property_listings", question: "How many properties to list?",         type: "choice",  options: ["1-10", "11-50", "50+", "Dynamic (database)"] },
    { id: "map_integration",   question: "Do you need map / location features?", type: "choice",  options: ["Yes", "No"] },
    { id: "virtual_tour",      question: "Do you want virtual tour support?",    type: "choice",  options: ["Yes", "No", "Later"] },
    { id: "mortgage_calc",     question: "Do you need a mortgage calculator?",   type: "choice",  options: ["Yes", "No"] },
  ],
  "Landing Page": [
    { id: "cta_type",          question: "What is your main call-to-action?",    type: "choice",  options: ["Sign up / Register", "Buy now", "Contact us", "Download", "Book a call"] },
    { id: "countdown_timer",   question: "Do you need a countdown timer?",       type: "choice",  options: ["Yes", "No"] },
    { id: "social_proof",      question: "Do you have social proof to show?",    type: "choice",  options: ["Testimonials", "Review count", "Client logos", "None yet"] },
    { id: "video_section",     question: "Do you want a video section?",         type: "choice",  options: ["Yes", "No"] },
  ],
  "Custom Website": [
    { id: "special_features",  question: "List any special features you need.", type: "textarea", placeholder: "e.g. Login system, members area, live chat, custom calculator..." },
    { id: "integrations",      question: "Any third-party integrations?",        type: "text",    placeholder: "e.g. Mailchimp, HubSpot, Calendly, Stripe..." },
    { id: "languages",         question: "How many languages?",                  type: "choice",  options: ["1 language", "2 languages", "3+ languages"] },
    { id: "user_accounts",     question: "Do users need to create accounts?",    type: "choice",  options: ["Yes", "No", "Maybe later"] },
  ],
};

const PHASES = [
  { id: 1, label: "Research",        key: "phase1", questions: QUESTION_TREE.phase1 },
  { id: 2, label: "Business Info",   key: "phase2", questions: QUESTION_TREE.phase2 },
  { id: 3, label: "Pages",           key: "phase3", questions: QUESTION_TREE.phase3 },
  { id: 4, label: "Branding",        key: "phase4", questions: QUESTION_TREE.phase4 },
  { id: 5, label: "Content",         key: "phase5", questions: QUESTION_TREE.phase5 },
  { id: 6, label: "Features",        key: "phase6", questions: [] }, // dynamic
  { id: 7, label: "Launch",          key: "phase7", questions: QUESTION_TREE.phase7 },
];

const WEBSITE_TYPES = ["Restaurant","Portfolio","Business","Ecommerce","Hospital","School","Agency","Real Estate","Landing Page","Custom Website"];

// ── Builder Page ───────────────────────────────────────────────────────────────
const BuilderPage = ({ user, onProjectSaved }) => {
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
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 8 }}>What type of website do you want?</h2>
        <p style={{ fontSize: 14, color: C.textDim }}>I'll customize the interview questions based on your choice.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {WEBSITE_TYPES.map((type, i) => (
          <button key={type} onClick={() => { setWebsiteType(type); setStep("interview"); }} style={{ background: C.card, border: `1.5px solid ${websiteType === type ? C.accent : C.border}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, animation: `fadeIn 0.4s ease ${i * 0.05}s both`, transition: "border-color 0.2s" }}>
            <span style={{ fontSize: 24 }}>{WEBSITE_TYPE_ICONS[type]}</span>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 2 }}>{type}</p>
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
                <div key={i} style={{ height: 4, width: i < phase ? 28 : i === phase ? 36 : 16, borderRadius: 4, background: i < phase ? C.green : i === phase ? C.accent : C.border, transition: "all 0.3s" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: C.textDim }}>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <p style={{ fontSize: 12, color: C.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>
            Phase {phase + 1}: {phaseInfo.label}
          </p>
        </div>

        {/* Consultant badge */}
        <div style={{ background: C.accentDim, border: `1px solid ${C.accent}30`, borderRadius: 10, padding: "8px 14px", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s ease infinite" }} />
          <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>AI Consultant — {websiteType} Specialist</span>
        </div>

        {/* Question */}
        {currentQ ? (
          <div style={{ animation: "slideIn 0.3s ease" }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px 24px", marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Q{questionIndex + 1} of {totalQuestionsInPhase}</p>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.4, marginBottom: 0 }}>
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
                  style={{ width: "100%", padding: "16px 18px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, fontSize: 15, color: C.white, fontFamily: "'DM Sans', sans-serif" }}
                  autoFocus
                />
                <button onClick={() => currentAnswer.trim() && handleAnswer(currentAnswer.trim())} disabled={!currentAnswer.trim()} style={{ width: "100%", marginTop: 12, padding: "14px", background: currentAnswer.trim() ? C.accent : C.border, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: currentAnswer.trim() ? "pointer" : "not-allowed" }}>
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
                  style={{ width: "100%", padding: "14px 18px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, fontSize: 14, color: C.white, fontFamily: "'DM Sans', sans-serif", resize: "none" }}
                  autoFocus
                />
                <button onClick={() => currentAnswer.trim() && handleAnswer(currentAnswer.trim())} disabled={!currentAnswer.trim()} style={{ width: "100%", marginTop: 10, padding: "14px", background: currentAnswer.trim() ? C.accent : C.border, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: currentAnswer.trim() ? "pointer" : "not-allowed" }}>
                  Continue →
                </button>
              </div>
            )}

            {/* Single choice */}
            {currentQ.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: "16px 18px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, fontSize: 14, color: C.white, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, animation: `slideIn 0.3s ease ${i * 0.06}s both` }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
                      <button key={i} onClick={() => setSelectedOptions(prev => selected ? prev.filter(o => o !== opt) : [...prev, opt])} style={{ padding: "13px 14px", background: selected ? C.accentDim : C.card, border: `1.5px solid ${selected ? C.accent : C.border}`, borderRadius: 12, fontSize: 13, color: selected ? C.accent : C.white, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${selected ? C.accent : C.border}`, background: selected ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {selected && <Icon n="check" size={10} color="#fff" />}
                        </div>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => selectedOptions.length && handleAnswer(selectedOptions)} disabled={!selectedOptions.length} style={{ width: "100%", padding: "14px", background: selectedOptions.length ? C.accent : C.border, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: selectedOptions.length ? "pointer" : "not-allowed" }}>
                  Continue with {selectedOptions.length} selected →
                </button>
              </div>
            )}

            {/* Back + Skip */}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {(phase > 0 || questionIndex > 0) && (
                <button onClick={goBack} style={{ padding: "10px 16px", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
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
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white }}>Your Website Workflow</h2>
      </div>

      {generatingWorkflow ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <Spinner size={36} />
          <p style={{ fontSize: 15, fontWeight: 600, color: C.white, marginTop: 16, marginBottom: 6 }}>AI is building your workflow...</p>
          <p style={{ fontSize: 13, color: C.textDim }}>Analyzing your answers and generating your website plan</p>
        </div>
      ) : workflow && !workflow.error ? (
        <div>
          {/* Summary Card */}
          <div style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 16, padding: "20px 22px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 8 }}>{workflow.projectName}</p>
            <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>{workflow.summary}</p>
          </div>

          {/* Grid info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {/* Pages */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 12 }}>📄 Pages ({workflow.pages?.length})</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {workflow.pages?.map((p, i) => (
                  <span key={i} style={{ fontSize: 11, background: C.surface, color: C.textDim, padding: "3px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>{p}</span>
                ))}
              </div>
            </div>
            {/* Features */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 12 }}>⚡ Features ({workflow.features?.length})</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {workflow.features?.map((f, i) => (
                  <span key={i} style={{ fontSize: 11, background: C.greenDim, color: C.green, padding: "3px 10px", borderRadius: 6, border: `1px solid ${C.green}30` }}>{f}</span>
                ))}
              </div>
            </div>
            {/* Colors */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 12 }}>🎨 Color Scheme</p>
              <div style={{ display: "flex", gap: 8 }}>
                {workflow.colorScheme && Object.entries(workflow.colorScheme).slice(0, 4).map(([k, v]) => (
                  <div key={k} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 32, background: v, borderRadius: 8, marginBottom: 4, border: `1px solid ${C.border}` }} />
                    <p style={{ fontSize: 9, color: C.textDim }}>{k}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Launch Plan */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 12 }}>🚀 Launch Plan</p>
              {workflow.launchPlan?.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.accentDim, border: `1px solid ${C.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.accent }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.4 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => { setStep("type"); setPhase(0); setQIndex(0); setAnswers({}); setWorkflow(null); }} style={{ flex: 1, padding: "13px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer" }}>
              ← Start Over
            </button>
            <button onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(JSON.stringify(workflow, null, 2));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }} style={{ padding: "13px 20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.textDim, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon n="copy" size={14} color={C.textDim} />
              {copied ? "Copied!" : "Export"}
            </button>
            <button onClick={() => onProjectSaved()} style={{ flex: 2, padding: "13px", background: C.accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon n="code" size={16} color="#fff" />
              Generate Website Code
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}40`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
          <p style={{ color: C.red, marginBottom: 12 }}>{workflow?.error}</p>
          <button onClick={() => generateWorkflow(answers)} style={{ padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>Try Again</button>
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
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 4 }}>My Projects</h2>
          <p style={{ fontSize: 14, color: C.textDim }}>{projects.length} project{projects.length !== 1 ? "s" : ""} total</p>
        </div>
        <button onClick={() => setPage("builder")} style={{ padding: "11px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon n="plus" size={16} color="#fff" /> New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 }}>No projects yet</p>
          <p style={{ fontSize: 13, color: C.textDim, marginBottom: 20 }}>Start your first AI interview to create a website</p>
          <button onClick={() => setPage("builder")} style={{ padding: "12px 24px", background: C.accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
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
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.white }}>Create AI Chatbot</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: "Bot Name *", key: "bot_name", placeholder: "e.g. Alex — Support Bot" },
          { label: "Business Name", key: "business_name", placeholder: "e.g. Gokul Tech Solutions" },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>{f.label}</label>
            <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
              style={{ width: "100%", padding: "13px 16px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, color: C.white, fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        ))}

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>System Prompt</label>
          <textarea value={form.system_prompt} onChange={e => setForm(p => ({ ...p, system_prompt: e.target.value }))} placeholder="Tell the bot how to behave e.g. You are a friendly support agent. Always be polite and helpful."
            rows={3} style={{ width: "100%", padding: "13px 16px", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, color: C.white, fontFamily: "'DM Sans', sans-serif", resize: "none" }} />
        </div>

        {/* FAQ Section */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 10, display: "block" }}>FAQ Knowledge Base</label>
          {faq.map((item, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px", marginBottom: 10 }}>
              <input value={item.question} onChange={e => setFaq(prev => prev.map((f, j) => j === i ? { ...f, question: e.target.value } : f))} placeholder={`Question ${i + 1}`}
                style={{ width: "100%", padding: "10px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, fontSize: 13, color: C.white, fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }} />
              <input value={item.answer} onChange={e => setFaq(prev => prev.map((f, j) => j === i ? { ...f, answer: e.target.value } : f))} placeholder="Answer"
                style={{ width: "100%", padding: "10px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, fontSize: 13, color: C.white, fontFamily: "'DM Sans', sans-serif" }} />
            </div>
          ))}
          <button onClick={() => setFaq(prev => [...prev, { question: "", answer: "" }])} style={{ fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon n="plus" size={14} color={C.accent} /> Add FAQ
          </button>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, display: "block" }}>Theme Color</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {["#6366f1","#22c55e","#f59e0b","#ef4444","#0ea5e9","#ec4899","#000000"].map(col => (
              <button key={col} onClick={() => setForm(p => ({ ...p, theme_color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: `3px solid ${form.theme_color === col ? C.white : "transparent"}`, cursor: "pointer" }} />
            ))}
          </div>
        </div>

        <button onClick={createBot} disabled={!form.bot_name || saving} style={{ padding: "14px", background: form.bot_name ? C.accent : C.border, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: form.bot_name ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
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
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, overflow: "hidden", marginBottom: 20 }}>
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
              <div style={{ maxWidth: "75%", padding: "10px 14px", background: msg.role === "user" ? previewBot.theme_color : C.surface, borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 13, color: "#fff", lineHeight: 1.5 }}>
                {msg.content}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: C.surface, borderRadius: "14px 14px 14px 4px", width: "fit-content" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.textDim, animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />)}
            </div>
          )}
        </div>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.white, fontFamily: "'DM Sans', sans-serif" }} />
          <button onClick={sendMessage} disabled={chatLoading || !chatInput.trim()} style={{ padding: "10px 16px", background: previewBot.theme_color, border: "none", borderRadius: 10, cursor: "pointer" }}>
            <Icon n="arrow" size={16} color="#fff" />
          </button>
        </div>
      </div>

      {/* Embed code */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.white }}>Embed Code</p>
          <button onClick={() => { navigator.clipboard?.writeText(getEmbedCode(previewBot)); setCopied(previewBot.id); setTimeout(() => setCopied(""), 2000); }} style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 8, padding: "5px 12px", fontSize: 11, color: C.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon n="copy" size={12} color={C.accent} />
            {copied === previewBot.id ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre style={{ fontSize: 11, color: C.textDim, background: C.surface, padding: "14px", borderRadius: 10, overflowX: "auto", lineHeight: 1.7, fontFamily: "monospace" }}>
          {getEmbedCode(previewBot)}
        </pre>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "32px 28px", maxWidth: 800, animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 4 }}>AI Chatbot Builder</h2>
          <p style={{ fontSize: 14, color: C.textDim }}>{chatbots.length} chatbot{chatbots.length !== 1 ? "s" : ""} created</p>
        </div>
        <button onClick={() => setView("create")} style={{ padding: "11px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon n="plus" size={16} color="#fff" /> New Chatbot
        </button>
      </div>

      {chatbots.length === 0 ? (
        <div style={{ background: C.card, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, background: C.greenDim, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Icon n="bot" size={24} color={C.green} />
          </div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>No chatbots yet</p>
          <p style={{ fontSize: 13, color: C.textDim, marginBottom: 18 }}>Create your first AI chatbot in minutes</p>
          <button onClick={() => setView("create")} style={{ padding: "12px 24px", background: C.accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Create First Chatbot
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chatbots.map((bot, i) => (
            <div key={bot.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bot.theme_color + "30", border: `1px solid ${bot.theme_color}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n="bot" size={20} color={bot.theme_color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 2 }}>{bot.bot_name}</p>
                <p style={{ fontSize: 12, color: C.textDim }}>{bot.business_name || "No business name"} · {bot.faq?.length || 0} FAQs</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setPreviewBot(bot); setView("preview"); }} style={{ padding: "7px 14px", background: C.accentDim, border: `1px solid ${C.accent}40`, borderRadius: 9, fontSize: 12, fontWeight: 600, color: C.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon n="eye" size={13} color={C.accent} /> Preview
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
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 24 }}>Analytics</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 24 }}>
      {[
        { label: "Total Projects",    value: projects.length,                                      color: C.accent },
        { label: "Completed Builds",  value: projects.filter(p => p.status === "generated").length, color: C.green },
        { label: "Active Chatbots",   value: chatbots.length,                                       color: C.amber },
        { label: "Total FAQ Entries", value: chatbots.reduce((s, b) => s + (b.faq?.length || 0), 0), color: C.textDim },
      ].map((s, i) => (
        <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</p>
          <p style={{ fontSize: 13, color: C.textDim }}>{s.label}</p>
        </div>
      ))}
    </div>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
      <Icon n="analytics" size={32} color={C.border} />
      <p style={{ fontSize: 14, color: C.textDim, marginTop: 12 }}>Detailed analytics coming soon</p>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SettingsPage = ({ user }) => (
  <div style={{ padding: "32px 28px", maxWidth: 600, animation: "fadeIn 0.4s ease" }}>
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 24 }}>Settings</h2>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px", marginBottom: 16 }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 16 }}>Account</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.accent, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {user?.photo ? <img src={user.photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0]}</span>}
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: C.white, marginBottom: 2 }}>{user?.name}</p>
          <p style={{ fontSize: 13, color: C.textDim }}>{user?.email}</p>
        </div>
      </div>
    </div>
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px" }}>
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 16 }}>AI Configuration</p>
      {[["AI Provider", "Groq"], ["Model", "llama-3.1-8b-instant"], ["Database", "Supabase (Gkfxl project)"], ["Plan", "Free"]].map(([k, v], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
          <span style={{ fontSize: 13, color: C.textDim }}>{k}</span>
          <span style={{ fontSize: 13, color: C.white, fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("intro");   // intro | login | dashboard
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
        setScreen("intro");
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
    setScreen("intro");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlobalStyles />
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 52, height: 52, background: C.accent, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", animation: "glow 2s ease infinite" }}>
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
      {screen === "intro"     && <IntroPage onGetStarted={() => setScreen("login")} />}
      {screen === "login"     && <LoginPage onBack={() => setScreen("intro")} />}
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
