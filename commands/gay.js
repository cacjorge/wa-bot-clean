const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require('axios');
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const {
    uploadImages,
    custom
} = require('../lib/fetcher')


exports.run = async (bot, message, args) => {
	if (message.isMedia && message.type === 'image' ) {
		const mediaData = await decryptMedia(message, uaOverride);
		let imageUrl = await uploadImages(mediaData,false,message.mimetype);
		await bot.sendFileFromUrl(message.from, `https://some-random-api.ml/canvas/gay?avatar=${imageUrl}`, 'Wasted.jpg', '', message.id)
		//bot.reply(message.from,imageUrl,message.id);
		} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
			const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
			let imageUrl = await uploadImages(mediaData,false,message.quotedMsg.mimetype);
			await bot.sendFileFromUrl(message.from, `https://some-random-api.ml/canvas/gay?avatar=${imageUrl}`, 'Wasted.jpg', '', message.id)
			//bot.reply(message.from,imageUrl,message.id);
		} else {
			await bot.reply(message.from, "Format Error!", message.id)
		}
};

exports.help = {
    name: "GAY",
    description: "put a rainbow coat on a picture",
    usage: "gay <image>/<quoted>",
    cooldown: 5
};

