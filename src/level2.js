var level2 = function(game){

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

level2.prototype = {
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
        map = this.game.add.tilemap('tilemap_world2');
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
        this.pills.create(1006, 656, 'pill');
        this.pills.create(1853, 656, 'pill');
        this.pills.create(3166, 880, 'pill');
        this.pills.create(3456, 880, 'pill');
        this.pills.create(4836, 880, 'pill');

        stars = this.game.add.group();
        stars.enableBody = true;
        this.star = stars.create(6200, 800, 'star');

        //Set Colissions
        map.setCollision(1);
        map.setCollision(155);
        ////////////////////////////////////

        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.enemy1 = this.game.add.sprite(794, 700, 'enemy1');
        this.enemy2 = this.game.add.sprite(1200, 680, 'enemy2');

        this.game.physics.arcade.enable(player);
        this.game.physics.arcade.enable(this.enemy1);
        this.game.physics.arcade.enable(this.enemy2);
        this.game.physics.arcade.enable(stars);

        //Physicsattributes for player
        player.body.bounce.y = 0;
        player.body.gravity.y = 1500;
        player.body.collideWorldBounds = false;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.game.camera.follow(player);
        player.outOfBoundsKill = true;

        //Physicsattributes for enemy1
        this.enemy1.body.bounce.y = 0.3;
        this.enemy1.body.gravity.y = 800;
        this.enemy1.body.collideWorldBounds = false;
        this.enemy1.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy1.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy1.outOfBoundsKill = true;

        //Physicsattributes for enemy2
        this.enemy2.body.bounce.y = 0.3;
        this.enemy2.body.gravity.y = 0;
        this.enemy2.body.collideWorldBounds = false;
        this.enemy2.animations.add('left', [0, 1, 2, 3], 10, true);
        this.enemy2.animations.add('right', [5, 6, 7, 8], 10, true);
        this.enemy2.outOfBoundsKill = true;

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
        this.timeToLive = 30000;


        fearTween = this.game.add.tween(fearBar).to({width:0}, this.timeToLive, Phaser.Easing.Linear.None, true);
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

            this.game.physics.arcade.overlap(player, this.enemy1, this.touchEnemy1, null, this);
            this.game.physics.arcade.overlap(player, this.enemy2, this.touchEnemy2, null, this);
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
                player.frame = 4;
            }
            if (space.isDown && player.body.blocked.down) {
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
                this.enemy2.body.velocity.x = +100;
            }
            if(this.enemy2.body.blocked.left) {
                this.enemy2.nachlinks = false;
            } else if(this.enemy2.body.blocked.right){
                this.enemy2.nachlinks = true; 
            }
            //Enemy2 movement END

        } else {
            textWaiting.text = 'GAME IS LOADING';
            player.reset(32, this.game.world.height - 100);
            this.enemy1.reset(760, this.game.world.height - 100);
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

    nextStage: function(player, stars) {
        this.game.state.start('Level2');
    },

    render: function() {
        this.game.debug.bodyInfo(player, 275, 32);

        if (soundtrack.isDecoding)
        {
            this.game.debug.text("Decoding Backgroundsound ...", 32, 200);
        }
    }
}