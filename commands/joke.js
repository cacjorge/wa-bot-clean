const axios = require('axios');

exports.run = async (bot, message, args) => {
	console.log(args);
	const joke = await axios.get('https://v2.jokeapi.dev/joke/Any');
	let jokeText = joke.joke;
	if(joke.type === 'twopart') const jokeText = joke.setup + '\n' + joke.delivery;
	bot.reply(message.from, jokeText , message.id)
};

exports.help = {
    name: "Joke",
    description: "Many jokes. Random.",
    usage: "joke"
    cooldown: 5
};
