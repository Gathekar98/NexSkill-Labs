const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "leads.json");

function readLeads() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveLead(entry) {
  const leads = readLeads();
  leads.push({ ...entry, receivedAt: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}

module.exports = { readLeads, saveLead };