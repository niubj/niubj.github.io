/**
 * Created by Administrator on 2018/11/28.
 */
/*功能：1、自动切换；2、鼠标移入头像时的阴影；3、打字机效果；4、鼠标飘过时显示；5、*/
'use strict';
//offsetLeft、offsetTop的兼容性
var getOffset = {
    left:function(obj){
        return obj.offsetLeft + (obj.offsetParent ? this.left(obj.offsetParent) : 0);
    },
    top:function(obj){
        return obj.offsetTop + (obj.offsetParent ? this.top(obj.offsetParent) : 0);
    }
};

//vp_width/vp_height浏览器视口的宽高、db_width/db_height文档的宽高
 function getWH () {
     if(document.compatMode == "BackCompat") {   //浏览器嗅探，混杂模式
         return {
         vp_width: document.body.clientWidth,
         vp_height: document.body.clientHeight,//视口的宽高
         db_width: document.body.scrollWidth,
         db_height: document.body.scrollHeight//文档的宽高
         };
     } else {
     return {
         vp_width: document.documentElement.clientWidth,
         vp_height: document.documentElement.clientHeight,
         db_width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
         db_height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
         };
     }
 }
//打字机效果
function Printer(msg,obj,duration){
    this.msg = msg;
    this.obj = obj;
    this.duration = duration;
    this.timer = null;
    this.isCompleted = true;
    this.step = -1;
    this.init();
    this.typing();
}
Printer.prototype = {
    init :function (){
        this.obj.innerHTML = "";
        return this;
    },
    typing : function() {
        var reg = /[^\x00-\xff]{0,1}/g;// /<("[^"]*"|'[^']*'|[^'">])*>/g匹配html标签
        var _this = this;
        if (this.isCompleted || this.step < this.msg.match(reg).length) {
            //this.obj.innerHTML = this.msg.slice(0, this.step++) + "|";
            this.obj.innerHTML = this.msg.substring(0, this.step++) + "|";
            this.isCompleted = false;
            this.timer = setTimeout(function () {
                _this.typing();
            }, this.duration);
        } else {
            this.obj.index = this.msg.length;
            this.obj.innerHTML = this.msg;
            this.isCompleted = true;
            clearTimeout(this.timer);
        }
        return this;
    }
};

window.onload = function(){
    /*********************主页背景Start***************************/
    !function showScale(){
        var aHome = document.getElementById("home");
        var aHome_li = aHome.getElementsByTagName("li");
        var len = aHome_li.length;
        var i = 0;
        aHome_li[i].style.display = "list-item";
        setInterval(function(){
            aHome_li[i].style.display = "none";
            i++;
            if(i%len ==0){i=0;}
            aHome_li[i].style.display = "list-item";
        },4800);
    }();
    /*********************主页背景End***************************/
    clickPaly();
    var targetEle = document.querySelectorAll("#nbj_resume .page");
    var vpHeight = getWH().vp_height;
    var ctn_title_hr = document.querySelectorAll(".page .ctn_title hr");
    var page_len = targetEle.length;
    /*********************导航条Start***************************/
    var nav = document.getElementById("nav");
    var navbar_btn = document.querySelector("#nav .navbar-header .navbar-btn");
    var navbar_ctn = document.querySelector("#nav .navbar-nav_ctn");
    var navbar_nav_item = document.querySelectorAll("#nav .navbar-nav_ctn .nav-item");
    var len_nav_item = navbar_nav_item.length;
    var index = 0;
    var navTop = getOffset.top(nav);
    navbar_btn.isClick = false;
    btnEvent();
    for(var k = 0; k<len_nav_item;k++){
        navbar_nav_item[k].startClass = navbar_nav_item[k].className;
        navbar_nav_item[index].className = navbar_nav_item[index].startClass+ " active";
        navbar_nav_item[k].k = k;
        navbar_nav_item[k].isClick = false;
        navbar_nav_item[k].onclick = function(){
            navbar_nav_item[index].className = navbar_nav_item[index].startClass;
            index = this.k;
            navbar_nav_item[index].isClick = true;
            navbar_nav_item[index].className = navbar_nav_item[index].startClass + "  active";
            scrollTo(0,getOffset.top(targetEle[index]));
            if(getWH().vp_width < 576){
                if(navbar_nav_item[index].isClick){
                    navbar_ctn.style.display = "none";
                    return navbar_btn.isClick = false;
                }else{
                    navbar_ctn.style.display = "block";
                    return navbar_btn.isClick = true;
                }
            }
        };
    }
    /*********************导航条End***************************/
    /*********************相关技能Start***************************/
    function scrollPage2(index){
        if(index==1){
            var skill_ctn = document.querySelector("#skills .skill-dlist_ctn");
            var skill_tit = skill_ctn.querySelectorAll("dt");
            var x =  animationTime(skill_ctn,{"width":"100%"},50,"easeBothStrong");
            var a =  animationTime(skill_tit[0],{"width":"88%"},1500,"easeBoth");
            var b =  animationTime(skill_tit[1],{"width":"80%"},1500,"easeBoth");
            var c =  animationTime(skill_tit[2],{"width":"82%"},1500,"easeBoth");
            var d =  animationTime(skill_tit[3],{"width":"32%"},1500,"easeBoth");
            var e =  animationTime(skill_tit[4],{"width":"35%"},1500,"easeBoth");
            return false;
        }
    }
    /*********************相关技能End***************************/
    /*********************关于我Start***************************/
    function scrollPage3(index){
        if(index ==2){
            var about_list_ctn = document.querySelector("#aboutme .about-list_ctn");
            var speaking = document.querySelector(".speaking p");
            var word=["2016年毕业于辽东学院测控系<br/>热爱互联网开发，代码强迫症患者具有高效的自主学习能力和问题解析能力<br/>大老板快把我收到碗里吧"];
            about_list_ctn.startClass = about_list_ctn.className;
            about_list_ctn.className = about_list_ctn.startClass + " aflipTop";
            new Printer(word[0],speaking,350);
            return false;
        }
    }
    /*********************关于我End***************************/
    /*********************作品集Start***************************/
    function scrollPage4(index){
        if(index==3){
            var demo_item = document.querySelectorAll("#sample .demo-list .demo-item");
            var i =0;
            !function demoAddClass(){
                if(i< demo_item.length){
                    demo_item[i].startClass = demo_item[i].className;
                    demo_item[i].className = demo_item[i].startClass + " shake";
                    i++;
                    var timer = setTimeout(demoAddClass,800);
                }
                if(i==demo_item.length){clearTimeout(timer);return i = 0;}
            }();
            return false;
        }
    }
    /*********************作品集End***************************/
    /*********************工作经历Start***************************/
    var history = document.getElementById("history");
    var exp_list = history.querySelectorAll(".exp-list");
    var exp_list_dt = history.querySelectorAll(".exp-list_dt");
    var exp_len = exp_list.length;
    function scrollPage5(index){
        if(index==4){
            var temp = exp_len-1;
            for(var j=0;j<exp_len;j++) {
                exp_list_dt[j].index = j;
                exp_list[j].style.paddingLeft = cssStyle(exp_list_dt[temp]).width;
                exp_list[temp].style.width = "86%";
                exp_list_dt[j].onclick = function () {
                    exp_list[temp].style.paddingLeft = cssStyle(exp_list_dt[temp]).width;
                    exp_list[temp].style.width = "0";
                    temp = this.index;
                    exp_list[temp].style.width = "86%";
                };
            }
            return false;
        }
    }
    /*********************工作经历End***************************/
    //改变窗口大小时
    window.onresize = function(){
        for(var j =0; j< exp_len;j++){
            exp_list[j].style.paddingLeft = cssStyle(exp_list_dt[j]).width;
         }
        btnEvent();
    };

    /*********************全局滚动Start***************************/
    var mTop= 0,aTop = 0;
    !function allScroll(){
        for(var k = 0; k<page_len;k++) {
            targetEle[k].finished = true;
        }
        document.onscroll = function(){
            var mTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            nav.className = (mTop>= navTop)?"fixed-top":"navbar";
            for(var j = 0;j<page_len;j++){
                navbar_nav_item[j].className = navbar_nav_item[j].startClass;
                if(j==0){
                    navbar_nav_item[j].className = navbar_nav_item[j].startClass + " active";
                }else{
                    if(j*vpHeight-100 <= mTop){
                        navbar_nav_item[j-1].className = navbar_nav_item[j-1].startClass;
                        navbar_nav_item[j].className = navbar_nav_item[j].startClass + " active";
                        ctn_title_hr[j-1].style.width = "56px";
                    }
                    if(aTop<mTop){
                        if(targetEle[j].finished&&mTop> j*vpHeight-100){
                            scrollPage2(j);
                            scrollPage3(j);
                            scrollPage4(j);
                            scrollPage5(j);
                            return targetEle[j].finished = false;
                        }
                    }
                }
            }
            setTimeout(function(){aTop = mTop;},10);
        };
    }();
    /*********************全局滚动End***************************/
 //导航栏按钮
    function btnEvent(){
        if(getWH().vp_width < 576){
            navbar_btn.style.display = "block";
            navbar_ctn.style.display = "none";
            navbar_btn.onclick = function(){
                navbar_btn.isClick = !navbar_btn.isClick;
                navbar_ctn.style.display = navbar_btn.isClick?"block":"none";
            };
        }else{
            navbar_btn.isClick = false;
            navbar_ctn.style.display = "block";
            navbar_btn.style.display = "none";
        }
    }
    /*********************音乐Start***************************/
    function clickPaly(){
        var head_img = document.querySelector("#home .head-img-box .head-img");
        var music_icon = document.querySelector(".head-img-box .music_icon");
        var tips = document.querySelector(".head-img-box .music_icon span");
        var audio = document.querySelector(".head-img-box .music_icon audio");
        var source = document.querySelector(".head-img-box .music_icon audio source");
        head_img.startClass = head_img.className;
        source.src = "images/ValderFields.mp3";
        tips.innerHTML = "点击停止音乐";
        music_icon.onclick = function(){
            if(audio != null){
                if(audio.paused){
                    audio.play();
                    source.src = "images/ValderFields.wav"||"images/ValderFields.ogg"||"images/ValderFields.mp3";            source.type = "audio/wav"||"audio/ogg"||"audio/mpeg";
                    head_img.className = head_img.startClass + " head-img_runing";
                    tips.innerHTML = "点击停止音乐";
                }else{
                    audio.pause();
                    source.src = "";
                    head_img.className = head_img.startClass + " head-img_paused";
                    tips.innerHTML = "点击播放音乐";
                }
            }

        }


    }
    /*********************音乐End***************************/
    window.onbeforeunload = function(){window.scrollTo(0, 0);}; //刷新后页面自动回到顶部
};
// 手风琴效果
function accordion(This){
    if(!This.isClick){
        exp_list[temp].style.paddingLeft = cssStyle(exp_list_dt[temp]).width;
        exp_list[temp].style.width = "0";
        temp = This.index;
        exp_list[temp].style.width = "86%";
    }
}