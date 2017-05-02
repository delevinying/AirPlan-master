var Player = (function(_super){
    var _time = 40;
    var _height = 8;
    function Player(){
        Player.super(this);
    }
    Player.cached = false;
    Laya.class(Player,"Player",_super);
    var _proto = Player.prototype;
    _proto.init = function(_type){
        this.type = _type;
        if(!Player.cached){
            Player.cached = true;
            Laya.Animation.createFrames(["res/me/player.png"],"player_fly");

            Laya.Animation.createFrames(["res/bk/bk2.png"],"bk1_fly");
            Laya.Animation.createFrames(["res/bk/bk2.png"],"bk2_fly");
        }
        if(!this.body){
            this.body = new Laya.Animation();
            this.addChild(this.body);
            this.body.on(Laya.Event.COMPLETE,this,this.onComplete);
        }
        this.playAction("fly");
        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    var tempFlag = -1;
    _proto.onLoop = function(){
        if(this.type == "player"){
            tempFlag ++;
            if(tempFlag< _time && tempFlag>=0){
                this.y +=-_height;
            }else if(tempFlag>=_time){
                this.y +=_height;
            }
        }
        
    }

    _proto.onReset = function(){
        tempFlag = -1;
    }

    _proto.onComplete = function(){
        if(this.action === "die"){
            this.body.stop();
            this.visible = false;
        }else if(this.action === "fly"){
            this.playAction("fly");
        }
    }
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0,true,this.type+"_"+action);
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);
    }
    return Player;
})(Laya.Sprite);