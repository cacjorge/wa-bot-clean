
exports.run = async (bot, message, args) => {
	const side = Math.floor(Math.random() * 2) + 1
	if (side == 1) {
	   bot.sendStickerfromUrl(message.from, 'https://i.ibb.co/LJjkVK5/heads.png')
	} else {
	   bot.sendStickerfromUrl(message.from, 'https://i.ibb.co/wNnZ4QD/tails.png')
	}
}

exports.help = {
    name: "Cara ou Coroa (Heads or Tails)",
    description: "Flip a coin",
    usage: "flip",
    cooldown: 5
};
