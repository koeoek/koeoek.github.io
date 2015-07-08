var level2 = function(game){


    //Items
    var pills;
    var pill;

    //Effekte
    var blurX;
    var blurY;

    //Fearbar
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

    //Pause
    isPaused = false;

    //LevelEnd
    var star;
    var stars;

    //Animation bugfix
    animationFix = true;
}

level2.prototype = {

    create: function() {

        //LEVELSETTINGS
        var intLevelNumber = 2;
        var intEnemys = 18;
        var timeToLive = 30000;
        nextLevel = 'Level3';

        //DO NOT CHANGE!
        var StringLevelNumber = intLevelNumber.toString();
        var text = 'tilemap_world';
        var mapName = text + StringLevelNumber;
        var stringEnemys = intEnemys.toString();
        var levelName = 'Level' + StringLevelNumber;
        //var intNextLevel = intLevelNumber+1;
        //var StringNextLevel = intNextLevel.toString();
        //var StringNextLevelName = 'Level' + StringNextLevel;
        currentLevel = intLevelNumber;

        //Initialize
        isPaused = false;

        //Background
        bg = this.game.add.image(0, 100, 'background2');
        bg.scrollFactorX = 10;

        //Music
        soundtrack = this.game.sound.play('soundtrack'); //Wird bereits in Level 1 geladen
        soundtrack.mute;

        //Add text
        goodluck = this.game.add.image(16, 100+370, 'good_luck');
        feartimer = this.game.add.image(16,6, 'feartimer');

        //Fix to camera
        feartimer.fixedToCamera = true;


        //Initialize physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Keys
        cursors = this.game.input.keyboard.createCursorKeys();
        esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        enter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

        //Tilesets and Mapping
        console.log(mapName);
        map = this.game.add.tilemap(mapName);
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

            //Particles
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 576);
            emitter.width = this.game.world.width;
            emitter.makeParticles('leaf');
            emitter.minParticleSpeed.setTo(-576, 30);
            emitter.maxParticleSpeed.setTo(576, 200);
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.3;
            emitter.gravity = 1;
            emitter.flow(5000, 500, 5, -1);
            emitter.flow(5000, 100, 1, -1);

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
        this.pills.create(1007, 656, 'pill');
        this.pills.create(2363, 592, 'pill');
        this.pills.create(3328, 880, 'pill');
        this.pills.create(4031, 848, 'pill');
        this.pills.create(5227, 880, 'pill');

        stars = this.game.add.group();
        stars.enableBody = true;
        this.star = stars.create(6200, 800, 'star');

        //Set Colissions
        map.setCollision(1);
        map.setCollision(155);

        //Create Player and Enemys
        player = this.game.add.sprite(320000, this.game.world.height - 1500, 'dude');
        this.enemy1 = this.game.add.sprite(40000, 70000, 'enemy3'); //Das Anfangsmännchen
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

        this.enemy12 = this.game.add.sprite(467, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy13 = this.game.add.sprite(1312, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy14 = this.game.add.sprite(1569, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy15 = this.game.add.sprite(1795, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy16 = this.game.add.sprite(2500, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy17 = this.game.add.sprite(5790, 880, 'enemy3'); //Das Anfangsmännchen
        this.enemy18 = this.game.add.sprite(5892, 880, 'enemy3'); //Das Anfangsmännchen
        

        //Player- and enemy-Air-fix
        player.reset(50, this.game.world.height - 100);//Reset, weil sie direkz zu sehen sind
        this.enemy1.reset(306,880);
        this.enemy2.reset(306, 500);

        //Set Arcade to player and enemys
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

        //Blurfilter
        blurX = this.game.add.filter('BlurX');
        blurY = this.game.add.filter('BlurY');

        //Fearbar
        fearBar = this.game.add.sprite(16, 55, 'fearBar');
        fearBar.fixedToCamera = true;
        fearBar.alpha = 1;
        fearBar.width = 190;
        fearBar_border = this.game.add.sprite(16, 55, 'fearBar_border');
        fearBar_border.fixedToCamera = true;
        fearBar_border.width = 190;
        this.timeToLive = timeToLive;
        fearTween = this.game.add.tween(fearBar).to({width:0}, this.timeToLive, Phaser.Easing.Linear.None, false);
        fearAlphaTween = this.game.add.tween(fearBar).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 1000, true);

        //Pause Image
        pauseImg = this.game.add.image(0, 0, 'logo_pause');
        pauseImg.fixedToCamera = true;
        pauseImg.alpha = 0;

        //Loading Image
        loadingImg = this.game.add.image(0, 0, 'logo_loading');
        loadingImg.fixedToCamera = true;
        loadingImg.alpha = 0;

    },

    update: function() {
        soundtrack.mute = true;
        if(!soundtrack.isDecoding) { //Wenn Soundtrack FERTIG mit decodieren ist, dann...
            loadingImg.alpha = 0;
            if(!isPaused) { //Pause, wenn else

                
                isPaused = false;
                pauseImg.alpha = 0;

                esc.onDown.add(this.pauseMenu, this);

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

                this.game.physics.arcade.overlap(player, this.enemy1, this.touchEnemy1, null, this); //FL
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
                this.game.physics.arcade.overlap(player, this.enemy12, this.touchEnemy12, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy13, this.touchEnemy13, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy14, this.touchEnemy14, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy15, this.touchEnemy15, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy16, this.touchEnemy16, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy17, this.touchEnemy17, null, this); //FL
                this.game.physics.arcade.overlap(player, this.enemy18, this.touchEnemy18, null, this); //FL
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
                 if(this.enemy1.animationFix) {
                    this.enemy1.animations.play('left');
                    this.enemy1.body.velocity.x = -70;
                } else {
                    this.enemy1.animations.play('right');
                    this.enemy1.body.velocity.x = +70;
                }
                if(this.enemy1.body.blocked.left) {
                    this.enemy1.animationFix = false;
                } else if(this.enemy1.body.blocked.right){
                    this.enemy1.animationFix = true; 
                }
                //Enemy1 movement END
                //Enemy2 movement
                 if(this.enemy2.animationFix) {
                    this.enemy2.animations.play('left');
                    this.enemy2.body.velocity.x = -100;
                } else {
                    this.enemy2.animations.play('right');
                    this.enemy2.body.velocity.x = 100;
                }
                if(this.enemy2.body.blocked.left) {
                    this.enemy2.animationFix = false;
                } else if(this.enemy2.body.blocked.right){
                    this.enemy2.animationFix = true; 
                }
                //Enemy2 movement END
                //Enemy3 movement
                 if(this.enemy3.animationFix) {
                    this.enemy3.animations.play('left');
                    this.enemy3.body.velocity.x = -100;
                } else {
                    this.enemy3.animations.play('right');
                    this.enemy3.body.velocity.x = 100;
                }
                if(this.enemy3.body.blocked.left) {
                    this.enemy3.animationFix = false;
                } else if(this.enemy3.body.blocked.right){
                    this.enemy3.animationFix = true; 
                }
                //Enemy3 movement END
                //Enemy4 movement
                 if(this.enemy4.animationFix) {
                    this.enemy4.animations.play('left');
                    this.enemy4.body.velocity.x = -100;
                } else {
                    this.enemy4.animations.play('right');
                    this.enemy4.body.velocity.x = 100;
                }
                if(this.enemy4.body.blocked.left) {
                    this.enemy4.animationFix = false;
                } else if(this.enemy4.body.blocked.right){
                    this.enemy4.animationFix = true; 
                }
                //Enemy4 movement END
                //Enemy5 movement
                 if(this.enemy5.animationFix) {
                    this.enemy5.animations.play('left');
                    this.enemy5.body.velocity.x = -100;
                } else {
                    this.enemy5.animations.play('right');
                    this.enemy5.body.velocity.x = 100;
                }
                if(this.enemy5.body.blocked.left) {
                    this.enemy5.animationFix = false;
                } else if(this.enemy5.body.blocked.right){
                    this.enemy5.animationFix = true; 
                }
                //Enemy5 movement END
                //Enemy6 movement
                 if(this.enemy6.animationFix) {
                    this.enemy6.animations.play('left');
                    this.enemy6.body.velocity.x = -100;
                } else {
                    this.enemy6.animations.play('right');
                    this.enemy6.body.velocity.x = 100;
                }
                if(this.enemy6.body.blocked.left) {
                    this.enemy6.animationFix = false;
                } else if(this.enemy6.body.blocked.right){
                    this.enemy6.animationFix = true; 
                }
                //Enemy6 movement END
                //Enemy7 movement
                 if(this.enemy7.animationFix) {
                    this.enemy7.animations.play('left');
                    this.enemy7.body.velocity.x = -100;
                } else {
                    this.enemy7.animations.play('right');
                    this.enemy7.body.velocity.x = 100;
                }
                if(this.enemy7.body.blocked.left) {
                    this.enemy7.animationFix = false;
                } else if(this.enemy7.body.blocked.right){
                    this.enemy7.animationFix = true; 
                }
                //Enemy7 movement END
                //Enemy8 movement
                 if(this.enemy8.animationFix) {
                    this.enemy8.animations.play('left');
                    this.enemy8.body.velocity.x = -100;
                } else {
                    this.enemy8.animations.play('right');
                    this.enemy8.body.velocity.x = 100;
                }
                if(this.enemy8.body.blocked.left) {
                    this.enemy8.animationFix = false;
                } else if(this.enemy8.body.blocked.right){
                    this.enemy8.animationFix = true; 
                }
                //Enemy8 movement END
                //Enemy9 movement
                 if(this.enemy9.animationFix) {
                    this.enemy9.animations.play('left');
                    this.enemy9.body.velocity.x = -100;
                } else {
                    this.enemy9.animations.play('right');
                    this.enemy9.body.velocity.x = 100;
                }
                if(this.enemy9.body.blocked.left) {
                    this.enemy9.animationFix = false;
                } else if(this.enemy9.body.blocked.right){
                    this.enemy9.animationFix = true; 
                }
                //Enemy9 movement END
                //Enemy10 movement
                 if(this.enemy10.animationFix) {
                    this.enemy10.animations.play('left');
                    this.enemy10.body.velocity.x = -100;
                } else {
                    this.enemy10.animations.play('right');
                    this.enemy10.body.velocity.x = 100;
                }
                if(this.enemy10.body.blocked.left) {
                    this.enemy10.animationFix = false;
                } else if(this.enemy10.body.blocked.right){
                    this.enemy10.animationFix = true; 
                }
                //Enemy10 movement END
                //Enemy11 movement
                 if(this.enemy11.animationFix) {
                    this.enemy11.animations.play('left');
                    this.enemy11.body.velocity.x = -100;
                } else {
                    this.enemy11.animations.play('right');
                    this.enemy11.body.velocity.x = 100;
                }
                if(this.enemy11.body.blocked.left) {
                    this.enemy11.animationFix = false;
                } else if(this.enemy11.body.blocked.right){
                    this.enemy11.animationFix = true; 
                }
                //Enemy11 movement END
                //Enemy12 movement
                 if(this.enemy12.animationFix) {
                    this.enemy12.animations.play('left');
                    this.enemy12.body.velocity.x = -100;
                } else {
                    this.enemy12.animations.play('right');
                    this.enemy12.body.velocity.x = 100;
                }
                if(this.enemy12.body.blocked.left) {
                    this.enemy12.animationFix = false;
                } else if(this.enemy12.body.blocked.right){
                    this.enemy12.animationFix = true; 
                }
                //Enemy12 movement END
                //Enemy13 movement
                 if(this.enemy13.animationFix) {
                    this.enemy13.animations.play('left');
                    this.enemy13.body.velocity.x = -100;
                } else {
                    this.enemy13.animations.play('right');
                    this.enemy13.body.velocity.x = 100;
                }
                if(this.enemy13.body.blocked.left) {
                    this.enemy13.animationFix = false;
                } else if(this.enemy13.body.blocked.right){
                    this.enemy13.animationFix = true; 
                }
                //Enemy13 movement END
                //Enemy14 movement
                 if(this.enemy14.animationFix) {
                    this.enemy14.animations.play('left');
                    this.enemy14.body.velocity.x = -100;
                } else {
                    this.enemy14.animations.play('right');
                    this.enemy14.body.velocity.x = 100;
                }
                if(this.enemy14.body.blocked.left) {
                    this.enemy14.animationFix = false;
                } else if(this.enemy14.body.blocked.right){
                    this.enemy14.animationFix = true; 
                }
                //Enemy14 movement END
                //Enemy15 movement
                 if(this.enemy15.animationFix) {
                    this.enemy15.animations.play('left');
                    this.enemy15.body.velocity.x = -100;
                } else {
                    this.enemy15.animations.play('right');
                    this.enemy15.body.velocity.x = 100;
                }
                if(this.enemy15.body.blocked.left) {
                    this.enemy15.animationFix = false;
                } else if(this.enemy15.body.blocked.right){
                    this.enemy15.animationFix = true; 
                }
                //Enemy15 movement END
                //Enemy16 movement
                 if(this.enemy16.animationFix) {
                    this.enemy16.animations.play('left');
                    this.enemy16.body.velocity.x = -100;
                } else {
                    this.enemy16.animations.play('right');
                    this.enemy16.body.velocity.x = 100;
                }
                if(this.enemy16.body.blocked.left) {
                    this.enemy16.animationFix = false;
                } else if(this.enemy16.body.blocked.right){
                    this.enemy16.animationFix = true; 
                }
                //Enemy16 movement END
                //Enemy17 movement
                 if(this.enemy17.animationFix) {
                    this.enemy17.animations.play('left');
                    this.enemy17.body.velocity.x = -100;
                } else {
                    this.enemy17.animations.play('right');
                    this.enemy17.body.velocity.x = 100;
                }
                if(this.enemy17.body.blocked.left) {
                    this.enemy17.animationFix = false;
                } else if(this.enemy17.body.blocked.right){
                    this.enemy17.animationFix = true; 
                }
                //Enemy17 movement END
                //Enemy18 movement
                 if(this.enemy18.animationFix) {
                    this.enemy18.animations.play('left');
                    this.enemy18.body.velocity.x = -100;
                } else {
                    this.enemy18.animations.play('right');
                    this.enemy18.body.velocity.x = 100;
                }
                if(this.enemy18.body.blocked.left) {
                    this.enemy18.animationFix = false;
                } else if(this.enemy18.body.blocked.right){
                    this.enemy18.animationFix = true; 
                }
                //Enemy18 movement END

            } else { //AB HIER Pause
                fearTween.pause();
                isPaused = true;
                pauseImg.alpha = 1;

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

                this.enemy1.body.velocity.x = 0;
                this.enemy2.body.velocity.x = 0;
                this.enemy3.body.velocity.x = 0;
                this.enemy4.body.velocity.x = 0;
                this.enemy5.body.velocity.x = 0;
                this.enemy6.body.velocity.x = 0;
                this.enemy7.body.velocity.x = 0;
                this.enemy8.body.velocity.x = 0;
                this.enemy9.body.velocity.x = 0;
                this.enemy10.body.velocity.x = 0;
                this.enemy11.body.velocity.x = 0;
                this.enemy12.body.velocity.x = 0;
                this.enemy13.body.velocity.x = 0;
                this.enemy14.body.velocity.x = 0;
                this.enemy15.body.velocity.x = 0;
                this.enemy16.body.velocity.x = 0;
                this.enemy17.body.velocity.x = 0;
                this.enemy18.body.velocity.x = 0;

                if(enter.isDown) {
                    click = this.game.sound.play('click');
                    fearTween.resume();
                    isPaused = false;
                }

                if(qKey.isDown) {
                    click = this.game.sound.play('click');
                    this.game.state.start("Menu");
                }

            }

        fearTween.start();
        } else {
            //textWaiting.text = 'GAME IS LOADING';
            loadingImg.alpha = 1;
            player.reset(50, this.game.world.height - 100);
            this.enemy1.reset(400,700);
            this.enemy2.reset(930, 650);
            this.enemy3.reset(1420, 725);
       }

       if(fearBar.width == 0) {
            player.alive = false;
            player.kill();
            //fadeIn.start();
            //layer2.filters = [blurX, blurY];
            //layer3.filters = [blurX, blurY];
            //layer4.filters = [blurX, blurY];
            //layer5.filters = [blurX, blurY];
            //this.enemy1.filters = [blurX, blurY];
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
        swallow = this.game.sound.play('swallow');
        fearTween.pause();
        pill.kill();
        this.timeCheck = this.game.time.now;

    },

    //FLEDERMÄUSE
    touchEnemy2: function(player, enemy2) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy3: function(player, enemy3) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy4: function(player, enemy4) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy5: function(player, enemy5) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy6: function(player, enemy6) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy7: function(player, enemy7) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy8: function(player, enemy8) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy9: function(player, enemy9) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy10: function(player, enemy10) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },
    touchEnemy11: function(player, enemy11) {
        fearTween.update(10000);
        bat = this.game.sound.play('bat');
    },


    //MÄNNCHEN
    touchEnemy1: function(player, enemy1) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },

    touchEnemy12: function(player, enemy12) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy13: function(player, enemy13) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy14: function(player, enemy14) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy15: function(player, enemy15) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy16: function(player, enemy16) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy17: function(player, enemy17) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },
    touchEnemy18: function(player, enemy18) {
        fearTween.update(10000);
        zombie = this.game.sound.play('skeletonSound');
    },

    nextStage: function(player, stars) {
        level3Finished = true;
        this.game.state.start('Level');
    },

    render: function() {
        //this.game.debug.bodyInfo(player, 275, 32);
    },

    pauseMenu: function() {
        click = this.game.sound.play('click');
        isPaused = true;
        fearTween.pause();
    },

    unPauseMenu: function() {
        isPaused = false;
        fearTween.resume();
    }
  
}