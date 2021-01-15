exports.run = async (bot, message, args) => {
	q2 = Math.floor(Math.random() * 900) + 300;
	q3 = Math.floor(Math.random() * 900) + 300;
	bot.sendFileFromUrl(message.from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png')
};

exports.help = {
    name: "Gato",
    description: "Random picture of a kitten",
    usage: "gato",
    cooldown: 5
};