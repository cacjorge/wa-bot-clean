const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require('axios');
const fs = require('fs-extra');
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const {
    uploadImages,
    custom
} = require('../lib/fetcher')


exports.run = async (bot, message, args) => {
	if (message.isMedia && message.type === 'image' ) {
			bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
			const writer = fs.createWriteStream('./media/triggered.gif');
			const mediaData = await decryptMedia(message, uaOverride);
			let imageUrl = await uploadImages(mediaData,false,message.mimetype);
			axios.get(`https://some-random-api.ml/canvas/triggered?avatar=${imageUrl}`, {responseType: "stream"})
						.then(response => {
								response.data.pipe(writer);
							});
			writer.on('finish', function(err){
				const aux = fs.readFileSync('./media/triggered.gif', { encoding: "base64" });
				bot.sendImageAsSticker(message.from, `data:image/gif;base64,${aux.toString('base64')}`)
			});
		} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
			bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
			const writer = fs.createWriteStream('./media/triggered.gif');
			const mediaData = await decryptMedia(message.quotedMsg, uaOverride);
			let imageUrl = await uploadImages(mediaData,false,message.quotedMsg.mimetype);
			axios.get(`https://some-random-api.ml/canvas/triggered?avatar=${imageUrl}`, {responseType: "stream"})
						.then(response => {
								response.data.pipe(writer);
							});
			writer.on('finish', function(err){
				const aux = fs.readFileSync('./media/triggered.gif', { encoding: "base64" });
				bot.sendImageAsSticker(message.from, `data:image/gif;base64,${aux.toString('base64')}`)
			});
		}
};

exports.help = {
    name: "Triggered",
    description: "Triggerify a picture",
    usage: "triggered <image>/<quoted>",
    cooldown: 5
};

