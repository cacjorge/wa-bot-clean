const fs = require('fs-extra');
const { decryptMedia } = require("@open-wa/wa-decrypt");
const { spawn, exec } = require('child_process');
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

exports.run = async (bot, message, args) => {
		if(args.length === 1){
			
		} else if(args.length >= 2){
					args.shift();
					//console.log('ARGS: '+args);
					const texto = args.join(" ");
					const top = texto.trim().split('|')[0];
					const bottomText = texto.trim().split('|')[1];
					bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
					//console.log('##########\n'+texto+'\n##########\n'+top+'\n##########\n'+bottomText+'\n##########\n');
					if(message.isMedia && message.type === 'video'){
						const mediaData = await decryptMedia(message, uaOverride);
						let outFile = './media/temp.mp4';
						await fs.writeFile(outFile, mediaData).then(() => {
								exec(`ffmpeg -i ${outFile} -vf "										drawtext=fontfile=./fonts/arialbd.ttf:text=${top}:x=(w-text_w)/2:y=10:fontsize=(h/10):fontcolor=white:borderw=2.5:bordercolor=black,										drawtext=fontfile=./fonts/arialbd.ttf:text=${bottomText}:x=(w-text_w)/2:y=h-th-10:fontsize=(h/10):fontcolor=white:borderw=2.5:bordercolor=black" -c:a copy ./media/memevideo.mp4`, function (error, stdout, stderr) {
												bot.sendFile(message.from,'./media/memevideo.mp4','memevideo.mp4',' ', message.id)
													.then((_) => {
														fs.unlink('./media/memevideo.mp4', function(err) {
																	if (err) {
																			console.log( err );
																		} else {
																			console.log("Successfully deleted the file.")
																		}
														});
													})
													.catch((err) => {
																console.log(err);
																bot.reply(message.from,'Something went wrong.',message.id);
															});
									if(error) console.log(error);
									});
							});
					}else if( message.quotedMsg && message.quotedMsg.type === 'video' ){
						const mediaData = await decryptMedia(message.quotedMsg, uaOverride);
						let outFile = './media/tempquoted.mp4';
						await fs.writeFile(outFile, mediaData).then(() => { 
								exec(`ffmpeg -i ${outFile} -vf "										drawtext=fontfile=./fonts/arialbd.ttf:text=${top}:x=(w-text_w)/2:y=10:fontsize=(h/10):fontcolor=white:borderw=2.5:bordercolor=black,										drawtext=fontfile=./fonts/arialbd.ttf:text=${bottomText}:x=(w-text_w)/2:y=h-th-10:fontsize=(h/10):fontcolor=white:borderw=2.5:bordercolor=black" -c:a copy ./media/memevideoquoted.mp4`, function (error, stdout, stderr) {
												bot.sendFile(message.from,'./media/memevideoquoted.mp4','memevideoquoted.mp4',' ', message.id)
													.then((_) => {
														fs.unlink('./media/memevideoquoted.mp4', function(err) {
																	if (err) {
																			console.log( err );
																		} else {
																			console.log("Successfully deleted the file.")
																		}
														});
													})
													.catch((err) => {
																console.log(err);
																bot.reply(message.from,'Something went wrong.',message.id);
															});
									if(error) console.log(error);
									});
							});
					}
				}
};

exports.help = {
    name: "Meme Video",
    description: "Custom meme from video or gif with top and bottom text within",
    usage: "memevideo <top>|<bottom> in caption of image or quoted image",
    cooldown: 5
};