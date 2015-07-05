var menu = function(game){}

menu.prototype = {
  create: function(){
   music = this.game.add.audio('soundtrack');
   music.onDecoded.add(this.music, this);
   this.game.add.image(0, 0, 'logo');
   play = this.game.add.button(420, 275, "buttonimg", this.playTheGame, this);
   this.game.add.button(420, 350, "buttonimg", this.showInstructions, this);
  },
  
  playTheGame: function(){
    this.game.state.start("Level");
  },

  showInstructions: function(){
    this.game.state.start("Instructions");
  },

  music: function(){
    music.fadeIn(9000);
  },

}
