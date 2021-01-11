const ud = require('urban-dictionary');

exports.run = async (bot, message, args) => {
	ud.term(args[1])
		.then((result) => {
			const entries = result.entries;
			bot.sendText(message.from,`*Termo:* ${entries[0].word}\n *Definição:* ${entries[0].definition}\n *Exemplo:* ${entries[0].example}\n`);
		})
};

exports.help = {
    name: "Urban Dictionary",
    description: "Search a term on Urban Dictionary",
    usage: "ud <term>",
    cooldown: 5
};
