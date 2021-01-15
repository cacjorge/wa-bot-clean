const { fetchText } = require('../lib/fetcher')
const { isUrl } = require('../lib/functions');

exports.run = async (bot, message, args) => {
	console.log('Creating short url...')
	if (args.length === 2) {
		const url = args[1];
		if(isUrl(url)){
			fetchText(`https://tinyurl.com/api-create.php?url=${args[1]}`)
				.then((text) => bot.reply(message.from,text,message.id))
				.catch((err) => {
					console.log(err);
					bot.reply(message.from,'Não foi possível criar o link.',message.id);
				})
		} else bot.reply(message.from,'Não é um link válido',message.id);
	}
};

exports.help = {
    name: "Shortener",
    description: "Encurta uma url usando o serviço tinyurl.",
    usage: "shortener <url>",
    cooldown: 5
};
