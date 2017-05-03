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
        Laya.stage.addChild(this.bg);
        onLoaded();
    })();
    function onLoaded(){
        this.player = new Player();
        player.init("player");
        this.player.pos(200,500);
        Laya.stage.addChild(this.player);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        Laya.timer.frameLoop(1,this,onLoop);
        this._floor = new MapFloor();
        Laya.stage.addChild(this._floor);
    }
    function onMouseMove(){
        // this.player.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }

    function onLoop(){
        //循环检测玩家是否指地板上
      //  console.log("numChildren   "+this._floor.numChildren);
        for(var i = this._floor.numChildren - 1;i>-1;i--){
            var floor = this._floor.getChildAt(i);
            //如果是
            if(floor.checkHit(this.player.x,this.player.y)){
           //     console.log("player     x  "+this.player.x+"   y "+this.player.y+"\n"+"  floor   x "+floor.x+"  y  "+floor.y);
                this.player.y =  floor.y;
                this.player.onReset();
            }
        }


    }
    // function createEnemy(num){
    //     for(var i=0;i<num;i++){
    //         var r = Math.random();
    //         var type = r<0.7?0:r<0.95?1:2;
    //         var player = Laya.Pool.getItemByClass("player",Player);
    //         if(player!=null){
    //             player.init("bk"+(type+1));
    //             player.pos(Math.random()*380+50,Math.random()*700);
    //             Laya.stage.addChild(player);
    //         } 
    //     }
    // }


})();