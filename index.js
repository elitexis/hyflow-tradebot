const express = require('express');
const Binance = require('node-binance-api');
const app = express();
const port = process.env.PORT || 3000;

// Cliente da Binance
const binance = new Binance().options({
  useServerTime: true
});

app.get('/simular', (req, res) => {
  binance.candlesticks("BTCUSDT", "1m", { limit: 10 }, (error, ticks, symbol) => {
    if (error) {
      console.error("Erro ao buscar dados:", error);
      // Envia uma única resposta de erro
      return res.status(500).json({ error: "Erro ao buscar dados da Binance" });
    }

    // Envia a resposta somente se não houve erro
    res.json({
      message: "Simulação realizada com sucesso",
      data: ticks
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
