const fs = require('fs-extra');
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'));

exports.run = async (bot, message, args) => {
	console.log(args);
	const isNSFW = nsfw_.includes(message.chat.id);
	
	const groupAdmins = message.isGroupMsg ? await bot.getGroupAdmins(message.chat.groupMetadata.id) : '';
	const isGroupAdmins = message.isGroupMsg ? groupAdmins.includes(message.sender.id) : false;
	if (!message.isGroupMsg) return bot.reply(message.from, 'Comando somente para grupos!!', message.id);
	if (!isGroupAdmins) return bot.reply(message.from, 'Esse comando pode ser executado somente pelos admins do grupo!', message.id);
	if (args.length === 1){
		if(isNSFW) return bot.reply(message.from, 'NSFW está ativado nesse grupo!', message.id);
			else return bot.reply(message.from, 'NSFW está desativado nesse grupo!', message.id);
	}else if (args.length === 2){
		switch(args[1].toLowerCase()){
			case 'ativar':
				if(isNSFW) return bot.reply(message.from,'NSFW já habilitado!',message.id);
				nsfw_.push(message.chat.id);
				fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_));
				bot.reply(message.from, 'NSFW ativado com sucesso! Envie *#nsfwMenu* para o menu NSFW', message.id);
			break
			case 'desativar':
				if(!isNSFW) return bot.reply(message.from,'NSFW já desabilitado!',message.id);
				nsfw_.splice(message.chat.id, 1);
				fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_));
				bot.reply(message.from, 'NSFW desativado com sucesso!!', message.id);
			break
			default:
					bot.reply(message.from, 'Envie ativar ou desativarSend enable or disable!', message.id);
			break
		}
	} else return bot.reply(message.from,'Parâmetros demais!',message.id);
};

exports.help = {
    name: "NSFW",
    description: "Ativa/Desativa conteúdo adulto para o grupo",
    usage: "nsfw ativar or desativar",
    cooldown: 5
};
