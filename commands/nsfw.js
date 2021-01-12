const fs = require('fs-extra');
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'));

exports.run = async (bot, message, args) => {
	console.log(args);
	if(!message.isGroupMsg) return bot.sendText(message.from,"Comando somente para grupos!");
	const groupAdmins = message.isGroupMsg ? await bot.getGroupAdmins(message.chat.groupMetadata.id) : ''
	const isGroupAdmins = message.isGroupMsg ? groupAdmins.includes(message.sender.id) : false
	if (!message.isGroupMsg) return bot.reply(message.from, 'This command can only be used in groups!', message.id);
	if (!isGroupAdmins) return bot.reply(message.from, 'This command can only be used by group admins!!', message.id);
	if (args.length === 1) return bot.reply(message.from, 'Select enable or disable!', message.id);
	if (args[1].toLowerCase() === 'enable') {
		if(nsfw_.includes(message.chat.id)) return bot.reply(message.from,'NSFW already enabled in this group!',message.id);
		nsfw_.push(message.chat.id)
		fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
		bot.reply(message.from, 'NSFW Command successfully activated in this group! Send command *#nsfwMenu* to find out the special menu', message.id);
	} else if (args[1].toLowerCase() === 'disable') {
			if(!nsfw_.includes(message.chat.id)) return bot.reply(message.from,'NSFW already disabled in this group!',message.id);
			nsfw_.splice(message.chat.id, 1)
			fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
			bot.reply(message.from, 'NSFW Command successfully deactivated in this group!', message.id)
			} else {
				bot.reply(message.from, 'Select enable or disable!', message.id)
			}
};

exports.help = {
    name: "NSFW",
    description: "Enables/Disables nsfw content for group",
    usage: "nsfw enable or disable",
    cooldown: 5
};
