const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

exports.run = async (bot, message, args) => {
	let q7 = Math.floor(Math.random() * 898) + 1;
	//bot.sendFileFromUrl(message.from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png','', message.id)
	P.getPokemonByName(q7, function(response, error) { // with callback
      if(!error) {
        //console.log(response);
		//console.log(response.sprites.other['official-artwork'].front_default);
		bot.sendFileFromUrl(message.from, response.sprites.other['official-artwork'].front_default,'Pokemon.png',response.name, message.id);
      } else {
        console.log(error)
      }
    });
	
};

exports.help = {
    name: "Pokemon",
    description: "Random Pokemon",
    usage: "pokemon",
    cooldown: 5
};
