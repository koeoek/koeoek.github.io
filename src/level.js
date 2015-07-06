var level = function(game){}

level.prototype = {
  create: function(){
   var center = -100
   this.game.add.image(0, 0, 'logo_level');
   this.game.add.button(420, 275, 'buttonimg', this.playTheGame, this);
   this.game.add.button(420, 350, 'buttonimg', this.showInstructions, this);
   this.game.add.button(850, 20, 'buttonimg', this.showMenu, this);

   if(level1Finished) {
    this.game.add.button(150+center, 300, 'level1', this.startLevel1, this);
   } else {
    this.game.add.image(150+center, 300, 'level1_sw');
   }

   if(level2Finished) {
    this.game.add.button(150+225+center, 300, 'level2', this.startLevel2, this);
   } else {
    this.game.add.image(150+225+center, 300, 'level2_sw');
   }

   if(level3Finished) {
    this.game.add.button(150+225+225+center, 300, 'level3', this.startLevel3, this);
   } else {
    this.game.add.image(150+225+225+center, 300, 'level3_sw');
   }

   if(level4Finished) {
    this.game.add.button(150+225+225+225+center, 300, 'level4', this.startLevel4, this);
   } else {
    this.game.add.image(150+225+225+225+center, 300, 'level4_sw');
   }


   console.log(level1Finished);
   console.log(level2Finished);
   console.log(level3Finished);
   console.log(level4Finished);
  },

  showMenu: function(){
    click = this.game.sound.play('click');
    this.game.state.start('Menu');
  },

  startLevel1: function(){
    click = this.game.sound.play('click');
    this.game.state.start('Level1');
  },

  startLevel2: function(){
    click = this.game.sound.play('click');
    this.game.state.start('Level2');
  },

  startLevel3: function(){
    click = this.game.sound.play('click');
    this.game.state.start('Level3');
  },

  startLevel4: function(){
    click = this.game.sound.play('click');
    this.game.state.start('Level4');
  },

}
