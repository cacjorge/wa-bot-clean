const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const { isUrl } = require('../lib/functions');


exports.run = async (bot, message, args) => {
		//console.log(message);
		if (message.quotedMsg && message.quotedMsg.type === 'sticker') {
			await bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
			try {
				const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
				const imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
				await bot.sendFile(message.from, imageBase64, `sticker.${message.quotedMsg.mimetype.split('/')[1]}`, '', message.id)
			} catch (err) {
				console.error(err)
				await bot.reply(message.from, 'Error!', message.id)
			}
		} else {
			await bot.reply(message.from, "Error!", message.id)
		}
};

exports.help = {
    name: "Sticker",
    description: "Stickerify a picture",
    usage: "sticker <image>/<quoted>/<url>",
    cooldown: 5
};

