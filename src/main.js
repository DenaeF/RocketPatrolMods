let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//new keys but not used
let keyA, keyS, keyF, keyR, keyLEFT, keyRIGHT;

//Mods Added to Rocket Patrol
//*This is also in the md file*

//- Implement the 'FIRE UI' text from the original game (5)
//- Add your own (copyright free) background music to the Play scene(5)   
                 //(This I feel is different than change the sound because to me sound means sound effects and this specifically is different because it says background music rather than sound)

//- Create 4 new explosion SFX and randomize which one plays on impact(10)
//- Display the time remaning (in seconds) on the screen (10)
//- Create a new title screen (new artwork, typography, layout)(10)   
                 //(I don't know if this is counted for the game or this is seperate from gameplay because it's the title screen)
                 
//- Create a new animated sprite for the Spaceship enemies(10)           
                 //(It does say new artwork on the 60 pt one for the game but I made mine animated, hopefully this is different than the 60pt one)
                 
//- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)(60)
