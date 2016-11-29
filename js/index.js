var wepay = {
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
        $("#ico_nav").on('click',function(){
            wepay.crtlnav()
        })
    },
    crtlnav : function(){
        var navIco = $("#nav")
        if($(window).width() > 320 && $(window).width() < 992){
            if(navIco.is(":hidden")){
                navIco.show()
            }
            else{
                navIco.hide()
            }
        }
        $(window).on('resize',function(){
            if($(window).width() >= 992){
                 navIco.show()
            }
        })
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
    //页面局部刷新
    fnHashTriggerMenu : $(".wepay-menu-item > a").on("click", function(event) {
        wepay.changeMenuBg($(this).parent('.wepay-menu-item'));
        wepay.crtlnav()
        var query = this.href.split("?")[1];
        if (history.pushState && query  && $("#"+query)) {
            $("#"+query).removeClass('hide').siblings().addClass("hide");
            // history处理
            var title = "WePayUI - " + $(this).text();
            document.title = title;         
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
        wepay.pullDownMenu();
        wepay.fnHashTriggerMenu;
        if (history.pushState) {
            window.addEventListener("popstate", function() {
                wepay.fnHashTrigger();                             
            });
            wepay.fnHashTrigger();
        }
    }
}
wepay.init();

// $('.collapse').click(function(){ 
//     var me = this;
//     if(this.hasClass){ 
//         $('.highlight-wrapper').addClass('highlight-wrapper-expand');
//         me.hasClass=false;
//     }else{ 
//         $('.highlight-wrapper').removeClass('highlight-wrapper-expand');
//         me.hasClass=true;
//     }
// })
// $('.nav-phone-icon').click(function(){ 
//     var me = this;
//     if(this.hasClass){ 
//         $('.phoneheader').addClass('hide');
//         me.hasClass=false;
//     }else{ 
//         $('.phoneheader').removeClass('hide');
//         me.hasClass=true;
//     }
// })