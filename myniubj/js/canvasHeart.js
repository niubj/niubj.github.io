/**
 * Created by Administrator on 2018/11/28.
 */
/*
 * @Author:  niubj
 * @Date:   2018-12-01 10:17:45
 * @Last Modified by:   niubj
 * @Last Modified time: 2018-12-01 10:27:05
 */
console.time("abc");
var W = document.documentElement.clientWidth;
var H = document.documentElement.clientHeight;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;
var heart = [],mouseMoving = false,mouseMoveChecker, mouseX, mouseY,hths = [];
var config = {
    heart_r : 5,
    heart_deg : 120,
    heart_alpha : 10,
    heart_num : 80,
    move_distance :.5,
    hth_r: 10,
    line_alpha: 0.5,
    hth_speed: 0.5,
    hth_vanish: 0.01,
    hth_mindis: 5,
    hth_maxdis: 50
};
function initConfig(data){
    if(data instanceof Object){
        for(var key in data){
            if(data.hasOwnProperty(key)){
                config[key] = data[key];
            }
        }
    }
}
var num = 0;
function Heart(x,y,useCache){
    this.x = x;
    this.y = y;
    this.r = Math.random()*config.heart_r;
    this.deg = Math.random()*config.heart_deg-60;
    this.alpha = Math.floor(Math.random()*10+1)/config.heart_alpha;
    this.red = Math.floor(Math.random()*200+56);
    this.blue = Math.floor(Math.random()*256);
    this.yellow = Math.floor(Math.random()*256);
    this.color = "rgba("+ this.red  +","+this.blue+","+ this.yellow+","+this.alpha+")";
    this.useCache =useCache;
    this.cacheCvs = document.createElement("canvas");
    this.cacheCtx = this.cacheCvs.getContext("2d");
    this.cacheCvs.width = 10 * (this.r+1);
    this.cacheCvs.height = 10 * (this.r+1);
    if(useCache){
        this.cache();
    }
}
Heart.prototype = {
    drawHeart : function(){
        if(!this.useCache){
            num++;
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.deg/180*Math.PI);
            ctx.scale(this.r,this.r);
            ctx.fillStyle = this.color;
            ctx.shadowColor = "pink";
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(-1,0,1,Math.PI,0,false);
            ctx.arc(1,0,1,Math.PI,0,false); 
            ctx.bezierCurveTo(1.9, 1.2, 0.6, 1.6, 0, 3.0);
            ctx.bezierCurveTo( -0.6, 1.6,-1.9, 1.2,-2,0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }else {
            ctx.drawImage(this.cacheCvs, this.x - this.r, this.y - this.r);
        }
    },
    cache : function(){
        num++;
        this.cacheCtx.save();
        this.cacheCtx.translate(4*this.r,3*this.r);
        this.cacheCtx.rotate(-Math.PI/4);
        this.cacheCtx.scale(1,1);
        this.cacheCtx.fillStyle = this.color;
        this.cacheCtx.beginPath();
        this.cacheCtx.arc(2*this.r,this.r,this.r,0, 2*Math.PI ,false);
        this.cacheCtx.arc(3*this.r,2*this.r,this.r,0, 2*Math.PI ,false);
        this.cacheCtx.rect(this.r,this.r,2*this.r,2*this.r);
        this.cacheCtx.closePath();
        this.cacheCtx.fill();
        this.cacheCtx.restore();
    },
    move : function(){
        this.y -= config.move_distance;
        if(this.y<10){
            this.y = H + 20;
        }
        this.drawHeart();
    }
};
function MakeHeart(){ this.init();}
MakeHeart.prototype.init = function(data) {
    initConfig(data);
    for (var i = 0; i < config.heart_num; i++) {
        heart[i] = new Heart( Math.random() * W, Math.random() * H,true);
    }
    floatUp();
};

function Hth(id,x,y,useCache){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * config.hth_r + 1);
    this.vanish = config.hth_vanish;
    this.line_alpha = config.line_alpha;
    this.speed = config.hth_speed;
    this.dir = Math.floor(Math.random() * 140) + 200;
    this.red = Math.floor(Math.random()*200+56);
    this.blue = Math.floor(Math.random()*256);
    this.yellow = Math.floor(Math.random()*256);
    this.color = "rgba("+ this.red  +","+this.blue+","+ this.yellow+","+this.line_alpha+")";
    this.useCache = useCache;
    this.hthCvs = document.createElement("canvas");
    this.hthCtx = this.hthCvs.getContext("2d");
    this.hthCtx.alpha = 0.7;
    this.hthCtx.color = "rgba("+ this.red  +","+this.blue+","+ this.yellow+","+this.hthCtx.alpha+")";
    if (useCache) {
        this.cache();
    }
}
Hth.prototype = {
    draw: function(){
        if(!this.useCache){
            num++;
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.deg/180*Math.PI);
            ctx.scale(this.r,this.r);
            ctx.fillStyle = this.color;
            ctx.shadowColor = "rgba(255,255,255,0.5)";
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(-1,0,1,Math.PI,0,false);
            ctx.arc(1,0,1,Math.PI,0,false); 
            ctx.bezierCurveTo(1.9, 1.2, 0.6, 1.6, 0, 3.0);
            ctx.bezierCurveTo( -0.6, 1.6,-1.9, 1.2,-2,0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }else {
            ctx.drawImage(this.hthCvs, this.x - this.r, this.y - this.r);
        }
    },
    cache : function(){
        num++;
        this.hthCtx.save();
        this.hthCtx.fillStyle = this.hthCtx.color;
        this.hthCtx.shadowColor = "rgba(255,255,255,0.5)";
        this.hthCtx.shadowOffsetX = 3;
        this.hthCtx.shadowOffsetY = 3;
        this.hthCtx.shadowBlur = 4;
        this.hthCtx.beginPath();
        this.hthCtx.arc(this.r,this.r/2,this.r/2,0, 2*Math.PI ,false);
        this.hthCtx.arc(3*this.r/2,this.r,this.r/2,0, 2*Math.PI ,false);
        this.hthCtx.rect(this.r/2,this.r/2,this.r,this.r);
        this.hthCtx.closePath();
        this.hthCtx.fill();
        this.hthCtx.restore();
    },
    line: function () {
        if (this.id == 0) return;
        var previousHth1 = getPreviousHth(this.id, 1);
        var previousHth2 = getPreviousHth(this.id, 2);
        var previousHth3 = getPreviousHth(this.id, 3);
        var previousHth4 = getPreviousHth(this.id, 4);
        if (!previousHth1) return;
        ctx.strokeStyle = this.color;
        ctx.moveTo(previousHth1.x, previousHth1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousHth2 != false) ctx.lineTo(previousHth2.x, previousHth2.y);
        if (previousHth3 != false) ctx.lineTo(previousHth3.x, previousHth3.y);
        if (previousHth4 != false) ctx.lineTo(previousHth4.x, previousHth4.y);
        ctx.stroke();
        ctx.closePath();
    },
    move: function () {
        this.line_alpha -= this.vanish;
        this.hthCtx.alpha -= this.vanish;
        if (this.line_alpha <= 0||this.hthCtx.alpha<0) {
            this.die();
            return;
        }
        this.x = this.x + Math.cos(this.dir * (Math.PI / 180)) * this.speed;
        this.y = this.y + Math.sin(this.dir * (Math.PI / 180)) * this.speed;
        this.draw();
        this.line();
    },
    die: function () {
        hths[this.id] = null;
        delete hths[this.id];

    }
};
function getPreviousHth(id, step) {
    if (id == 0 || id - step < 0) return false;
    if (typeof hths[id - step] !== "undefined") {
        return hths[id - step];
    } else {
        return false;
    }
}

document.onmousemove = function (e) {
    var ev = e || window.event;
    mouseX = ev.clientX;
    mouseY = ev.clientY;
    mouseMoving = true;
};
function drawIfMouseMoving() {
    if (!mouseMoving) return false;
    if (hths.length == 0) {
        hths[0] = new Hth(0, mouseX, mouseY, true);
        return ;
    }
    var previousHth = getPreviousHth(hths.length, 1);
    var diffX = Math.abs(previousHth.x - mouseX);
    var diffY = Math.abs(previousHth.y - mouseY);
    if (diffX < config.hth_mindis || diffY < config.hth_mindis) return;
    var randomX = Math.random() > 0.5 ? -1 : 1;
    var randomY = Math.random() > 0.5 ? -1 : 1;
    randomX = randomX * Math.floor(Math.random() * config.hth_maxdis + 1);
    randomY = randomY * Math.floor(Math.random() * config.hth_maxdis + 1);
    hths[hths.length] = new Hth(hths.length, mouseX + randomX, mouseY + randomY, true);
}
function floatUp(){
    ctx.clearRect(0,0,W,H);
    for(var i in heart){
        if(heart.hasOwnProperty(i)){
            heart[i].move();
        }
    }
    for (i in hths) {
        if(hths.hasOwnProperty(i)){
            hths[i].move();
        }
    }
    drawIfMouseMoving();
    setTimeout(floatUp,50);
}
new MakeHeart();
console.timeEnd("abc");
