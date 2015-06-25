var instructions = function(game){}

instructions.prototype = {
  	create: function(){
  		this.game.add.image(0, 0, 'background');
  		textInstructions = this.game.add.text(16, 84, 'Instructions', { fontSize: '32px', fill: '#FFF' });
		this.game.add.button(0, 200, "back", this.showMenu, this);
	},
	showMenu: function(){
		this.game.state.start("Menu");
	},
}