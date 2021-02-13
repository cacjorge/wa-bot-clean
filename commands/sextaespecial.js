const fs = require('fs-extra');

let bakaNumber = ['********@c.us']
bakaNumber = ['556281313310@c.us','556299313132@c.us']

exports.run = async (bot, message, args) => {
	const isBaka = bakaNumber.includes(message.sender.id);
	if (!isBaka) { 
		bot.reply(message.from, 'Você não é o Baka!!', message.id)
	}else {
		bot.sendFile(message.from, './media/videos/sextaespecial.mp4', message.id);
		const amaroneto = await fs.readFileSync('./media/videos/amaroneto.gif', { encoding: "base64" });
		await bot.sendImageAsSticker(message.from, `data:image/gif;base64,${amaroneto.toString('base64')}`);
		const groupMek = await bot.getGroupMembers(message.groupId);
		let heho = '╔═✪〘 *HOJE É SEXTA FEIRA* 〙\n'
		for (let i = 0; i < groupMek.length; i++) {
			heho += '╠➥'
			heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
		}
		heho += '╚═〘 *E SEGUNDA É FERIADO##* 〙';
		await sleep(300);
		console.log(heho);
		//await bot.sendTextWithMentions(message.from, heho); 
	}
};

exports.help = {
    name: "Sexta Especial",
    description: "ANUNCIA A SEXTA-FEIRA ESPECIAL",
    usage: "sextaespecial",
    cooldown: 5
};