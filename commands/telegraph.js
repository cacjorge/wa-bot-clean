const axios = require('axios');
const FormData = require('form-data');
const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (bot, message, args) => {
	//console.log(message);
	let form = new FormData();
	if (message.isMedia && message.type === 'image' ) {
		const mediaData = await decryptMedia(message, uaOverride);
		//const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
		const imageBase64 = mediaData.toString('base64');
		console.log(Buffer.from(imageBase64,'base64'));
		form.append('file', Buffer.from(imageBase64,'base64'), {filename: `telegraph.${message.mimetype}`});
		axios.create({headers: form.getHeaders()}).post('https://telegra.ph/upload', form).then(response => {
				console.log("https://telegra.ph" + response.data[0].src);
			}).catch(error => {
				console.log("error");
			});
		} else if (message.quotedMsg && message.quotedMsg.type == 'image') {
			const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
			const imageBase64 = mediaData.toString('base64');
			form.append('file', Buffer.from(imageBase64,'base64'), {filename: `telegraph.${message.quotedMsg.mimetype}`});
			axios.create({headers: form.getHeaders()}).post('https://telegra.ph/upload', form).then(response => {
				bot.reply(message.from,"https://telegra.ph" + response.data[0].src,message.id);
			}).catch(error => {
				bot.reply(message.from,"Erro, não foi possível enviar",message.id);
			});
		} 
};

exports.help = {
    name: "Telegraph",
    description: "Upload an image to Telegraph",
    usage: "telegraph <image>/<quoted message>",
    cooldown: 5
};