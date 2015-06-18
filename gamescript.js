var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render});
var pills;
var pill;
var pillsTaken = 0;
var fearLevel = 0;
var text1;
var text2;
var text3;
var text4;
var blurX;
var blurY;
var soundtrack;
var steps;
var enemyV = 70;

    function preload() {
        game.load.tilemap('tilemap', 'assets/sd_world1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('main_tiles', 'assets/main_tileset.png');
        game.load.image('decoration', 'assets/decoration.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('enemy', 'assets/enemy.png', 32, 48);
        game.load.image('background', 'assets/background.jpg');

        game.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
        game.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');

        game.load.image('pill', 'assets/pill.png');

        game.load.audio('soundtrack', 'assets/soundtrack.mp3');
        game.load.audio('steps', 'assets/steps.mp3');

    }

    function create() {
        //game.stage.backgroundColor = '#015168';
        game.add.image(0, 0, 'background');
        soundtrack = game.sound.play('soundtrack');

        text1 = game.add.text(16, 16, 'Pills: 0', { fontSize: '32px', fill: '#FFF' });
        text2 = game.add.text(16, 50, 'Fear Level: 0', { fontSize: '32px', fill: '#FFF' });
        text3 = game.add.text(16, 84, 'Good luck', { fontSize: '32px', fill: '#FFF' });
        text4 = game.add.text(250, 288, '', { fontSize: '100px', fill: '#FF0000' });
        text1.fixedToCamera = true;
        text2.fixedToCamera = true;
        text4.fixedToCamera = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        /////////////////////////////////////
        cursors = game.input.keyboard.createCursorKeys();
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('main_tiles', 'main_tiles');
        map.addTilesetImage('decoration', 'decoration');



        layer = map.createLayer('collision');
        layer.resizeWorld();
        layer.wrap = true;
        layer.alpha = 0;
        //layer.scrollFactorX = 1.2;

        //layer6 = map.createLayer('collisionEnemys');
        //layer6.resizeWorld();
        //layer6.wrap = true;
        //layer6.alpha = 0;
        //layer.scrollFactorX = 1.2;


        layer2 = map.createLayer('ground');
        layer2.resizeWorld();
        layer2.wrap = true;
        layer2.alpha = 1;

        layer3 = map.createLayer('clouds3');
        layer3.resizeWorld();
        layer3.wrap = true;
        layer3.alpha = 0.8;
        layer3.scrollFactorX = 1.2;

        layer4 = map.createLayer('clouds2');
        layer4.resizeWorld();
        layer4.wrap = true;
        layer4.alpha = 0.7;
        layer4.scrollFactorX = 1.4;

        layer5 = map.createLayer('clouds1');
        layer5.resizeWorld();
        layer5.wrap = true;
        layer5.alpha = 0.6;
        layer5.scrollFactorX = 1.6;

        pills = game.add.group();
        pills.enableBody = true;
        pill = pills.create(850, 220, 'pill');
        pill = pills.create(1440, 500, 'pill');

        map.setCollision(1);
        map.setCollision(155);
        ////////////////////////////////////
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        enemy1 = game.add.sprite(794, 496, 'enemy');

        game.physics.arcade.enable(player);
        game.physics.arcade.enable(enemy1);
        game.physics.arcade.enable(pills);

        player.body.bounce.y = 0.3;
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = false;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);
        player.outOfBoundsKill = true;

        enemy1.body.bounce.y = 0.3;
        enemy1.body.gravity.y = 800;
        enemy1.body.collideWorldBounds = false;
        enemy1.animations.add('left', [0, 1, 2, 3], 10, true);
        enemy1.animations.add('right', [5, 6, 7, 8], 10, true);
        enemy1.outOfBoundsKill = true;

        blurX = game.add.filter('BlurX');
        blurY = game.add.filter('BlurY');
        steps = game.sound.play('steps');
        steps.stop()

    }

    function update() {
        game.physics.arcade.collide(player, layer);
        //game.physics.arcade.collide(enemy1, layer6);
        game.physics.arcade.collide(enemy1, layer);
        game.physics.arcade.collide(pills, layer);

        game.physics.arcade.overlap(player, pills, collectPill, null, this);
        game.physics.arcade.overlap(player, enemy1, touchEnemy, null, this);

        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            //game.camera.x -= 2;
            player.body.velocity.x = -220;
            //steps = game.sound.play('steps');
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //game.camera.x += 2;
            player.body.velocity.x = 220;
            player.animations.play('right');
            //game.sound.play('steps');
        } else {
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown  && player.body.blocked.down)
        {
            player.body.velocity.y = -400;
        }


        enemy1.body.velocity.x = enemyV;
        if(enemy1.body.blocked.left) {
            enemyV = 70;
            enemy1.animations.play('right');
        }
        if(enemy1.body.blocked.right) {
            enemyV = -70;
            enemy1.animations.play('left');
        }

        if(player.alive == false) {
            text4.text = 'WASTED';
        }

        if(fearLevel >=100) {
            player.alive = false;
            player.kill();
            layer2.filters = [blurX, blurY];
            layer3.filters = [blurX, blurY];
            layer4.filters = [blurX, blurY];
            layer5.filters = [blurX, blurY];
            //layer6.filters = [blurX, blurY];
            enemy1.filters = [blurX, blurY];
        }

        fearLevel += 0.1;
        text2.text = 'Fear Level: ' + fearLevel;
    }

    function collectPill (player, pill) {
        pill.kill();
        pillsTaken += 1;
        text1.text = 'Pills: ' + pillsTaken;

        if(fearLevel <= 10) {
            fearLevel = 0;
            text2.text = 'Fear Level: ' + fearLevel;
        } else {
            fearLevel -= 10;
            text2.text = 'Fear Level: ' + fearLevel;
        }
    }

    function touchEnemy (player, enemy1) {
        fearLevel += 0.5;
        text2.text = 'Fear Level: ' + fearLevel;
    }

    function render() {
        game.debug.bodyInfo(player, 275, 32);

        if (soundtrack.isDecoding)
        {
            game.debug.text("Decoding Backgroundsound ...", 32, 200);
        }

        if (steps.isDecoding)
        {
            game.debug.text("Decoding Steps ...", 32, 225);
        }
    }

