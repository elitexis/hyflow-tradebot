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
    binance.candlesticks("BTCUSDT", "1m", (error, ticks, symbol) => {
      if (error || !ticks) {
        console.error("Erro ao buscar dados:", error);
        return res.status(500).json({ error: "Erro ao buscar dados da Binance" });
      }

      res.json({
        message: "Simulação realizada com sucesso",
        data: ticks
      });
    }, { limit: 10 });
  } catch (err) {
    console.error("Erro inesperado:", err);
    res.status(500).json({ error: 'Erro inesperado ao simular' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
