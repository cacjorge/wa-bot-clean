const axios = require('axios');

exports.run = async (bot, message, args) => {
	const subreddits = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'teenagers', 'historymemes']
	const randSub = subreddits[Math.random() * subreddits.length | 0]
	const response = await axios.get('https://meme-api.herokuapp.com/gimme/' + randSub);
	const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
	bot.sendFileFromUrl(message.from, `${url}`, 'meme.jpg', `${title}`)
};

exports.help = {
    name: "Meme",
    description: "Random meme",
    usage: "meme",
    cooldown: 5
};