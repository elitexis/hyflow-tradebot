const express = require('express');
const Binance = require('node-binance-api');
const app = express();
const port = process.env.PORT || 3000;

const binance = new Binance().options({
  useServerTime: true,
  reconnect: true,
});

app.get('/simular', async (req, res) => {
  try {
    const candles = await binance.candlesticks("BTCUSDT", "1m", { limit: 10 });
    res.json({
      message: "Simulação realizada com sucesso",
      data: candles
    });
  } catch (err) {
    console.error("Erro ao buscar dados:", err.body || err);
    res.status(500).json({ error: "Erro ao buscar dados da Binance" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
