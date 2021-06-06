const youtubedl = require('youtube-dl');
const fs = require('fs-extra');
const { isYtLink, sleep } = require('../lib/functions');


exports.run = async (bot, message, args) => {
	if (args.length === 1) return bot.reply(from, 'Send command *#ytmp3 [link] *, example *#ytmp3 http://www.youtube.com/watch?v=HVqCQLtgk04 *', id)
	if (args.length === 2) {
		const url = args[1];
		if (isYtLink(url)) {
			if(url.includes("list")) return bot.reply(message.from,'Remove playlist config from link, example: https://youtu.be/Gdi3ZSn86kw *?list=PLCBE2459339ADB405* remove the bold part from link',message.id);
			let filename = '';
			try {
			youtubedl.getInfo(url, function(err, info) {
							  if (err) throw err
							  filename = info._filename;
							});
			youtubedl.exec(url, ['-x', '--audio-format', 'mp3','-o', `${filename}`], {}, function(err, output) {
						if (err) {
							bot.reply(message.from,'Não foi possível converter esse vídeo',message.id);
							throw err;
						}
						console.log(output);
						sleep(200);
						let filename2 = filename.split('.')[0];
						console.log(filename2);
						bot.sendFile(message.from, `./${filename2}.mp3`,`./${filename2}.mp3`,`./${filename2}.mp3`, message.id)
						sleep(200);
						
						/* const pathToFile = `./${filename2}.mp3`;
						fs.unlink(pathToFile, function(err) {
												if (err) {
														console.log( err );
													} else {
														console.log("Successfully deleted the file.")
													}
								}); */
						}); 
		   }catch{
					bot.reply(from,'Desculpe, não foi possível enviar. Falha Catastrófica.',id);
					
			};
		} else {
			bot.reply(message.from, '[❗] The link you submitted is invalid! Are you sure it is a youtube link?', message.id);
		}
	}
};

exports.help = {
    name: "Video to MP3 Downloader",
    description: "Download a video from site Youtube to Mp3",
    usage: "ytmp3 <url>",
    cooldown: 5
};