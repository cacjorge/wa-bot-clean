const listMedia = require('../lib/4chan-list-media');
const { sleep } = require('../lib/functions');
let ownerNumber = ["5562*****@c.us","*****"]; // replace with your whatsapp number
ownerNumber = ["556299313132@c.us","556299313132"]; // replace with your whatsapp number #ignoreline

exports.run = async (bot, message, args) => {
	console.log(args);
	if (!ownerNumber.includes(message.sender.id)) return bot.reply(message.from, 'Você não é o dono. Por enquanto só o dono!', message.id)
	if (args.length === 1) return bot.reply(message.from, 'Send command *4chan [link] *', message.id)
	if (args.length === 2) {
		const url = args[1];
		try {
				const data = await listMedia(url);
				bot.sendText(message.from,'4chan thread: ' + data.subject + ' ( '+data.media.length+' Images)');
				for (let i = 0; i < data.media.length; i++) {
					await bot.sendFileFromUrl(message.from, data.media[i].url, data.media[i].filename+data.media[i].ext, '');
					sleep(400);
				}
				bot.sendText(message.from,'*END OF THREAD*');
				
				
			} catch (err) {
				console.error('Whoa# 404# :c', err)
			}
			
		}

};

exports.help = {
    name: "4chan Thread",
    description: "Download media from a 4chan thread",
    usage: "4chanthread <url>",
    cooldown: 5
};
