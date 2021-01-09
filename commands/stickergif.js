const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require('axios');
const fs = require('fs-extra');
const { spawn, exec } = require('child_process');

const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";


exports.run = async (bot, message, args) => {
    if (message.isMedia && message.type === 'video' || message.mimetype === 'image/gif') {
		try{
			const mediaData = await decryptMedia(message, uaOverride)
			bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
			await bot.sendMp4AsSticker(message.from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:10.0`,loop: 0})
		}catch(e){
			console.log(e);
			bot.reply(message.from, 'Media size is too big! Please reduce the duration of the video.',message.id);
		}
	} else if (message.quotedMsg && message.quotedMsg.type == 'video' || message.quotedMsg && message.quotedMsg.mimetype == 'image/gif'){
				try{
					const mediaData = await decryptMedia(message.quotedMsg, uaOverride)
					bot.reply(message.from, '[Wait] In Progress ⏳ Please Wait a Moment', message.id);
					await bot.sendMp4AsSticker(message.from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:10.0`,loop: 0});
				}catch(e){
					bot.reply(message.from, 'Media size is too big! please reduce the duration of the video.',message.id);
				}
				
			} else if (args.length === 2) {
					try{
						const url = args[1];
						if (url.match(isUrl)) {
							let ext = '';
							const dest = './media/';
							let extensao = url.split('.').reverse()[0];
							const writer = fs.createWriteStream(dest+'inputvideo.'+extensao);
							axios.get(url, {responseType: "stream"})
											.then(response => {
													const fileType = response.headers['content-type'];
													ext = fileType ? fileType.split('/').pop() : undefined;
													
													if(ext === 'webm' || ext === 'gif' || ext === 'mp4'){
														response.data.pipe(writer);
													} else return bot.reply(message.from,'Wrong Video Format. Only GIF, MP4 or WEBM',message.id);
													
												});
							writer.on('finish', function(err){
									let fileName = dest+'inputvideo.'+extensao;
									if(ext === 'gif' || ext === 'mp4'){
										exec(`gify ${fileName} ./media/output.gif --fps=10 --scale=320:320 --time 10`, function (error, stdout, stderr) {
													const gif =  fs.readFileSync('./media/output.gif', { encoding: "base64" });
													bot.sendImageAsSticker(message.from, `data:image/gif;base64,${gif.toString('base64')}`)
																.catch((err) => {
																		console.log(err);
																		bot.reply(message.from,'Error. Could not convert. Duration too long.',message.id);
																	});
																});
									} else if(ext === 'webm'){
											exec(`ffmpeg -c:v libvpx -t 10 -i ${fileName} -s:v 320:320 -filter:v fps=fps=10 -s:v 320:320 ./media/output.webp -y`, function (error, stdout, stderr) {
													const aux = fs.readFileSync('./media/output.webp', { encoding: "base64" });
													bot.sendRawWebpAsSticker(message.from, `data:image/webp;base64,${aux.toString('base64')}`)
																.catch((err) => {
																			console.log(err);
																			bot.reply(message.from,'Error. Could not convert. Duration too long.',message.id);
																		});
												});
											}
							});
						} else {
							bot.reply(message.from, '[❗] The link you submitted is invalid!', message.id);
						}
					}catch(e){
						console.log(e);
						bot.reply(message.from,'Error. Could not convert.',message.id);
					}
				}else {
					bot.reply(message.from, '[❗] Send a video with the caption */stickergif* or tag the video sent or url. Max 10 sec#', message.id)
				}
};

exports.help = {
    name: "StickerGif",
    description: "Stickerify a gif or video",
    usage: "stickergif <gif/video>/<quoted>/<url>",
    cooldown: 5
};