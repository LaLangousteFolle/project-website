const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS pour autoriser les requêtes depuis ton domaine
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// URL de ton LM Studio (par défaut en local)
const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://localhost:1234/v1/chat/completions';

// Endpoint pour vérifier si le serveur fonctionne
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Endpoint pour chatter avec l'IA
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, temperature = 0.7, max_tokens = 2000 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Appel à LM Studio
    const response = await axios.post(LM_STUDIO_URL, {
      model: model || 'local-model',
      messages: messages,
      temperature: temperature,
      max_tokens: max_tokens,
      stream: false
    }, {
      timeout: 60000 // 60 secondes timeout
    });

    res.json({
      message: response.data.choices[0].message.content,
      model: response.data.model,
      usage: response.data.usage
    });

  } catch (error) {
    console.error('Error calling LM Studio:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'LM Studio is not running or not accessible',
        details: 'Make sure LM Studio is running and the API server is started'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
});

// Endpoint pour lister les modèles disponibles
app.get('/api/models', async (req, res) => {
  try {
    const modelsUrl = process.env.LM_STUDIO_URL?.replace('/chat/completions', '/models') 
                      || 'http://localhost:1234/v1/models';
    
    const response = await axios.get(modelsUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching models:', error.message);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 LM Studio URL: ${LM_STUDIO_URL}`);
  console.log(`🌍 Allowed origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:3000'}`);
});
