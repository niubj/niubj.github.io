/**
 * Created by Administrator on 2018/11/28.
 */
window.animationTime = animationTime;
//     t current time       Date.now() - startTime 总时间
//     c change in value    endValue[attr] - startValue[attr] 需要经过的总路程
//     d duration           this.target_time 总时间
//     b beginning value    startValue 初始值
var Tween = {
    linear: function (t,c,d,b){  //匀速
        return t*c/d + b;   //  c/d = prop;  St = VTt + So; V = (Sz-So)/Tz;
    },
    easeIn: function(t, b, c, d){  //加速曲线 St = aTt2 + So;
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减震（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};
window.requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(a){return setTimeout(a,1000/60)};
window.cancelAnimationFrame = window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||clearTimeout;
function animationTime(obj,json,time,type,callback){
    var ele = {};
    if(typeof type === "function"){
        callback = type;
        type = "linear";
    }else{
        type = type||"linear";
    }
    var cssJson = cssStyle(obj);
    var startJson = {},targetJson = {},totalJson = {};//初始值、目标值、总值
    for(var attr in json){
        if(json.hasOwnProperty(attr)){
            startJson[attr] = parseFloat(cssStyle(obj)[attr]);
            targetJson[attr] = parseFloat(json[attr]);
            totalJson[attr] = targetJson[attr]-startJson[attr];
            if(!targetJson[attr]){
                delete startJson[attr];
                delete totalJson[attr];
            }
        }
    }
    var time_init = new Date();//初始时间
    (function spd(){
        var time_run = new Date() - time_init;//运行时间
        time_run>= time?time_run=time:ele.timer=requestAnimationFrame(spd);
        for(var attr in totalJson){
            if(totalJson.hasOwnProperty(attr)){
                var val = Tween[type](time_run, startJson[attr] , totalJson[attr] , time);
                if(attr==="opacity"){
                    obj.style[attr] = val;
                    obj.style.filter = "alpha(opacity="+ val*100 +")";
                }else{
                    var reg = /^\d*\.?\d+\%$/g;
                    var reg1 = /^\d*\.?\d+px$/g;
                    if(reg.test(json[attr])){
                        obj.style[attr] = val +"%";
                    }
                    if(reg1.test(json[attr])){
                        obj.style[attr] = val +"px";
                    }



                }
            }
        }
        if(time_run===time)callback && callback.call( obj );
    })();
    return ele;
}
function toPercent() {
    Number.prototype.toPercent = function(){
        return (Math.round(this * 10000)/100).toFixed(2) + '%';
    }
}
//获取元素样式
function cssStyle(obj){
    return window.getComputedStyle?window.getComputedStyle(obj):obj.currentStyle;
}