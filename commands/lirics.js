const { lirics } = require('../lib/functions');

exports.run = async (bot, message, args) => {
	args.shift();
	if (args.length == 1) return bot.reply(message.from, 'Send command *#lirics [title] *, example *#lirics Evidencias*', message.id);
	else {
		const string = args.join(" ");
		console.log(string);
		const liric = await lirics(string);
		bot.reply(message.from, liric, message.id);
	}
};

exports.help = {
    name: "Lirics",
    description: "Get lirics for a song",
    usage: "lirics <song title with artist>",
    cooldown: 5
};
