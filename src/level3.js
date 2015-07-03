var level3 = function(game){
    var intLevelNumber = 1;
    var StringLevelNumber = intLevelNumber.toString();
    var text = 'tilemap_world';
    var mapName = text + StringLevelNumber;

    var intEnemys = 18;
    var stringEnemys = intEnemys.toString();

    //Items
    var pills;
    var pill;

    //Effekte
    var blurX;
    var blurY;

    //Einstellungen
    var timeToLive; //Zeit für Level
    var tweenUpdate; //Übergangsparamenter, wenn Dingens getouched wird

    //Text
    var textGoodLuck;
    var textWasted;
    var textFear;

    //Sound
    var soundtrack;

    //Charakter
    var enemyV;
    var enemyBlockedLeft = true;
    var enemy;
    var enemys;

    //Core
    var fearBar, fearTween, fearAlphaTween;
    var timeCheck;
    var fadeIn;

    //Keys
    var esc;
    var space;

    //LevelEnd
    var star;
    var stars;

    //Animation bugfix
    var animationFix = true;
}

level3.prototype = {
    create: function() {

        //Background
        var bg = this.game.add.image(0, 0, 'background');
        bg.fixedToCamera = true;
        bg.scrollFactorX = 4;

        //Soundtrack
        soundtrack = this.game.sound.play('soundtrack');
        //steps = this.game.sound.play('steps');
        soundtrack.mute;

        //Add text
        textGoodLuck = this.game.add.text(16, 84+370, 'Good luck', { fontSize: '32px', fill: '#FFF' });
        textWasted = this.game.add.text(250, 288, 'WASTED', { fontSize: '100px', fill: '#FF0000' });
        textWaiting = this.game.add.text(50, 288, 'GAME IS LOADING', { fontSize: '100px', fill: '#FF0000' });
        textFear = this.game.add.text(16, 16, 'Time till fear', { fontSize: '32px', fill: '#FFF' });

        //Fix text to camera
        textWasted.fixedToCamera = true;
        textFear.fixedToCamera = true;
        textWaiting.fixedToCamera = true;

        //Initialize physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Keys
        cursors = this.game.input.keyboard.createCursorKeys();
        esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        ////////////////////////////////
        //esc.onDown.add(this.pause, this);
        //esc.onDown.add(this.unpause, this);
        map = this.game.add.tilemap('tilemap_world3');
        map.addTilesetImage('main_tiles', 'main_tiles');
        map.addTilesetImage('decoration', 'decoration');

        layer = map.createLayer('collision');
        layer.resizeWorld();
        layer.wrap = true;
        layer.alpha = 0;

        layer8 = map.createLayer('enemyCollision');
        layer8.resizeWorld();
        layer8.wrap = true;
        layer8.alpha = 0;
        //layer.scrollFactorX = 1.2;

        //layer6 = map.createLayer('collisionEnemys');
        //layer6.resizeWorld();
        //layer6.wrap = true;
        //layer6.alpha = 0;
        //layer.scrollFactorX = 1.2;

        //Blääätter
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 576);
            emitter.width = this.game.world.width;
            emitter.makeParticles('leaf');
            emitter.minParticleSpeed.setTo(-576, 30);
            emitter.maxParticleSpeed.setTo(576, 200);
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.3;
            emitter.gravity = 1;
             //  This will emit a quantity of 5 particles every 500ms. Each particle will live for 2000ms.
            //  The -1 means "run forever"
            emitter.flow(5000, 500, 5, -1);
            //  This will emit a single particle every 100ms. Each particle will live for 2000ms.
            //  The 100 means it will emit 100 particles in total and then stop.
            emitter.flow(5000, 100, 1, -1);
        //Ende Blääätter

        layer2 = map.createLayer('ground');
        layer2.resizeWorld();
        layer2.wrap = true;
        layer2.alpha = 1;

        layer7 = map.createLayer('ground2');
        layer7.resizeWorld();
        layer7.wrap = true;
        layer7.alpha = 1;

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

        //Groups
        this.pills = this.game.add.group();
        this.pills.enableBody = true;
        this.pills.create(1025, 592, 'pill');
        this.pills.create(1756, 848, 'pill');
        this.pills.create(2625, 528, 'pill');
        this.pills.create(3991, 880, 'pill');
        this.pills.create(4836, 880, 'pill');
        this.pills.create(5728, 880, 'pill');

        stars = this.game.add.group();
        stars.enableBody = true;
        this.star = stars.create(6200, 800, 'star');

        //Set Colissions
        map.setCollision(1);
        map.setCollision(155);
        ////////////////////////////////////

        player = this.game.add.sprite(320000, this.game.world.height - 1500, 'dude');
        this.enemy1 = this.game.add.sprite(40000, 70000, 'enemy1'); //Das Anfangsmännchen
        this.enemy2 = this.game.add.sprite(120000, 68000, 'enemy2'); //Fledermaus
        this.enemy3 = this.game.add.sprite(1420, 725, 'enemy2'); //Fledermaus
        this.enemy4 = this.game.add.sprite(2263, 560, 'enemy2'); //Fledermaus
        this.enemy5 = this.game.add.sprite(2809, 752, 'enemy2'); //Fledermaus
        this.enemy6 = this.game.add.sprite(1244, 624, 'enemy2'); //Fledermaus
        this.enemy7 = this.game.add.sprite(1885, 848, 'enemy2'); //Fledermaus
        this.enemy8 = this.game.add.sprite(3579, 624, 'enemy2'); //Fledermaus
        this.enemy9 = this.game.add.sprite(4000, 620, 'enemy2'); //Fledermaus
        this.enemy10 = this.game.add.sprite(5343, 720, 'enemy2'); //Fledermaus
        this.enemy11 = this.game.add.sprite(6132, 720, 'enemy2'); //Fledermaus

        this.enemy12 = this.game.add.sprite(2257, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy13 = this.game.add.sprite(3484, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy14 = this.game.add.sprite(3687, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy15 = this.game.add.sprite(3889, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy16 = this.game.add.sprite(4096, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy17 = this.game.add.sprite(4587, 880, 'enemy1'); //Das Anfangsmännchen
        this.enemy18 = this.game.add.sprite(5987, 880, 'enemy1'); //Das Anfangsmännchen

        player.reset(50, this.game.world.height - 100);//Reset, weil sie direkz zu sehen sind
        this.enemy1.reset(400,700);
        this.enemy2.reset(930, 650);

        this.game.physics.arcade.enable(player);
        this.game.physics.arcade.enable(this.enemy1);
        this.game.physics.arcade.enable(this.enemy2);
        this.game.physics.arcade.enable(this.enemy3);
        this.game.physics.arcade.enable(this.enemy4);
        this.game.physics.arcade.enable(this.enemy5);
        this.game.physics.arcade.enable(this.enemy6);
        this.game.physics.arcade.enable(this.enemy7);
        this.game.physics.arcade.enable(this.enemy8);
        this.game.physics.arcade.enable(this.enemy9);
        this.game.physics.arcade.enable(this.enemy10);
        this.game.physics.arcade.enable(this.enemy11);
        this.game.physics.arcade.enable(this.enemy12);
        this.game.physics.arcade.enable(this.enemy13);
        this.game.physics.arcade.enable(this.enemy14);
        this.game.physics.arcade.enable(this.enemy15);
        this.game.physics.arcade.enable(this.enemy16);
        this.game.physics.arcade.enable(this.enemy17);
        this.game.physics.arcade.enable(this.enemy18);
        this.game.physics.arcade.enable(stars);

        //Physicsattributes for player
        player.body.bounce.y = 0;
        player.body.gravity.y = 1500;
        player.body.collideWorldBounds = false;
        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
        player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 20, true);
        this.game.camera.follow(player);
        player.outOfBoundsKill = true;

        //Physicsattributes for enemy1
        this.enemy1.body.bounce.y = 0.3;
        this.enemy1.body.gravity.y = 800;
        this.enemy1.body.collideWorldBounds = false;
        this.enemy1.animations.add('left', [0, 1, 2, 3], 15, true);
        this.enemy1.animations.add('right', [5, 6, 7, 8], 15, true);
        this.enemy1.outOfBoundsKill = true;

        //Physicsattributes for enemy2
        this.enemy2.body.bounce.y = 0.3;
        this.enemy2.body.gravity.y = 0;
        this.enemy2.body.collideWorldBounds = false;
        this.enemy2.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy2.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy2.outOfBoundsKill = true;

        //Physicsattributes for enemy3
        this.enemy3.body.bounce.y = 0.3;
        this.enemy3.body.gravity.y = 0;
        this.enemy3.body.collideWorldBounds = false;
        this.enemy3.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy3.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy3.outOfBoundsKill = true;

        //Physicsattributes for enemy4
        this.enemy4.body.bounce.y = 0.3;
        this.enemy4.body.gravity.y = 0;
        this.enemy4.body.collideWorldBounds = false;
        this.enemy4.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy4.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy4.outOfBoundsKill = true;

        //Physicsattributes for enemy5
        this.enemy5.body.bounce.y = 0.3;
        this.enemy5.body.gravity.y = 0;
        this.enemy5.body.collideWorldBounds = false;
        this.enemy5.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy5.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy5.outOfBoundsKill = true;

        //Physicsattributes for enemy6
        this.enemy6.body.bounce.y = 0.3;
        this.enemy6.body.gravity.y = 0;
        this.enemy6.body.collideWorldBounds = false;
        this.enemy6.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy6.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy6.outOfBoundsKill = true;

        //Physicsattributes for enemy7
        this.enemy7.body.bounce.y = 0.3;
        this.enemy7.body.gravity.y = 0;
        this.enemy7.body.collideWorldBounds = false;
        this.enemy7.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy7.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy7.outOfBoundsKill = true;

        //Physicsattributes for enemy8
        this.enemy8.body.bounce.y = 0.3;
        this.enemy8.body.gravity.y = 0;
        this.enemy8.body.collideWorldBounds = false;
        this.enemy8.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy8.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy8.outOfBoundsKill = true;

        //Physicsattributes for enemy9
        this.enemy9.body.bounce.y = 0.3;
        this.enemy9.body.gravity.y = 0;
        this.enemy9.body.collideWorldBounds = false;
        this.enemy9.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy9.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy9.outOfBoundsKill = true;

        //Physicsattributes for enemy10
        this.enemy10.body.bounce.y = 0.3;
        this.enemy10.body.gravity.y = 0;
        this.enemy10.body.collideWorldBounds = false;
        this.enemy10.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy10.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy10.outOfBoundsKill = true;

        //Physicsattributes for enemy11
        this.enemy11.body.bounce.y = 0.3;
        this.enemy11.body.gravity.y = 0;
        this.enemy11.body.collideWorldBounds = false;
        this.enemy11.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy11.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy11.outOfBoundsKill = true;

        //Physicsattributes for enemy12
        this.enemy12.body.bounce.y = 0.3;
        this.enemy12.body.gravity.y = 0;
        this.enemy12.body.collideWorldBounds = false;
        this.enemy12.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy12.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy12.outOfBoundsKill = true;

        //Physicsattributes for enemy13
        this.enemy13.body.bounce.y = 0.3;
        this.enemy13.body.gravity.y = 0;
        this.enemy13.body.collideWorldBounds = false;
        this.enemy13.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy13.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy13.outOfBoundsKill = true;

        //Physicsattributes for enemy3
        this.enemy14.body.bounce.y = 0.3;
        this.enemy14.body.gravity.y = 0;
        this.enemy14.body.collideWorldBounds = false;
        this.enemy14.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy14.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy14.outOfBoundsKill = true;

        //Physicsattributes for enemy15
        this.enemy15.body.bounce.y = 0.3;
        this.enemy15.body.gravity.y = 0;
        this.enemy15.body.collideWorldBounds = false;
        this.enemy15.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy15.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy15.outOfBoundsKill = true;

        //Physicsattributes for enemy16
        this.enemy16.body.bounce.y = 0.3;
        this.enemy16.body.gravity.y = 0;
        this.enemy16.body.collideWorldBounds = false;
        this.enemy16.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy16.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy16.outOfBoundsKill = true;

        //Physicsattributes for enemy17
        this.enemy17.body.bounce.y = 0.3;
        this.enemy17.body.gravity.y = 0;
        this.enemy17.body.collideWorldBounds = false;
        this.enemy17.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy17.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy17.outOfBoundsKill = true;

        //Physicsattributes for enemy18
        this.enemy18.body.bounce.y = 0.3;
        this.enemy18.body.gravity.y = 0;
        this.enemy18.body.collideWorldBounds = false;
        this.enemy18.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy18.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy18.outOfBoundsKill = true;

        blurX = this.game.add.filter('BlurX');
        blurY = this.game.add.filter('BlurY');
       
        /*
        //Rain Emitter
        emitter = this.game.add.emitter(this.game.world.centerX, 0, 576);
        emitter.angle = 30; // uncomment to set an angle for the rain.
        
        emitter.makeParticles('rain');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
        emitter.setYSpeed(500, 550);
        emitter.setXSpeed(-5, 5);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 1600, 5, -1);
 
        emitter.makeParticles('rain2');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
        emitter.setYSpeed(500, 550);
        emitter.setXSpeed(-5, 5);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 1600, 5, 0);
        */


        //Wasted - FadeIn
        textWasted.alpha = 0;
        fadeIn = this.game.add.tween(textWasted).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false);

        //Fearbar
        fearBar = this.game.add.sprite(16, 55, 'fearBar');
        fearBar.fixedToCamera = true;
        fearBar.aplha = 1;
        fearBar.width = 190;
        this.timeToLive = 300000;


        fearTween = this.game.add.tween(fearBar).to({width:0}, this.timeToLive, Phaser.Easing.Linear.None, false);
        fearAlphaTween = this.game.add.tween(fearBar).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 1000, true);

    },

    pause: function() {


            this.game.paused = true;
            pauseText = this.game.add.text(250, 288, 'Game paused', { fontSize: '100px', fill: '#FF0000' });


        if(!this.game.paused){
            esc.onDown.add(this.pause, this);
            pauseText.destroy();
            this.game.paused = false;
        }

    },

    unPause: function() {


        if(!this.game.paused){

            pauseText.destroy();
            this.game.paused = false;
        }

    },

    update: function() {
        
        if(!soundtrack.isDecoding) { //Wenn Soundtrack FERTIG mit decodieren ist, dann...
            textWaiting.text = ' ';

            this.game.physics.arcade.collide(player, layer);
            this.game.physics.arcade.collide(this.enemy1, layer);
            this.game.physics.arcade.collide(this.enemy2, layer);
            this.game.physics.arcade.collide(this.enemy3, layer);
            this.game.physics.arcade.collide(this.enemy4, layer);
            this.game.physics.arcade.collide(this.enemy5, layer);
            this.game.physics.arcade.collide(this.enemy6, layer);
            this.game.physics.arcade.collide(this.eneme7, layer);
            this.game.physics.arcade.collide(this.enemy8, layer);
            this.game.physics.arcade.collide(this.enemy9, layer);
            this.game.physics.arcade.collide(this.enemy10, layer);
            this.game.physics.arcade.collide(this.enemy11, layer);
            this.game.physics.arcade.collide(this.enemy12, layer);
            this.game.physics.arcade.collide(this.enemy13, layer);
            this.game.physics.arcade.collide(this.enemy14, layer);
            this.game.physics.arcade.collide(this.enemy15, layer);
            this.game.physics.arcade.collide(this.enemy16, layer);
            this.game.physics.arcade.collide(this.enemy17, layer);
            this.game.physics.arcade.collide(this.enemy18, layer);

            this.game.physics.arcade.overlap(player, this.enemy1, this.touchEnemy1, null, this);
            this.game.physics.arcade.overlap(player, this.enemy2, this.touchEnemy2, null, this);
            this.game.physics.arcade.overlap(player, this.enemy3, this.touchEnemy3, null, this);
            this.game.physics.arcade.overlap(player, this.enemy4, this.touchEnemy4, null, this);
            this.game.physics.arcade.overlap(player, this.enemy5, this.touchEnemy5, null, this);
            this.game.physics.arcade.overlap(player, this.enemy6, this.touchEnemy6, null, this);
            this.game.physics.arcade.overlap(player, this.eneme7, this.touchEnemy7, null, this);
            this.game.physics.arcade.overlap(player, this.enemy8, this.touchEnemy8, null, this);
            this.game.physics.arcade.overlap(player, this.enemy9, this.touchEnemy9, null, this);
            this.game.physics.arcade.overlap(player, this.enemy10, this.touchEnemy10, null, this);
            this.game.physics.arcade.overlap(player, this.enemy11, this.touchEnemy11, null, this);
            this.game.physics.arcade.overlap(player, this.enemy12, this.touchEnemy12, null, this);
            this.game.physics.arcade.overlap(player, this.enemy13, this.touchEnemy13, null, this);
            this.game.physics.arcade.overlap(player, this.enemy14, this.touchEnemy14, null, this);
            this.game.physics.arcade.overlap(player, this.enemy15, this.touchEnemy15, null, this);
            this.game.physics.arcade.overlap(player, this.enemy16, this.touchEnemy16, null, this);
            this.game.physics.arcade.overlap(player, this.enemy17, this.touchEnemy17, null, this);
            this.game.physics.arcade.overlap(player, this.enemy18, this.touchEnemy18, null, this);
            this.game.physics.arcade.overlap(player, this.star, this.nextStage, null, this);
            this.game.physics.arcade.overlap(player, this.pills, this.collectPill, null, this);

            //Player movement
            player.body.velocity.x = 0;
            if (cursors.left.isDown) {
                player.body.velocity.x = -230;
                player.animations.play('left');
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 230;
                player.animations.play('right');
            } else {
                player.animations.stop();
                player.frame = 8;
            }
            if (space.isDown && player.body.blocked.down){ //
                player.body.velocity.y = -600;
            }

             //Enemy1 movement
             if(this.enemy1.nachlinks) {
                this.enemy1.animations.play('left');
                this.enemy1.body.velocity.x = -70;
            } else {
                this.enemy1.animations.play('right');
                this.enemy1.body.velocity.x = +70;
            }
            if(this.enemy1.body.blocked.left) {
                this.enemy1.nachlinks = false;
            } else if(this.enemy1.body.blocked.right){
                this.enemy1.nachlinks = true; 
            }
            //Enemy1 movement END
            //Enemy2 movement
             if(this.enemy2.nachlinks) {
                this.enemy2.animations.play('left');
                this.enemy2.body.velocity.x = -100;
            } else {
                this.enemy2.animations.play('right');
                this.enemy2.body.velocity.x = 100;
            }
            if(this.enemy2.body.blocked.left) {
                this.enemy2.nachlinks = false;
            } else if(this.enemy2.body.blocked.right){
                this.enemy2.nachlinks = true; 
            }
            //Enemy2 movement END
            //Enemy3 movement
             if(this.enemy3.nachlinks) {
                this.enemy3.animations.play('left');
                this.enemy3.body.velocity.x = -100;
            } else {
                this.enemy3.animations.play('right');
                this.enemy3.body.velocity.x = 100;
            }
            if(this.enemy3.body.blocked.left) {
                this.enemy3.nachlinks = false;
            } else if(this.enemy3.body.blocked.right){
                this.enemy3.nachlinks = true; 
            }
            //Enemy3 movement END
            //Enemy4 movement
             if(this.enemy4.nachlinks) {
                this.enemy4.animations.play('left');
                this.enemy4.body.velocity.x = -100;
            } else {
                this.enemy4.animations.play('right');
                this.enemy4.body.velocity.x = 100;
            }
            if(this.enemy4.body.blocked.left) {
                this.enemy4.nachlinks = false;
            } else if(this.enemy4.body.blocked.right){
                this.enemy4.nachlinks = true; 
            }
            //Enemy4 movement END
            //Enemy5 movement
             if(this.enemy5.nachlinks) {
                this.enemy5.animations.play('left');
                this.enemy5.body.velocity.x = -100;
            } else {
                this.enemy5.animations.play('right');
                this.enemy5.body.velocity.x = 100;
            }
            if(this.enemy5.body.blocked.left) {
                this.enemy5.nachlinks = false;
            } else if(this.enemy5.body.blocked.right){
                this.enemy5.nachlinks = true; 
            }
            //Enemy5 movement END
            //Enemy6 movement
             if(this.enemy6.nachlinks) {
                this.enemy6.animations.play('left');
                this.enemy6.body.velocity.x = -100;
            } else {
                this.enemy6.animations.play('right');
                this.enemy6.body.velocity.x = 100;
            }
            if(this.enemy6.body.blocked.left) {
                this.enemy6.nachlinks = false;
            } else if(this.enemy6.body.blocked.right){
                this.enemy6.nachlinks = true; 
            }
            //Enemy6 movement END
            //Enemy7 movement
             if(this.enemy7.nachlinks) {
                this.enemy7.animations.play('left');
                this.enemy7.body.velocity.x = -100;
            } else {
                this.enemy7.animations.play('right');
                this.enemy7.body.velocity.x = 100;
            }
            if(this.enemy7.body.blocked.left) {
                this.enemy7.nachlinks = false;
            } else if(this.enemy7.body.blocked.right){
                this.enemy7.nachlinks = true; 
            }
            //Enemy7 movement END
            //Enemy8 movement
             if(this.enemy8.nachlinks) {
                this.enemy8.animations.play('left');
                this.enemy8.body.velocity.x = -100;
            } else {
                this.enemy8.animations.play('right');
                this.enemy8.body.velocity.x = 100;
            }
            if(this.enemy8.body.blocked.left) {
                this.enemy8.nachlinks = false;
            } else if(this.enemy8.body.blocked.right){
                this.enemy8.nachlinks = true; 
            }
            //Enemy8 movement END
            //Enemy9 movement
             if(this.enemy9.nachlinks) {
                this.enemy9.animations.play('left');
                this.enemy9.body.velocity.x = -100;
            } else {
                this.enemy9.animations.play('right');
                this.enemy9.body.velocity.x = 100;
            }
            if(this.enemy9.body.blocked.left) {
                this.enemy9.nachlinks = false;
            } else if(this.enemy9.body.blocked.right){
                this.enemy9.nachlinks = true; 
            }
            //Enemy9 movement END
            //Enemy10 movement
             if(this.enemy10.nachlinks) {
                this.enemy10.animations.play('left');
                this.enemy10.body.velocity.x = -100;
            } else {
                this.enemy10.animations.play('right');
                this.enemy10.body.velocity.x = 100;
            }
            if(this.enemy10.body.blocked.left) {
                this.enemy10.nachlinks = false;
            } else if(this.enemy10.body.blocked.right){
                this.enemy10.nachlinks = true; 
            }
            //Enemy10 movement END
            //Enemy11 movement
             if(this.enemy11.nachlinks) {
                this.enemy11.animations.play('left');
                this.enemy11.body.velocity.x = -100;
            } else {
                this.enemy11.animations.play('right');
                this.enemy11.body.velocity.x = 100;
            }
            if(this.enemy11.body.blocked.left) {
                this.enemy11.nachlinks = false;
            } else if(this.enemy11.body.blocked.right){
                this.enemy11.nachlinks = true; 
            }
            //Enemy11 movement END
            //Enemy12 movement
             if(this.enemy12.nachlinks) {
                this.enemy12.animations.play('left');
                this.enemy12.body.velocity.x = -100;
            } else {
                this.enemy12.animations.play('right');
                this.enemy12.body.velocity.x = 100;
            }
            if(this.enemy12.body.blocked.left) {
                this.enemy12.nachlinks = false;
            } else if(this.enemy12.body.blocked.right){
                this.enemy12.nachlinks = true; 
            }
            //Enemy12 movement END
            //Enemy13 movement
             if(this.enemy13.nachlinks) {
                this.enemy13.animations.play('left');
                this.enemy13.body.velocity.x = -100;
            } else {
                this.enemy13.animations.play('right');
                this.enemy13.body.velocity.x = 100;
            }
            if(this.enemy13.body.blocked.left) {
                this.enemy13.nachlinks = false;
            } else if(this.enemy13.body.blocked.right){
                this.enemy13.nachlinks = true; 
            }
            //Enemy13 movement END
            //Enemy14 movement
             if(this.enemy14.nachlinks) {
                this.enemy14.animations.play('left');
                this.enemy14.body.velocity.x = -100;
            } else {
                this.enemy14.animations.play('right');
                this.enemy14.body.velocity.x = 100;
            }
            if(this.enemy14.body.blocked.left) {
                this.enemy14.nachlinks = false;
            } else if(this.enemy14.body.blocked.right){
                this.enemy14.nachlinks = true; 
            }
            //Enemy14 movement END
            //Enemy15 movement
             if(this.enemy15.nachlinks) {
                this.enemy15.animations.play('left');
                this.enemy15.body.velocity.x = -100;
            } else {
                this.enemy15.animations.play('right');
                this.enemy15.body.velocity.x = 100;
            }
            if(this.enemy15.body.blocked.left) {
                this.enemy15.nachlinks = false;
            } else if(this.enemy15.body.blocked.right){
                this.enemy15.nachlinks = true; 
            }
            //Enemy15 movement END
            //Enemy16 movement
             if(this.enemy16.nachlinks) {
                this.enemy16.animations.play('left');
                this.enemy16.body.velocity.x = -100;
            } else {
                this.enemy16.animations.play('right');
                this.enemy16.body.velocity.x = 100;
            }
            if(this.enemy16.body.blocked.left) {
                this.enemy16.nachlinks = false;
            } else if(this.enemy16.body.blocked.right){
                this.enemy16.nachlinks = true; 
            }
            //Enemy16 movement END
            //Enemy17 movement
             if(this.enemy17.nachlinks) {
                this.enemy17.animations.play('left');
                this.enemy17.body.velocity.x = -100;
            } else {
                this.enemy17.animations.play('right');
                this.enemy17.body.velocity.x = 100;
            }
            if(this.enemy17.body.blocked.left) {
                this.enemy17.nachlinks = false;
            } else if(this.enemy17.body.blocked.right){
                this.enemy17.nachlinks = true; 
            }
            //Enemy17 movement END
            //Enemy18 movement
             if(this.enemy18.nachlinks) {
                this.enemy18.animations.play('left');
                this.enemy18.body.velocity.x = -100;
            } else {
                this.enemy18.animations.play('right');
                this.enemy18.body.velocity.x = 100;
            }
            if(this.enemy18.body.blocked.left) {
                this.enemy18.nachlinks = false;
            } else if(this.enemy18.body.blocked.right){
                this.enemy18.nachlinks = true; 
            }
            //Enemy18 movement END


        } else {
            textWaiting.text = 'GAME IS LOADING';
            player.reset(50, this.game.world.height - 100);
            this.enemy1.reset(400,700);
            this.enemy2.reset(930, 650);
            this.enemy3.reset(1420, 725);
       }

       if(fearBar.width == 0) {
            player.alive = false;
            player.kill();
            fadeIn.start();
            layer2.filters = [blurX, blurY];
            layer3.filters = [blurX, blurY];
            layer4.filters = [blurX, blurY];
            layer5.filters = [blurX, blurY];
            this.enemy1.filters = [blurX, blurY];
            this.game.state.start("GameOver_time");
        }

        if(player.body.velocity.y > 1500) {
            player.kill();
            this.game.state.start("GameOver_fall");
        }

        if(this.game.time.now - this.timeCheck > 5000) {
            fearTween.resume();
        }
        if(fearBar.width < 75) {
            fearAlphaTween.start();
        }

        fearTween.start();
    },

    collectPill: function(player, pill) {
        fearTween.pause();
        pill.kill();
        this.timeCheck = this.game.time.now;
    },

    touchEnemy1: function(player, enemy1) {
        fearTween.update(10000);
    },

    touchEnemy2: function(player, enemy2) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy3) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy4) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy5) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy6) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy7) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy8) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy9) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy10) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy11) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy12) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy13) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy14) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy15) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy16) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy17) {
        fearTween.update(10000);
    },
    touchEnemy3: function(player, enemy18) {
        fearTween.update(10000);
    },

    nextStage: function(player, stars) {
        this.game.state.start('Level4');
    },

    render: function() {
        this.game.debug.bodyInfo(player, 275, 32);

        if (soundtrack.isDecoding)
        {
            this.game.debug.text("Decoding Backgroundsound ...", 32, 200);
        }
    }
}