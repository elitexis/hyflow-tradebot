
const express = require('express');
const Binance = require('node-binance-api');
const app = express();
const port = process.env.PORT || 3000;

// Inicializa a Binance com horário do servidor
const binance = new Binance().options({
  useServerTime: true
});

app.get('/simular', async (req, res) => {
  try {
    binance.candlesticks("BTCUSDT", "1m", (error, ticks, symbol) => {
      if (error) {
        return res.status(500).json({ error: "Erro ao buscar dados da Binance" });
      }
      res.json({ message: "Simulação realizada com sucesso", data: ticks });
    }, { limit: 10 });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno inesperado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
