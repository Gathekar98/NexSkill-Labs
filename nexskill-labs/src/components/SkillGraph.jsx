import { useEffect, useRef } from "react";

// Signature element: an animated knowledge graph — nodes for each
// discipline connecting into a central "you" node, drawing itself in
// on load and pulsing gently. Represents skills linking into experience.

const nodes = [
  { id: "you", x: 300, y: 200, r: 22, label: "You", core: true },
  { id: "ds", x: 130, y: 90, r: 13, label: "Data Science" },
  { id: "web", x: 470, y: 90, r: 13, label: "Web Dev" },
  { id: "mkt", x: 90, y: 260, r: 11, label: "Marketing" },
  { id: "research", x: 480, y: 270, r: 11, label: "Research" },
  { id: "career", x: 300, y: 340, r: 13, label: "Careers" },
];

const edges = [
  ["you", "ds"],
  ["you", "web"],
  ["you", "mkt"],
  ["you", "research"],
  ["you", "career"],
  ["ds", "web"],
  ["mkt", "career"],
  ["research", "web"],
];

export default function SkillGraph({ className = "" }) {
  const pathRefs = useRef([]);

  useEffect(() => {
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.getBoundingClientRect();
      el.style.transition = `stroke-dashoffset 1.1s ease ${0.15 * i}s`;
      el.style.strokeDashoffset = "0";
    });
  }, []);

  const find = (id) => nodes.find((n) => n.id === id);

  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      role="img"
      aria-label="Diagram of NexSkill Labs learning paths connecting into careers"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="200" r="120" fill="url(#coreGlow)" />

      {edges.map(([a, b], i) => {
        const A = find(a);
        const B = find(b);
        return (
          <line
            key={`${a}-${b}`}
            ref={(el) => (pathRefs.current[i] = el)}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="#3D2F6B"
            strokeWidth="1.5"
          />
        );
      })}

      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.core ? "#7C3AED" : "#1E1832"}
            stroke={n.core ? "#C4B5FD" : "#7C3AED"}
            strokeWidth={n.core ? 2 : 1.4}
          >
            {n.core && (
              <animate
                attributeName="r"
                values={`${n.r};${n.r + 4};${n.r}`}
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <text
            x={n.x}
            y={n.core ? n.y + 5 : n.y + n.r + 16}
            textAnchor="middle"
            fontSize={n.core ? 13 : 11}
            fontFamily="'JetBrains Mono', monospace"
            fill={n.core ? "#fff" : "#C4B5FD"}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
