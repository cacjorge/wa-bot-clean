const axios = require('axios');

exports.run = async (bot, message, args) => {
	axios.get('https://api.hgbrasil.com/finance?key=ab8a7654')
				.then(res => {
					let bolsas = res.data.results.stocks;
					let moedas = res.data.results.currencies;
					let bitcoin = res.data.results.bitcoin;
					let taxas = res.data.results.taxes;
					
					let resultado = '';
					resultado += '*#### MERCADO FINANCEIRO #####*\n';
					resultado += '*####       BOLSAS       #####*\n'
					resultado += '*IBOVESPA:* '+bolsas.IBOVESPA.points+' '+bolsas.IBOVESPA.variation+'%\n';
					resultado += '*NASDAQ:* '+bolsas.NASDAQ.points+' '+bolsas.NASDAQ.variation+'%\n';
					resultado += '*####       MOEDAS       #####*\n';
					resultado += '\t\t\tCompra\n'
					resultado += '*DÓLAR (US):*\t'+moedas.USD.buy+'\n';
					resultado += '*EURO:*\t\t'+moedas.EUR.buy+'\n';
					resultado += '*LIBRA:*\t\t'+moedas.GBP.buy+'\n';
					resultado += '*PESO (ARG):*\t'+moedas.ARS.buy+'\n';
					resultado += '*BITCOIN:*\t'+moedas.BTC.buy+'\n';
					resultado += '*####       TAXAS        #####*\n';
					resultado += '*CDI:* \t'+taxas[0].cdi+'%\n';
					resultado += '*SELIC:* \t'+taxas[0].selic+'%\n';
					
					bot.sendText(message.from,resultado);
				});
}

exports.help = {
    name: "Mercado Financeiro",
    description: "Retorna valores da bolsa e moedas estrangeiras",
    usage: "mercadofinanceiro",
    cooldown: 5,
};