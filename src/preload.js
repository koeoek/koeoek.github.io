var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        //Tilemap and Tileset preloading
        this.game.load.tilemap('tilemap_world1', 'assets/images/sd_world1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tilemap_world2', 'assets/images/sd_world2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tilemap_world3', 'assets/images/sd_world3.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tilemap_world4', 'assets/images/sd_world4.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('main_tiles', 'assets/images/main_tileset.png');
        this.game.load.image('decoration', 'assets/images/decoration.png');

        //Player and Enemys (Characters) preloading
        this.game.load.spritesheet('dude', 'assets/images/player.png', 32, 48);
        this.game.load.spritesheet('enemy1', 'assets/images/enemy1.png', 32, 48);
        this.game.load.spritesheet('enemy2', 'assets/images/enemy2.png', 32, 48);

        //Background preloadig
        this.game.load.image('background', 'assets/images/background.jpg');

        //Star preloadig
        this.game.load.image('star', 'assets/images/star.png');

        //Scripts preloading
        this.game.load.script('filterX', 'src/BlurX.js'); //Blur Filter
        this.game.load.script('filterY', 'src/BlurY.js'); //Blur Filter

        //Standardimages preloading
        this.game.load.image('pill', 'assets/images/pill.png');

        //Fearbar
        this.game.load.spritesheet('fearBar', 'assets/images/fearbar.png');
   		
        //Menu
        this.game.load.image('logo', 'assets/images/silent_dust_logo.jpg');
        this.game.load.image('logo_gameover_fall', 'assets/images/silent_dust_gameover_fall.jpg');
        this.game.load.image('logo_gameover_time', 'assets/images/silent_dust_gameover_time.jpg');
        this.game.load.image('logo_instruction', 'assets/images/silent_dust_instruction.jpg');
        this.game.load.image('buttonimg', 'assets/images/buttonimg.png');
        //this.game.load.spritesheet('logo', 'assets/images/silent_dust_logo.gif');
        //this.game.load.image('back', 'assets/images/back.png');

        //Emitter
        this.game.load.spritesheet('rain', 'assets/images/rain.png', 17, 17);
        this.game.load.image('leaf', 'assets/images/leaf2.png');

        //Items
        this.game.load.image('pill', 'assets/images/pill.png');

        //Sounds
        this.game.load.audio('soundtrack', 'assets/sound/soundtrack.wav');
        this.game.load.audio('steps', 'assets/sound/steps.wav');
        this.game.load.audio('wasted', 'assets/sound/wasted.wav'); 

        //Levelend
        this.game.load.image('star', 'assets/images/star.png');  

        //Global Variables
        var currentLevel = 0;
	},
  	create: function(){
		this.game.state.start("Menu");
	}
}