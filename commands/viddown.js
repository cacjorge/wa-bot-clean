const youtubedl = require('youtube-dl');
const fs = require('fs-extra');

const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)


exports.run = async (bot, message, args) => {
	console.log(args);
	if (args.length === 1) bot.reply(message.from, 'Send command */viddown [url] *, example */viddown https://twitter.com/i/status/1337276001546432513*', message.id)
	if (args.length === 2) {
		const url = args[1];
		if (url.match(isUrl)) {
			const video = youtubedl(url
			  // Optional arguments passed to youtube-dl.
			  //['--format=18'],
			  // Additional options can be given for calling `child_process.execFile()`.
			  //{ cwd: __dirname }
			  );
		   try{
				video.on('info', function(info) {
									  console.log('Download started')
									  console.log('filename: ' + info._filename)
									  console.log('size: ' + info.size)
									  
									}
						);
				video.pipe(fs.createWriteStream('./media/videotemp.mp4'));
				video.on('end', function() {
						bot.sendFile(message.from,'./media/videotemp.mp4','videotemp.mp4','',message.id);
					});
			}catch{
					bot.reply(message.from,'Desculpe, não foi possível enviar.',message.id);
			};	
		} else {
					bot.reply(message.from, '[❗] The link you submitted is invalid!', message.id);
		}
	}
};

exports.help = {
    name: "Video Downloader",
    description: "Download a video from site (Facebook, Twitter, Instagram, Youtube and some others (others are at your own risk, may work, may not work)",
    usage: "viddown <url>",
    cooldown: 5
};

