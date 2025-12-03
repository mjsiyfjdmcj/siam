const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Climate data API endpoints
const climateData = {
    co2Levels: [
        { year: 2020, value: 414.2 },
        { year: 2021, value: 416.4 },
        { year: 2022, value: 418.5 },
        { year: 2023, value: 420.8 },
        { year: 2024, value: 421.5 }
    ],
    temperatures: [
        { year: 2020, anomaly: 1.02 },
        { year: 2021, anomaly: 0.84 },
        { year: 2022, anomaly: 0.89 },
        { year: 2023, anomaly: 1.18 },
        { year: 2024, anomaly: 1.1 }
    ],
    iceExtent: [
        { year: 2020, extent: 4.9 },
        { year: 2021, extent: 4.7 },
        { year: 2022, extent: 4.5 },
        { year: 2023, extent: 4.3 },
        { year: 2024, extent: 4.2 }
    ]
};

// API Routes
app.get('/api/climate/current', (req, res) => {
    const currentData = {
        co2: climateData.co2Levels[climateData.co2Levels.length - 1].value,
        temperature: climateData.temperatures[climateData.temperatures.length - 1].anomaly,
        iceExtent: climateData.iceExtent[climateData.iceExtent.length - 1].extent,
        lastUpdated: new Date().toISOString()
    };
    res.json(currentData);
});

app.get('/api/climate/historical', (req, res) => {
    res.json(climateData);
});

app.get('/api/climate/co2', (req, res) => {
    res.json(climateData.co2Levels);
});

app.get('/api/climate/temperature', (req, res) => {
    res.json(climateData.temperatures);
});

app.get('/api/climate/ice', (req, res) => {
    res.json(climateData.iceExtent);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real app, you'd save this to a database or send an email
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
    });
});

// Newsletter signup
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    // In a real app, you'd add this to a mailing list
    console.log('Newsletter signup:', email);
    
    res.json({ 
        success: true, 
        message: 'Successfully subscribed to our newsletter!' 
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🌍 Climate Earth server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/climate/current`);
});