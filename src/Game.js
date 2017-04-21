var Game = (function(){
    (function Game(){
        this.bulletPos = [[0],[-15,15],[-30,0,30],[-45,-15,15,-45]]
        this.level = 0;
        this.score = 0;
        this.levelUpScore = 0;
        this.bulletLevel = 0;
        Laya.init(480,800);
        this.bg = new window.Background();
        Laya.stage.addChild(this.bg);

        // Laya.loader.load("res/me/me.json",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
        onLoaded();
    })();
    function onLoaded(){
        this.player = new Player();
        player.init("player",0,1,0,30);
        this.player.shootType = 1;
        this.player.pos(200,500);
        Laya.stage.addChild(this.player);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        Laya.timer.frameLoop(1,this,onLoop);
    }
    function onMouseMove(){
        this.player.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }

    function onLoop(){
        for(var i = Laya.stage.numChildren-1;i>0;i--){
            var play = Laya.stage.getChildAt(i);
            if(play && play.speed){
                play.y += play.speed;
                if(play.y >800 || !play.visible ||(play.isShoot && play.y <-20)){
                    play.removeSelf();
                    play.isShoot = false;
                    play.visible = true;
                    // Laya.Pool.recover("player",Player);
                }
            }
            if(play.shootType > 0){
            var time = Laya.Browser.now();
            if(time>play.shootTime){
                play.shootTime = time + play.shootInterval;
                this.pos = this.bulletPos[play.shootType - 1];
                console.log("length  "+this.pos.length+"   --- "+pos[0]);
                for(var index = 0;index<pos.length;index++){
                    var bullet = Laya.Pool.getItemByClass("player",Player);
                    bullet.init("FIGHT",play.camp,1,-4-play.shootType-Math.floor(this.level/15),1,1);
                    // bullet.isShoot = true;
                    bullet.pos(play.x+50+pos[index],play.y-play.hitRadius -10);
                    Laya.stage.addChild(bullet);
                }
               
            }
        }
        }
        for(var i = Laya.stage.numChildren-1;i>0;i--){
            var play1 = Laya.stage.getChildAt(i);
            if(play1.hp<1) continue;
            for(var j=i-1;j>0;j--){
                if(!play1.visible)continue;
                var play2 = Laya.stage.getChildAt(j);
                if(play2.hp >0 && play1.camp != play2.camp){
                    var hitRadius = play1.hitRadius = play2.hitRadius;
                    if(Math.abs(play1.x - play2.x)< hitRadius 
                    && Math.abs(play1.y - play2.y)< hitRadius){
                        lostHp(play1,1);
                        lostHp(play2,1);
                    }
                }
            }
        }
        if(this.player.hp < 1){
            // Laya.timer.clear(this,onLoop);
        }
        if(Laya.timer.currFrame%60 === 0){
            createEnemy(2);
        }
    }
    function lostHp(play,lostHp){
        play.hp -= lostHp;
        if(play.heroType === 2){
            this.bulletLevel++;
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootInterval = 500 - 20*(this.bulletLevel > 20 ?20:this.bulletLevel);
            play.visible = false;
        }else if(play.heroType == 3){
            this.hero.hp++;
            if(this.hero.hp > 10)this.hero.hp =10;
            play.visible = false;
        }
        if(play.hp > 0){
            play.playAction("hit");
        }else{
            if(play.isShoot){
                play.visible = false;
            }else{
                play.playAction("die");       
                if(play.type === "AIR3"){
                    var type = 1;//Math.random() < 0.7?2:3;
                    var item = Laya.Pool.getItemByClass("player",Player);
                    item.init("yao",play.camp,1,1,15,type);
                    item.pos(play.x,play.y);
                    Laya.stage.addChild(item);
                }
            }
        }
    }
    this.hps = [1,2,10];
    this.speeds = [3,2,1];
    this.radius = [15,30,70];
    function createEnemy(num){
        for(var i=0;i<num;i++){
            var r = Math.random();
            var type = r<0.7?0:r<0.95?1:2;
            var player = Laya.Pool.getItemByClass("player",Player);
            if(player!=null){
                player.init("AIR"+(type+1),1,this.hps[type],this.speeds[type],this.radius[type]);
                player.pos(Math.random()*300+50,Math.random()*200);
                Laya.stage.addChild(player);
            } 
        }
    }

})();