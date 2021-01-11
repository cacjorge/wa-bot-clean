const axios = require('axios');
const type = (currency) => {
      return `\n💲 *${currency.name} (${currency.code})* \nValor atual: R$ ${currency.bid} \nValor mais alto: R$ ${currency.high} \nValor mais baixo: R$ ${currency.low}\n`;
    };
exports.run = async (bot, message, args) => {
	const { data } = await axios.get('https://economia.awesomeapi.com.br/all/USD-BRL,BTC-BRL,EUR-BRL');
	bot.reply(message.from,`Cotação atual: 💎💰🤑💹 \n${type(data.USD)} ${type(data.EUR)} ${type(data.BTC)}`,message.id);
}

exports.help = {
    name: "Cotacao",
    description: "Retorna valores de moedas estrangeiras",
    usage: "cotacao",
    cooldown: 5,
};