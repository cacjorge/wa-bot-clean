const ud = require('urban-dictionary');

exports.run = async (bot, message, args) => {
	args.shift();
	const term = args.join(" ");
	ud.define(term)
		.then((result) => {
			bot.sendText(message.from,`*URBAN DICTIONARY*\n*Termo:* ${result[0].word}\n*Definição:* ${result[0].definition}\n*Exemplo:* ${result[0].example}\n`);
		})
};

exports.help = {
    name: "Urban Dictionary",
    description: "Search a term on Urban Dictionary",
    usage: "ud <term>",
    cooldown: 5
};
