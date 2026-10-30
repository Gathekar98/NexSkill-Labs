/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        surface: "#FFFBF7",
        surface2: "#F7F1FA",
        line: "#E9DFEC",
        violet: {
          DEFAULT: "#7B3FE4",
          deep: "#5420A0",
          soft: "#A679F2",
        },
        lilac: "#6C5CE7",
        cyan: "#079BBE",
        ember: "#C44D00",
        paper: "#241438",
        muted: "#6F6478",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(239,237,255,0.85) 0%, rgba(255,255,255,0) 78%)",
        "node-glow":
          "radial-gradient(circle at 50% 50%, rgba(101,84,232,0.16), transparent 70%)",
      },
      boxShadow: {
        glow: "0 12px 40px rgba(101,84,232,0.16)",
        card: "0 12px 36px rgba(48,44,91,0.09)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
