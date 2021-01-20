const axios = require('axios');

exports.run = async (bot, message, args) => {
	//console.log(args);
	const resp = await axios.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
	bot.reply(message.from, resp.data[0]+ '- Ron Swanson', message.id);
};

exports.help = {
    name: "Ron Swanson Quotes",
    description: "Random Ron Swanson Quotes.",
    usage: "ron",
    cooldown: 5
};
