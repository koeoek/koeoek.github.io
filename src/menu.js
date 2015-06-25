var menu = function(game){}

menu.prototype = {
  	create: function(){
  		

  		music = this.game.add.audio('soundtrack');
    	music.onDecoded.add(this.music, this);


 		this.game.add.image(0, 0, 'logo');
  		play = this.game.add.button(412, 300, "play", this.playTheGame, this);
  		this.game.add.button(412, 400, "instructions", this.showInstructions, this);

  		//if (play.downFrame) {
  		//	this.game.sound.play('wasted');
  		//}	
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	showInstructions: function(){
		this.game.state.start("Instructions");
	},
	music: function(){
    	music.fadeIn(9000);
	},
}