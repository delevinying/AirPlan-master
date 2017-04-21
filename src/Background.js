var Background = (function(_super){
    function Background(){
        Background.super(this);
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage("res/bk.png");
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage("res/bk.png");
        this.bg2.pos(0,-480);
        this.addChild(this.bg2);

        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    Laya.class(Background,"Background",_super); 
    var _proto = Background.prototype;
    _proto.onLoop = function(){
        this.y += 1;//当前容器移动
        if(this.bg1.y+this.y>480){
            this.bg1.y -= 480*2;
        }
        if(this.bg2.y+this.y>480){
            this.bg2.y -= 480*2;
        }
    }

    window.Background=Background;
    return Background;
})(Laya.Sprite);