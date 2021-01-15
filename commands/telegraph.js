const { decryptMedia } = require("@open-wa/wa-decrypt");
const { uploadImages } = require('../lib/fetcher')
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (bot, message, args) => {
	//console.log(message);
	let form = new FormData();
	if (message.isMedia && message.type === 'image' ) {
		const mediaData = await decryptMedia(message, uaOverride);
		let imageUrl = await uploadImages(mediaData,false,message.mimetype);
		bot.reply(message.from,imageUrl,message.id);
		} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
			const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
			let imageUrl = await uploadImages(mediaData,false,message.quotedMsg.mimetype);
			bot.reply(message.from,imageUrl,message.id);
		} 
};

exports.help = {
    name: "Telegraph",
    description: "Upload an image to Telegraph",
    usage: "telegraph <image>/<quoted message>",
    cooldown: 5
};