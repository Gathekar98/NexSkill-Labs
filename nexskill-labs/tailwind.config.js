/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0B1A",
        surface: "#161226",
        surface2: "#1E1832",
        line: "#2C2444",
        violet: {
          DEFAULT: "#7C3AED",
          deep: "#4C1D95",
          soft: "#A78BFA",
        },
        lilac: "#C4B5FD",
        cyan: "#22D3EE",
        ember: "#F472B6",
        paper: "#F4F1FB",
        muted: "#9C93B5",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, rgba(14,11,26,0) 60%)",
        "node-glow":
          "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.35), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.25)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
