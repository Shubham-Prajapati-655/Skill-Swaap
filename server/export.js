import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read data
const dbPath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(rawData);

// Convert skills to CSV
let csvContent = "ID,Title,Category,Type,User Name,User ID\n";

db.skills.forEach(skill => {
  // Wrap strings in quotes to handle commas in text
  const title = `"${(skill.title || '').replace(/"/g, '""')}"`;
  const category = `"${skill.category || ''}"`;
  const type = `"${skill.type || ''}"`;
  const user = `"${(skill.user || '').replace(/"/g, '""')}"`;
  const userId = `"${skill.userId || ''}"`;
  const id = `"${skill.id || ''}"`;

  csvContent += `${id},${title},${category},${type},${user},${userId}\n`;
});

// Save to Desktop
const desktopPath = path.join(__dirname, '..', '..', 'Skill_Data_Excel.csv');
fs.writeFileSync(desktopPath, csvContent, 'utf8');

console.log(`Successfully exported data to ${desktopPath}`);
