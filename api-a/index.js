const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_B_URL = 'http://localhost:3001';

app.get('/recommendation/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(`${API_B_URL}/weather/${city}`);
        const { temp, unit } = response.data;

        let recommendation;
        if (temp > 30) {
            recommendation = "Está muito quente! Mantenha-se hidratado e use protetor solar.";
        } else if (temp > 15) {
            recommendation = "Clima agradável! Aproveite o dia.";
        } else {
            recommendation = "Está frio! Use um casaco.";
        }

        res.json({
            city: response.data.city,
            temp,
            unit,
            recommendation
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados do clima ou cidade não encontrada."});
    }
});

app.listen(port, () => {
    console.log(`API A rodando em http://localhost:${port}`);
});