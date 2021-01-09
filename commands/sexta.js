let bakaNumber = ['********@c.us']
bakaNumber = ['556281313310@c.us'] // #ignoreline

exports.run = async (bot, message, args) => {
	const isBaka = bakaNumber.includes(message.sender.id);
	if (!isBaka) bot.reply(message.from, 'Você não é o Baka!', message.id);
	else bot.sendFile(message.from, '../media/videos/sexta.mp4', 'sexta.mp4', '*HOJE É SEXTA FEIRA!!*', bot.id);
};

exports.help = {
    name: "Sexta",
    description: "ANUNCIA A SEXTA-FEIRA",
    usage: "sexta",
    cooldown: 5
};
