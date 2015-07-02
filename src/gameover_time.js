var gameOverTime = function(game){}

gameOverTime.prototype = {
	init: function(score){
		textWasted.alpha = 0;
        fadeIn = this.game.add.tween(textWasted).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false);
	},
  	create: function(){
		this.game.add.image(0, 0, 'logo_gameover_time');
  		play = this.game.add.button(420, 275, "buttonimg", this.playTheGame, this);
  		this.game.add.button(420, 350, "buttonimg", this.showInstructions, this);
	},
	playTheGame: function(){
		this.game.state.start('Level1');
	},
	showInstructions: function(){
		this.game.state.start("Instructions");
	},
}