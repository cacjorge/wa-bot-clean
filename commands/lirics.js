const fetch = require('node-fetch');

const lirics = async (string) => {
    const response = await fetch(`https://scrap.terhambar.com/lirik?word=${string}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirics for: ${string}\n\n${json.result.lirik}`
    return `[ Error ] No lyrics for ${string} were found!`
}


exports.run = async (bot, message, args) => {
	args.shift();
	
	if (args.length == 1) return bot.reply(message.from, 'Send command */letra [optional] *, example */letra Evidencias*', message.id);
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
