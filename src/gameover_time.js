var gameOverTime = function(game){}

gameOverTime.prototype = {
  	create: function(){
  		wasted = this.game.sound.play('wasted');
  		
		this.game.add.image(0, 0, 'logo_gameover_time');
  		play = this.game.add.button(420, 275, "buttonimg", this.playTheGame, this);
  		this.game.add.button(420, 350, "buttonimg", this.showInstructions, this);
	},
	playTheGame: function(){
		click = this.game.sound.play('click');
		stringCurrentLevel = currentLevel.toString();
		this.game.state.start('Level' + currentLevel);
	},
	showInstructions: function(){
		click = this.game.sound.play('click');
		this.game.state.start("Menu");
	},
}