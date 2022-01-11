        var Goku, GokuImg
        var oneStar, twoStar, threeStar, fourStar, fiveStar, sixStar, sevenStar;
        var oneStarImg, twoStarImg, threeStarImg, fourStarImg, fiveStarImg, sixStarImg, sevenStarImg;
        var backGround, backGroundImg;
        var dragonBall, dragonBallGroup;
        var bomb, bombImg, bombGroup;
        var invisibleGround;
        var score;


        var gameState = PLAY;
        var Dragon_Ball;
        var life = 3;
        var gameOver,gameOverImg;

        function preload(){
        GokuImg = loadImage("Goku.gif");

        oneStarImg = loadImage("oneStar.png");
        twoStarImg = loadImage("twoStar.png");
        threeStarImg = loadImage("threeStar.png");
        fourStarImg = loadImage("fourStar.png");
        fiveStarImg = loadImage("fiveStar.png");
        sixStarImg = loadImage("sixStar.png");
        sevenStarImg = loadImage("sevenStar.png");

        backGroundImg = loadImage("background.jpg");

        bombImg = loadImage("bomb.tiff");
        gameOverImg = loadImage("gameOver.png")

        score = 0;
        }

        function setup() {
        createCanvas(600,600);

        backGround = createSprite(300,300,300,300);
        backGround.addImage(backGroundImg);
        backGround.scale = 0.5;

        gameOver = createSprite(300,300,10,10);
        gameOver.addImage(gameOverImg);
        gameOver.scale  = 0.5;

        invisibleGround = createSprite(300,350,600,10);
        invisibleGround.visible = false;
        //invisibleGround.debug = true;
        //invisibleGround.x = invisibleGround.width /2;

        Goku = createSprite(55,290,10,10);
        Goku.addImage(GokuImg);
        Goku.scale = 0.5;

        dragonBallGroup = createGroup();
        bombGroup = createGroup();
        }

        function draw() {

        background("white");
        //incrementing the value of score every 60 frames
        score = score + Math.round(getFrameRate()/60);
        //console.log(score);
        //text("Score: "+ score, 500,50);
        gameOver.visible = false;
        bombs();
        //resetting the ground
        invisibleGround.velocityX = -1
        if (invisibleGround.x < 0){
        invisibleGround.x = invisibleGround.width/2;
        }

        // resetting the background picture
        backGround.velocityX = -1
        if (backGround.x < 0){
        backGround.x = backGround.width/5;
        }

        // Making Goku jump
        if(keyDown("space")&& Goku.y >= 250) {
        Goku.velocityY = -15;
        }
        // Adding gravity
        Goku.velocityY = Goku.velocityY + 0.8
        //preventing goku from falling below canvas
        Goku.collide(invisibleGround);
        spawnDragonBalls()

        if(Goku.isTouching(dragonBallGroup)){
        Dragon_Ball = Dragon_Ball + 1;
        dragonBall.destroy();
        }
        if(Goku.isTouching(bombGroup)){
                life = life - 1;
                bomb.destroy();
                console.log(life);
        if(life>=1) {
        gameState = "PLAY";
        }
        else {
        gameState = "END";
        }
        
        if(gameState === "END"){
                Goku.velocityX = 0;
                Goku.collide(invisibleGround);
                dragonBallGroup.velocityX = 0;
                backGround.velocity = 0;
                invisibleGround.velocity = 0;
                gameOver.visible = true;
        }
        }
        drawSprites();
        }
        


        function spawnDragonBalls(){
        if (frameCount % 60 === 0){
        dragonBall = createSprite(600,330,10,40);
        dragonBall.velocityX = -(6 + score/100);
        
        //generate random dragon balls
        var rand = Math.round(random(1,7));
        switch(rand) {
                case 1: dragonBall.addImage(oneStarImg);
                        break;
                case 2: dragonBall.addImage(twoStarImg);
                        break;
                case 3: dragonBall.addImage(threeStarImg);
                        break;
                case 4: dragonBall.addImage(fourStarImg);
                        break;
                case 5: dragonBall.addImage(fiveStarImg);
                        break;
                case 6: dragonBall.addImage(sixStarImg);
                        break;
                case 7: dragonBall.addImage(sevenStarImg);
                        break;        
                default: break;
        }
        dragonBall.scale = 0.05
        dragonBallGroup.add(dragonBall);
        }
        } 


        function bombs(){
                if (frameCount % 99 === 0){
        bomb = createSprite(600,330,10,10);
        bomb.addImage(bombImg);
        bomb.scale = 0.2;
        bomb.velocityX = -(6 + score/100);
        bombGroup.add(bomb);
                }
        }
