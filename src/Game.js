var Game = (function(){
    (function Game(){
        Laya.init(480,800);
        Laya.stage.scaleMode = "showall";
        //设置剧中对齐
        Laya.stage.alignH = "center";
        //设置横屏
        Laya.stage.screenMode = "horizontal";
        this.bg = new window.Background();
        this._floor = null;
        this._moveFlag = -1;
        this._moveX = -1;
        Laya.stage.addChild(this.bg);
        onLoaded();
    })();
    function onLoaded(){
        this.player = new Player();
        player.init("player");
        this.player.pos(200,500);
        Laya.stage.addChild(this.player);
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,onMouseUp);   
        Laya.timer.frameLoop(1,this,onLoop);
        this._floor = new MapFloor();
        Laya.stage.addChild(this._floor);
    }

    function onMouseDown(Event){
        this._moveX = Event.stageX;
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
    }
    function onMouseUp(Event){
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        
    }
    function onMouseMove(Event){
        // this.player.pos(Laya.stage.mouseX,Laya.stage.mouseY);
        console.log(" stageX   "+Event.stageX);
        var _dec = Event.stageX - this._moveX;
        this.player.x += _dec/3;
        this._moveX = Event.stageX;
    }

    var _timeTemp = 0;
    function onLoop(){
        //循环检测玩家是否指地板上
        for(var i = this._floor.numChildren - 1;i>-1;i--){
            var floor = this._floor.getChildAt(i);
            if(floor.checkHit(this.player.x,this.player.y) && this.player._down && (_timeTemp == 0 || (Laya.timer.currFrame - _timeTemp)>50)){
                this.player.y =  floor.y;
                // this._moveFlag = this.player.y;
                this.player.onReset();
                _timeTemp = Laya.timer.currFrame;
            }
        }

        if(this.player.y<=300){
            for(var i = this._floor.numChildren - 1;i>-1;i--){
                //console.log("_move   "+_move);
                var _move = this._moveFlag - this.player.y;
                if(_move > 0){
                    var floor = this._floor.getChildAt(i);
                    floor.y += _move;
                    this._moveFlag = this.player.y;
                } 
            }
        }
    }
})();