class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        this.load.image('curtains', './assets/Curtains.png');
        this.load.image('curtainsMid', './assets/CurtainMiddle.png');
        this.load.audio('Muffled', './assets/BackgroundMuffled.mp3')
        this.load.audio('sfx_select', './assets/RiftSelect.mp3')
        this.load.audio('sfx_explosion', './assets/explosion38.wav')
        this.load.audio('sfx_rocket', './assets/Shoot.mp3')
        this.load.audio('Music', './assets/Rock.mp3')
    }

    create() {
        this.muffled = this.sound.add('Muffled', {});

        var musicConfig2 = {
            mute: false,
            volume: 1,
            rate: 1,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.muffled.play(musicConfig2);
       
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '28px',
            backgroundColor: '#6E1527',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }

        let menuConfig2 = {
            fontFamily: 'Comic Sans',
            fontSize: '28px',
            backgroundColor: '#6E1527',
            color: '#2DB9FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.tileSprite(0,0, 640, 480, 'curtainsMid').setOrigin(0,0);
        this.add.tileSprite(0,0, 640, 480, 'curtains').setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding-100, 'ROCKET PATROL MODDED', menuConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#E9DDDF';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.delay = 1;
            //Novice mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            
            this.muffled.stop();
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //Expert mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.muffled.stop();
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}