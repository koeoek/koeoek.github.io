var outro = function(game){}

outro.prototype = {
  	create: function(){
  		this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	this.outro_background = this.game.add.sprite(0, 0, 'logo_blur'); 
    	this.outro_text = this.game.add.sprite(0, 0, 'outro_text');
    	this.game.physics.enable(this.outro_text, Phaser.Physics.ARCADE);
    	outro = this.game.sound.play('outro');
	},

	update: function() {
		this.outro_text.body.velocity.y = -85;
	}

	
}