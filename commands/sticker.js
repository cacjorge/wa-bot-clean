const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const { isUrl } = require('../lib/functions');


exports.run = async (bot, message, args) => {
    if (message.isMedia && message.type === 'image' ) {
		const mediaData = await decryptMedia(message, uaOverride)
		const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
		await bot.sendImageAsSticker(message.from, imageBase64)
		} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
			const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
			const imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
			await bot.sendImageAsSticker(message.from, imageBase64)
		}else if (args.length === 2) {
				const url = args[1];
				if (isUrl(url)) {
					await bot.sendStickerfromUrl(message.from, url, { method: 'get' })
						.catch(err => console.log('Caught exception: ', err))
				} else {
					bot.reply(message.from, '[❗] The link you submitted is invalid!', message.id);
				}
			} else {
					bot.reply(message.from, '[❗] Send the image with the caption *#sticker* or the image tag that has been sent or url', message.id);
			}
};

exports.help = {
    name: "Sticker",
    description: "Stickerify a picture",
    usage: "sticker <image>/<quoted>/<url>",
    cooldown: 5
};

