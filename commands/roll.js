const rpgDiceRoller = require('rpg-dice-roller');

exports.run = async (bot, message, args) => {
	if (args.length === 1) return bot.reply(message.from, 'Send command *roll [dice] *, example *roll 1d20 *', message.id)
	else if (args.length === 2) {
		const dice = message.body.split(' ')[1]
		const roller = new rpgDiceRoller.DiceRoller();
		roller.roll(dice);
		bot.reply(message.from, `You rolled: ${roller}`, message.id);
	}
};

exports.help = {
    name: "Roll Dice",
    description: "Roll an RPG dice",
    usage: "roll <dice> (ex: 1d20 or 2d4)",
    cooldown: 5
};
