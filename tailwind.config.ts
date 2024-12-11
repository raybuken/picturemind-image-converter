import daisyui from "daisyui";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        picturemindTheme: {
          "primary": "rgb(147 51 234)",
          "primary-content": "#160014",
          "secondary": "#00a9ff",
          "secondary-content": "#000a16",
          "accent": "#0000ff",
          "accent-content": "#c6dbff",
          "neutral": "#242a2d",
          "neutral-content": "#ced0d1",
          "base-100": "#1d2322",
          "base-200": "#181d1c",
          "base-300": "#131716",
          "base-content": "#cccece",
          "info": "#008be2",
          "info-content": "#000712",
          "success": "#57c135",
          "success-content": "#030e01", 
          "warning": "#d47000",
          "warning-content": "#100400",
          "error": "#c10035",
          "error-content": "#f9d5d4",
        }
      },
    ]
  },
  plugins: [
    daisyui,
  ],
}

