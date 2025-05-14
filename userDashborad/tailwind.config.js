/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://png.pngtree.com/thumb_back/fh260/background/20220411/pngtree-minimalistic-3d-purple-podium-for-product-display-product-stand-simple-cube-photo-image_45217122.jpg')",
        'singin-pattern': "url('https://png.pngtree.com/thumb_back/fh260/background/20201101/pngtree-scene-with-geometrical-forms-the-poster-model-minimal-background-render-image_452981.jpg')",
        
      }
    },
  },
  plugins: [],
}