(function(){
     
    /**
     * 地板类
     */
    function Floor(){
         
        //背景贴图纹理
        this.bgTexture = null;
        //最大右边距离
        this.maxRight = 0;
        //判断是否超过右边最大距离了
        this.isOutComplete = false;
        //背景
        this.bg = null;
        //背景右边补丁
        this.rightBg = null;
         
        Floor.__super.call(this);
    }
     
     
    //事件名称
    //超过屏幕一定值出发新的floor事件
    Floor.OUT_COMPLETE = "floor_out_complete";
    //整个地板都不在屏幕里面事件
    Floor.OUT_DIE = "floor_out_die";
 
    //Floor 是一个显示对象 继承此 Sprite
    Laya.class(Floor, "Floor", laya.display.Sprite);
     
    var _proto = Floor.prototype;
 
    /**
     * type int  1->地板默认宽度 other->随机宽度
     */
    _proto.init = function(type){
        this.maxRight = 0;
        //如果不开启autoSize 父容器的宽度和高度无法获取
        this.autoSize = true;
        //初始化的时候将坐标放到屏幕右边
        // this.x = 852;
        // //y坐标取一个随机值 为什么是32 因为我们的整个素材是 32 * 20 拼起来的
        // this.y = 32 * 6 + 32 * parseInt(8 * Math.random());
        if(this.bg == null){
            //贴图纹理
           // this.bgTexture = Laya.loader.getRes("res/bk/bk2.png");
             
            // this.bg = new laya.display.Sprite();
            // // this.bg.loadImage("res/bk/bk2.png");
            // // this.bg.graphics.clear();
            // // this.bg.width = 50;
            // // this.bg.height = 10;
            // // this.addChild(this.bg);
            // this.bg.graphics.clear();
            // this.addChild(this.bg);

             
            //因为上面的图片是截取的 所以右边可能没有图片了 这里补一个
            this.rightBg = new laya.display.Sprite();
            this.rightBg.loadImage("res/bk/bk2.png");
           // this.rightBg.graphics.drawTexture(this.bgTexture, 0, 0, 100, 10);
            // this.rightBg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture,32*29,0,32,96), 0, 0, 32, 96);
            this.rightBg.width = 101;
            this.rightBg.height = 10;
            this.addChild(this.rightBg);

            // this.bg1 = new Laya.Sprite();
            // this.bg1.loadImage("res/bk/bk2.png");
            // this.bg1.width = 32;
            // this.addChild(this.bg1);
        }

        switch(type){
            case 1:
                // this.bg1.visible = false;
                // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 96);
            break;
            default:
                //随机计算一个宽度 当然 最小是3倍 以防难度太难
                var _w = 105;//32 * (3 + parseInt(19 * Math.random()));
                // this.bg.graphics.clear();
                //这里用到了 laya.resource.Texture.createFromTexture 就是根据宽度和高度来截取一个图片并且返回一个Texture对象
                // this.bg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture,0,0,_w,96), 0, 0, _w, 96);
                // this.rightBg.visible = true;
                // this.rightBg.x = _w;
            break;
        }
        //这个是用来补上右边的图片 所以X轴坐标正好是bg的宽度
        // this.bg1.x = _w;
        // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 96);
 
        //计算一下右边还剩下多少 用来判断什么时候生成新的floor
        //这里是通过游戏宽度 减去 固定 2个 32的宽度 再随机一个长度 这样 可以让地板时间点的出现 更加随机性
        this.maxRight = 100;//852 - 32 * 2 - 32 * parseInt(10 * Math.random());
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    //在地板上面添加物品
    _proto.addItem = function(){
       
    }
    //获取当前地板上面的所有物品
    _proto.getItems = function(){
        return ;
    }
 
    _proto.onLoop = function(){
        //让地板的速度和移动比背景快一点
        console.log("Floor   tempFlag  ");
        this.y += 1;
         
        //判断是否除了边界 如果出了 就通知生成新的floor 这里增加一个变量来判断当前是否已经通知外部了
        //因为此处是一个循环的处理
        if(!this.isOutComplete && (this.x + this.width) < this.maxRight){
            this.isOutComplete = true;
            this.event(Floor.OUT_COMPLETE, this);
        }else if((this.x + this.width) < 0){
            //判断整个floor是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            this.visible = false;
            this.event(Floor.OUT_DIE, this);
        }
    }
    /**
     * 检测碰撞
     * x 坐标
     * y 坐标
     */
    _proto.checkHit = function(x,y){
        if(x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)){
            return true;
        }
        // console.log("height   "+this.height);
        return false;
    }
})();