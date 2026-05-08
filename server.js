const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// Autoriser le traitement du JSON volumineux
app.use(express.json({ limit: '10mb' }));
// Servir le dossier "public" (ton fichier index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Créer le dossier et le fichier data.json s'ils n'existent pas encore
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ transactions: [], categories: [], accounts: [], budgets: {} }));
}

// Route pour LIRE les données
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture' });
        res.type('json').send(data);
    });
});

// Route pour SAUVEGARDER les données
app.post('/api/data', (req, res) => {
    fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Erreur de sauvegarde' });
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));