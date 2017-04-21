// var Background = (function(_super){
//     function Background(){
//         Background.super(this);
//         this.bg1 = new Laya.Sprite();
//         this.bg1.loadImage("res/background.png");
//         this.addChild(this.bg1);
//     }
//     Laya.class(Background,"Background",_super);
//     return Background;
// })(Laya.Sprite);
(function()
{
    window.Background = Background;
    function Background()
    {
        this.bg1=null;
        Background.__super.call(this);
        this.init();
    }
    Laya.class(Background,'Background',Laya.Sprite);
    var _proto=Background.prototype;
    _proto.init=function()
    {
        this.bg1=new Laya.Sprite();
        this.bg1.loadImage("res/background.png");
        this.addChild(this.bg1);
    }
})()

