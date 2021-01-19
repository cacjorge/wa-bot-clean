
exports.run = async (bot, message, args) => {
	 q7 = Math.floor(Math.random() * 890) + 1;
	bot.sendFileFromUrl(message.from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png','.', id)
};

exports.help = {
    name: "Pokemon",
    description: "Random Pokemon",
    usage: "pokemon",
    cooldown: 5
};
