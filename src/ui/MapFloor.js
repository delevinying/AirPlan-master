(function () {
    /**
     * 地板地图类
     * 
     */
	function MapFloor(){
		//要移除的地板
        this.dieFloorList = [];	
		MapFloor.__super.call(this);	
		this.init();
	}
	//MapFloor 是一个显示对象 继承此 Sprite
	Laya.class(MapFloor,"MapFloor", laya.display.Sprite);
	var _proto = MapFloor.prototype;  
    _proto.init = function(){
        console.log("开始加砖块");
        //添加地板
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);   
    //    this.createFloor(5);
    }
    
    _proto.onLoop = function(){
        //监听有没有地板要移除
        while(this.dieFloorList.lenght > 0){
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
			//回收
			Pool.recover("floor",floor);
        }
        // console.log("    "+Laya.timer.currFrame);
        if(Laya.timer.currFrame%60000=== 0||Laya.timer.currFrame ===2){
            // console.log("createFloor   ");
           this.createFloor(20);
        }

        
    }

    _proto.createFloor = function(nums){
        var num = nums/3;
        // var _floor = this.addFloor(1);
        // _floor.pos(200,700);
        // this.addChild(_floor);
        // for(var i=0;i<num;i++){
        //     var floor = this.addFloor(1);
        //     floor.pos(Math.random()*380+50,Math.random()*700+20);
        //     // Laya.stage.addChild(floor);
        //     this.addChild(floor);
        // }

         var floor = this.addFloor(1);
            floor.pos(180,720);
            this.addChild(floor);


        for(var i=0;i<num;i++){
            var floor = this.addFloor(1);
            floor.pos(Math.random()*50,0+i*Math.random()*150+80);
            this.addChild(floor);
        }
        for(var i=0;i<num;i++){
            var floor = this.addFloor(1);
            floor.pos(180,0+i*Math.random()*150+80);
            this.addChild(floor);
        }
        for(var i=0;i<num;i++){
            var floor = this.addFloor(1);
            floor.pos(290,0+i*Math.random()*150+80);
            this.addChild(floor);
        }

    }
    
    /**
     * 增加地板
     */
    _proto.addFloor = function(type){
        //从对象池中获取
        var floor = new Floor();//Pool.getItemByClass("floor",Floor);
        floor.init(type);
		floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
		floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
    }
    /**
     * 获取地板
     */
    _proto.getFloor = function(floor){
        console.log("getFloor");
		this.addFloor(2);
    }
    /**
     * 删除地板
     */
    _proto.delFloor = function(floor){
		this.dieFloorList.push(floor);
    }
	
})();