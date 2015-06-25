var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        //Tilemap and Tileset preloading
        this.game.load.tilemap('tilemap_world1', 'assets/images/sd_world1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('main_tiles', 'assets/images/main_tileset.png');
        this.game.load.image('decoration', 'assets/images/decoration.png');

        //Player and Enemys (Characters) preloading
        this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        this.game.load.spritesheet('enemy', 'assets/images/enemy.png', 32, 48);

        //Background preloadig
        this.game.load.image('background', 'assets/images/background.jpg');

        //Scripts preloading
        this.game.load.script('filterX', 'src/BlurX.js'); //Blur Filter
        this.game.load.script('filterY', 'src/BlurY.js'); //Blur Filter

        //Standardimages preloading
        this.game.load.image('pill', 'assets/images/pill.png');

        //Fearbar
        this.game.load.spritesheet('fearBar', 'assets/images/fearbar.png');
   		
        //Menu
        this.game.load.image('logo', 'assets/images/silent_dust_logo.jpg');
            //this.game.load.spritesheet('logo', 'assets/images/silent_dust_logo.gif');
        this.game.load.image('play', 'assets/images/play.png');
        this.game.load.image('instructions', 'assets/images/instructions.png');
        this.game.load.image('back', 'assets/images/back.png');

        //Emitter
        this.game.load.spritesheet('rain', 'assets/images/rain.png', 17, 17);
        this.game.load.image('leaf', 'assets/images/leaf2.png');

        //Items
        this.game.load.image('pill', 'assets/images/pill.png');

        //Sounds
        this.game.load.audio('soundtrack', 'assets/sound/soundtrack.wav');
        this.game.load.audio('steps', 'assets/sound/steps.wav');
        this.game.load.audio('wasted', 'assets/sound/wasted.wav');   
	},
  	create: function(){
		this.game.state.start("Menu");
	}
}