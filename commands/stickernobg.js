const { decryptMedia } = require("@open-wa/wa-decrypt");
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg');
const fs = require('fs-extra');

const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)


exports.run = async (bot, message, args) => {
	if (message.isMedia && message.type === 'image' ) {
		try {
			var mediaData = await decryptMedia(message, uaOverride);
			var imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
			var base64img = imageBase64;
			var outFile = './media/noBg.png';
			// for the api key you can get it on the website remove.bg
			var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'jStop5xAeABgDDC5Lx6Nv9EZ', size: 'auto', type: 'auto', outFile });
			//await fs.writeFile(outFile, result.base64img)
			await bot.sendImageAsSticker(message.from, `data:${message.mimetype};base64,${result.base64img}`);
		} catch(err) {
			console.log(err);
		}
	} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
		try {
			var mediaData = await decryptMedia(message.quotedMsg, uaOverride);
			var imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
			var base64img = imageBase64;
			var outFile = './media/img/noBg.png';
			var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'jStop5xAeABgDDC5Lx6Nv9EZ', size: 'auto', type: 'auto', outFile });
			//await fs.writeFile(outFile, result.base64img);
			await bot.sendImageAsSticker(message.from, `data:${message.quotedMsg.mimetype};base64,${result.base64img}`);
		} catch(err) {
			console.log(err);
		}
	} else {
			bot.reply(message.from, '[❗] Send the image with the caption */stickernobg* or the image tag that has been sent or url', message.id);
		}
};

exports.help = {
    name: "Sticker No Background",
    description: "Removing Background e stickerify a picture",
    usage: "stickernobg <image>/<quote image>/<url>",
    cooldown: 5
};