function FadeIn($elem, settings) {
    
    var _this = this;
    var _$elem = $elem;
    
    var _settings = $.extend({
        ie9: false,
        direction: "none",
        delay: 0,
        duration: 500,
        value: 100,
        easing: "ease-in"
    }, settings);
    
    this.init = function(){
        _this.setProperties();
        _this.applyStyle();
    }
    
    this.setProperties = function(){
        if(_$elem.attr("data-delay")) _settings.delay = _$elem.attr("data-delay");
        if(_$elem.attr("data-duration")) _settings.duration = _$elem.attr("data-duration");
        if(_$elem.attr("data-value")) _settings.value = _$elem.attr("data-value");
    }
    
    this.applyStyle = function(){
        if(_$elem.is(":visible")) _$elem.css("opacity", 0);
        
        if(_settings.ie9){
            _$elem.css("position", "relative");
            if(_settings.direction!="none") _$elem.css(_settings.direction, "-"+_settings.value+"px");
        }
        else{
            var translation;
            switch(_settings.direction){
                case 'left':
                    translation = "translate3d(-"+_settings.value+"px, 0, 0)";
                    break;
                case 'right':
                    translation = "translate3d("+_settings.value+"px, 0, 0)";
                    break;
                case 'top':
                    translation = "translate3d(0, -"+_settings.value+"px, 0)";
                    break;
                case 'bottom':
                    translation = "translate3d(0, "+_settings.value+"px, 0)";
                    break;
            }
            _$elem.css({
                "-webkit-transform": translation,
                "transform": translation,
            });
        }
    }
    
    this.animate = function(){
        
        if(_settings.ie9){
            var animationSettings = {opacity: 1};
            if(_settings.direction!="none") animationSettings[_settings.direction]="0px";
            _$elem.delay(_settings.delay).animate(animationSettings, _settings.duration);
        }
        else{
            var durationSeconds = parseFloat(_settings.duration/1000).toFixed(2);
            var delaySeconds = parseFloat(_settings.delay/1000).toFixed(2);           
            _$elem.css({
                "-webkit-animation": "fadeIn "+durationSeconds+"s "+_settings.easing+" "+delaySeconds+"s forwards",
                "animation": "fadeIn "+durationSeconds+"s "+_settings.easing+" "+delaySeconds+"s forwards"
            });
        }
        
    }
    
}

$(function(){
    
    var _this = this;
    var _$elems = $(".anim-on-scroll");
    var _animations = {};
    var _ie9 = false;
    
    this.init = function(){
        if(document.all && !window.atob) _ie9 = true;
        _this.initItems();
        _this.animOnScroll();
        $(window).on("scroll", _this.animOnScroll);
    }
    
    this.initItems = function(){
        _$elems.each(function(index){
            var $elem = $(this);
            var animation;
            if($elem.hasClass("fadeIn")){
                animation = new FadeIn($elem, {ie9:_ie9, direction:"none"});
            }
            else if($elem.hasClass("fadeInLeft")){
                animation = new FadeIn($elem, {ie9:_ie9, direction:"left"});
            }
            else if($elem.hasClass("fadeInRight")){
                animation = new FadeIn($elem, {ie9:_ie9, direction:"right"});
            }
            else if($elem.hasClass("fadeInTop")){
                animation = new FadeIn($elem, {ie9:_ie9, direction:"top"});
            }
            else if($elem.hasClass("fadeInBottom")){
                animation = new FadeIn($elem, {ie9:_ie9, direction:"bottom"});
            }
            _animations[index] = animation;
            _animations[index].init();
        });
    }
    
    this.animOnScroll = function(){
        
        var scrollTop = $(window).scrollTop();
        var maxHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var maxScroll = maxHeight - $(window).height();
        
        _$elems.each(function(index){
            
            var $elem = $(this);
            var minVal = $elem.offset().top-($(window).height()/2);
            var maxVal = $elem.offset().top+($(window).height()/2);
                                    
            if((scrollTop>=minVal && scrollTop<=maxVal) || (scrollTop==maxScroll && $elem.offset().top>=maxScroll)){
                if(!$elem.hasClass("anim-end")) _animations[index].animate();
            }
            
        });
        
    }
    
    this.init();
    
});

