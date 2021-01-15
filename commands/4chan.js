const { sleep } = require('../lib/functions');
const fs = require('fs-extra');
const { spawn, exec } = require('child_process');

exports.run = async (bot, message, args) => {
	console.log(args);
	if (args.length === 1) return bot.reply(message.from, '*4chan [link to image/webm] *', message.id)
	if (args.length === 2) {
		const url = args[1];
		let extensao = url.split('.').reverse()[0];
		if(extensao === 'webm'){
			exec(`ffmpeg -i "${url}" -vcodec libx264  -profile:v baseline -level 3 ./media/videotemp.mp4`, function (error, stdout, stderr) {
							bot.sendFile(message.from,'./media/videotemp.mp4','videotemp.mp4',' ', message.id)
								.then((_) => {
									fs.unlink('./media/videotemp.mp4', function(err) {
												if (err) {
														console.log( err );
													} else {
														console.log("Successfully deleted the file.")
													}
									});
								})
								.catch((err) => {
											console.log(err);
											bot.reply(message.from,'Não foi possível converter esse vídeo',message.id);
										});
						});
		} else bot.reply(message.from,'Link inválido',message.id);
			
	}

};

exports.help = {
    name: "4chan",
    description: "Download media from a 4chan thread",
    usage: "\t4chan <url>",
    cooldown: 5
};
