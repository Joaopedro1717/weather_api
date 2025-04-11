const express = require('express');
const app = express();
const port = 3001;

const weatherData = {
    "São Paulo": 25,
    "Rio de Janeiro": 33,
    "Belo Horizonte": 28,
    "Curitiba": 10,
    "Salvador": 30
};

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    const temp = weatherData[city];

    if(temp !== undefined) {
        res.json({
            city: city.replace(/([A-Z])/g, ' $1').trim(),
            temp,
            unit: "Celsius"
        });
    } else {
        res.status(404).json({ error: "Cidade não encontrada" });
    }
});

app.listen(port, () => {
    console.log(`API B (clima) rodando em http://localhost:${port}`);
})