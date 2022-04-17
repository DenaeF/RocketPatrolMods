class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.image('Guitar', './assets/Guitar.png');
        this.load.image('Note-1', './assets/Note-1.png');
        this.load.image('Note-2', './assets/Note-2.png');
        this.load.image('Note-3', './assets/Note-3.png');
        this.load.image('curtains', './assets/Curtains.png');
        this.load.image('floor', './assets/Floor.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x0FF00).setOrigin(0,0);
       
        this.add.tileSprite(0,0, 640, 480, 'floor').setOrigin(0,0);
        
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height+10 - borderUISize - borderPadding, 'Guitar').setOrigin(0.5, 0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'Note-1', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'Note-2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'Note-3', 0,10).setOrigin(0,0);

        this.add.tileSprite(0,0, 640, 480, 'curtains').setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 30
        }
        //FIRE text config
        let gameTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
            
        }
        //COMPUTER text config
        let gameText2Config = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 140
            
        }
        //putting FIRE and COMPUTER in a certain spot
        this.add.text(borderUISize+210 + borderPadding+50, borderUISize+20 + borderPadding*2, 'FIRE', gameTextConfig).setOrigin(0.5);
        this.add.text(borderUISize+330 + borderPadding+50, borderUISize+20 + borderPadding*2, 'COMPUTER', gameText2Config).setOrigin(0.5);
        
        this.scoreLeft = this.add.text(borderUISize+70 + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

       if(!this.gameOver) { 
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
       }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {

        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}