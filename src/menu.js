var menu = function(game){} 

menu.prototype = {
  create: function(){
    this.game.add.image(0, 0, 'logo');
    play = this.game.add.button(420, 275, "buttonimg", this.playTheGame, this);
    this.game.add.button(420, 350, "buttonimg", this.showInstructions, this);
  },
    
  playTheGame: function(){
    click = this.game.sound.play('click');
    this.game.state.start("Level");
  },

  showInstructions: function(){
    click = this.game.sound.play('click');
    this.game.state.start("Instructions");
  }

}
