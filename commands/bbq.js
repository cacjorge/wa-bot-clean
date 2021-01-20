const axios = require('axios');

exports.run = async (bot, message, args) => {
	//console.log(args);
	const resp = await axios.get('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
	//console.log(resp);
	bot.reply(message.from, resp.data[0].quote+' - '+resp.data[0].author, message.id);
};

exports.help = {
    name: "Breaking Bad Quotes",
    description: "Random Breaking Bad Quotes.",
    usage: "bbq",
    cooldown: 5
};
