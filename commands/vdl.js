const youtubedl = require('youtube-dl');
const { isUrl } = require('../lib/functions');
exports.run = async (bot, message, args) => {
	console.log(args);
	if (args.length === 1) bot.reply(message.from, 'Send command *vdl [url] *, example *vdl https://twitter.com/i/status/1337276001546432513*', message.id)
	if (args.length === 2) {
		const url = args[1];
		if (isUrl(url)) {
			//const video = youtubedl(url);
			//let filepath = 'temp.mp4';
			
			youtubedl.getInfo(url, async function(err, info) {
				  if (err) throw err
				  await bot.sendFileFromUrl(message.from,info.url,info._filename,info.title,message.id).catch(() => bot.reply(message.from, '[❗] An error occurred, maybe the error is caused by the system.', message.id));
				});
		} else {
			bot.reply(message.from, '[❗] The link you submitted is invalid!', message.id);
		}
	}
};

exports.help = {
    name: "Video Downloader",
    description: "Download a video from site (Facebook, Twitter, Instagram, Youtube and some others (others are at your own risk, may work, may not work)",
    usage: "\tvdl <url>",
    cooldown: 5
};

