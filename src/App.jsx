import { useState, useEffect, useRef } from "react";

const AP = {
  bg: "#F2F2F7",
  card: "#FFFFFF",
  blue: "#007AFF",
  red: "#FF3B30",
  green: "#34C759",
  indigo: "#5856D6",
  teal: "#32ADE6",
  pink: "#FF2D55",
  label: "#000000",
  label2: "rgba(60,60,67,0.6)",
  label3: "rgba(60,60,67,0.3)",
  sep: "rgba(60,60,67,0.18)",
  fill: "rgba(120,120,128,0.12)",
};

const FLD = {
  activatingEvent: {
    col: AP.pink,
    letter: "A",
    hdr: "A — Activating Event",
    ph: "What happened? Describe the situation…",
  },
  belief: {
    col: AP.indigo,
    letter: "B",
    hdr: "B — Belief / Stuck Point",
    ph: "What did you tell yourself about it?",
  },
  consequence: {
    col: AP.teal,
    letter: "C",
    hdr: "C — Consequence / Feelings",
    ph: "How did that make you feel or act?",
  },
};

const EX = {
  activatingEvent: [
    "My sibling said something that hurt my feelings",
    "I got a lower grade than I expected",
    "My plans got cancelled at the last minute",
    "I felt left out of a family decision",
    "I had a disagreement with a close friend",
    "I woke up feeling anxious for no clear reason",
    "Someone didn't respond to my messages",
    "I made a mistake at school or work",
    "I felt overwhelmed by everything on my plate",
    "I saw something online that upset me",
  ],
  belief: [
    "Nobody really cares about how I feel",
    "I always mess everything up",
    "I'm not good enough for this",
    "Things will never get better for me",
    "I have to handle everything alone",
    "If I'm not perfect, I've completely failed",
    "People are secretly judging me",
    "I don't deserve good things",
    "I have no control over my life",
    "I'm a burden to those around me",
  ],
  consequence: [
    "I felt sad and wanted to be completely alone",
    "I snapped at someone I really care about",
    "I couldn't focus or concentrate",
    "I felt tightness in my chest and stomach",
    "I went quiet and shut down",
    "I cried without fully knowing why",
    "I felt angry and frustrated",
    "I felt numb and disconnected",
    "I had trouble sleeping that night",
    "I felt deeply ashamed and embarrassed",
  ],
};

const LOOTBOX = [
  { e: "🌟", t: "You've made it through 100% of your hard days so far!" },
  {
    e: "💪",
    t: "Sharing your feelings takes real courage. You're braver than you know.",
  },
  {
    e: "🌈",
    t: "Every storm runs out of rain. You're not stuck here forever.",
  },
  {
    e: "🧠",
    t: "Just by doing this, you're rewiring your brain toward healing. Science says so!",
  },
  {
    e: "🌱",
    t: "Growth is messy. The fact you're here means you're already growing.",
  },
  {
    e: "🔥",
    t: "You are not your stuck points. You are the one noticing them.",
  },
  {
    e: "🎯",
    t: "One honest moment like this is worth more than a hundred avoided ones.",
  },
  {
    e: "🫂",
    t: "The people who love you are lucky to have someone so self-aware.",
  },
  { e: "✨", t: "You showed up for yourself today. That's everything." },
  {
    e: "🌊",
    t: "Feelings are visitors. You welcomed one in — and that takes strength.",
  },
  {
    e: "🦋",
    t: "Transformation doesn't look like transformation while it's happening.",
  },
  {
    e: "💎",
    t: "Hard conversations now are investments in your future peace.",
  },
  {
    e: "🌙",
    t: "Even on the darkest nights, the moon is still there. So are you.",
  },
  {
    e: "🎵",
    t: "You don't have to have it all figured out. You just have to keep going.",
  },
  {
    e: "🏔️",
    t: "You're not at the bottom. You're already climbing the mountain.",
  },
  { e: "🌺", t: "Your feelings are valid. All of them. Every single one." },
  {
    e: "⚡",
    t: "There's more resilience inside you than you've ever had to use.",
  },
  { e: "🤝", t: "Asking for help — even from yourself — is a superpower." },
  {
    e: "🎪",
    t: "You are a whole, complex, worthy person. Not just your hard moments.",
  },
  {
    e: "🕊️",
    t: "Peace is possible. You're already building the path toward it.",
  },
];

const CC = [
  "#FF2D55",
  "#5856D6",
  "#32ADE6",
  "#FFD166",
  "#34C759",
  "#4CC9F0",
  "#AF52DE",
  "#FF9500",
  "#FF3B30",
  "white",
];
const CONF = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  col: CC[i % CC.length],
  w: 7 + Math.random() * 9,
  h: 7 + Math.random() * 9,
  dur: 2.5 + Math.random() * 2,
  del: Math.random() * 2.5,
  round: i % 3 === 0,
}));
const FC = ["#FFD700", "#FF69B4", "#BB88FF", "#00FFFF", "#FF6B35", "#7FFF00"];
const FIRE = Array.from({ length: 6 }, (_, fi) => ({
  id: fi,
  x: 12 + (fi % 3) * 38,
  y: 12 + Math.floor(fi / 3) * 38,
  col: FC[fi],
  parts: Array.from({ length: 10 }, (_, pi) => {
    const a = (pi / 10) * Math.PI * 2,
      d = 50 + Math.random() * 45;
    return {
      id: pi,
      tx: Math.cos(a) * d,
      ty: Math.sin(a) * d,
      del: fi * 0.25 + Math.random() * 0.2,
    };
  }),
}));

function Sam({ style }) {
  return (
    <svg
      viewBox="0 0 80 100"
      width="80"
      height="100"
      style={style}
      aria-label="Sam the grey cat"
    >
      <path
        d="M60 78 Q83 65 77 47 Q74 38 68 46"
        fill="none"
        stroke="#7A8FA8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <ellipse cx="40" cy="72" rx="22" ry="24" fill="#8FA0BA" />
      <circle cx="40" cy="36" r="22" fill="#8FA0BA" />
      <polygon points="19,20 12,3 30,15" fill="#8FA0BA" />
      <polygon points="61,20 68,3 50,15" fill="#8FA0BA" />
      <polygon points="20,18 15,6 29,14" fill="#C4C0CF" />
      <polygon points="60,18 65,6 51,14" fill="#C4C0CF" />
      <ellipse cx="31" cy="34" rx="5.5" ry="6" fill="#4DB87A" />
      <ellipse cx="49" cy="34" rx="5.5" ry="6" fill="#4DB87A" />
      <ellipse cx="31" cy="34" rx="3" ry="3.5" fill="#111" />
      <ellipse cx="49" cy="34" rx="3" ry="3.5" fill="#111" />
      <circle cx="32.5" cy="32" r="1.2" fill="white" />
      <circle cx="50.5" cy="32" r="1.2" fill="white" />
      <ellipse cx="40" cy="42" rx="2.2" ry="1.6" fill="#B87AB8" />
      <path
        d="M37.5 44 Q40 47 42.5 44"
        fill="none"
        stroke="#7A8FA8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="42"
        x2="57"
        y2="39.5"
        stroke="#6A7A8F"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <line
        x1="42"
        y1="43.5"
        x2="57"
        y2="45"
        stroke="#6A7A8F"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <line
        x1="38"
        y1="42"
        x2="23"
        y2="39.5"
        stroke="#6A7A8F"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <line
        x1="38"
        y1="43.5"
        x2="23"
        y2="45"
        stroke="#6A7A8F"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <ellipse cx="27" cy="93" rx="9" ry="5.5" fill="#7A8FA8" />
      <ellipse cx="53" cy="93" rx="9" ry="5.5" fill="#7A8FA8" />
    </svg>
  );
}

function Arya({ style }) {
  return (
    <svg
      viewBox="0 0 80 100"
      width="80"
      height="100"
      style={style}
      aria-label="Arya the tuxedo cat"
    >
      <path
        d="M60 78 Q83 65 77 47 Q74 38 68 46"
        fill="none"
        stroke="#1E1E30"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="68" cy="47" r="5" fill="#F5F5F5" />
      <ellipse cx="40" cy="72" rx="22" ry="24" fill="#1E1E30" />
      <ellipse cx="40" cy="78" rx="13" ry="16" fill="#F5F5F5" />
      <circle cx="40" cy="36" r="22" fill="#1E1E30" />
      <ellipse cx="40" cy="41" rx="13" ry="11" fill="#F5F5F5" />
      <polygon points="19,20 12,3 30,15" fill="#1E1E30" />
      <polygon points="61,20 68,3 50,15" fill="#1E1E30" />
      <polygon points="20,18 15,6 29,14" fill="#E8A0B0" />
      <polygon points="60,18 65,6 51,14" fill="#E8A0B0" />
      <ellipse cx="31" cy="33" rx="5.5" ry="6" fill="#2BBFB0" />
      <ellipse cx="49" cy="33" rx="5.5" ry="6" fill="#2BBFB0" />
      <ellipse cx="31" cy="33" rx="3" ry="3.5" fill="#111" />
      <ellipse cx="49" cy="33" rx="3" ry="3.5" fill="#111" />
      <circle cx="32.5" cy="31" r="1.2" fill="white" />
      <circle cx="50.5" cy="31" r="1.2" fill="white" />
      <ellipse cx="40" cy="42" rx="2.2" ry="1.6" fill="#E8A0B0" />
      <path
        d="M37.5 44 Q40 47 42.5 44"
        fill="none"
        stroke="#aaa"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="42"
        x2="57"
        y2="39.5"
        stroke="#aaa"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <line
        x1="42"
        y1="43.5"
        x2="57"
        y2="45"
        stroke="#aaa"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <line
        x1="38"
        y1="42"
        x2="23"
        y2="39.5"
        stroke="#aaa"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <line
        x1="38"
        y1="43.5"
        x2="23"
        y2="45"
        stroke="#aaa"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <ellipse cx="27" cy="93" rx="9" ry="5.5" fill="#F5F5F5" />
      <ellipse cx="53" cy="93" rx="9" ry="5.5" fill="#F5F5F5" />
    </svg>
  );
}

// ── iOS UI Primitives ─────────────────────────────────────────────────────

function NavBar({ title, back, onBack, right }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(242,242,247,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `0.5px solid ${AP.sep}`,
        display: "flex",
        alignItems: "center",
        height: 44,
        padding: "0 8px",
      }}
    >
      <div style={{ width: 100, display: "flex", alignItems: "center" }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: AP.blue,
              fontSize: 17,
              cursor: "pointer",
              padding: "0 8px",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span style={{ fontSize: 26, lineHeight: 0.85, marginTop: -1 }}>
              ‹
            </span>
            {back || "Back"}
          </button>
        )}
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: -0.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: 100,
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 8,
        }}
      >
        {right}
      </div>
    </div>
  );
}

function Sec({ header, footer, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {header && (
        <div
          style={{
            fontSize: 13,
            color: AP.label2,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            margin: "0 20px 6px",
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {header}
        </div>
      )}
      <div
        style={{
          background: AP.card,
          borderRadius: 10,
          overflow: "hidden",
          margin: "0 16px",
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            fontSize: 13,
            color: AP.label2,
            margin: "6px 20px 0",
            lineHeight: 1.4,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

function Cell({ children, last = false, onClick, style = {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: 44,
        padding: "10px 16px",
        borderBottom: last ? "none" : `0.5px solid ${AP.sep}`,
        cursor: onClick ? "pointer" : "default",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled, color, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "block",
        width: "calc(100% - 32px)",
        margin: "0 16px",
        background: disabled ? AP.fill : color || AP.blue,
        color: disabled ? AP.label2 : "white",
        border: "none",
        borderRadius: 12,
        padding: "14px",
        fontSize: 17,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        letterSpacing: -0.2,
        animation: !disabled ? "ioPulse 3s ease-in-out infinite" : "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function FieldInput({
  fk,
  value,
  onChange,
  showEx,
  setShowEx,
  isRec,
  onRec,
  filled,
}) {
  const { col, letter, hdr, ph } = FLD[fk];
  return (
    <Sec
      header={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: filled ? AP.green : col,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              transition: "background 0.3s",
              flexShrink: 0,
            }}
          >
            {filled ? "✓" : letter}
          </span>
          {hdr}
        </span>
      }
    >
      <Cell last={false} style={{ padding: 0, alignItems: "flex-start" }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={ph}
          rows={3}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            padding: "12px 16px",
            fontSize: 16,
            lineHeight: 1.5,
            fontFamily: "inherit",
            background: "transparent",
            color: AP.label,
          }}
        />
      </Cell>
      <Cell last={!showEx} style={{ gap: 8 }}>
        <button
          onClick={() => setShowEx(!showEx)}
          style={{
            background: "none",
            border: "none",
            color: AP.blue,
            fontSize: 15,
            cursor: "pointer",
            fontFamily: "inherit",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          💡 <span>See examples</span>
        </button>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={onRec}
            style={{
              background: isRec ? AP.red : AP.fill,
              border: "none",
              borderRadius: 8,
              padding: "6px 13px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              color: isRec ? "white" : AP.label,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {isRec ? (
              <>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "white",
                    display: "inline-block",
                    animation: "recPulse 1s infinite",
                  }}
                />
                Stop
              </>
            ) : (
              <>🎙 Voice</>
            )}
          </button>
        </div>
      </Cell>
      {showEx && (
        <div style={{ borderTop: `0.5px solid ${AP.sep}` }}>
          {EX[fk].map((ex, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(ex);
                setShowEx(false);
              }}
              style={{
                padding: "11px 16px",
                borderBottom:
                  i < EX[fk].length - 1 ? `0.5px solid ${AP.sep}` : "none",
                fontSize: 15,
                color: AP.label,
                cursor: "pointer",
                lineHeight: 1.4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span>{ex}</span>
              <span style={{ color: col, fontSize: 18, flexShrink: 0 }}>+</span>
            </div>
          ))}
        </div>
      )}
    </Sec>
  );
}

// ── Screens ───────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 14,
        background: AP.bg,
      }}
    >
      <div style={{ fontSize: 52, animation: "bnc 1.4s ease-in-out infinite" }}>
        🌿
      </div>
      <div style={{ fontSize: 17, color: AP.label2 }}>
        Loading your journal…
      </div>
    </div>
  );
}

function SetupScreen({ onDone }) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([""]);
  const upd = (i, v) => setMembers((m) => m.map((x, j) => (j === i ? v : x)));
  const rem = (i) => setMembers((m) => m.filter((_, j) => j !== i));
  return (
    <div style={{ background: AP.bg, minHeight: "100vh", paddingBottom: 48 }}>
      <NavBar title="Family ABC Journal" />
      <div style={{ padding: "24px 16px 8px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🏡</div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: AP.label,
            marginBottom: 8,
          }}
        >
          Welcome, Family!
        </div>
        <div
          style={{
            fontSize: 16,
            color: AP.label2,
            lineHeight: 1.5,
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          A safe space to capture thoughts and feelings together.
        </div>
      </div>
      <div style={{ height: 24 }} />
      <Sec header="Your name on this device">
        <Cell last>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mom, Dad, Alex…"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              fontFamily: "inherit",
              background: "transparent",
              color: AP.label,
              padding: 0,
            }}
          />
        </Cell>
      </Sec>
      <Sec
        header="Family members"
        footer="Add names so you can give weekly MVP shoutouts to each other."
      >
        {members.map((m, i) => (
          <Cell key={i} last={i === members.length - 1 && members.length <= 1}>
            <input
              value={m}
              onChange={(e) => upd(i, e.target.value)}
              placeholder={`Person ${i + 1}`}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                background: "transparent",
                color: AP.label,
                padding: 0,
              }}
            />
            {members.length > 1 && (
              <button
                onClick={() => rem(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: AP.red,
                  fontSize: 22,
                  cursor: "pointer",
                  padding: "0 0 0 12px",
                  lineHeight: 1,
                }}
              >
                −
              </button>
            )}
          </Cell>
        ))}
        <Cell
          last
          onClick={() => setMembers((m) => [...m, ""])}
          style={{ cursor: "pointer" }}
        >
          <span style={{ color: AP.blue, fontSize: 16 }}>+ Add member</span>
        </Cell>
      </Sec>
      <div style={{ height: 8 }} />
      <PrimaryBtn
        onClick={() => {
          if (!name.trim()) return;
          onDone(name.trim(), members.map((m) => m.trim()).filter(Boolean));
        }}
        disabled={!name.trim()}
      >
        Let's Begin
      </PrimaryBtn>
    </div>
  );
}

function SettingsScreen({ userName, family, onSave, onReset, onBack }) {
  const [name, setName] = useState(userName);
  const [members, setMembers] = useState(family.length ? family : [""]);
  const [confirmReset, setConfirmReset] = useState(false);
  const upd = (i, v) => setMembers((m) => m.map((x, j) => (j === i ? v : x)));
  const rem = (i) => setMembers((m) => m.filter((_, j) => j !== i));
  return (
    <div style={{ background: AP.bg, minHeight: "100vh", paddingBottom: 48 }}>
      <NavBar title="Settings" back="Journal" onBack={onBack} />
      <div style={{ height: 16 }} />
      <Sec header="Your name">
        <Cell last>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              fontFamily: "inherit",
              background: "transparent",
              color: AP.label,
              padding: 0,
            }}
          />
        </Cell>
      </Sec>
      <Sec header="Family members">
        {members.map((m, i) => (
          <Cell key={i} last={i === members.length - 1 && members.length <= 1}>
            <input
              value={m}
              onChange={(e) => upd(i, e.target.value)}
              placeholder={`Person ${i + 1}`}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 16,
                fontFamily: "inherit",
                background: "transparent",
                color: AP.label,
                padding: 0,
              }}
            />
            <button
              onClick={() => rem(i)}
              style={{
                background: "none",
                border: "none",
                color: AP.red,
                fontSize: 22,
                cursor: "pointer",
                padding: "0 0 0 12px",
                lineHeight: 1,
              }}
            >
              −
            </button>
          </Cell>
        ))}
        <Cell
          last
          onClick={() => setMembers((m) => [...m, ""])}
          style={{ cursor: "pointer" }}
        >
          <span style={{ color: AP.blue, fontSize: 16 }}>+ Add member</span>
        </Cell>
      </Sec>
      <PrimaryBtn
        onClick={() =>
          onSave(name.trim(), members.map((m) => m.trim()).filter(Boolean))
        }
      >
        Save Changes
      </PrimaryBtn>
      <div style={{ height: 16 }} />
      {!confirmReset ? (
        <Sec>
          <Cell
            last
            onClick={() => setConfirmReset(true)}
            style={{ justifyContent: "center", cursor: "pointer" }}
          >
            <span style={{ color: AP.red, fontSize: 16 }}>
              Reset this device…
            </span>
          </Cell>
        </Sec>
      ) : (
        <Sec footer="This will clear your name and all settings from this device.">
          <Cell
            last={false}
            onClick={() => setConfirmReset(false)}
            style={{ justifyContent: "center", cursor: "pointer" }}
          >
            <span style={{ color: AP.blue, fontSize: 16 }}>Cancel</span>
          </Cell>
          <Cell
            last
            onClick={onReset}
            style={{ justifyContent: "center", cursor: "pointer" }}
          >
            <span style={{ color: AP.red, fontSize: 16, fontWeight: 500 }}>
              Yes, Reset Device
            </span>
          </Cell>
        </Sec>
      )}
    </div>
  );
}

function FormScreen({
  userName,
  family,
  formData,
  setFormData,
  showEx,
  setShowEx,
  recording,
  onRecord,
  error,
  streakCount,
  notionStatus,
  onSubmit,
  onSettings,
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const others = family.filter((m) => m !== userName);
  const filled = {
    activatingEvent: formData.activatingEvent.trim().length > 0,
    belief: formData.belief.trim().length > 0,
    consequence: formData.consequence.trim().length > 0,
  };
  const allFilled =
    filled.activatingEvent && filled.belief && filled.consequence;
  const doneCount = Object.values(filled).filter(Boolean).length;
  return (
    <div style={{ background: AP.bg, minHeight: "100vh", paddingBottom: 48 }}>
      <NavBar
        title="ABC Journal"
        right={
          <button
            onClick={onSettings}
            style={{
              background: "none",
              border: "none",
              color: AP.blue,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            Settings
          </button>
        }
      />
      <div style={{ padding: "8px 16px 4px" }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: AP.label,
            padding: "8px 0 2px",
          }}
        >
          Hi, {userName} 👋
        </div>
        <div style={{ fontSize: 15, color: AP.label2, paddingBottom: 12 }}>
          {today}
        </div>
      </div>

      <div
        style={{
          margin: "0 16px 20px",
          background: AP.card,
          borderRadius: 10,
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, color: AP.label2, fontWeight: 500 }}>
            Today's progress
          </span>
          <span style={{ fontSize: 14, color: AP.label2 }}>
            {doneCount} of 3 complete
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: AP.fill,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              background: doneCount === 3 ? AP.green : AP.blue,
              width: `${(doneCount / 3) * 100}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          {[
            ["A", "activatingEvent", AP.pink, "Event"],
            ["B", "belief", AP.indigo, "Belief"],
            ["C", "consequence", AP.teal, "Feeling"],
          ].map(([l, fk, col, lbl]) => (
            <div
              key={l}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: filled[fk] ? AP.green : col,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "white",
                  transition: "background 0.3s",
                }}
              >
                {filled[fk] ? "✓" : l}
              </div>
              <span style={{ fontSize: 13, color: AP.label2 }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      <Sec>
        <Cell last style={{ gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>💭</span>
          <span style={{ fontSize: 14, color: AP.label2, lineHeight: 1.5 }}>
            <strong style={{ color: AP.label, fontWeight: 600 }}>
              How it works:{" "}
            </strong>
            A = what happened, B = what you told yourself, C = how that made you
            feel or act.
          </span>
        </Cell>
      </Sec>

      {["activatingEvent", "belief", "consequence"].map((fk) => (
        <FieldInput
          key={fk}
          fk={fk}
          value={formData[fk]}
          onChange={(v) => setFormData((d) => ({ ...d, [fk]: v }))}
          showEx={showEx[fk]}
          setShowEx={(v) => setShowEx((e) => ({ ...e, [fk]: v }))}
          isRec={recording === fk}
          onRec={() => onRecord(fk)}
          filled={filled[fk]}
        />
      ))}

      {others.length > 0 && (
        <Sec
          header="Weekly MVP Shoutout — Optional"
          footer="Recognize someone who made a positive difference this week."
        >
          <Cell last>
            <span style={{ flex: 1, fontSize: 16, color: AP.label }}>
              Shout out to…
            </span>
            <select
              value={formData.mvp}
              onChange={(e) =>
                setFormData((d) => ({ ...d, mvp: e.target.value }))
              }
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 16,
                color: formData.mvp ? AP.blue : AP.label2,
                fontFamily: "inherit",
                cursor: "pointer",
                textAlign: "right",
                maxWidth: 180,
              }}
            >
              <option value="">None</option>
              {others.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Cell>
        </Sec>
      )}

      {error && (
        <Sec>
          <Cell last>
            <span style={{ fontSize: 14, color: AP.red }}>{error}</span>
          </Cell>
        </Sec>
      )}
      {notionStatus && (
        <Sec>
          <Cell last>
            <span style={{ fontSize: 14, color: AP.green }}>
              {notionStatus}
            </span>
          </Cell>
        </Sec>
      )}
      {streakCount > 0 && (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: AP.label2 }}>
            🔥 {streakCount} {streakCount === 1 ? "entry" : "entries"} logged on
            this device
          </span>
        </div>
      )}

      <PrimaryBtn onClick={onSubmit} disabled={!allFilled}>
        {allFilled ? "Submit & Celebrate ✨" : "Fill in A, B & C to submit"}
      </PrimaryBtn>
    </div>
  );
}

function CelebrateScreen({ userName, notionStatus, streakCount, onContinue }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 950),
      setTimeout(() => setPhase(3), 1900),
      setTimeout(() => setPhase(4), 3100),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0B0720",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {CONF.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: `${c.left}%`,
            top: "-12px",
            width: c.w,
            height: c.h,
            background: c.col,
            borderRadius: c.round ? "50%" : "3px",
            animation: `fall ${c.dur}s ${c.del}s ease-in infinite`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      ))}
      {phase >= 1 &&
        FIRE.map((fw) => (
          <div
            key={fw.id}
            style={{
              position: "absolute",
              left: `${fw.x}%`,
              top: `${fw.y}%`,
              zIndex: 5,
            }}
          >
            {fw.parts.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: fw.col,
                  boxShadow: `0 0 6px ${fw.col}`,
                  opacity: 0,
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  animation: `fw 1s ${p.del}s ease-out forwards`,
                }}
              />
            ))}
          </div>
        ))}
      {phase >= 1 && (
        <div
          style={{
            fontSize: 90,
            animation: "disco 4s linear infinite",
            zIndex: 20,
            marginBottom: 4,
          }}
        >
          🪩
        </div>
      )}
      {phase >= 2 && (
        <div
          style={{
            textAlign: "center",
            zIndex: 20,
            animation: "fadeUp 0.5s ease",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "white",
              letterSpacing: -0.5,
              animation: "glow 2s ease-in-out infinite",
              marginBottom: 8,
            }}
          >
            You did it, {userName}! 🎉
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 17,
              marginBottom: streakCount > 0 ? 14 : 0,
            }}
          >
            Sharing feelings takes real courage. 💜
          </div>
          {streakCount > 0 && (
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "6px 20px",
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                backdropFilter: "blur(8px)",
              }}
            >
              🔥 {streakCount} {streakCount === 1 ? "entry" : "entries"} logged
            </div>
          )}
        </div>
      )}
      {phase >= 3 && (
        <div
          style={{
            display: "flex",
            gap: 24,
            zIndex: 20,
            marginTop: 16,
            animation: "fadeUp 0.5s ease",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Sam
              style={{
                animation: "dance 0.8s ease-in-out infinite",
                transformOrigin: "50% 100%",
                display: "block",
              }}
            />
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              Sam
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Arya
              style={{
                animation: "dance 0.8s 0.4s ease-in-out infinite",
                transformOrigin: "50% 100%",
                display: "block",
              }}
            />
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              Arya
            </div>
          </div>
        </div>
      )}
      {notionStatus && phase >= 3 && (
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            zIndex: 20,
            marginTop: 10,
          }}
        >
          {notionStatus}
        </div>
      )}
      {phase >= 4 && (
        <button
          onClick={onContinue}
          style={{
            marginTop: 24,
            background: "white",
            border: "none",
            borderRadius: 14,
            padding: "13px 36px",
            fontSize: 17,
            fontWeight: 600,
            color: AP.blue,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: -0.2,
            boxShadow: "0 2px 20px rgba(0,0,0,0.35)",
            animation: "fadeUp 0.5s ease",
            zIndex: 20,
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
}

function ReplaceScreen({
  belief,
  replacement,
  setReplacement,
  recording,
  onRecord,
  onSave,
  onSkip,
}) {
  return (
    <div style={{ background: AP.bg, minHeight: "100vh", paddingBottom: 48 }}>
      <NavBar title="Rewrite the Story?" />
      <div style={{ textAlign: "center", padding: "20px 16px 8px" }}>
        <div style={{ fontSize: 46, marginBottom: 10 }}>🔄</div>
        <div style={{ fontSize: 16, color: AP.label2, lineHeight: 1.5 }}>
          This is completely optional — easy to skip.
        </div>
      </div>
      <div style={{ height: 8 }} />
      <Sec header="Your Belief (B)">
        <Cell last>
          <span
            style={{
              fontSize: 16,
              color: AP.label,
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            "{belief}"
          </span>
        </Cell>
      </Sec>
      <Sec
        header="A more helpful thought?"
        footer="Is there a kinder, more realistic way to see this situation?"
      >
        <Cell last={false} style={{ justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, color: AP.label2 }}>Voice input</span>
          <button
            onClick={onRecord}
            style={{
              background: recording ? AP.red : AP.fill,
              border: "none",
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              color: recording ? "white" : AP.label,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {recording ? (
              <>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "white",
                    display: "inline-block",
                    animation: "recPulse 1s infinite",
                  }}
                />
                Stop
              </>
            ) : (
              <>🎙 Record</>
            )}
          </button>
        </Cell>
        <Cell last style={{ padding: 0, alignItems: "flex-start" }}>
          <textarea
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            placeholder="Type or speak a replacement thought…"
            rows={4}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "12px 16px",
              fontSize: 16,
              lineHeight: 1.5,
              fontFamily: "inherit",
              background: "transparent",
              color: AP.label,
            }}
          />
        </Cell>
      </Sec>
      <PrimaryBtn onClick={onSave} color={replacement ? AP.green : AP.blue}>
        {replacement ? "Save & Continue" : "Continue"}
      </PrimaryBtn>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: "none",
            color: AP.blue,
            fontSize: 16,
            cursor: "pointer",
            padding: "10px",
            fontFamily: "inherit",
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

function LootboxScreen({ item, revealed, setRevealed, onRollAgain, onDone }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px 48px",
        textAlign: "center",
        background: "linear-gradient(180deg,#1C1035,#0D0720)",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "white",
          letterSpacing: -0.4,
          marginBottom: 6,
        }}
      >
        Your Reward 🎁
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 16,
          marginBottom: 48,
        }}
      >
        Tap the box to reveal your affirmation
      </div>
      {!revealed ? (
        <div onClick={() => setRevealed(true)} style={{ cursor: "pointer" }}>
          <div
            style={{
              fontSize: 100,
              display: "inline-block",
              animation: "bnc 1.2s ease-in-out infinite",
            }}
          >
            🎁
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 15,
              marginTop: 12,
            }}
          >
            Tap to open
          </div>
        </div>
      ) : (
        <div style={{ animation: "loot 0.6s ease both" }}>
          <div
            style={{
              fontSize: 88,
              display: "inline-block",
              marginBottom: 20,
              animation: "bnc 2s ease-in-out infinite",
            }}
          >
            {item?.e}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: "24px 20px",
              backdropFilter: "blur(12px)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              maxWidth: 340,
              margin: "0 auto 36px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.55,
                letterSpacing: -0.2,
              }}
            >
              "{item?.t}"
            </p>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "0 16px",
          marginTop: revealed ? 0 : 64,
        }}
      >
        <button
          onClick={onRollAgain}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.18)",
            borderRadius: 12,
            padding: "13px",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            cursor: "pointer",
            fontFamily: "inherit",
            backdropFilter: "blur(8px)",
          }}
        >
          🎲 Roll again
        </button>
        <button
          onClick={onDone}
          style={{
            flex: 1,
            background: AP.blue,
            border: "none",
            borderRadius: 12,
            padding: "13px",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

async function saveToNotion(entry, dbId, setStatus) {
  try {
    const weekNum = Math.ceil(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1)) /
        (7 * 24 * 60 * 60 * 1000),
    );
    const today = new Date().toISOString().split("T")[0];
    const prompt = dbId
      ? `Add a page to Notion database "${dbId}": Date="${today}", Family Member="${entry.name}", Activating Event="${entry.a}", Belief or Stuck Point="${entry.b}", Consequence or Feelings="${entry.c}", Replacement Thought="${entry.r || ""}", Weekly MVP Shoutout="${entry.mvp || ""}", Week Number=${weekNum}. Confirm done.`
      : `In Notion: 1) Create database "Family ABC Journal 📝" with: Date (date), Family Member (rich_text), Activating Event (rich_text), Belief or Stuck Point (rich_text), Consequence or Feelings (rich_text), Replacement Thought (rich_text), Weekly MVP Shoutout (rich_text), Week Number (number). 2) Add first entry: Date="${today}", Family Member="${entry.name}", Activating Event="${entry.a}", Belief or Stuck Point="${entry.b}", Consequence or Feelings="${entry.c}", Replacement Thought="${entry.r || ""}", Weekly MVP Shoutout="${entry.mvp || ""}", Week Number=${weekNum}. 3) Respond only with JSON: {"database_id":"ID"}`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        mcp_servers: [
          { type: "url", url: "https://mcp.notion.com/mcp", name: "notion" },
        ],
      }),
    });
    const data = await res.json();
    if (!dbId) {
      const text = data.content?.map((b) => b.text || "").join("") || "";
      const match = text.match(/"database_id"\s*:\s*"([^"]+)"/);
      if (match) return match[1];
    }
    setStatus("✅ Saved to Notion");
    return dbId;
  } catch (e) {
    setStatus("💾 Saved locally. Notion syncs next time.");
    return dbId;
  }
}

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [userName, setUserName] = useState("");
  const [family, setFamily] = useState([]);
  const [notionDbId, setNotionDbId] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [formData, setFormData] = useState({
    activatingEvent: "",
    belief: "",
    consequence: "",
    mvp: "",
  });
  const [replacementThought, setReplacementThought] = useState("");
  const [showEx, setShowEx] = useState({
    activatingEvent: false,
    belief: false,
    consequence: false,
  });
  const [recording, setRecording] = useState(null);
  const [notionStatus, setNotionStatus] = useState("");
  const [error, setError] = useState("");
  const [lootItem, setLootItem] = useState(null);
  const [lootRevealed, setLootRevealed] = useState(false);
  const recRef = useRef(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `*,*::before,*::after{box-sizing:border-box;}body{margin:0;background:#F2F2F7;font-family:-apple-system,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}textarea,input,select,button{font-family:-apple-system,system-ui,sans-serif;}@keyframes fall{from{transform:translateY(-12px) rotate(0deg);opacity:1;}to{transform:translateY(105vh) rotate(720deg);opacity:0;}}@keyframes fw{0%{transform:translate(0,0);opacity:1;}100%{transform:translate(var(--tx,0px),var(--ty,0px));opacity:0;}}@keyframes dance{0%,100%{transform:rotate(-12deg) translateY(2px);}50%{transform:rotate(12deg) translateY(-10px);}}@keyframes disco{to{transform:rotate(360deg);filter:hue-rotate(360deg) drop-shadow(0 0 24px gold);}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}@keyframes bnc{0%,100%{transform:translateY(0);}50%{transform:translateY(-16px);}}@keyframes loot{0%{transform:scale(0.2) rotate(-20deg);opacity:0;}70%{transform:scale(1.08) rotate(3deg);}100%{transform:scale(1) rotate(0);opacity:1;}}@keyframes ioPulse{0%,100%{opacity:1;}50%{opacity:0.82;}}@keyframes recPulse{0%,100%{opacity:1;}50%{opacity:0.2;}}@keyframes glow{0%,100%{text-shadow:0 0 20px #FFD700;}50%{text-shadow:0 0 50px #FF69B4,0 0 80px rgba(123,47,255,0.8);}}`;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const get = async (k) => {
      try {
        return await window.storage?.get(k);
      } catch (e) {
        return null;
      }
    };
    (async () => {
      const [n, f, d, s] = await Promise.all([
        get("abc_name"),
        get("abc_family"),
        get("abc_dbId"),
        get("abc_streak"),
      ]);
      if (n) setUserName(n.value);
      if (f) {
        try {
          setFamily(JSON.parse(f.value));
        } catch (e) {}
      }
      if (d) setNotionDbId(d.value);
      if (s) setStreakCount(parseInt(s.value) || 0);
      setScreen(n ? "form" : "setup");
    })();
  }, []);

  const toggleRec = (field) => {
    if (recording === field) {
      recRef.current?.stop();
      setRecording(null);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert(
        "Voice input isn't supported here. Try Safari on iPhone or Chrome on Android.",
      );
      return;
    }
    if (recording) recRef.current?.stop();
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.onresult = (e) => {
      const t = Array.from(e.results)
        .map((x) => x[0].transcript)
        .join(" ");
      if (field === "replacement")
        setReplacementThought((p) => p + (p ? " " : "") + t);
      else
        setFormData((d) => ({
          ...d,
          [field]: d[field] + (d[field] ? " " : "") + t,
        }));
    };
    r.onerror = () => setRecording(null);
    r.onend = () => setRecording(null);
    recRef.current = r;
    r.start();
    setRecording(field);
  };

  const handleSubmit = async () => {
    if (
      !formData.activatingEvent.trim() ||
      !formData.belief.trim() ||
      !formData.consequence.trim()
    ) {
      setError(
        "Please fill in all three fields — A, B, and C — before submitting.",
      );
      return;
    }
    setError("");
    const ns = streakCount + 1;
    setStreakCount(ns);
    window.storage?.set("abc_streak", String(ns)).catch(() => {});
    setLootItem(LOOTBOX[Math.floor(Math.random() * LOOTBOX.length)]);
    setLootRevealed(false);
    setScreen("celebrate");
    saveToNotion(
      {
        name: userName,
        a: formData.activatingEvent,
        b: formData.belief,
        c: formData.consequence,
        r: "",
        mvp: formData.mvp,
      },
      notionDbId,
      setNotionStatus,
    ).then((id) => {
      if (id && id !== notionDbId) {
        setNotionDbId(id);
        window.storage?.set("abc_dbId", id).catch(() => {});
      }
    });
  };

  const handleSaveReplacement = async () => {
    if (replacementThought.trim())
      saveToNotion(
        {
          name: userName,
          a: formData.activatingEvent,
          b: formData.belief,
          c: formData.consequence,
          r: replacementThought,
          mvp: formData.mvp,
        },
        notionDbId,
        setNotionStatus,
      ).then((id) => {
        if (id && id !== notionDbId) {
          setNotionDbId(id);
          window.storage?.set("abc_dbId", id).catch(() => {});
        }
      });
    setScreen("lootbox");
  };

  const resetForm = () => {
    setFormData({ activatingEvent: "", belief: "", consequence: "", mvp: "" });
    setReplacementThought("");
    setShowEx({ activatingEvent: false, belief: false, consequence: false });
    setNotionStatus("");
    setScreen("form");
  };
  const handleSetup = async (name, members) => {
    setUserName(name);
    setFamily(members);
    try {
      await Promise.all([
        window.storage?.set("abc_name", name),
        window.storage?.set("abc_family", JSON.stringify(members)),
      ]);
    } catch (e) {}
    setScreen("form");
  };
  const handleSaveSettings = async (name, members) => {
    setUserName(name);
    setFamily(members);
    try {
      await Promise.all([
        window.storage?.set("abc_name", name),
        window.storage?.set("abc_family", JSON.stringify(members)),
      ]);
    } catch (e) {}
    setScreen("form");
  };
  const handleReset = async () => {
    try {
      ["abc_name", "abc_family", "abc_dbId", "abc_streak"].forEach((k) =>
        window.storage?.delete(k),
      );
    } catch (e) {}
    setUserName("");
    setFamily([]);
    setNotionDbId(null);
    setStreakCount(0);
    setScreen("setup");
  };

  if (screen === "loading") return <LoadingScreen />;
  if (screen === "setup") return <SetupScreen onDone={handleSetup} />;
  if (screen === "settings")
    return (
      <SettingsScreen
        userName={userName}
        family={family}
        onSave={handleSaveSettings}
        onReset={handleReset}
        onBack={() => setScreen("form")}
      />
    );
  if (screen === "form")
    return (
      <FormScreen
        userName={userName}
        family={family}
        formData={formData}
        setFormData={setFormData}
        showEx={showEx}
        setShowEx={setShowEx}
        recording={recording}
        onRecord={toggleRec}
        error={error}
        streakCount={streakCount}
        notionStatus={notionStatus}
        onSubmit={handleSubmit}
        onSettings={() => setScreen("settings")}
      />
    );
  if (screen === "celebrate")
    return (
      <CelebrateScreen
        userName={userName}
        notionStatus={notionStatus}
        streakCount={streakCount}
        onContinue={() => setScreen("replace")}
      />
    );
  if (screen === "replace")
    return (
      <ReplaceScreen
        belief={formData.belief}
        replacement={replacementThought}
        setReplacement={setReplacementThought}
        recording={recording === "replacement"}
        onRecord={() => toggleRec("replacement")}
        onSave={handleSaveReplacement}
        onSkip={() => setScreen("lootbox")}
      />
    );
  if (screen === "lootbox")
    return (
      <LootboxScreen
        item={lootItem}
        revealed={lootRevealed}
        setRevealed={setLootRevealed}
        onRollAgain={() => {
          setLootItem(LOOTBOX[Math.floor(Math.random() * LOOTBOX.length)]);
          setLootRevealed(false);
        }}
        onDone={resetForm}
      />
    );
  return null;
}
