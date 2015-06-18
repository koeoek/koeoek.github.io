var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {
        game.load.tilemap('tilemap', 'assets/sd_world1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('main_tiles', 'assets/main_tileset.png');
        game.load.image('decoration', 'assets/decoration.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        /////////////////////////////////////
        cursors = game.input.keyboard.createCursorKeys();
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('main_tiles', 'main_tiles');
        map.addTilesetImage('decoration', 'decoration');

        game.stage.backgroundColor = '#015168';

        layer = map.createLayer('collision');
        layer.resizeWorld();
        layer.wrap = true;
        layer.alpha = 0;
        //layer.scrollFactorX = 1.2;

        layer3 = map.createLayer('clouds3');
        layer3.resizeWorld();
        layer3.wrap = true;
        //layer.alpha = 1;
        layer3.scrollFactorX = 1.2;


        layer2 = map.createLayer('ground');
        layer2.resizeWorld();
        layer2.wrap = true;
        //layer.alpha = 1;

    
        layer4 = map.createLayer('clouds2');
        layer4.resizeWorld();
        layer4.wrap = true;
        //layer.alpha = 1;
        layer4.scrollFactorX = 1.4;

        layer5 = map.createLayer('clouds1');
        layer5.resizeWorld();
        layer5.wrap = true;
        //layer.alpha = 1;
        layer5.scrollFactorX = 1.6;

        map.setCollision(1);

        ////////////////////////////////////
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.3;
        player.body.gravity.y = 1200;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);
        player.outOfBoundsKill = true;
    }

    function update() {
        game.physics.arcade.collide(player, layer);

        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            //game.camera.x -= 2;
            player.body.velocity.x = -170;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //game.camera.x += 2;
            player.body.velocity.x = 170;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }


        if (cursors.up.isDown && player.body.blocked.down)
        {
            player.body.velocity.y = -500;
        }
    }

