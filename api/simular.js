const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: 'BTCUSDT',
        interval: '1m',
        limit: 10
      }
    });

    res.status(200).json({
      message: 'Simulação realizada com sucesso',
      data: response.data
    });
  } catch (error) {
    console.error('Erro na API Binance:', error.message);
    res.status(500).json({ error: 'Erro na API Binance' });
  }
}
