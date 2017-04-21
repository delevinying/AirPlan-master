var Player = (function(_super){
    function Player(){
        Player.super(this);
        // this.init();
    }
    Player.cached = false;
    Laya.class(Player,"Player",_super);
    var _proto = Player.prototype;
    _proto.init = function(_type,_camp,_hp,_speed,_hitRaius,_heroType = 0){
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRaius;
        this.heroType = _heroType;
        this.shootType = 0;
        this.shootInterval = 500;
        this.shootTime = Laya.Browser.now()+2000;
        this.action = "";
        this.isShoot = false;
        if(!Player.cached){
            Player.cached = true;
            Laya.Animation.createFrames(["res/me/player_fly.png"],"player_fly");
            Laya.Animation.createFrames(["res/me/me_die1.png","res/me/me_die2.png","res/me/me_die.png"
            ,"res/me/me_die4.png","player_die"]);
            Laya.Animation.createFrames(["res/air1/plain1.png"],"AIR1_fly");
            Laya.Animation.createFrames(["res/air1/plain1_die1.png",
            "res/air1/plain1_die2.png","res/air1/plain1_die3.png"],"AIR1_die");

            Laya.Animation.createFrames(["res/air2/plain2.png"],"AIR2_fly");
            Laya.Animation.createFrames(["res/air2/plain2_die1.png",
            "res/air2/plain2_die2.png","res/air2/plain2_die3.png","res/air2/plain2_die4.png"],"AIR2_die");

             Laya.Animation.createFrames(["res/air3/plain3.png"],"AIR3_fly");
            Laya.Animation.createFrames(["res/air3/plain3_die1.png",
            "res/air3/plain3_die2.png","res/air3/plain3_die3.png","res/air3/plain3_die4.png"
            ,"res/air3/plain3_die5.png","res/air3/plain3_die6.png"],"AIR3_die");

            Laya.Animation.createFrames(["res/fight.png"],"FIGHT_fly");

            Laya.Animation.createFrames(["res/yao.png"],"yao_fly");
        }
        if(!this.body){
            this.body = new Laya.Animation();
            this.addChild(this.body);
            this.body.on(Laya.Event.COMPLETE,this,this.onComplete);
        }
        this.playAction("fly");
    }
    _proto.onComplete = function(){
        if(this.action === "die"){
            this.body.stop();
            this.visible = false;
            // console.log("aaaaaaaaa");
        }else if(this.action === "fly"){
            this.playAction("fly");
              console.log("bbbbb");
        }
    }
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0,true,this.type+"_"+action);
        if(this.type =="player"){console.log("---->  "+this.type+"_"+this.action);}
        
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);

    }
    return Player;
})(Laya.Sprite);