let ownerNumber = ["5562*****@c.us","*****"]; // replace with your whatsapp number
ownerNumber = ["556299313132@c.us","556299313132"]; // replace with your whatsapp number #ignoreline

exports.run = async (bot, message, args) => {

	if (message.isGroupMsg) return bot.reply(message.from, 'Comando somente no privado', message.id)

	if (!ownerNumber.includes(message.sender.id)) return bot.reply(message.from, 'Você não é o dono.', message.id)
	if (args.length < 2) return bot.reply(message.from, 'Send the command *#join [linkgroup]', message.id)
	const link = args[1]
	//const key = args[2]
	//const tGr = await bot.getAllGroups()
	const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
	const check = await bot.inviteInfo(link)
	if (!isLink) return bot.reply(message.from, 'Link inválido', message.id)
	if (check.status === 200) {
		await bot.joinGroupViaLink(link).then(() => bot.reply(message.from, 'The bot will be in soon!'))
	} else {
		bot.reply(message.from, 'Link inválido!', message.id)
	}
};

exports.help = {
    name: "Join Group",
    description: "joins group",
    usage: "join <link>",
    cooldown: 5
};
