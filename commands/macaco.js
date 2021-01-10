
exports.run = async (bot, message, args) => {
	q2 = Math.floor(Math.random() * 1500) + 200;
	q3 = Math.floor(Math.random() * 1500) + 200;
	bot.sendFileFromUrl(message.from, 'https://www.placemonkeys.com/'+q3+'/'+q2+'?random');
};

exports.help = {
    name: "Macaco",
    description: "Random picture of a monkey",
    usage: "macaco",
    cooldown: 5
};