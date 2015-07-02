var instructions = function(game){}

instructions.prototype = {
  	create: function(){
  		this.game.add.image(0, 0, 'logo_instruction');
  		//textInstructions = this.game.add.text(16, 84, 'Instructions', { fontSize: '32px', fill: '#FFF' });

		this.game.add.button(850, 20, "buttonimg", this.showMenu, this);
	},
	showMenu: function(){
		this.game.state.start("Menu");
	},
}