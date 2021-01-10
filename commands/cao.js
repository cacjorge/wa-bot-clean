const fetch = require('node-fetch');

exports.run = async (bot, message, args) => {
	const dog = await fetch('https://random.dog/woof.json',{ headers: { 'User-Agent': 'meu pau de binoculo' } })
	const resultDog = await dog.json();
	bot.sendFileFromUrl(message.from, resultDog.url);
};

exports.help = {
    name: "Cao",
    description: "Random picture of a dog",
    usage: "cao",
    cooldown: 5
};