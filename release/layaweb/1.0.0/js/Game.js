// var Game = (function(){
//     (function Game(){
//         Laya.init(600,800);
//         this.bg = new Background();
//         Laya.stage.addChild(this.bg);
//     })();
// })();

(function()
{
    
    function Game()
    {
         //初始化引擎，设置游戏设计宽高。
        Laya.init(480, 852);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置剧中对齐			
        Laya.stage.alignH = "center";
        //设置横竖屏			
        Laya.stage.screenMode = "vertical";
        //创建循环滚动的背景。
        this.bg = new BackGround();
        //把背景添加到舞台上显示。
        Laya.stage.addChild(this.bg);
    }
    Laya.class(Game,'Game')
})();
var game=new Game();