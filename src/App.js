import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ───
const SERVICES = [
  {
    id: "akashic-earth",
    title: "Akashic Record Reading",
    subtitle: "Earth Records",
    tagline: "Access the soul-level blueprint of your current lifetime.",
    icon: "◇",
    description: "Receive clarity on purpose, patterns, relationships, and your next aligned step through the Earth Akashic Records — the energetic archive of your soul's journey in this lifetime.",
    whoFor: "This session is for you if you're seeking clarity on your life path, relationships, soul purpose, or recurring patterns. You don't need any prior experience with the Akashic Records — only a willingness to listen.",
    whatHappens: "We open with a brief grounding and intention-setting. I then access your Akashic Records through prayer and attunement, channeling information from your Masters, Teachers, and Loved Ones. You're welcome to ask questions throughout. Sessions close with integration guidance.",
    outcomes: ["Clarity on soul purpose and life direction", "Understanding of recurring patterns and karmic themes", "Insight into relationships and soul contracts", "Guidance for your next aligned step", "A deeper connection to your own inner knowing"],
    durations: ["60 minutes — focused reading with Q&A", "90 minutes — deep dive with extended channeling"],
    prepare: ["Hydrate well in the hours before", "Write down 1–3 questions or intentions", "Find a quiet, private space", "Come with an open heart — there is no wrong way to arrive"],
    aftercare: "Rest, journal, drink water. Insight often continues to unfold for 24–72 hours. Be gentle with yourself. Reach out if you need support.",
  },
  {
    id: "akashic-galactic",
    title: "Galactic Akashic Reading",
    subtitle: "Star Lineage",
    tagline: "For starseeds and multidimensional souls seeking galactic origins.",
    icon: "✧",
    description: "Access galactic origins, star lineage, soul missions, and off-planet connections encoded in your Akashic field. This reading bridges the cosmic and the earthly.",
    whoFor: "This session is for starseeds, wanderers, and multidimensional souls who feel a deep connection to the stars, experience a sense of not quite belonging here, or are ready to understand their galactic heritage and how it integrates with their Earth mission.",
    whatHappens: "After grounding and prayer, I access the Galactic layers of your Akashic Records — the multidimensional archive that extends beyond this planet and lifetime. Information may come through about star systems, galactic roles, off-planet soul contracts, and how your cosmic lineage informs your work here.",
    outcomes: ["Understanding of your galactic origins and star lineage", "Clarity on your multidimensional soul mission", "Integration of cosmic identity with earthly embodiment", "Activation of dormant gifts connected to your lineage", "A sense of belonging and cosmic context"],
    durations: ["90 minutes — recommended for first galactic reading", "120 minutes — extended session for deep exploration"],
    prepare: ["Same as Earth reading, plus: allow extra time after for integration", "Be open to information that may not have an immediate logical framework", "Trust what resonates in your body, not just your mind"],
    aftercare: "Galactic readings can be deeply activating. You may experience vivid dreams, energy surges, or emotional release for several days. Extra rest and grounding are essential. Walk barefoot. Touch the earth.",
  },
  {
    id: "energy-healing",
    title: "Energy Healing",
    subtitle: "Reiki · Polarity · Crystalline Light",
    tagline: "Restore flow, release density, and realign your energetic field.",
    icon: "△",
    description: "A layered healing session combining Reiki Master energy, Polarity Therapy, and Crystalline Light Healing — a channeled modality received through meditation with higher beings of light.",
    whoFor: "This session is for you if you're feeling energetically depleted, stuck, overwhelmed, or disconnected from your body. It's also for those in active transformation who need support integrating shifts and downloads.",
    whatHappens: "Sessions begin with an energetic assessment and intention-setting. I then work with a blend of Reiki, Polarity Therapy (balancing the body's energetic poles through touch and awareness), and Crystalline Light Healing — a high-frequency modality channeled through higher beings of light. You remain clothed and may be seated or lying down.",
    outcomes: ["Deep relaxation and nervous system regulation", "Release of energetic blockages and stored density", "Realignment of the chakras and subtle bodies", "Support during spiritual awakening or integration", "A renewed sense of embodied presence"],
    durations: ["60 minutes — standard healing session", "90 minutes — extended session with deeper layering"],
    prepare: ["Wear comfortable clothing", "Avoid heavy meals or caffeine immediately before", "Set an intention (even a simple one like 'I'm open to receive')"],
    aftercare: "Drink plenty of water. Rest as much as possible. You may experience tingling, warmth, emotional release, or deep fatigue — all normal. Allow 24–48 hours for integration.",
  },
  {
    id: "intuitive-support",
    title: "Intuitive Support",
    subtitle: "Psychic · Mediumship",
    tagline: "Bridge the seen and unseen through psychic insight and spirit communication.",
    icon: "◎",
    description: "Receive messages, confirmation, and guidance from your higher self, spirit guides, and loved ones who have crossed over. This session blends psychic sight with mediumship channeling.",
    whoFor: "This session is for you if you're seeking confirmation, guidance, or connection with the unseen — whether that's your own higher self, spirit guides, or loved ones in spirit. It's also for those navigating grief, transition, or a desire for spiritual confirmation.",
    whatHappens: "After grounding, I open to the psychic and mediumship channels. Information may come through as images, words, feelings, or knowing. You're welcome to ask questions or simply receive. I'll share what comes through with honesty and care, without editorializing or leading.",
    outcomes: ["Messages from spirit guides and higher self", "Connection with loved ones who have crossed", "Confirmation and validation of your inner knowing", "Psychic insight into current life situations", "A sense of comfort, clarity, and not being alone"],
    durations: ["60 minutes — standard session", "90 minutes — extended for deeper connection"],
    prepare: ["If seeking mediumship, hold the intention to connect with a specific loved one (but remain open)", "Write down any questions", "Know that spirit communicates in its own way — trust the process"],
    aftercare: "These sessions can be emotionally tender. Give yourself space to feel whatever arises. Journal any messages or images that came through — they often deepen in meaning over time.",
  },
];

const CONSENT_SECTIONS = [
  { title: "Sovereignty Above All", text: "Your free will is sacred and inviolable. Nothing in this work overrides your inner authority. You are the final decision-maker in your life, and no reading, healing, or guidance replaces your own knowing." },
  { title: "Highest Good & Appropriate Timing", text: "All work is conducted with the intention of serving your highest good and in accordance with divine timing. What comes through is what is most aligned for you to receive at this moment — no more, no less." },
  { title: "Not Predictive or Directive", text: "This work does not predict the future or tell you what to do. It illuminates possibilities, patterns, and soul-level insight so that you can make empowered choices from a place of clarity." },
  { title: "Healing is Collaborative", text: "I am a facilitator and channel, not a fixer. True healing is a co-creative process between you, your higher self, and the field of grace. Your participation, intention, and willingness are essential." },
  { title: "Embodiment & Integration", text: "Spiritual insight without integration is incomplete. This work honors the body as a sacred vessel and supports you in grounding what you receive into your physical, emotional, and daily life." },
  { title: "Boundaries & Scope of Practice", text: "This work is spiritual and energetic in nature. It is not a substitute for medical, psychological, psychiatric, or legal counsel. Please consult licensed professionals for those needs." },
  { title: "Mutual Respect of Sacred Space", text: "This is a space of mutual respect, honesty, and care. I honor your boundaries and ask that you honor mine. You are always free to pause, redirect, or stop." },
  { title: "Readiness is Felt, Not Forced", text: "There is no pressure to book, to go deeper, or to continue. Your readiness is your own, and it is honored at every pace." },
];

const FAQS = [
  { q: "What are the Akashic Records?", a: "The Akashic Records are an energetic archive of your soul's journey — past, present, and potential futures. Think of it as your soul's library. Earth Records focus on this lifetime; Galactic Records access multidimensional and star lineage information." },
  { q: "Do I need to be spiritual to book?", a: "Not at all. You don't need any specific beliefs, vocabulary, or background. All you need is curiosity and openness. This work meets you exactly where you are." },
  { q: "Can you predict the future?", a: "No. This work illuminates patterns, possibilities, and soul-level guidance so you can make empowered choices. Your free will always leads." },
  { q: "How do I prepare for a session?", a: "Hydrate, set a quiet space, and optionally write down 1–3 questions or intentions. Come with an open heart. There is no wrong way to arrive." },
  { q: "What if I get emotional?", a: "That's welcome and completely normal. Emotions are energy in motion, and this work can move things that have been stored for a long time. You are held in a safe, non-judgmental space." },
  { q: "How will I feel after?", a: "Everyone is different. You may feel lighter, more clear, deeply relaxed, or emotionally tender. Some people experience vivid dreams or continued insights for 24–72 hours. Rest and be gentle with yourself." },
  { q: "Do you work with a specific religion?", a: "No. This work is non-denominational and honors all spiritual paths. It draws from universal principles of energy, consciousness, and sovereignty." },
  { q: "Is my session confidential?", a: "Absolutely. Everything shared in session is held in the strictest confidence. Your privacy and trust are sacred." },
  { q: "What about cancellations?", a: "24-hour notice is requested for cancellations or rescheduling. Life happens — reach out and we'll find a solution with care." },
];

const CREDENTIALS = [
  { label: "Akashic Record Reader", detail: "Earth & Galactic", icon: "◇" },
  { label: "Reiki Master", detail: "Usui Lineage", icon: "✧" },
  { label: "Polarity Therapist", detail: "Energetic Balancing", icon: "◈" },
  { label: "Crystalline Light Healer", detail: "Channeled Modality", icon: "△" },
  { label: "Psychic & Medium", detail: "Intuitive Sight", icon: "◎" },
  { label: "Priestess of Light", detail: "Sacred Service Path", icon: "☽" },
  { label: "Massage Therapist", detail: "Embodiment & Nervous System", icon: "⟡" },
];

// ─── Styles ───
const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Questrial&display=swap');
`;

const globalCSS = `
${fonts}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Questrial', sans-serif; color: #2a2033; background: #060818; overflow-x: hidden; }
:root {
  --deep: #060818;
  --plum: #0e0f2a;
  --amethyst: #1a1d52;
  --violet: #2f3580;
  --lavender: #a0b4e8;
  --rose: #c488d0;
  --gold: #c9a84c;
  --gold-light: #e8d5a0;
  --cream: #f0eef8;
  --warm-white: #f5f3fa;
  --text: #1e1b3a;
  --text-light: #7a7ea8;
  --cosmic-blue: #1a3a8a;
  --star-white: #e8efff;
  --nebula: #5c3d99;
  --earth-glow: #3a7ac0;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Questrial', sans-serif;
}
::selection { background: rgba(160,180,232,0.3); color: #1a1d52; }
`;

// ─── Component Helpers ───
const Triangle = ({ size = 24, color = "var(--gold)", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 2L22 20H2L12 2Z" stroke={color} strokeWidth="1" fill="none" />
  </svg>
);

const Merkaba = ({ size = 60, color = "var(--gold)", glow = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={glow ? { filter:"drop-shadow(0 0 12px rgba(160,180,232,0.5))" } : {}}>
    {/* Outer triangle */}
    <path d="M50 5L95 80H5L50 5Z" stroke={glow ? "#a0b4e8" : color} strokeWidth="0.7" opacity="0.4" />
    {/* Middle triangle */}
    <path d="M50 15L82 72H18L50 15Z" stroke={glow ? "#8aa0e0" : color} strokeWidth="0.8" opacity="0.6" />
    {/* Inner triangle */}
    <path d="M50 25L70 65H30L50 25Z" stroke={glow ? "#c0d0ff" : color} strokeWidth="0.9" opacity="0.8" />
    {/* Merkaba star — upward */}
    <path d="M50 30L65 58H35L50 30Z" stroke={glow ? "#e0e8ff" : color} strokeWidth="0.8" opacity="0.9" />
    {/* Merkaba star — downward */}
    <path d="M50 62L35 38H65L50 62Z" stroke={glow ? "#e0e8ff" : color} strokeWidth="0.8" opacity="0.9" />
    {/* Center glow */}
    <circle cx="50" cy="48" r="6" fill={glow ? "url(#merkGlow)" : color} opacity={glow ? "0.7" : "0.3"} />
    {glow && <defs><radialGradient id="merkGlow"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#a0b4e8" stopOpacity="0" /></radialGradient></defs>}
  </svg>
);

const DiamondDivider = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, padding:"40px 0" }}>
    <div style={{ width:60, height:1, background:"linear-gradient(to right, transparent, var(--gold))" }} />
    <Triangle size={12} color="var(--gold)" />
    <div style={{ width:60, height:1, background:"linear-gradient(to left, transparent, var(--gold))" }} />
  </div>
);

const RitualText = ({ children }) => (
  <div style={{ textAlign:"center", padding:"48px 24px", maxWidth:600, margin:"0 auto" }}>
    <p style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", fontStyle:"italic", color:"var(--lavender)", lineHeight:1.8, letterSpacing:"0.02em" }}>
      "{children}"
    </p>
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
    <div style={{ width:32, height:1, background:"var(--gold)" }} />
    <span style={{ fontFamily:"var(--font-body)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)" }}>{children}</span>
  </div>
);

const Btn = ({ children, variant = "primary", onClick, style: s = {} }) => {
  const base = {
    fontFamily:"var(--font-body)", fontSize:"0.8rem", letterSpacing:"0.15em", textTransform:"uppercase",
    border:"none", cursor:"pointer", transition:"all 0.4s ease", display:"inline-block", textAlign:"center",
  };
  const styles = variant === "primary" ? {
    ...base, background:"var(--gold)", color:"var(--deep)", padding:"16px 40px",
    ...s,
  } : {
    ...base, background:"transparent", color:"var(--gold)", padding:"14px 38px",
    border:"1px solid var(--gold)", ...s,
  };
  return <button style={styles} onClick={onClick} onMouseEnter={e => { e.target.style.opacity="0.8"; e.target.style.transform="translateY(-1px)"; }} onMouseLeave={e => { e.target.style.opacity="1"; e.target.style.transform="translateY(0)"; }}>{children}</button>;
};

// ─── Pages ───

function HomePage({ navigate }) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div ref={containerRef} style={{ height:"100vh", overflowY:"auto", overflowX:"hidden", background:"var(--deep)" }}>
      {/* Hero Gate */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", textAlign:"center", padding:"40px 24px", background:"radial-gradient(ellipse at 50% 40%, rgba(26,58,138,0.4) 0%, rgba(14,15,42,0.8) 40%, var(--deep) 70%)", overflow:"hidden" }}>
        {/* Star field background */}
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0.6, background:"radial-gradient(1px 1px at 20% 30%, #fff 0.5px, transparent 1px), radial-gradient(1px 1px at 80% 15%, #c0d0ff 0.5px, transparent 1px), radial-gradient(1.5px 1.5px at 60% 70%, #a0b4e8 0.7px, transparent 1px), radial-gradient(1px 1px at 10% 80%, #fff 0.5px, transparent 1px), radial-gradient(1px 1px at 40% 50%, #8aa0e0 0.5px, transparent 1px), radial-gradient(1.2px 1.2px at 90% 60%, #c0d0ff 0.6px, transparent 1px), radial-gradient(0.8px 0.8px at 50% 20%, #fff 0.4px, transparent 1px), radial-gradient(1px 1px at 70% 40%, #e0e8ff 0.5px, transparent 1px)", backgroundSize:"250px 250px, 300px 300px, 280px 280px, 260px 260px, 340px 340px, 220px 220px, 310px 310px, 270px 270px" }} />
        {/* Nebula glow */}
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(92,61,153,0.2) 0%, rgba(26,58,138,0.15) 40%, transparent 70%)", opacity:heroOpacity, pointerEvents:"none" }} />
        {/* Earth curve at bottom */}
        <div style={{ position:"absolute", bottom:-60, left:"-10%", width:"120%", height:200, borderRadius:"50%", background:"radial-gradient(ellipse at 50% 100%, rgba(58,122,192,0.25) 0%, rgba(26,58,138,0.1) 40%, transparent 70%)", pointerEvents:"none" }} />
        {/* Large background Merkaba */}
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity: heroOpacity * 0.2, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Merkaba size={500} color="var(--lavender)" glow />
        </div>
        <div style={{ position:"relative", zIndex:2, opacity: heroOpacity, transform:`translateY(${scrollY * 0.1}px)` }}>
          <div style={{ marginBottom:32 }}>
            <Merkaba size={90} color="var(--gold)" glow />
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.5rem, 6vw, 4.5rem)", fontWeight:300, color:"var(--cream)", letterSpacing:"0.04em", lineHeight:1.15, marginBottom:20, textShadow:"0 0 40px rgba(160,180,232,0.2)" }}>
            The Threshold<br />Is Open
          </h1>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1rem, 2vw, 1.25rem)", color:"var(--lavender)", maxWidth:540, margin:"0 auto 48px", lineHeight:1.7, fontWeight:300 }}>
            Sacred healing. Akashic wisdom. Multidimensional remembrance.<br />
            A grounded path home to your highest self.
          </p>
          <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
            <Btn onClick={() => navigate("book")}>Cross the Threshold</Btn>
            <Btn variant="secondary" onClick={() => navigate("services")}>Learn More</Btn>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:40, animation:"float 3s ease-in-out infinite" }}>
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none"><path d="M10 4V28M10 28L4 22M10 28L16 22" stroke="var(--lavender)" strokeWidth="1" opacity="0.5"/></svg>
        </div>
        <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
      </section>

      {/* Outer Triangle — The Call */}
      <section style={{ padding:"120px 24px", background:"linear-gradient(180deg, var(--deep) 0%, var(--plum) 100%)", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0.3, background:"radial-gradient(1px 1px at 30% 20%, #c0d0ff 0.5px, transparent 1px), radial-gradient(1px 1px at 70% 60%, #a0b4e8 0.5px, transparent 1px)", backgroundSize:"300px 300px, 250px 250px" }} />
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <SectionLabel>The Outer Triangle</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, color:"var(--cream)", marginBottom:16, lineHeight:1.2 }}>
            You Are Being Called
          </h2>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem", color:"var(--rose)", marginBottom:32, fontStyle:"italic", lineHeight:1.6 }}>
            Something within you is stirring. A whisper from your soul. A pull toward something you can't quite name.
          </p>
          <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:16, fontSize:"0.95rem" }}>
            You don't need to have it figured out. You don't need to speak the language of energy work or know your starseed lineage. You just need to feel the pull.
          </p>
          <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:40, fontSize:"0.95rem" }}>
            That feeling — the restlessness, the longing, the sense that there is more — is the call. And it brought you here. Whether you're seeking clarity, healing, release, or deeper alignment, this is a safe and sacred space to begin.
          </p>
          <Btn onClick={() => navigate("book")}>Answer the Call</Btn>
        </div>
      </section>

      <RitualText>The door does not open by force. It opens when you say yes.</RitualText>

      {/* Middle Triangle — The Remembering */}
      <section style={{ padding:"100px 24px", background:"var(--plum)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <SectionLabel>The Middle Triangle</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, color:"var(--cream)", marginBottom:16 }}>
            The Remembering Begins
          </h2>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", color:"var(--rose)", marginBottom:48, fontStyle:"italic" }}>
            Your soul has a record. Your body holds a map. Let's read both.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:24 }}>
            {SERVICES.map(s => (
              <div key={s.id} onClick={() => navigate("service-detail", s.id)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(155,142,194,0.15)", padding:"36px 28px", cursor:"pointer", transition:"all 0.4s ease", position:"relative", overflow:"hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(201,168,76,0.4)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(155,142,194,0.15)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <span style={{ fontFamily:"var(--font-display)", fontSize:"2rem", color:"var(--gold)", display:"block", marginBottom:16 }}>{s.icon}</span>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.35rem", color:"var(--cream)", marginBottom:4, fontWeight:500 }}>{s.title}</h3>
                <p style={{ fontSize:"0.75rem", color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>{s.subtitle}</p>
                <p style={{ color:"var(--text-light)", fontSize:"0.9rem", lineHeight:1.7, marginBottom:24 }}>{s.tagline}</p>
                <span style={{ fontSize:"0.75rem", color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Learn More →</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <Btn variant="secondary" onClick={() => navigate("services")}>Open the Records</Btn>
          </div>
        </div>
      </section>

      <RitualText>Remembering is not learning something new. It is returning to what was always yours.</RitualText>

      {/* Inner Triangle — The Initiation */}
      <section style={{ padding:"120px 24px", background:"linear-gradient(180deg, var(--plum), var(--deep))", textAlign:"center" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <SectionLabel>The Inner Triangle</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, color:"var(--cream)", marginBottom:16 }}>
            The Path of Initiation
          </h2>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", color:"var(--rose)", marginBottom:32, fontStyle:"italic" }}>
            For those who have heard the call and are ready to walk the deeper path.
          </p>
          <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:40, fontSize:"0.95rem" }}>
            Private work, mentorship, and inner circle containers are available for starseeds, lightworkers, and those on the priestess path who are ready for sustained transformation, service activation, and deep embodiment. This is sacred, selective, and by mutual alignment.
          </p>
          <Btn onClick={() => navigate("private")}>Enter the Initiation</Btn>
        </div>
      </section>

      <RitualText>Initiation is not given. It is claimed. Are you ready to claim yours?</RitualText>

      {/* Merkaba Center — Embodiment */}
      <section style={{ padding:"120px 24px", background:"var(--deep)", textAlign:"center" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <Merkaba size={60} color="var(--gold)" />
          <SectionLabel>The Merkaba Center</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, color:"var(--cream)", marginBottom:16, marginTop:16 }}>
            The Living Temple
          </h2>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", color:"var(--rose)", marginBottom:32, fontStyle:"italic" }}>
            This work is not about leaving the body. It is about arriving fully in it.
          </p>
          <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:40, fontSize:"0.95rem" }}>
            With a background in massage therapy and nervous system support, every offering here is rooted in embodiment. The mystical meets the material. Spirit meets the spine. You are the temple — and this work honors every dimension of you.
          </p>
          <Btn variant="secondary" onClick={() => navigate("about")}>Stand in Embodiment</Btn>
        </div>
      </section>

      {/* Choice Point */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(180deg, var(--deep), var(--plum))", textAlign:"center" }}>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", color:"var(--cream)", marginBottom:40, fontWeight:400 }}>
          Where Are You Being Drawn?
        </h3>
        <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={() => navigate("book")}>Book a Session</Btn>
          <Btn variant="secondary" onClick={() => navigate("private")}>Private & Inner Circle</Btn>
        </div>
      </section>

      {/* Footer */}
      <Footer2 navigate={navigate} />
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="The Priestess Behind the Threshold" subtitle="Healer. Channel. Guide. A multidimensional practitioner rooted in the body and the beyond." />
      <section style={{ maxWidth:800, margin:"0 auto", padding:"80px 24px" }}>
        <SectionLabel>Origin</SectionLabel>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"1.3rem", lineHeight:1.8, color:"var(--amethyst)", marginBottom:24, fontWeight:400 }}>
          I didn't arrive at this work through a single moment of awakening.
        </p>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:20, fontSize:"0.95rem" }}>
          It was a series of thresholds — each one asking me to trust what I couldn't yet see, to honor what I felt in my body before I had language for it. From massage therapy school to Reiki attunements, from opening the Akashic Records to receiving Crystalline Light Healing through meditation with higher beings — each step deepened my understanding that healing is not one-dimensional.
        </p>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:20, fontSize:"0.95rem" }}>
          The body is not separate from the spirit. The cosmos is not separate from the kitchen table. And you — in your full, complex, luminous humanity — deserve support that honors all of it.
        </p>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>
          I work as a bridge: between the seen and unseen, the galactic and the grounded, the mystical and the practical. My role is not to heal you — you are the healer. My role is to hold the space, open the channel, and reflect back the light that is already yours.
        </p>

        <DiamondDivider />

        <SectionLabel>Credentials & Modalities</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginTop:24, marginBottom:64 }}>
          {CREDENTIALS.map((c, i) => (
            <div key={i} style={{ padding:"24px 20px", border:"1px solid rgba(45,27,78,0.12)", background:"rgba(45,27,78,0.02)", textAlign:"center" }}>
              <span style={{ fontSize:"1.5rem", color:"var(--gold)", display:"block", marginBottom:8 }}>{c.icon}</span>
              <h4 style={{ fontFamily:"var(--font-display)", fontSize:"1.05rem", color:"var(--amethyst)", marginBottom:4 }}>{c.label}</h4>
              <p style={{ fontSize:"0.75rem", color:"var(--text-light)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{c.detail}</p>
            </div>
          ))}
        </div>

        <DiamondDivider />

        <SectionLabel>How I Work</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>
          Every session is rooted in sovereignty, sacred consent, and embodiment. I don't diagnose, prescribe, or predict. I listen — to you, to your energy field, to the records, to spirit — and I channel what wants to come through in service of your highest good. You are always in the driver's seat. My work is to honor where you are and illuminate the path ahead.
        </p>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <Btn onClick={() => navigate("book")}>Book a Session</Btn>
          <Btn variant="secondary" onClick={() => navigate("consent")}>Code of Sacred Consent</Btn>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ navigate }) {
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="Sacred Offerings" subtitle="Each offering is a doorway. Choose the one that calls to you — or let your intuition guide you." />
      <section style={{ maxWidth:960, margin:"0 auto", padding:"80px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:32 }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ border:"1px solid rgba(45,27,78,0.1)", padding:"40px 32px", transition:"all 0.4s ease", cursor:"pointer", background:"white" }}
              onClick={() => navigate("service-detail", s.id)}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="0 12px 48px rgba(45,27,78,0.08)"; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"2.5rem", color:"var(--gold)", display:"block", marginBottom:16 }}>{s.icon}</span>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", color:"var(--amethyst)", marginBottom:4 }}>{s.title}</h3>
              <p style={{ fontSize:"0.7rem", color:"var(--gold)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:20 }}>{s.subtitle}</p>
              <p style={{ color:"var(--text)", lineHeight:1.8, fontSize:"0.9rem", marginBottom:28 }}>{s.description}</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <Btn style={{ padding:"12px 24px", fontSize:"0.7rem" }} onClick={(e) => { e.stopPropagation(); navigate("service-detail", s.id); }}>Learn More</Btn>
                <Btn variant="secondary" style={{ padding:"10px 22px", fontSize:"0.7rem" }} onClick={(e) => { e.stopPropagation(); navigate("book"); }}>Book Now</Btn>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:64, padding:"40px", background:"rgba(45,27,78,0.03)", border:"1px solid rgba(45,27,78,0.08)" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem", color:"var(--amethyst)", marginBottom:16 }}>Not sure which offering is right for you?</p>
          <p style={{ color:"var(--text-light)", marginBottom:24, fontSize:"0.9rem" }}>That's completely okay. Reach out and we'll find the right doorway together.</p>
          <Btn variant="secondary" onClick={() => navigate("contact")}>Get in Touch</Btn>
        </div>
      </section>
    </div>
  );
}

function ServiceDetailPage({ navigate, serviceId }) {
  const s = SERVICES.find(sv => sv.id === serviceId) || SERVICES[0];
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title={s.title} subtitle={s.tagline} small />
      <section style={{ maxWidth:740, margin:"0 auto", padding:"60px 24px 100px" }}>
        <SectionLabel>Who This Is For</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>{s.whoFor}</p>

        <SectionLabel>What Happens in a Session</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>{s.whatHappens}</p>

        <SectionLabel>What You May Receive</SectionLabel>
        <div style={{ marginBottom:48 }}>
          {s.outcomes.map((o, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
              <Triangle size={12} color="var(--gold)" style={{ marginTop:4, flexShrink:0 }} />
              <p style={{ color:"var(--text)", fontSize:"0.9rem", lineHeight:1.7 }}>{o}</p>
            </div>
          ))}
        </div>

        <SectionLabel>Session Options</SectionLabel>
        <div style={{ marginBottom:48 }}>
          {s.durations.map((d, i) => (
            <div key={i} style={{ padding:"16px 20px", background:"rgba(45,27,78,0.03)", border:"1px solid rgba(45,27,78,0.08)", marginBottom:8 }}>
              <p style={{ color:"var(--amethyst)", fontSize:"0.9rem" }}>{d}</p>
            </div>
          ))}
        </div>

        <SectionLabel>How to Prepare</SectionLabel>
        <div style={{ marginBottom:48 }}>
          {s.prepare.map((p, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--gold)", width:24, flexShrink:0, textAlign:"center" }}>{i + 1}</span>
              <p style={{ color:"var(--text)", fontSize:"0.9rem", lineHeight:1.7 }}>{p}</p>
            </div>
          ))}
        </div>

        <SectionLabel>Integration & Aftercare</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>{s.aftercare}</p>

        <div style={{ padding:"24px", background:"rgba(184,114,139,0.08)", borderLeft:"3px solid var(--rose)", marginBottom:48 }}>
          <p style={{ color:"var(--text)", fontSize:"0.85rem", lineHeight:1.7, fontStyle:"italic" }}>
            This work is spiritual and energetic support. It is not a substitute for medical, psychological, or legal advice. Please consult appropriate professionals for those needs.
          </p>
        </div>

        <Btn onClick={() => navigate("book")}>Book This Session</Btn>
      </section>
    </div>
  );
}

function BookPage({ navigate }) {
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="Your Session Begins Here" subtitle="A clear, grounded space to choose your offering and step forward." />
      <section style={{ maxWidth:800, margin:"0 auto", padding:"60px 24px 100px" }}>

        <SectionLabel>Choose Your Offering</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginBottom:64 }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ padding:"28px 20px", border:"1px solid rgba(45,27,78,0.1)", textAlign:"center", cursor:"pointer", transition:"all 0.3s ease", background:"white" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(45,27,78,0.1)"; }}>
              <span style={{ fontSize:"1.5rem", display:"block", marginBottom:8 }}>{s.icon}</span>
              <h4 style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--amethyst)", marginBottom:4 }}>{s.title}</h4>
              <p style={{ fontSize:"0.7rem", color:"var(--text-light)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{s.subtitle}</p>
            </div>
          ))}
        </div>

        <SectionLabel>What to Expect</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>
          Sessions are held virtually (or in-person when available). You'll receive a confirmation email with preparation guidance. Sessions begin with a brief grounding and intention-setting, and close with integration support. The space is gentle, held, and entirely yours.
        </p>

        <SectionLabel>How to Prepare</SectionLabel>
        <div style={{ marginBottom:48 }}>
          {["Hydrate well in the hours before your session.", "Set a quiet, private space where you won't be interrupted.", "Write down 1–3 questions or intentions (optional but helpful).", "Come as you are. There is no wrong way to arrive."].map((p, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--gold)", width:24, flexShrink:0, textAlign:"center" }}>{i + 1}</span>
              <p style={{ color:"var(--text)", fontSize:"0.9rem", lineHeight:1.7 }}>{p}</p>
            </div>
          ))}
        </div>

        <SectionLabel>Integration & Aftercare</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>
          After your session, give yourself space. Rest, journal, drink water. Energy and insight often continue to unfold for 24–72 hours. Be gentle with yourself. Reach out if you need support.
        </p>

        <SectionLabel>Who This Is For</SectionLabel>
        <p style={{ lineHeight:1.9, color:"var(--text)", marginBottom:48, fontSize:"0.95rem" }}>
          This work is for anyone seeking spiritual guidance, energetic healing, and deeper self-connection. It is not a substitute for medical care, therapy, or crisis intervention. If you are in active crisis, please contact a licensed professional or emergency services.
        </p>

        {/* Booking widget placeholder */}
        <div style={{ padding:"48px 32px", background:"linear-gradient(135deg, var(--amethyst), var(--violet))", textAlign:"center", marginBottom:32 }}>
          <Merkaba size={40} color="var(--gold-light)" />
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", color:"var(--cream)", marginTop:16, marginBottom:8 }}>Schedule Your Session</h3>
          <p style={{ color:"var(--lavender)", fontSize:"0.9rem", marginBottom:24 }}>Select your offering and choose a time that feels right.</p>
          <Btn>Schedule Your Session</Btn>
        </div>
        <p style={{ textAlign:"center", color:"var(--text-light)", fontSize:"0.85rem" }}>
          Not sure what to book? <span style={{ color:"var(--amethyst)", cursor:"pointer", borderBottom:"1px solid var(--amethyst)" }} onClick={() => navigate("contact")}>Reach out</span> — I'm happy to help you find the right offering.
        </p>
      </section>
    </div>
  );
}

function PrivatePage({ navigate }) {
  const [form, setForm] = useState({ name:"", email:"", message:"", how:"" });
  const [sent, setSent] = useState(false);
  const inputStyle = { width:"100%", padding:"14px 16px", border:"1px solid rgba(155,142,194,0.3)", background:"rgba(255,255,255,0.05)", color:"var(--cream)", fontFamily:"var(--font-body)", fontSize:"0.9rem", outline:"none", marginBottom:16 };

  return (
    <div style={{ background:"var(--deep)", color:"var(--cream)", minHeight:"100vh" }}>
      <section style={{ padding:"120px 24px 60px", textAlign:"center", background:"radial-gradient(ellipse at top, rgba(45,27,78,0.6), var(--deep))" }}>
        <Merkaba size={50} color="var(--gold)" />
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 5vw, 3.5rem)", fontWeight:300, color:"var(--cream)", marginTop:24, marginBottom:12 }}>The Inner Threshold</h1>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", color:"var(--lavender)", fontStyle:"italic" }}>For those who are ready to walk the deeper path.</p>
      </section>
      <section style={{ maxWidth:700, margin:"0 auto", padding:"60px 24px 100px" }}>
        <SectionLabel>Who This Is For</SectionLabel>
        <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:48, fontSize:"0.95rem" }}>
          This space is for starseeds, lightworkers, emerging healers, and those on the priestess path who feel called to sustained, deep transformation. You may be activating your gifts of service, navigating a spiritual awakening, or seeking a guide who understands the multidimensional nature of your journey.
        </p>

        <SectionLabel>Containers</SectionLabel>
        <div style={{ marginBottom:48 }}>
          {[
            { title:"1:1 Mentorship", desc:"Ongoing sacred mentorship for integration, activation, and embodied spiritual development. Regular sessions, energetic support, and a dedicated container of care." },
            { title:"Intensives", desc:"Deep-dive sessions (half-day or full-day) for accelerated clearing, activation, or initiatory work. Designed for pivotal thresholds." },
            { title:"Inner Circle", desc:"A small, held group container for lightworkers in service. Details shared upon entry. By invitation and mutual alignment." },
          ].map((c, i) => (
            <div key={i} style={{ padding:"28px 24px", border:"1px solid rgba(155,142,194,0.15)", marginBottom:12, background:"rgba(255,255,255,0.02)" }}>
              <h4 style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem", color:"var(--gold)", marginBottom:8 }}>{c.title}</h4>
              <p style={{ color:"var(--lavender)", fontSize:"0.9rem", lineHeight:1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <SectionLabel>A Note on Readiness</SectionLabel>
        <p style={{ color:"var(--lavender)", lineHeight:1.9, marginBottom:48, fontSize:"0.95rem" }}>
          Entry into private work is not based on credentials or spiritual "levels." It is based on resonance, readiness, and a mutual recognition that the work is meant to unfold. If you feel the pull, trust it. We'll discern together.
        </p>

        <DiamondDivider />

        {!sent ? (
          <div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", color:"var(--cream)", marginBottom:8, textAlign:"center" }}>Request Entry</h3>
            <p style={{ color:"var(--text-light)", textAlign:"center", marginBottom:32, fontSize:"0.85rem" }}>Share what's calling you. There is no wrong way to begin.</p>
            <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
            <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
            <textarea style={{...inputStyle, minHeight:120, resize:"vertical"}} placeholder="What is calling you to this work?" value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
            <input style={inputStyle} placeholder="How did you find me?" value={form.how} onChange={e => setForm({...form, how:e.target.value})} />
            <div style={{ textAlign:"center", marginTop:8 }}>
              <Btn onClick={() => setSent(true)}>Request Entry</Btn>
            </div>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"48px 24px" }}>
            <Triangle size={24} color="var(--gold)" />
            <p style={{ fontFamily:"var(--font-display)", fontSize:"1.3rem", color:"var(--cream)", marginTop:16 }}>Received with care.</p>
            <p style={{ color:"var(--lavender)", fontSize:"0.9rem", marginTop:8 }}>I'll be in touch when the timing aligns.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ConsentPage() {
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="Code of Sacred Consent" subtitle="The foundation of every session, every offering, and every exchange in this space." />
      <section style={{ maxWidth:700, margin:"0 auto", padding:"60px 24px 100px" }}>
        {CONSENT_SECTIONS.map((s, i) => (
          <div key={i} style={{ marginBottom:40 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"1.4rem", color:"var(--gold)", fontWeight:500 }}>{i + 1}</span>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.25rem", color:"var(--amethyst)" }}>{s.title}</h3>
            </div>
            <p style={{ color:"var(--text)", lineHeight:1.9, fontSize:"0.95rem", paddingLeft:36 }}>{s.text}</p>
          </div>
        ))}
        <div style={{ marginTop:64, padding:"32px", background:"rgba(45,27,78,0.04)", borderTop:"2px solid var(--gold)", textAlign:"center" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--amethyst)", lineHeight:1.7, fontStyle:"italic" }}>
            By entering this space, you acknowledge your sovereignty, your responsibility, and your readiness to meet yourself with honesty and care.
          </p>
        </div>
      </section>
    </div>
  );
}

function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="Questions Before You Enter" subtitle="Everything you might be wondering — answered with honesty and care." />
      <section style={{ maxWidth:700, margin:"0 auto", padding:"60px 24px 100px" }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom:"1px solid rgba(45,27,78,0.1)", marginBottom:0 }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ padding:"24px 0", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", color:"var(--amethyst)", fontWeight:500, flex:1, paddingRight:16 }}>{f.q}</h3>
              <span style={{ color:"var(--gold)", fontSize:"1.2rem", transition:"transform 0.3s ease", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </div>
            <div style={{ maxHeight: open === i ? 300 : 0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
              <p style={{ color:"var(--text)", lineHeight:1.9, fontSize:"0.9rem", paddingBottom:24 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function ContactPage({ navigate }) {
  const [sent, setSent] = useState(false);
  const inputStyle = { width:"100%", padding:"14px 16px", border:"1px solid rgba(45,27,78,0.15)", background:"white", fontFamily:"var(--font-body)", fontSize:"0.9rem", outline:"none", marginBottom:16, color:"var(--text)" };

  return (
    <div style={{ background:"var(--warm-white)", minHeight:"100vh" }}>
      <PageHero title="Reach Out" subtitle="Whether you have a question, a feeling, or a 'I'm not sure where to start' — this is your space to connect." />
      <section style={{ maxWidth:600, margin:"0 auto", padding:"60px 24px 100px" }}>
        {!sent ? (
          <div>
            <input style={inputStyle} placeholder="Your name" />
            <input style={inputStyle} placeholder="Email" />
            <select style={{...inputStyle, color:"var(--text-light)"}}>
              <option>What brings you here?</option>
              <option>General question</option>
              <option>I'm interested in booking</option>
              <option>I'm not sure what I need</option>
              <option>Private Work inquiry</option>
              <option>Other</option>
            </select>
            <textarea style={{...inputStyle, minHeight:140, resize:"vertical"}} placeholder="Your message" />
            <Btn onClick={() => setSent(true)}>Send Message</Btn>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"48px 24px" }}>
            <Triangle size={24} color="var(--gold)" />
            <p style={{ fontFamily:"var(--font-display)", fontSize:"1.4rem", color:"var(--amethyst)", marginTop:16 }}>Received with care.</p>
            <p style={{ color:"var(--text-light)", marginTop:8, fontSize:"0.9rem" }}>I'll be in touch soon.</p>
          </div>
        )}
        <div style={{ marginTop:48, display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn variant="secondary" style={{ padding:"10px 20px", fontSize:"0.7rem" }} onClick={() => navigate("book")}>Book a Session</Btn>
          <Btn variant="secondary" style={{ padding:"10px 20px", fontSize:"0.7rem" }} onClick={() => navigate("private")}>Private Work</Btn>
          <Btn variant="secondary" style={{ padding:"10px 20px", fontSize:"0.7rem" }} onClick={() => navigate("faqs")}>FAQs</Btn>
        </div>
        <p style={{ textAlign:"center", marginTop:32, fontFamily:"var(--font-display)", fontSize:"1rem", color:"var(--lavender)", fontStyle:"italic" }}>
          There is no wrong door. Wherever you enter, you are welcome.
        </p>
      </section>
    </div>
  );
}

// ─── Shared Components ───
function PageHero({ title, subtitle, small }) {
  return (
    <section style={{ padding: small ? "100px 24px 48px" : "120px 24px 60px", background:"linear-gradient(180deg, var(--amethyst), var(--plum))", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0.4, background:"radial-gradient(1px 1px at 20% 40%, #c0d0ff 0.5px, transparent 1px), radial-gradient(1px 1px at 80% 20%, #a0b4e8 0.5px, transparent 1px), radial-gradient(1px 1px at 50% 70%, #fff 0.5px, transparent 1px)", backgroundSize:"200px 200px, 300px 300px, 250px 250px" }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <Merkaba size={28} color="var(--lavender)" glow />
        <h1 style={{ fontFamily:"var(--font-display)", fontSize: small ? "clamp(1.8rem, 4vw, 2.8rem)" : "clamp(2rem, 5vw, 3.5rem)", fontWeight:300, color:"var(--cream)", marginBottom:12, lineHeight:1.2, marginTop:16 }}>{title}</h1>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--lavender)", maxWidth:560, margin:"0 auto", fontStyle:"italic", lineHeight:1.6 }}>{subtitle}</p>
      </div>
    </section>
  );
}

function Footer2({ navigate }) {
  return (
    <footer style={{ padding:"60px 24px 40px", background:"var(--deep)", borderTop:"1px solid rgba(201,168,76,0.15)", textAlign:"center" }}>
      <p style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color:"var(--gold-light)", marginBottom:32, fontStyle:"italic" }}>
        You are the temple. You are the threshold. You are the light.
      </p>
      <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
        {[["Sacred Consent","consent"],["FAQs","faqs"],["Contact","contact"],["Policies","policies"]].map(([label,page]) => (
          <span key={page} onClick={() => navigate(page)} style={{ fontSize:"0.75rem", color:"var(--text-light)", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", transition:"color 0.3s" }}
            onMouseEnter={e => e.target.style.color="var(--gold)"}
            onMouseLeave={e => e.target.style.color="var(--text-light)"}>{label}</span>
        ))}
      </div>
      <p style={{ fontSize:"0.7rem", color:"rgba(138,126,150,0.5)", letterSpacing:"0.05em" }}>© 2026 Threshold of Light · All rights reserved</p>
    </footer>
  );
}

function NavBar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = currentPage === "home";
  const isDark = ["home","private"].includes(currentPage);

  useEffect(() => {
    setScrolled(false);
    // We track scroll on the page containers instead
  }, [currentPage]);

  const linkColor = isDark ? "var(--cream)" : "var(--amethyst)";
  const linkHover = "var(--gold)";

  const links = [
    { label:"Home", page:"home" },
    { label:"About", page:"about" },
    { label:"Services", page:"services" },
    { label:"Book", page:"book" },
    { label:"Private Work", page:"private" },
  ];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding:"16px 24px",
        background: isDark ? "rgba(13,10,18,0.85)" : "rgba(250,247,242,0.92)",
        backdropFilter:"blur(12px)",
        borderBottom: `1px solid ${isDark ? "rgba(201,168,76,0.1)" : "rgba(45,27,78,0.06)"}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all 0.3s ease",
      }}>
        <div onClick={() => navigate("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <Merkaba size={28} color="var(--gold)" />
          <span style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", color: isDark ? "var(--cream)" : "var(--amethyst)", fontWeight:500, letterSpacing:"0.04em" }}>Threshold of Light</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display:"flex", alignItems:"center", gap:28 }} className="desktop-nav">
          {links.map(l => (
            <span key={l.page} onClick={() => navigate(l.page)} style={{
              fontSize:"0.75rem", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer",
              color: currentPage === l.page ? "var(--gold)" : linkColor,
              transition:"color 0.3s ease", borderBottom: currentPage === l.page ? "1px solid var(--gold)" : "1px solid transparent", paddingBottom:2,
            }}
              onMouseEnter={e => e.target.style.color=linkHover}
              onMouseLeave={e => e.target.style.color = currentPage === l.page ? "var(--gold)" : linkColor}
            >{l.label}</span>
          ))}
          <Btn style={{ padding:"10px 24px", fontSize:"0.65rem" }} onClick={() => navigate("book")}>Book a Session</Btn>
        </div>

        {/* Mobile hamburger */}
        <div onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", cursor:"pointer", flexDirection:"column", gap:5, padding:8 }} className="mobile-toggle">
          <div style={{ width:22, height:1.5, background: isDark ? "var(--cream)" : "var(--amethyst)", transition:"all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
          <div style={{ width:22, height:1.5, background: isDark ? "var(--cream)" : "var(--amethyst)", transition:"all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width:22, height:1.5, background: isDark ? "var(--cream)" : "var(--amethyst)", transition:"all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:"fixed", top:60, left:0, right:0, bottom:0, zIndex:999,
          background: isDark ? "rgba(13,10,18,0.98)" : "rgba(250,247,242,0.98)",
          backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32,
        }}>
          {links.map(l => (
            <span key={l.page} onClick={() => { navigate(l.page); setMenuOpen(false); }} style={{
              fontFamily:"var(--font-display)", fontSize:"1.5rem", color: currentPage === l.page ? "var(--gold)" : linkColor, cursor:"pointer",
            }}>{l.label}</span>
          ))}
          <Btn onClick={() => { navigate("book"); setMenuOpen(false); }}>Book a Session</Btn>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── App ───
export default function App() {
  const [page, setPage] = useState("home");
  const [serviceId, setServiceId] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  const navigate = useCallback((p, id) => {
    setFadeIn(false);
    setTimeout(() => {
      setPage(p);
      if (id) setServiceId(id);
      setFadeIn(true);
      window.scrollTo?.(0, 0);
    }, 300);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "about": return <AboutPage navigate={navigate} />;
      case "services": return <ServicesPage navigate={navigate} />;
      case "service-detail": return <ServiceDetailPage navigate={navigate} serviceId={serviceId} />;
      case "book": return <BookPage navigate={navigate} />;
      case "private": return <PrivatePage navigate={navigate} />;
      case "consent": return <ConsentPage />;
      case "faqs": return <FAQPage />;
      case "contact": return <ContactPage navigate={navigate} />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight:"100vh" }}>
      <style>{globalCSS}</style>
      <NavBar navigate={navigate} currentPage={page} />
      <div style={{
        opacity: fadeIn ? 1 : 0,
        transition:"opacity 0.3s ease",
        minHeight:"100vh",
      }}>
        {renderPage()}
        {page !== "home" && page !== "private" && <Footer2 navigate={navigate} />}
      </div>
    </div>
  );
}
