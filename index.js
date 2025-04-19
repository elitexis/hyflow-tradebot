
const express = require('express');
const Binance = require('binance-api-node').default;

const app = express();
const port = process.env.PORT || 3000;

const client = Binance();

app.get('/simular', async (req, res) => {
  try {
    const candles = await client.candles({ symbol: 'BTCUSDT', interval: '1m', limit: 10 });
    res.json({ message: 'Simulação realizada com sucesso', data: candles });
  } catch (error) {
    res.status(500).json({ error: 'Erro na simulação' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
