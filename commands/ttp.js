const { getStickerMaker } = require('../lib/ttp');

exports.run = async (bot, message, args) => {
	try{	
		args.shift();
		const string = args.join(" ");
		
		if(args)
		{
			if(message.quotedMsgObj == null)
			{
				const gasMake = await getStickerMaker(string);
				if(gasMake.status == true) {
					try{
						await bot.sendImageAsSticker(message.from, gasMake.base64);
					}catch(err) {
						await bot.reply(message.from, 'Failed to create.', message.id);
					} 
				} else {
					await bot.reply(message.from, gasMake.reason, message.id);
				}
			}else if(message.quotedMsgObj != null) {
				const gasMake = await getStickerMaker(message.quotedMsgObj.body);
				if(gasMake.status == true) {
					try{
						await bot.sendImageAsSticker(message.from, gasMake.base64);
					}catch(err) {
						await bot.reply(message.from, 'Failed to create.', message.id);
					}
				} else {
					await bot.reply(message.from, gasMake.reason, message.id);
				}
			}
		   
		}else{
			await bot.reply(message.from, 'Can not be empty.', message.id);
		}
	}catch(error){
		console.log(error);
	}
};

exports.help = {
    name: "Text to Sticker",
    description: "Stickerify text",
    usage: "ttp <text>",
    cooldown: 5
};