const youtubedl = require('youtube-dl');
const fs = require('fs-extra');

const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
const isYtLink = new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async (bot, message, args) => {
	if (args.length === 1) return bot.reply(from, 'Send command *#ytmp3 [link] *, example *#ytmp3 http://www.youtube.com/watch?v=HVqCQLtgk04 *', id)
	if (args.length === 2) {
		const url = args[1];
		if (url.match(isYtLink)) {
			if(url.includes("list")) return bot.reply(message.from,'Remove playlist config from link, example: https://youtu.be/Gdi3ZSn86kw *?list=PLCBE2459339ADB405* remove the bold part from link',message.id);
			let filename = '';
			try {
			youtubedl.getInfo(url, function(err, info) {
							  if (err) throw err

							  //console.log('id:', info.id)
							  //console.log('title:', info.title)
							  //console.log('url:', info.url)
							  //console.log('thumbnail:', info.thumbnail)
							  //console.log('description:', info.description)
							  //console.log('filename:', info._filename)
							  //console.log('format id:', info.format_id)
							  filename = info._filename;
							
							});
			youtubedl.exec(url, ['-x', '--audio-format', 'mp3','-o', `${filename}`], {}, function(err, output) {
						if (err) {
							bot.reply(message.from,'Não foi possível converter esse vídeo',message.id);
							throw err;
						}
						sleep(200);
						filename = output[3].split(': ')[1];
						bot.sendFile(message.from, `./${filename}`,`./${filename}`,`./${filename}`, message.id)
						sleep(200);
						
						const pathToFile = `./${filename}`;
						fs.unlink(pathToFile, function(err) {
												if (err) {
														console.log( err );
													} else {
														console.log("Successfully deleted the file.")
													}
								});
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