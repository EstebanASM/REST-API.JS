const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener todos los items
app.get('/items', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading items' });
        }
        res.status(200).json(JSON.parse(data));
    });
});

// Ruta para obtener un item por su ID
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading items' });
        }

        const items = JSON.parse(data);
        const item = items.find(item => item.id === parseInt(id));

        if (!item) {
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }

        res.status(200).json(item);
    });
});

// Ruta para crear un nuevo item
app.post('/items', (req, res) => {
    const newItem = req.body;
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading items' });
        }

        const items = JSON.parse(data);
        newItem.id = items.length + 1; // Asigna un nuevo ID
        items.push(newItem);

        fs.writeFile(path.join(__dirname, 'data', 'items.json'), JSON.stringify(items, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving item' });
            }
            res.status(201).json(newItem);
        });
    });
});

// Ruta para actualizar un item por su ID
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading items' });
        }

        let items = JSON.parse(data);
        const index = items.findIndex(item => item.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }

        items[index] = { ...items[index], ...updatedItem };

        fs.writeFile(path.join(__dirname, 'data', 'items.json'), JSON.stringify(items, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving updated item' });
            }
            res.status(200).json(items[index]);
        });
    });
});

// Ruta para eliminar un item por su ID
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading items' });
        }

        let items = JSON.parse(data);
        const index = items.findIndex(item => item.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }

        items.splice(index, 1); // Elimina el item de la lista

        fs.writeFile(path.join(__dirname, 'data', 'items.json'), JSON.stringify(items, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting item' });
            }
            res.status(204).send();
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
