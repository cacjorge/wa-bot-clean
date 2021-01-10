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
					resultado += '*IBOVESPA:* \t'+bolsas.IBOVESPA.points+'\t'+bolsas.IBOVESPA.variation+'%\n';
					resultado += '*NASDAQ:* \t'+bolsas.NASDAQ.points+'\t\t'+bolsas.NASDAQ.variation+'%\n';
					resultado += '*########   MOEDAS     ######*\n';
					resultado += '\t\t\t*Compra*\n'
					resultado += '*DÓLAR (US):*\tR$ '+moedas.USD.buy+'\n';
					resultado += '*EURO:*\t\tR$ '+moedas.EUR.buy+'\n';
					resultado += '*LIBRA:*\t\tR$ '+moedas.GBP.buy+'\n';
					resultado += '*PESO (ARG):*\tR$ '+moedas.ARS.buy+'\n';
					resultado += '*BITCOIN:*\tR$ '+moedas.BTC.buy+'\n';
					resultado += '*########   TAXAS    ######*\n';
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