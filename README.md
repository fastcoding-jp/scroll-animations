# scroll-animations
This is a javascript that automatically create on scroll animations such as fadeIn, fadeInleft, fadeInRight, fadeInTop or fadeInBottom. 
It will detect if browser is IE9 or not, and will animate with CSS or JavaScript according to the browser.

To use it, first include scroll-animation.css and scroll-animation.js to your header.
<link rel="stylesheet" href="assets/css/scroll-animations.css">
<script src="assets/js/scroll-animations.js"></script>

Then, apply an animation to an element with the following classes and attributes:
<div class="fadeInLeft anim-on-scroll"
     data-delay="0"
     data-duration="200"
     data-value="100"
>
</div>

data-delay: time in miliseconds for the animation to start once it have been scrolled 
data-duration: duration in miliseconds of the animation
data-value: distance in pixels for the start position of element (for example, for a fadeInLeft animation, if data-value is 100, then the element will start at left:-100px end will end at left:0px)
