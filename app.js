const express = require('express');
const path = require('path');
const { searchTamboPizzas } = require('./automations/tambo_search');
const app = express();
const port = 3000;

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para buscar productos
app.get('/search-pizzas', async (req, res) => {
    try {
        const query = req.query.q || 'Pizzas';
        console.log('Iniciando búsqueda de:', query);
        const results = await searchTamboPizzas(query);
        console.log('Resultados obtenidos:', results);
        res.json(results);
    } catch (error) {
        console.error('Error en el endpoint:', error);
        res.status(500).json({ error: 'Error en la búsqueda', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});