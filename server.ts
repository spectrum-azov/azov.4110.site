import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import Papa from 'papaparse';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Google Sheets Config
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1dQUuwqX8xwnYad2SHMUH4gPNwUimzQnr9BWxF0Qwk4U';

// Helper to get authenticated doc for WRITING
async function getAuthenticatedDoc() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Service Account credentials missing');
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes

  // GET Vacancies: Uses public CSV export (No Credentials Required)
  app.get('/api/vacancies', async (req, res) => {
    try {
      // Fetch the first sheet as CSV
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }

      const csvText = await response.text();
      
      // Parse CSV
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase() // Normalize headers
      });

      // Map to our app's format
      // We look for headers like 'id', 'title', 'category'
      // If headers are missing, we might need to fallback to index, but let's try name matching first.
      const vacancies = result.data.map((row: any) => ({
        id: row.id || row['№'] || Math.random().toString(),
        title: row.title || row['назва'] || row['vacancy'] || 'Untitled',
        category: (row.category || row['категорія'] || 'combat').toLowerCase().includes('rear') ? 'rear' : 'combat'
      }));

      res.json(vacancies);
    } catch (error: any) {
      console.error('Error reading vacancies from public CSV:', error);
      res.status(500).json({ 
        error: 'Failed to read vacancies', 
        details: error.message 
      });
    }
  });

  // POST Applications: Requires Service Account (Google Security Requirement)
  app.post('/api/applications', async (req, res) => {
    try {
      const doc = await getAuthenticatedDoc();
      let sheet = doc.sheetsByTitle['Applications'];
      
      if (!sheet) {
        // Try to create it if it doesn't exist
        sheet = await doc.addSheet({ headerValues: ['timestamp', 'lastName', 'firstName', 'middleName', 'phone', 'telegram', 'isMilitary'], title: 'Applications' });
      }

      await sheet.addRow({
        timestamp: new Date().toISOString(),
        ...req.body
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Error saving application:', error);
      
      // Specific error message for missing credentials
      if (error.message === 'Service Account credentials missing') {
        return res.status(503).json({ 
          error: 'Server Configuration Required', 
          details: 'To save data, the site owner must configure a Google Service Account in the settings.' 
        });
      }

      res.status(500).json({ 
        error: 'Failed to save application',
        details: error.message
      });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
