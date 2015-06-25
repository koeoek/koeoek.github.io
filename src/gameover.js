var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){
		textWasted.alpha = 0;
        fadeIn = this.game.add.tween(textWasted).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false);
	},
  	create: function(){
		var playButton = this.game.add.button(160,320,"play",this.showMenu,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	showMenu: function(){
		this.game.state.start("Menu");
	}
}