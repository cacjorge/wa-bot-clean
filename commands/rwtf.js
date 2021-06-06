const fs = require('fs-extra');
const axios = require('axios');
const { spawn, exec } = require('child_process');



const SRImages = require('../lib/subreddit-images');
const SRImagesClient = new SRImages.Client();

exports.run = async (bot, message, args) => {
	if(!message.isGroupMsg) return bot.sendText(message.from,"Comando somente para grupos!");
	const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'));
	const isNSFW = nsfw_.includes(message.chat.id);
	console.log(nsfw_);
	if(isNSFW){
		SRImagesClient.real.wtf().then(json => {
									console.log('###############\n'+json.url+'\n##############\n');
									const ext = (json.url.split('.').reverse()[0]);
									switch(ext){
										case 'mp4':
												let file = './media/tempvideo.mp4'; 
												const writer = fs.createWriteStream(file); 
												axios.get(json.url,{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36', 'responseType': 'stream'}) 
														.then(res => { 
															res.data.pipe(writer); 
														});
												writer.on('finish', function(err){ 
														//client.sendFile(from, file, 'video.mp4', '','');
														exec(`ffmpeg -i ${file} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./media/out.mp4 -y`, async function (error, stdout, stderr) { 
																		await bot.sendFile(message.from, './media/out.mp4', 'video.mp4','') 
																	}); 
															});
											break
										default:
											bot.sendFileFromUrl(message.from, json.url);
											break
									}
								}).catch(error => {
									bot.reply(message.from,'Desculpe, não foi possível enviar a imagem. Repita o comando',message.id);
									console.log(error);
									// outputs error
								});
	} else bot.reply(message.from,'NSFW not enabled in this group',message.id);
		
}

exports.help = {
    name: "Random WTF",
    description: "If NSFW is enabled in group, send random WTF image",
    usage: "rwtf",
    cooldown: 5
};
