const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3005;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Run HTML file on host
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Project data object
const projectData = {};

// Route to send project data
app.get('/all', sendData);
function sendData(req, res) {
    res.send(projectData);
}

// POST request to add data
app.post('/add', (req, res) => {
    const { temp, feel, date } = req.body;
    if (temp && feel && date) {
        projectData['temp'] = temp;
        projectData['feel'] = feel;
        projectData['date'] = date;
        res.send(projectData);
    } else {
        res.status(400).send({ error: 'Invalid data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
