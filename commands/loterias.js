const lottery = require('loterias-caixa-scraper');


exports.run = async (bot, message, args) => {
	if(args.length === 1 ) return bot.reply(message.from, 'Comando Errado, escolha uma loteria.',message.id);
	if(args.length === 2 ){
		switch(args[1]){
			case 'megasena':
				lottery
				  .resultByNumber('megasena')
				  .then((result) => {
						let resultado = '';
						resultado +='*RESULTADO MEGA-SENA*\n'; 
						resultado +='*Concurso nº:* '+ result.numberRaffle+'\n'; 
						resultado +='*Números Sorteados:* '+ result.unorNumbers+'\n'; 
						resultado +='*Valor total:* R$'+result.totalCollection+'\n';
						resultado +='*Data do sorteio:* '+ result.date+'\n';
						resultado +='*Ganhadores:*\n';
						resultado +='*Sena*: '+result.sena.winers+' *Ganho por Jogador:* R$'+result.sena.prizeByWinner+'\n';
						resultado +='*Quina*: '+result.quina.winers+' *Ganho por Jogador:* R$'+result.quina.prizeByWinner+'\n';
						resultado +='*Quadra*: '+result.quadra.winers+' *Ganho por Jogador:* R$'+result.quadra.prizeByWinner+'\n';
						if (result.isAccumulated){
							resultado +='*Acumulado p/ próximo concurso*: R$'+ result.nextRaffle.accumulated+'\n';
						} else resultado +='Sem acúmulo.\n';
						resultado +='*Data próximo concurso*: '+ result.nextRaffle.date+'\n';
						resultado +='*Prêmio Estimado:* '+result.nextRaffle.estimatedPrize+'\n';
						resultado +='*Acumulado p/ MEGA DA VIRADA*: R$'+ result.accumulatedMegavirada+'\n';
						bot.sendText(message.from,resultado);
					//console.log(result)
				  }).catch((e) => {
						console.log(e)
					})
			break
			case 'quina':
				lottery
				  .resultByNumber('quina')
				  .then((result) => {
						let resultado = '';
						resultado +='*RESULTADO QUINA*\n'; 
						resultado +='*Concurso nº:* '+ result.numberRaffle+'\n'; 
						resultado +='*Números Sorteados:* '+ result.unorNumbers+'\n'; 
						resultado +='*Valor total:* R$'+result.totalCollection+'\n';
						resultado +='*Data do sorteio:* '+ result.date+'\n';
						resultado +='*Ganhadores:*\n';
						resultado +='*Quina*: '+result.quina.winers+' *Ganho por Jogador:* R$'+result.quina.prizeByWinner+'\n';
						resultado +='*Quadra*: '+result.quadra.winers+' *Ganho por Jogador:* R$'+result.quadra.prizeByWinner+'\n';
						resultado +='*Terno*: '+result.terno.winers+' *Ganho por Jogador:* R$'+result.terno.prizeByWinner+'\n';
						resultado +='*Duque*: '+result.duque.winers+' *Ganho por Jogador:* R$'+result.duque.prizeByWinner+'\n';
						if (result.isAccumulated){
							resultado +='*Acumulado p/ próximo concurso*: R$'+ result.nextRaffle.accumulated+'\n';
						} else resultado +='Sem acúmulo.\n';
						resultado +='*Data próximo concurso*: '+ result.nextRaffle.date+'\n';
						resultado +='*QUINA DE SÃO JOÃO*: R$'+ result.accumulatedSaoJoao+'\n';
						bot.sendText(message.from,resultado);
					//console.log(result)
				  }).catch((e) => {
						console.log(e)
						})
				break
		}
	} else if(args.length === 3){
			switch(args[1]){
				case 'megasena':
					lottery
					  .resultByNumber('megasena',args[2])
					  .then((result) => {
							let resultado = '';
							resultado +='*RESULTADO MEGA-SENA*\n'; 
							resultado +='*Concurso nº:* '+ result.numberRaffle+'\n'; 
							resultado +='*Números Sorteados:* '+ result.unorNumbers+'\n'; 
							resultado +='*Valor total:* R$'+result.totalCollection+'\n';
							resultado +='*Data do sorteio:* '+ result.date+'\n';
							resultado +='*Ganhadores:*\n';
							resultado +='*Sena*: '+result.sena.winers+' *Ganho por Jogador:* R$'+result.sena.prizeByWinner+'\n';
							resultado +='*Quina*: '+result.quina.winers+' *Ganho por Jogador:* R$'+result.quina.prizeByWinner+'\n';
							resultado +='*Quadra*: '+result.quadra.winers+' *Ganho por Jogador:* R$'+result.quadra.prizeByWinner+'\n';
							if (result.isAccumulated){
								resultado +='*Acumulado p/ próximo concurso*: R$'+ result.nextRaffle.accumulated+'\n';
							} else resultado +='Sem acúmulo.\n';
							resultado +='*Data próximo concurso*: '+ result.nextRaffle.date+'\n';
							resultado +='*Prêmio Estimado:* '+result.nextRaffle.estimatedPrize+'\n';
							resultado +='*Acumulado p/ MEGA DA VIRADA*: R$'+ result.accumulatedMegavirada+'\n';
							bot.sendText(message.from,resultado);
						//console.log(result)
					  }).catch((e) => {
							console.log(e)
						})
					break
				case 'quina':
					lottery
					  .resultByNumber('quina',args[2])
					  .then((result) => {
							let resultado = '';
							resultado +='*RESULTADO QUINA*\n'; 
							resultado +='*Concurso nº:* '+ result.numberRaffle+'\n'; 
							resultado +='*Números Sorteados:* '+ result.unorNumbers+'\n'; 
							resultado +='*Valor total:* R$'+result.totalCollection+'\n';
							resultado +='*Data do sorteio:* '+ result.date+'\n';
							resultado +='*Ganhadores:*\n';
							resultado +='*Quina*: '+result.quina.winers+' *Ganho por Jogador:* R$'+result.quina.prizeByWinner+'\n';
							resultado +='*Quadra*: '+result.quadra.winers+' *Ganho por Jogador:* R$'+result.quadra.prizeByWinner+'\n';
							resultado +='*Terno*: '+result.terno.winers+' *Ganho por Jogador:* R$'+result.terno.prizeByWinner+'\n';
							resultado +='*Duque*: '+result.duque.winers+' *Ganho por Jogador:* R$'+result.duque.prizeByWinner+'\n';
							if (result.isAccumulated){
								resultado +='*Acumulado p/ próximo concurso*: R$'+ result.nextRaffle.accumulated+'\n';
							} else resultado +='Sem acúmulo.\n';
							resultado +='*Data próximo concurso*: '+ result.nextRaffle.date+'\n';
							resultado +='*QUINA DE SÃO JOÃO*: R$'+ result.accumulatedSaoJoao+'\n';
							bot.sendText(message.from,resultado);
						//console.log(result)
					  }).catch((e) => {
							console.log(e)
							})
					break
			}
		}
};

exports.help = {
    name: "Loterias",
    description: "Resultado das Loterias: Megasena e Quina",
    usage: "loterias <concurso> <numero concurso>",
    cooldown: 5
};