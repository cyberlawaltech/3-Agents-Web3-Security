// v0.config.js

/** @type {import('v0').Config} */
const config = {
    output: './src/components/generated', // Updated output directory for generated components
    overwrite: true, // Allow overwriting for easier updates
    theme: 'custom', // Assuming a custom theme is used
    tailwind: {
      configPath: './tailwind.config.js', // Updated Tailwind config path to root
    },
  };
  
  module.exports = config;
