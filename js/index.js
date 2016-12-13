var wepay = {
    //预加载
    wepayLoaidng: function() {
        $("#wepayLoaidng").addClass('hide');
    },
    //操作提示
    tips : function(text){
        $("body").find(".tips").remove().end().append("<div class='tips'>" + text + "</div>");
        setTimeout(function(){
            $(".tips").fadeOut(1000);
        },1000)
    },
    //判断是PC端还是移动端
    isPC : function() {  
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },  
    //flash复制
    copyCode : function(){
        $(".copy-text").zclip({
            path: "./js/ZeroClipboard.swf",
            copy: function(){
                return $(this).parent().next().text();
            },
            afterCopy:function(){
                wepay.tips("☺ 复制成功");
            }
        })
        $(".copy-html").zclip({
            path: "./js/ZeroClipboard.swf",
            copy: function(){
                return $(this).html();
            },
            afterCopy:function(){
                wepay.tips("☺ 复制成功");
            }
        })
    },
    //左侧下拉菜单
    pullDownMenu : function(){
        $('.wepay-menu-submenu-title').on('click',function(){ 
            var wepayMenuSubmenu = $(this).parent('.wepay-menu-submenu');
            if(wepayMenuSubmenu.hasClass('wepay-menu-submenu-open')){ 
                wepayMenuSubmenu.removeClass('wepay-menu-submenu-open');
            }else{ 
                wepayMenuSubmenu.addClass('wepay-menu-submenu-open');
            }
        })
    },
    //左导航小图标，控制导航显隐
    showNav : function(){
        var _nav = $("#nav")
        $("#ico_nav").on('click',function(){
            wepay.crtlNav(_nav);
        })
        $(window).on('load resize',function(){
            $("body").removeClass("hide-page")
            if($(window).width() >= 992){
                 _nav.show();
            }
            else if($(window).width() < 992){
                _nav.hide();
            }
        })
    },
    //是否显示下拉菜单
    crtlNav : function(selector){
        if($(window).width() < 992){
            if(selector.is(":hidden")){
                selector.show();
                $("body").addClass("hide-page")
            }
            else{
                selector.hide();
                $("body").removeClass("hide-page")
            }
        }
        
    },
    toTop : function(){
        $('html, body').animate({scrollTop:0}, 500);
    },
    //初始化
    init : function(){
        wepay.showNav();
        wepay.pullDownMenu();
        wepay.isPC() && wepay.copyCode(); 
        // wepay.wepayLoaidng();
    }
}
wepay.init();