const youtubedl = require('youtube-dl');
const fs = require('fs-extra');
const { spawn, exec } = require('child_process');


const { isUrl, isYtLink } = require('../lib/functions');


exports.run = async (bot, message, args) => {
	console.log(args);
	if (args.length === 1) bot.reply(message.from, 'Send command *#ytcut [url] [start(HH:MM:SS)] [end(HH:MM:SS)] *, example *#ytcut https://www.youtube.com/watch?v=HnzH15hwt48* 00:00:21 00:00:25', message.id)
	if (args.length === 4) {
		let filename = '';
		const url = args[1];
		if (isYtLink(url)) {
			youtubedl.getInfo(url, async function(err, info) {
				if (err) return bot.reply(message.from,'Não foi possível cortar esse vídeo',message.id);
				//console.log(info.url);
				//console.log(info._duration_hms);
				filename = info._filename;
				
				if(args[2]>args[3]) return bot.reply(message.from,"Start time is higher than end time.",message.id);
					else if (args[2] > info._duration_hms)
							return bot.reply(message.from,"Start time is later than duration of video.",message.id);
						else if (args[3] > info._duration_hms)
								return bot.reply(message.from,"End time is later than duration of video.",message.id);
				exec(`ffmpeg -i "${info.url}" -ss ${args[2]} -to ${args[3]} ./media/videocut.mp4`, function (error, stdout, stderr) {
						bot.sendFile(message.from,'./media/videocut.mp4',`${filename}`,' ', message.id)
							.then((_) => {
								fs.unlink('./media/videocut.mp4', function(err) {
											if (err) {
													console.log( err );
												} else {
													console.log("Successfully deleted the file.")
												}
								});
							})
							.catch((err) => {
										console.log(err);
										bot.reply(message.from,'Não foi possível cortar esse vídeo',message.id);
									});
					});
			})
		} else {
			bot.reply(message.from, '[❗] The link you submitted is invalid!', message.id);
		}
	} else bot.reply(message.from, '[❗] Missing arguments for the command! See usage with _#help ytcut_', message.id);
};

exports.help = {
    name: "Youtube Video Cutter & Downloader",
    description: "Download part of a youtube video.",
    usage: "\tytcut <url> <HH:MM:SS> <HH:MM:SS>\nexample *#ytcut https://www.youtube.com/watch?v=HnzH15hwt48* 00:00:21 00:00:25'",
    cooldown: 5
};