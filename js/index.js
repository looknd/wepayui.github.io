var wepay = {
    //预加载
    wepayLoaidng: function() {
        setTimeout(function(){
            $("#wepayLoaidng").addClass('hide');
            $("html").removeClass('hide-wrapper');
        }, 2000)
    },
    //点击流统计
    clickData : function(){
        $("[data-stat]").on("click",function(e){
          $$.report('keypoint',$(e.target).attr("data-stat"));
        })
    },
    //操作提示
    tips : function(text){
        $("body").find(".tips").remove().end().append("<div class='tips'>" + text + "</div>");
        setTimeout(function(){
            $(".tips").fadeOut(1000);
        },1000)
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
    //左导航小图标
    showNav : function(){
        var navIco = $("#nav")
        $("#ico_nav").on('click',function(){
            wepay.crtlNav(navIco);
        })
        $(window).on('resize',function(){
            if($(window).width() >= 992){
                 navIco.show();
                 wepay.toTop();
                 $("body").removeClass("hide-page")
            }
            else if($(window).width() < 992){
                navIco.hide();
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
    //左侧菜单背景色
    changeMenuBg : function(selector){
        if(selector.hasClass('wepay-menu-item-selected')){
            return
        }
        else{
            $(".wepay-menu").find(".wepay-menu-item").removeClass('wepay-menu-item-selected');
            selector.addClass("wepay-menu-item-selected")
        }
        return true;
    },
    toTop : function(){
        $('html, body').animate({scrollTop:0}, 500);
    },
    //页面局部刷新
    fnHashTriggerMenu : $(".wepay-menu-item > a").on("click", function(event) {
        wepay.toTop();
        wepay.changeMenuBg($(this).parent('.wepay-menu-item'));
        wepay.crtlNav($("#nav"))
        var query = this.href.split("?")[1];
        if (history.pushState && query) {
            $("#"+query).removeClass('hide').siblings().addClass("hide");
            // history处理
            var title = "WePayUI - " + $(this).text();
            // document.title = title;     
            history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
        }
        return false;
    }),
    fnHashTrigger: function(target) {
        var query = location.href.split("?")[1], eleTarget = target || null;
        if (typeof query == "undefined") {
            if (eleTarget = wepay.fnHashTriggerMenu.get(0)) {
                // 如果没有查询字符，则使用第一个导航元素的查询字符内容
                history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.href.split("?")[1]) + location.hash;    
                wepay.fnHashTrigger(eleTarget);
            }
        } else {
            wepay.fnHashTriggerMenu.each(function() {
                if (eleTarget === null && this.href.split("?")[1] === query) {
                    eleTarget = this;
                }
            });
            
            if (!eleTarget) {
                // 如果查询序列没有对应的导航菜单，去除查询然后执行回调
                history.replaceState(null, document.title, location.href.split("?")[0]);    
                wepay.fnHashTrigger();
            } else {
                $(eleTarget).trigger("click");
            }        
        }
    },
    //初始化
    init : function(){
        wepay.showNav();
        wepay.clickData();
        wepay.copyCode();
        wepay.pullDownMenu();
        wepay.fnHashTriggerMenu;
        if (history.pushState) {
            window.addEventListener("popstate", function() {
                wepay.fnHashTrigger();                             
            });
            wepay.fnHashTrigger();
        }
        wepay.wepayLoaidng();
    }
}
wepay.init();