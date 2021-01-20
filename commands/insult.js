const axios = require('axios');

exports.run = async (bot, message, args) => {
	//console.log(args);
	const resp = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
	//console.log(resp);
	bot.reply(message.from, resp.data.insult , message.id);
};

exports.help = {
    name: "Insult",
    description: "Many insults. Random.",
    usage: "insult",
    cooldown: 5
};
