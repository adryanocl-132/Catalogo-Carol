import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Hostinger/Production: Ensure PORT is dynamic
const PORT = process.env.PORT || 3000;

// Path for the build output
const distPath = path.join(__dirname, 'dist');

// Diagnostic: Check if dist folder exists before starting
if (!fs.existsSync(distPath)) {
  console.error(`ERROR: The directory "${distPath}" was not found. Please run "npm run build" first.`);
}

try {
  // Serve static files from the 'dist' directory
  app.use(express.static(distPath));

  // Handle SPA routing: serve index.html for all non-file requests
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Build files not found. Please ensure "npm run build" completed successfully.');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> Production server is running on port ${PORT}`);
    console.log(`>>> Serving files from: ${distPath}`);
  }).on('error', (err) => {
    console.error('SERVER ERROR during listen:', err);
    process.exit(1);
  });
} catch (error) {
  console.error('CRITICAL STARTUP ERROR:', error);
  process.exit(1);
}
