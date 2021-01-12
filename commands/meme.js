const axios = require('axios');
const FormData = require('form-data');
const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (bot, message, args) => {
		if(args.length === 1){
			const subreddits = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'MemeEconomy', 'memes', 'blackpeopletwitter', 'torridmemes', 'comedyheaven']
			const randSub = subreddits[Math.random() * subreddits.length | 0];
			const response = await axios.get('https://meme-api.herokuapp.com/gimme/' + randSub);
			const { postlink, title, subreddit, url, nsfw, spoiler } = response.data;
			bot.sendFileFromUrl(message.from, `${url}`, 'meme.jpg', `${title}`);
		} else if(args.length >= 2){
					args.shift();
					//console.log('ARGS: '+args);
					const texto = args.join(" ");
					const top = texto.trim().split('|')[0];
					const bottomText = texto.trim().split('|')[1];
					//console.log('##########\n'+texto+'\n##########\n'+top+'\n##########\n'+bottomText+'\n##########\n');
					if(message.isMedia && message.type === 'image'){
						const mediaData = await decryptMedia(message, uaOverride);
						let form = new FormData();
						const imageBase64 = mediaData.toString('base64');
						//uploading image
						form.append('file', Buffer.from(imageBase64,'base64'), {filename: `telegraph.${message.mimetype}`});
						axios.create({headers: form.getHeaders()}).post('https://telegra.ph/upload', form).then(response => {
								let imageUrl = "https://telegra.ph" + response.data[0].src;
								let topText = top.replace(/ /g, '%20').replace('\n', '%5Cn');
								axios.get(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`, {responseType: 'arraybuffer'})
										.then(response => {
											const meme64 = (Buffer.from(response.data, 'binary').toString('base64'));
											bot.sendImage(message.from, `data:image/png;base64,${meme64.toString('base64')}`, message.id)
										})
										.catch(error => {console.log(error)});
							}).catch(error => {console.log("error")});
					} else if( message.quotedMsg && message.quotedMsg.type === 'image' ){
						let form = new FormData();
						const mediaData = await decryptMedia(message.quotedMsg, uaOverride);
						const imageBase64 = mediaData.toString('base64');
						//uploading image
						form.append('file', Buffer.from(imageBase64,'base64'), {filename: `telegraph.${message.mimetype}`});
						axios.create({headers: form.getHeaders()}).post('https://telegra.ph/upload', form).then(response => {
								let imageUrl = "https://telegra.ph" + response.data[0].src;
								let topText = top.replace(/ /g, '%20').replace('\n', '%5Cn');
								axios.get(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`, {responseType: 'arraybuffer'})
										.then(response => {
											const meme64 = (Buffer.from(response.data, 'binary').toString('base64'));
											bot.sendImage(message.from, `data:image/png;base64,${meme64.toString('base64')}`, message.id)
										})
										.catch(error => reject(error));
							}).catch(error => {
								console.log("error");
							});
					}
				}
};

exports.help = {
    name: "Meme",
    description: "Random meme or custom meme with top and bottom text with image",
    usage: "meme\nmeme <top><bottom> in caption of image or quoted image",
    cooldown: 5
};