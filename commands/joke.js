const axios = require('axios');

exports.run = async (bot, message, args) => {
	//console.log(args);
	const resp = await axios.get('https://v2.jokeapi.dev/joke/Any');
	//console.log(resp);
	let jokeText = '';
	if(resp.data.type === 'twopart') jokeText = resp.data.setup + '\n' + resp.data.delivery;
		else jokeText  = resp.data.joke;
	console.log(jokeText);
	bot.reply(message.from, jokeText , message.id)
};

exports.help = {
    name: "Joke",
    description: "Many jokes. Random.",
    usage: "joke",
    cooldown: 5
};
