import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Specify output directory for production build (default is 'dist')
//     target: 'esnext', // Build target for modern browsers
//     minify: 'esbuild', // Use esbuild for minification (faster)
//     sourcemap: false, // Disable sourcemaps in production
//     assetsDir: 'assets', // Organize assets like images and fonts in an 'assets' directory
//     rollupOptions: {
//       // Ensure that Vercel serves index.html for all routes (SPA routing)
//       input: 'index.html', 
//     },
//   },
//   server: {
//     host: true, // Allows access to the dev server from other machines
//     port: 3000, // Set the port for development server
//   },
//   define: {
//     'process.env': {} // In case you need to reference environment variables
//   }
// })

// import { defineConfig } from 'vite';

// -----------------------------------//
// export default defineConfig({
//   build: {
//     outDir: 'dist',
//   },
// });
