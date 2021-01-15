const { decryptMedia } = require("@open-wa/wa-decrypt");
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const {
    uploadImages,
    custom
} = require('../lib/fetcher')

exports.run = async (bot, message, args) => {
		if(args.length === 1){
			const subreddits = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'MemeEconomy', 'memes', 'blackpeopletwitter', 'torridmemes', 'comedyheaven']
			const randSub = subreddits[Math.random() * subreddits.length | 0];
			const response = await axios.get('https://meme-api.herokuapp.com/gimme/' + randSub);
			const { postlink, title, subreddit, url, nsfw, spoiler } = response.data;
			bot.sendFileFromUrl(message.from, `${url}`, 'meme.jpg', `${title}`);
		} else if(args.length >= 2){
					args.shift();
					const texto = args.join(" ");
					const topText = texto.trim().split('|')[0];
					const bottomText = texto.trim().split('|')[1];
					if(message.isMedia && message.type === 'image'){
						const mediaData = await decryptMedia(message, uaOverride);
						let imageUrl = await uploadImages(mediaData,false,message.mimetype);
						const memeBase64 = await custom(imageUrl, topText, bottomText);
						bot.sendImage(message.from, memeBase64, message.id)
					} else if( message.quotedMsg && message.quotedMsg.type === 'image' ){
						const mediaData = await decryptMedia(message.quotedMsg, uaOverride);
						let imageUrl = await uploadImages(mediaData,false,message.quotedMsg.mimetype);
						const memeBase64 = await custom(imageUrl, topText, bottomText);
						bot.sendImage(message.from, memeBase64, message.id)
					}
				}
};

exports.help = {
    name: "Meme",
    description: "Random meme or custom meme with top and bottom text with image",
    usage: "meme\nmeme <top>|<bottom> in caption of image or quoted image",
    cooldown: 5
};