const { evaluate } = require("mathjs");

exports.run = async (bot, message, args) => {
	try{
		console.log('args: '+args);args.shift();
		const expressions = args.join(" ");
		console.log('exp: '+expressions);
		const answer = evaluate(expressions);
		console.log(answer);
		bot.reply(message.from, 'Result: '+answer.toString(),message.id);
	}catch(e){
		console.log(e);
	}
};

exports.help = {
    name: "Math",
    description: "Calculate something",
    usage: "math <expression>",
    cooldown: 5,
};