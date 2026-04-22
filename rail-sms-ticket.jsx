import { useState, useEffect } from "react";

const palette = {
  bg: "#F5F0E8",
  card: "#FFFFFF",
  blue: "#1A5276",
  blueLight: "#2E86C1",
  bluePale: "#D6EAF8",
  orange: "#E67E22",
  orangeLight: "#F39C12",
  orangePale: "#FDEBD0",
  green: "#1E8449",
  greenPale: "#D5F5E3",
  red: "#C0392B",
  redPale: "#FADBD8",
  gray: "#7F8C8D",
  grayLight: "#ECF0F1",
  text: "#1C2833",
  textMid: "#5D6D7E",
  border: "#D5D8DC",
  cream: "#FDFBF7",
  shadow: "rgba(26,82,118,0.10)",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #E8F4FD 0%, #F5F0E8 50%, #FEF9F0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    padding: "20px 10px",
  },
  phoneFrame: {
    width: 390,
    minHeight: 780,
    background: palette.bg,
    borderRadius: 40,
    boxShadow: "0 32px 80px rgba(26,82,118,0.22), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    border: "2px solid rgba(255,255,255,0.9)",
  },
  statusBar: {
    background: "rgba(26,82,118,0.96)",
    color: "#fff",
    padding: "10px 24px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    backdropFilter: "blur(10px)",
  },
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: "transparent",
  },
};

// ─── TINY COMPONENTS ────────────────────────────────────────────────────────

const Btn = ({ label, onClick, color = "orange", size = "lg", icon, disabled }) => {
  const bg = color === "orange" ? `linear-gradient(135deg, ${palette.orange}, ${palette.orangeLight})`
    : color === "blue" ? `linear-gradient(135deg, ${palette.blue}, ${palette.blueLight})`
    : color === "green" ? `linear-gradient(135deg, #1E8449, #27AE60)`
    : color === "ghost" ? "transparent"
    : `linear-gradient(135deg, ${palette.grayLight}, #DDD)`;
  const textColor = color === "ghost" ? palette.blue : "#fff";
  const border = color === "ghost" ? `2px solid ${palette.blue}` : "2px solid transparent";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color: textColor,
        border,
        borderRadius: size === "lg" ? 18 : 12,
        padding: size === "lg" ? "16px 28px" : "10px 20px",
        fontSize: size === "lg" ? 17 : 14,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        boxShadow: color === "ghost" ? "none" : "0 4px 16px rgba(0,0,0,0.15)",
        transition: "transform 0.12s, box-shadow 0.12s",
        opacity: disabled ? 0.6 : 1,
        letterSpacing: 0.3,
        fontFamily: "inherit",
      }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {icon && <span style={{ fontSize: size === "lg" ? 20 : 15 }}>{icon}</span>}
      {label}
    </button>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text", options }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: palette.blue, marginBottom: 5, letterSpacing: 0.8, textTransform: "uppercase" }}>
      {label}
    </label>
    {options ? (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "13px 14px", borderRadius: 14,
          border: `2px solid ${palette.bluePale}`, fontSize: 15,
          background: palette.cream, color: palette.text,
          outline: "none", fontFamily: "inherit", fontWeight: 600,
          boxShadow: "0 2px 8px rgba(26,82,118,0.06)", appearance: "none",
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "13px 14px", borderRadius: 14,
          border: `2px solid ${palette.bluePale}`, fontSize: 15,
          background: palette.cream, color: palette.text, outline: "none",
          fontFamily: "inherit", fontWeight: 600, boxSizing: "border-box",
          boxShadow: "0 2px 8px rgba(26,82,118,0.06)",
        }}
      />
    )}
  </div>
);

const Header = ({ title, onBack }) => (
  <div style={{
    background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.blueLight} 100%)`,
    padding: "18px 20px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 4px 20px rgba(26,82,118,0.25)",
  }}>
    {onBack && (
      <button onClick={onBack} style={{
        background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12,
        width: 36, height: 36, cursor: "pointer", color: "#fff",
        fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(10px)",
      }}>←</button>
    )}
    <span style={{ color: "#fff", fontSize: 19, fontWeight: 800, letterSpacing: 0.3 }}>{title}</span>
  </div>
);

const TrainIcon = ({ size = 48, color = palette.blue }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="8" y="18" width="48" height="28" rx="8" fill={color} opacity="0.15"/>
    <rect x="10" y="20" width="44" height="22" rx="6" fill={color} opacity="0.25"/>
    <rect x="12" y="22" width="40" height="16" rx="4" fill={color}/>
    <rect x="15" y="25" width="10" height="8" rx="2" fill="white" opacity="0.9"/>
    <rect x="27" y="25" width="10" height="8" rx="2" fill="white" opacity="0.9"/>
    <rect x="39" y="25" width="10" height="8" rx="2" fill="white" opacity="0.9"/>
    <circle cx="20" cy="46" r="5" fill={color}/>
    <circle cx="20" cy="46" r="2.5" fill="white"/>
    <circle cx="44" cy="46" r="5" fill={color}/>
    <circle cx="44" cy="46" r="2.5" fill="white"/>
    <rect x="6" y="40" width="52" height="3" rx="1.5" fill={color} opacity="0.3"/>
    <rect x="28" y="16" width="8" height="4" rx="2" fill={color} opacity="0.5"/>
  </svg>
);

const SMSIcon = ({ size = 48, color = palette.orange }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="48" height="34" rx="10" fill={color} opacity="0.15"/>
    <rect x="10" y="14" width="44" height="30" rx="8" fill={color} opacity="0.9"/>
    <rect x="18" y="22" width="28" height="3" rx="1.5" fill="white" opacity="0.9"/>
    <rect x="18" y="28" width="20" height="3" rx="1.5" fill="white" opacity="0.7"/>
    <path d="M20 44 L28 52 L36 44" fill={color} opacity="0.9"/>
  </svg>
);

const QRPlaceholder = () => (
  <div style={{
    width: 120, height: 120, background: palette.cream,
    border: `2px solid ${palette.border}`, borderRadius: 12,
    display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3,
    padding: 10, margin: "0 auto",
  }}>
    {Array.from({ length: 25 }, (_, i) => {
      const filled = [0,1,2,3,5,9,10,14,15,16,17,19,20,21,22,23,24,6,7,11,12].includes(i);
      return <div key={i} style={{ background: filled ? palette.blue : "transparent", borderRadius: 2 }} />;
    })}
  </div>
);

// ─── SCREENS ─────────────────────────────────────────────────────────────────

// 1. WELCOME
const WelcomeScreen = ({ go }) => (
  <div style={{
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "40px 28px",
    background: "linear-gradient(180deg, #EBF5FB 0%, #F5F0E8 100%)",
  }}>
    {/* Railway pattern strip */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 6,
      background: `repeating-linear-gradient(90deg, ${palette.orange} 0px, ${palette.orange} 20px, ${palette.blue} 20px, ${palette.blue} 40px)`,
    }} />

    {/* Logo badge */}
    <div style={{
      width: 100, height: 100, borderRadius: 28,
      background: `linear-gradient(135deg, ${palette.blue}, ${palette.blueLight})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 12px 40px rgba(26,82,118,0.30), 0 4px 12px rgba(26,82,118,0.15)",
      marginBottom: 24,
    }}>
      <TrainIcon size={58} color="#fff" />
    </div>

    {/* Indian Railways emblem text */}
    <div style={{
      fontSize: 11, color: palette.orange, fontWeight: 800, letterSpacing: 2,
      textTransform: "uppercase", marginBottom: 6,
    }}>Indian Railways</div>

    <h1 style={{
      fontSize: 32, fontWeight: 900, color: palette.blue,
      textAlign: "center", lineHeight: 1.15, margin: "0 0 10px",
    }}>
      Rail SMS<br />
      <span style={{ color: palette.orange }}>Ticket</span>
    </h1>

    <p style={{
      fontSize: 16, color: palette.textMid, textAlign: "center",
      lineHeight: 1.6, marginBottom: 40, maxWidth: 280,
    }}>
      Book unreserved train tickets<br />
      <strong style={{ color: palette.blue }}>without internet</strong> — just an SMS
    </p>

    {/* Feature pills */}
    <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}>
      {["📱 SMS Only", "🚂 All Trains", "✅ Instant Confirm"].map(f => (
        <div key={f} style={{
          background: palette.card, padding: "7px 13px", borderRadius: 20,
          fontSize: 12, fontWeight: 700, color: palette.blue,
          boxShadow: "0 2px 8px rgba(26,82,118,0.10)", border: `1px solid ${palette.bluePale}`,
        }}>{f}</div>
      ))}
    </div>

    <div style={{ width: "100%" }}>
      <Btn label="Get Started →" onClick={() => go("home")} color="orange" icon="🚆" />
    </div>

    <p style={{ fontSize: 12, color: palette.gray, marginTop: 16, textAlign: "center" }}>
      Available in Hindi · English · 10 Regional Languages
    </p>

    {/* Track decoration */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 5,
      background: `repeating-linear-gradient(90deg, ${palette.blue} 0px, ${palette.blue} 20px, ${palette.orange} 20px, ${palette.orange} 40px)`,
    }} />
  </div>
);

// 2. HOME
const HomeScreen = ({ go }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
    {/* Hero */}
    <div style={{
      background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.blueLight} 100%)`,
      padding: "28px 24px 36px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -20, top: -10, opacity: 0.12,
      }}>
        <TrainIcon size={120} color="#fff" />
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: 1.5, marginBottom: 4 }}>
        INDIAN RAILWAYS
      </div>
      <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>
        Book in 3 Easy Steps
      </h2>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 6, marginBottom: 0 }}>
        No internet needed · Just SMS
      </p>
    </div>

    {/* Steps */}
    <div style={{ padding: "0 18px", marginTop: -18 }}>
      <div style={{ background: palette.card, borderRadius: 20, padding: "18px 16px", boxShadow: "0 6px 24px rgba(26,82,118,0.12)" }}>
        {[
          { n: "1", icon: "✍️", title: "Enter Details", desc: "Train, date, class, stations" },
          { n: "2", icon: "📨", title: "Send SMS", desc: "We create the SMS for you" },
          { n: "3", icon: "🎟️", title: "Get Ticket", desc: "Receive code via SMS" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${palette.grayLight}` : "none" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: i === 0 ? palette.orangePale : i === 1 ? palette.bluePale : palette.greenPale,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontWeight: 800, color: palette.text, fontSize: 15 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: palette.textMid }}>{s.desc}</div>
            </div>
            <div style={{
              marginLeft: "auto", width: 24, height: 24, borderRadius: 12,
              background: palette.blue, color: "#fff", fontSize: 11, fontWeight: 900,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{s.n}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Actions */}
    <div style={{ padding: "18px 18px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <Btn label="🎟️  Book Ticket" onClick={() => go("book")} color="orange" />
      <Btn label="📋  View Previous Tickets" onClick={() => go("history")} color="blue" />
      <Btn label="❓  Help & FAQ" onClick={() => go("help")} color="ghost" />
    </div>

    {/* Footer */}
    <div style={{
      margin: "18px 18px 0", padding: "12px 16px", borderRadius: 14,
      background: palette.bluePale, display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ fontSize: 22 }}>📞</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: palette.blue }}>Helpline: 139</div>
        <div style={{ fontSize: 11, color: palette.textMid }}>24×7 Railway Customer Care</div>
      </div>
    </div>
    <div style={{ height: 16 }} />
  </div>
);

// 3. BOOK TICKET
const BookScreen = ({ go }) => {
  const [form, setForm] = useState({
    train: "", date: "", cls: "General", from: "", to: "", mobile: "",
  });
  const set = k => v => setForm(p => ({ ...p, [k]: v }));
  const ready = form.train && form.date && form.from && form.to && form.mobile;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
      <Header title="Book Ticket" onBack={() => go("home")} />

      <div style={{ flex: 1, overflowY: "auto", padding: "18px 18px 0" }}>
        {/* Notice */}
        <div style={{
          background: palette.bluePale, borderRadius: 14, padding: "12px 14px",
          marginBottom: 18, display: "flex", gap: 10, alignItems: "center",
        }}>
          <SMSIcon size={32} color={palette.blue} />
          <div style={{ fontSize: 13, color: palette.blue, fontWeight: 700, lineHeight: 1.4 }}>
            We'll create an SMS automatically.<br />
            <span style={{ fontWeight: 600, opacity: 0.8 }}>No internet needed after this.</span>
          </div>
        </div>

        <div style={{
          background: palette.card, borderRadius: 20, padding: "18px 16px",
          boxShadow: "0 4px 20px rgba(26,82,118,0.08)",
        }}>
          <Field label="Train Number" value={form.train} onChange={set("train")} placeholder="e.g. 12345" type="tel" />
          <Field label="Travel Date" value={form.date} onChange={set("date")} placeholder="e.g. 15 Apr 2025" type="date" />
          <Field label="Class" value={form.cls} onChange={set("cls")} options={["General", "Second Sitting (2S)"]} />
          <Field label="From Station" value={form.from} onChange={set("from")} placeholder="e.g. CHENNAI CENTRAL" />
          <Field label="To Station" value={form.to} onChange={set("to")} placeholder="e.g. BANGALORE CITY" />
          <Field label="Mobile Number" value={form.mobile} onChange={set("mobile")} placeholder="10-digit mobile" type="tel" />
        </div>

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Btn
            label="📨  Generate SMS"
            onClick={() => go("sms")}
            color={ready ? "orange" : "ghost"}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

// 4. SMS PREVIEW
const SMSScreen = ({ go }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
    <Header title="SMS Preview" onBack={() => go("book")} />

    <div style={{ flex: 1, padding: "24px 18px", display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Phone mockup */}
      <div style={{
        background: palette.card, borderRadius: 20, padding: 20,
        boxShadow: "0 4px 20px rgba(26,82,118,0.10)",
      }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: palette.blue, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>
          📱 SMS to Send
        </div>
        <div style={{
          background: palette.grayLight, borderRadius: 14, padding: "14px 16px",
          fontSize: 13, color: palette.textMid, marginBottom: 12,
        }}>
          To: <strong style={{ color: palette.text }}>139</strong>
        </div>

        {/* Bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{
            background: `linear-gradient(135deg, ${palette.orange}, ${palette.orangeLight})`,
            color: "#fff", borderRadius: "18px 18px 4px 18px",
            padding: "16px 20px", maxWidth: "80%",
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
              UTS 12345 15APR GEN
            </div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>Standard SMS Format</div>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: "12px", background: palette.orangePale, borderRadius: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: palette.orange, marginBottom: 6 }}>📋 Format Breakdown</div>
          {[
            ["UTS", "Service Code"],
            ["12345", "Train Number"],
            ["15APR", "Travel Date"],
            ["GEN", "Class (General)"],
          ].map(([code, desc]) => (
            <div key={code} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontWeight: 800, color: palette.blue, fontFamily: "monospace", fontSize: 13 }}>{code}</span>
              <span style={{ fontSize: 12, color: palette.textMid }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost notice */}
      <div style={{
        background: palette.greenPale, borderRadius: 14, padding: "12px 14px",
        display: "flex", gap: 10, alignItems: "center",
      }}>
        <span style={{ fontSize: 20 }}>ℹ️</span>
        <div style={{ fontSize: 13, color: palette.green, fontWeight: 700 }}>
          Standard SMS charges apply (₹0–2). Your mobile operator's rates.
        </div>
      </div>

      <Btn label="📤  Send SMS Now" onClick={() => go("processing")} color="orange" />
      <Btn label="✏️  Edit Details" onClick={() => go("book")} color="ghost" />
    </div>
  </div>
);

// 5. PROCESSING
const ProcessingScreen = ({ go }) => {
  const [dots, setDots] = useState(0);
  const [step, setStep] = useState(0);
  const steps = ["Sending SMS to 139...", "Railway server received...", "Validating your details...", "Generating ticket code..."];

  useEffect(() => {
    const d = setInterval(() => setDots(p => (p + 1) % 4), 500);
    const s = setInterval(() => setStep(p => p < steps.length - 1 ? p + 1 : p), 1200);
    const t = setTimeout(() => go("confirm"), 5500);
    return () => { clearInterval(d); clearInterval(s); clearTimeout(t); };
  }, []);

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", background: palette.bg, padding: 32,
    }}>
      {/* Spinner */}
      <div style={{ position: "relative", width: 120, height: 120, marginBottom: 32 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: `6px solid ${palette.bluePale}`,
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: `6px solid transparent`,
          borderTopColor: palette.orange,
          animation: "spin 1s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 12, borderRadius: "50%",
          background: palette.card,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(26,82,118,0.15)",
        }}>
          <TrainIcon size={52} color={palette.blue} />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: palette.blue, textAlign: "center", marginBottom: 8 }}>
        Processing Your Ticket
      </h2>
      <p style={{ fontSize: 15, color: palette.textMid, textAlign: "center", marginBottom: 32 }}>
        Railway is processing your request{"." .repeat(dots + 1)}
      </p>

      {/* Steps */}
      <div style={{ width: "100%", background: palette.card, borderRadius: 20, padding: "16px 18px", boxShadow: "0 4px 20px rgba(26,82,118,0.08)" }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
            borderBottom: i < steps.length - 1 ? `1px solid ${palette.grayLight}` : "none",
            opacity: i <= step ? 1 : 0.35, transition: "opacity 0.4s",
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: i < step ? palette.green : i === step ? palette.orange : palette.grayLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: i <= step ? "#fff" : palette.gray, fontWeight: 800,
              flexShrink: 0, transition: "background 0.4s",
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: i <= step ? palette.text : palette.textMid }}>{s}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: palette.gray, marginTop: 20, textAlign: "center" }}>
        Please keep your phone on. Do not close this app.
      </p>
    </div>
  );
};

// 6. CONFIRMATION
const ConfirmScreen = ({ go }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
    <div style={{
      background: `linear-gradient(135deg, ${palette.green}, #27AE60)`,
      padding: "28px 24px 24px", textAlign: "center",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "rgba(255,255,255,0.25)", margin: "0 auto 12px",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
      }}>✓</div>
      <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>Ticket Confirmed!</h2>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4 }}>
        Your ticket has been successfully booked
      </p>
    </div>

    <div style={{ flex: 1, overflowY: "auto", padding: "18px 18px 0" }}>
      {/* Ticket card */}
      <div style={{
        background: palette.card, borderRadius: 20,
        boxShadow: "0 8px 32px rgba(26,82,118,0.12)", overflow: "hidden",
      }}>
        {/* Ticket header */}
        <div style={{
          background: palette.blue, padding: "14px 18px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, letterSpacing: 1.5, fontWeight: 700 }}>TICKET CODE</div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: 3, fontFamily: "monospace" }}>AB7X91</div>
          </div>
          <div style={{
            background: palette.greenPale, color: palette.green,
            padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800,
          }}>✓ VALID</div>
        </div>

        {/* Dashed divider */}
        <div style={{
          borderTop: `2px dashed ${palette.border}`, margin: "0 16px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", width: 20, height: 20, borderRadius: "50%",
            background: palette.bg, left: -26, top: -10,
          }} />
          <div style={{
            position: "absolute", width: 20, height: 20, borderRadius: "50%",
            background: palette.bg, right: -26, top: -10,
          }} />
        </div>

        {/* Details */}
        <div style={{ padding: "16px 18px" }}>
          {[
            ["🚆 Train Number", "12345 — Shatabdi Exp"],
            ["📅 Date", "15 April 2025"],
            ["🎫 Class", "General (GEN)"],
            ["📍 From → To", "Chennai → Bangalore"],
            ["👤 Passengers", "1 Adult"],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0", borderBottom: `1px solid ${palette.grayLight}`,
              alignItems: "center",
            }}>
              <span style={{ fontSize: 13, color: palette.textMid }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: palette.text }}>{v}</span>
            </div>
          ))}
        </div>

        {/* QR */}
        <div style={{ padding: "16px 18px", textAlign: "center", background: palette.cream }}>
          <div style={{ fontSize: 12, color: palette.textMid, marginBottom: 10, fontWeight: 700 }}>
            Show this to the TTE
          </div>
          <QRPlaceholder />
          <div style={{ fontSize: 11, color: palette.gray, marginTop: 8 }}>
            Scan QR or enter code AB7X91
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <Btn label="💾  Save Ticket" onClick={() => {}} color="blue" />
        <Btn label="🏠  Back to Home" onClick={() => go("home")} color="ghost" />
      </div>
    </div>
  </div>
);

// 7. HISTORY
const HistoryScreen = ({ go }) => {
  const tickets = [
    { code: "AB7X91", train: "12345 Shatabdi", date: "15 Apr", status: "valid", from: "Chennai", to: "Bangalore" },
    { code: "MN3K52", train: "22691 Rajdhani", date: "10 Apr", status: "used", from: "Delhi", to: "Mumbai" },
    { code: "XZ9P01", train: "12028 Chennai Mail", date: "02 Apr", status: "expired", from: "Coimbatore", to: "Chennai" },
    { code: "BQ4L77", train: "16057 Saptagiri", date: "28 Mar", status: "used", from: "Tirupati", to: "Chennai" },
  ];

  const statusMap = {
    valid: { bg: palette.greenPale, color: palette.green, label: "✓ Valid" },
    used: { bg: palette.bluePale, color: palette.blueLight, label: "↩ Used" },
    expired: { bg: palette.redPale, color: palette.red, label: "✕ Expired" },
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
      <Header title="Ticket History" onBack={() => go("home")} />

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
        <div style={{ fontSize: 13, color: palette.textMid, marginBottom: 12 }}>
          {tickets.length} tickets found
        </div>

        {tickets.map((t, i) => {
          const s = statusMap[t.status];
          return (
            <div key={i} style={{
              background: palette.card, borderRadius: 18, padding: "14px 16px",
              marginBottom: 12, boxShadow: "0 3px 14px rgba(26,82,118,0.08)",
              display: "flex", alignItems: "center", gap: 14,
              borderLeft: `4px solid ${s.color}`,
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: s.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22, flexShrink: 0,
              }}>🎟️</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: palette.text, fontFamily: "monospace" }}>
                  {t.code}
                </div>
                <div style={{ fontSize: 12, color: palette.textMid, marginTop: 2 }}>
                  {t.train}
                </div>
                <div style={{ fontSize: 12, color: palette.textMid }}>
                  {t.from} → {t.to} · {t.date}
                </div>
              </div>

              <div style={{
                background: s.bg, color: s.color,
                padding: "5px 10px", borderRadius: 10,
                fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
              }}>{s.label}</div>
            </div>
          );
        })}

        <div style={{ marginTop: 8 }}>
          <Btn label="+ Book New Ticket" onClick={() => go("book")} color="orange" />
        </div>
        <div style={{ height: 12 }} />
      </div>
    </div>
  );
};

// 8. TTE VERIFICATION
const TTEScreen = ({ go }) => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const verify = () => {
    if (code.toUpperCase() === "AB7X91") {
      setResult("valid");
    } else if (code.length === 6) {
      setResult("invalid");
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
      <div style={{
        background: `linear-gradient(135deg, #2C3E50, #34495E)`,
        padding: "24px 20px",
      }}>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: 1.5, fontWeight: 700, marginBottom: 4 }}>
          🚂 INDIAN RAILWAYS
        </div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0 }}>TTE Verification</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Ticket Ticket Examiner Portal</p>
      </div>

      <div style={{ flex: 1, padding: "24px 18px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Badge */}
        <div style={{
          background: palette.card, borderRadius: 18, padding: "16px",
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          borderLeft: `4px solid ${palette.orange}`,
        }}>
          <div style={{ fontSize: 36 }}>🪪</div>
          <div>
            <div style={{ fontWeight: 800, color: palette.text }}>Official TTE Tool</div>
            <div style={{ fontSize: 12, color: palette.textMid }}>Enter passenger's ticket code to verify</div>
          </div>
        </div>

        {/* Input */}
        <div style={{ background: palette.card, borderRadius: 20, padding: "20px 18px", boxShadow: "0 4px 20px rgba(26,82,118,0.08)" }}>
          <label style={{ fontSize: 13, fontWeight: 800, color: palette.blue, display: "block", marginBottom: 10, letterSpacing: 0.5 }}>
            ENTER TICKET CODE
          </label>
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setResult(null); }}
            placeholder="e.g. AB7X91"
            maxLength={6}
            style={{
              width: "100%", padding: "18px", textAlign: "center",
              fontSize: 28, fontWeight: 900, letterSpacing: 6,
              fontFamily: "monospace", borderRadius: 14,
              border: `2px solid ${result === "valid" ? palette.green : result === "invalid" ? palette.red : palette.bluePale}`,
              background: palette.cream, color: palette.text,
              outline: "none", boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: 12, color: palette.textMid, textAlign: "center", marginTop: 8 }}>
            6-character alphanumeric code
          </p>
        </div>

        <Btn
          label="🔍  Verify Ticket"
          onClick={verify}
          color={code.length === 6 ? "blue" : "ghost"}
          disabled={code.length !== 6}
        />

        {/* Result */}
        {result === "valid" && (
          <div style={{
            background: palette.greenPale, borderRadius: 20, padding: "20px",
            border: `2px solid ${palette.green}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 48 }}>✅</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: palette.green }}>Valid Ticket</div>
            <div style={{ fontSize: 14, color: palette.textMid, marginTop: 6 }}>
              Passenger may travel — Code: <strong>AB7X91</strong>
            </div>
            <div style={{ marginTop: 14, background: palette.card, borderRadius: 14, padding: "12px 14px" }}>
              {[["Train", "12345 Shatabdi"], ["Date", "15 Apr 2025"], ["Class", "General"], ["Status", "Active"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                  <span style={{ fontSize: 13, color: palette.textMid }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: palette.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result === "invalid" && (
          <div style={{
            background: palette.redPale, borderRadius: 20, padding: "20px",
            border: `2px solid ${palette.red}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 48 }}>❌</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: palette.red }}>Invalid Ticket</div>
            <div style={{ fontSize: 14, color: palette.textMid, marginTop: 6 }}>
              Ticket code not found. Ask passenger to show SMS confirmation.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 9. HELP
const HelpScreen = ({ go }) => {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "How to book without internet?",
      a: "Use our app to fill in details and generate the SMS. Then simply send the SMS to 139 — no internet needed after that! You'll receive your ticket code back via SMS.",
      icon: "📱",
    },
    {
      q: "What SMS format should I use?",
      a: 'Send to 139: "UTS [Train Number] [Date in DDMMM] [Class]"\nExample: UTS 12345 15APR GEN\nClasses: GEN = General, 2S = Second Sitting',
      icon: "📨",
    },
    {
      q: "What if I don't receive confirmation?",
      a: "Wait 5–10 minutes. If no SMS received, call 139. Do not send the SMS again — duplicate bookings may occur. Railway helpline is available 24×7.",
      icon: "⏳",
    },
    {
      q: "Is this ticket valid for travel?",
      a: "Yes! Show the ticket code (received via SMS) to the TTE. The code is valid for the specified train, date, and class only.",
      icon: "✅",
    },
    {
      q: "How much does it cost?",
      a: "Only standard SMS charges (₹0–2 per SMS depending on your operator). The ticket price will be collected by the TTE on board.",
      icon: "💰",
    },
    {
      q: "Can I book for multiple passengers?",
      a: "Yes! Add the number of passengers at the end. Example: UTS 12345 15APR GEN 2 (for 2 passengers). Maximum 6 passengers per SMS.",
      icon: "👥",
    },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: palette.bg }}>
      <Header title="Help & FAQ" onBack={() => go("home")} />

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
        {/* Quick SMS guide */}
        <div style={{
          background: `linear-gradient(135deg, ${palette.orange}, ${palette.orangeLight})`,
          borderRadius: 20, padding: "18px", marginBottom: 18, color: "#fff",
        }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>📋 Quick SMS Format</div>
          <div style={{
            background: "rgba(255,255,255,0.2)", borderRadius: 12,
            padding: "12px", fontFamily: "monospace", fontSize: 16,
            fontWeight: 900, letterSpacing: 1, textAlign: "center",
          }}>
            UTS [TRAIN] [DATE] [CLASS]
          </div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9, textAlign: "center" }}>
            Send to: <strong>139</strong> (Toll-free)
          </div>
        </div>

        {/* FAQ */}
        {faqs.map((f, i) => (
          <div key={i} style={{
            background: palette.card, borderRadius: 16, marginBottom: 10,
            boxShadow: "0 3px 12px rgba(26,82,118,0.07)",
            overflow: "hidden", border: `1px solid ${open === i ? palette.bluePale : "transparent"}`,
          }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                textAlign: "left", fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: palette.text }}>{f.q}</span>
              <span style={{
                color: palette.blue, fontSize: 16, fontWeight: 700,
                transform: open === i ? "rotate(180deg)" : "none",
                transition: "transform 0.3s",
              }}>▼</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 16px 14px 52px", fontSize: 13, color: palette.textMid, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {f.a}
              </div>
            )}
          </div>
        ))}

        {/* Contact */}
        <div style={{
          background: palette.bluePale, borderRadius: 16, padding: "16px",
          display: "flex", gap: 12, alignItems: "center", marginTop: 8,
        }}>
          <span style={{ fontSize: 32 }}>📞</span>
          <div>
            <div style={{ fontWeight: 800, color: palette.blue, fontSize: 15 }}>Still need help?</div>
            <div style={{ fontSize: 13, color: palette.textMid }}>Call 139 — 24×7 Railway Helpline</div>
            <div style={{ fontSize: 11, color: palette.textMid, marginTop: 2 }}>Available in 12 languages</div>
          </div>
        </div>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
};

// ─── NAV BAR ─────────────────────────────────────────────────────────────────

const navItems = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "book", icon: "🎟️", label: "Book" },
  { id: "history", icon: "📋", label: "History" },
  { id: "tte", icon: "🔍", label: "Verify" },
  { id: "help", icon: "❓", label: "Help" },
];

// ─── SCREEN GALLERY ──────────────────────────────────────────────────────────

const ALL_SCREENS = [
  { id: "welcome", label: "Welcome" },
  { id: "home", label: "Home" },
  { id: "book", label: "Book Ticket" },
  { id: "sms", label: "SMS Preview" },
  { id: "processing", label: "Processing" },
  { id: "confirm", label: "Confirmation" },
  { id: "history", label: "History" },
  { id: "tte", label: "TTE Verify" },
  { id: "help", label: "Help" },
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const go = s => setScreen(s);

  const renderScreen = () => {
    switch (screen) {
      case "welcome": return <WelcomeScreen go={go} />;
      case "home": return <HomeScreen go={go} />;
      case "book": return <BookScreen go={go} />;
      case "sms": return <SMSScreen go={go} />;
      case "processing": return <ProcessingScreen go={go} />;
      case "confirm": return <ConfirmScreen go={go} />;
      case "history": return <HistoryScreen go={go} />;
      case "tte": return <TTEScreen go={go} />;
      case "help": return <HelpScreen go={go} />;
      default: return <HomeScreen go={go} />;
    }
  };

  const showNav = ["home","book","history","tte","help"].includes(screen);

  return (
    <div style={styles.app}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

        {/* Screen Selector */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
          maxWidth: 500,
        }}>
          {ALL_SCREENS.map(s => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              style={{
                padding: "7px 14px", borderRadius: 20, border: "none",
                background: screen === s.id ? palette.orange : "rgba(255,255,255,0.8)",
                color: screen === s.id ? "#fff" : palette.blue,
                fontWeight: 700, fontSize: 12, cursor: "pointer",
                boxShadow: screen === s.id ? "0 4px 14px rgba(230,126,34,0.4)" : "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.2s", fontFamily: "inherit",
                backdropFilter: "blur(10px)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Phone Frame */}
        <div style={styles.phoneFrame}>
          {/* Status Bar */}
          <div style={styles.statusBar}>
            <span>9:41</span>
            <span style={{ fontWeight: 400, fontSize: 11 }}>Rail SMS Ticket</span>
            <span>📶 🔋</span>
          </div>

          {/* Screen Content */}
          <div style={styles.screen}>
            {renderScreen()}
          </div>

          {/* Bottom Nav */}
          {showNav && (
            <div style={{
              background: palette.card,
              borderTop: `1px solid ${palette.border}`,
              display: "flex",
              boxShadow: "0 -4px 20px rgba(26,82,118,0.08)",
            }}>
              {navItems.map(n => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  style={{
                    flex: 1, background: "none", border: "none", cursor: "pointer",
                    padding: "10px 0 8px", display: "flex",
                    flexDirection: "column", alignItems: "center", gap: 3,
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{
                    fontSize: 20,
                    filter: screen === n.id ? "none" : "grayscale(0.5) opacity(0.5)",
                  }}>{n.icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: screen === n.id ? 800 : 600,
                    color: screen === n.id ? palette.orange : palette.gray,
                  }}>{n.label}</span>
                  {screen === n.id && (
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: palette.orange, marginTop: -1,
                    }} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Home indicator */}
          <div style={{
            padding: "8px 0 4px", display: "flex", justifyContent: "center",
            background: palette.card,
          }}>
            <div style={{ width: 120, height: 4, background: palette.text, borderRadius: 2, opacity: 0.15 }} />
          </div>
        </div>

        {/* Label */}
        <div style={{
          background: "rgba(255,255,255,0.8)", borderRadius: 16, padding: "10px 20px",
          boxShadow: "0 4px 16px rgba(26,82,118,0.10)",
          backdropFilter: "blur(10px)",
        }}>
          <p style={{ margin: 0, fontSize: 13, color: palette.textMid, textAlign: "center", fontWeight: 600 }}>
            🚂 <strong style={{ color: palette.blue }}>Rail SMS Ticket</strong> — Prototype by Indian Railways ·{" "}
            <span style={{ color: palette.orange }}>Click any screen above to navigate</span>
          </p>
        </div>
      </div>
    </div>
  );
}
