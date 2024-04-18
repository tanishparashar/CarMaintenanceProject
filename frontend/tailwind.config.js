/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#1553ff",
          
          "secondary": "#00ff8c",
                   
          "accent": "#00b9ff",
                   
          "neutral": "#00060d",
                   
          "base-100": "#f0fdff",
                   
          "info": "#00e5ff",
                   
          "success": "#00f896",
                   
          "warning": "#ec0000",
                   
          "error": "#ff7d8a",
        },
      },
    ],
  },
   plugins: [require("daisyui")],
}