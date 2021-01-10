const fs = require('fs-extra');
const axios = require('axios');
const { spawn, exec } = require('child_process');

const TTSAPI = 'https://us-central1-sunlit-context-217400.cloudfunctions.net/streamlabs-tts'

exports.run = async (bot, message, args) => {
	try { 
	console.log(args);
			if (args.length === 1) return bot.reply(from, 'Send command */tts [Texto]*, for example *#tts oi como vai voce*') 
			if (args.length >= 2){
				args.shift();
				let texto = args.join(" ");
				console.log(texto);
				let file = './media/tts.oga';
				const writer = fs.createWriteStream(file);
				
				const payload = {
						  text: texto,
						  voice: 'Ricardo',
						} 
				axios 										
					.post(TTSAPI, payload) 					
					.then(res => {							
							axios.get(res.data.speak_url,{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36', 'responseType': 'stream'})
									.then(res => { 
										res.data.pipe(writer); 
									}) 
					}) 
					.catch(err => { 
					console.log('We got an error:', err) 
					}); 
				writer.on('finish', function(err){ 
							exec(`ffmpeg -i ${file} ./media/tts.mp3 -y`, async function (error, stdout, stderr) { 
											await bot.sendPtt(message.from, './media/tts.mp3', message.id) 
										}); 
								}); 
			}
		} catch (err){ 
			console.log(err) 
			bot.reply(message.from, 'Error', message.id) 
		}
};

exports.help = {
    name: "Text to Sound",
    description: "Soundify a text",
    usage: "tts <text>",
    cooldown: 5
};
