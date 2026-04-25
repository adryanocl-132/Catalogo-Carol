import express from 'express';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// SECURITY: Use Helmet to secure Express apps by setting various HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:", "http:"],
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      "connect-src": ["'self'", "https://*.googleapis.com"],
    },
  },
}));

// Hostinger/Production: Ensure PORT is dynamic
const PORT = process.env.PORT || 3000;

// Path for the build output
const distPath = path.join(__dirname, 'dist');

// Diagnostic: Check if dist folder exists before starting
if (!fs.existsSync(distPath)) {
  console.error(`ERROR: The directory "${distPath}" was not found. Please run "npm run build" first.`);
}

// Basic health check to ensure the process is responding to the host's manager
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

try {
  // Serve static files from the 'dist' directory
  app.use(express.static(distPath));

  // Handle SPA routing: serve index.html for all non-file requests
  app.get('*all', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Application files not found. Please ensure the build completed successfully.');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> Server is healthy and running on port ${PORT}`);
    console.log(`>>> Static files path: ${distPath}`);
  }).on('error', (err) => {
    console.error('SERVER ERROR:', err);
    process.exit(1);
  });
} catch (error) {
  console.error('BOOT ERROR:', error);
  process.exit(1);
}
