(function ($) {
	"use strict";
	
	var defaults = {
		animateTime: 300
	};

	var StickyChimp = function(el, options) {
		console.log('sticky');
		this.options = $.extend(defaults, options);
		this.el = el;

		this.elementHeight = el.height();
		this.elementTop = parseInt(el.css('top'), 10);
		this.documentHeight = $(document).height();
		this.windowHeight = $(window).height();
		
		this.lastFromTop = 0;
		this.sclUp = 0;
		this.sclDown = 0;
		this.upperHit = false;
		this.lowerHit = false;
		this.lastScroll = 0;

		var that = this;

		$(window).resize(function() {
			that.onResize();
		});

		$(window).scroll(function() {
			that.onScroll();
		});
	};

	StickyChimp.prototype.hideMenu = function() {
		$(this.el).stop().animate({
			opacity: 0,
			top: '-=' + this.elementHeight
		}, this.options.animateTime, function() {
			$(this).css('top');
		});
	};

	StickyChimp.prototype.showMenu = function(fromTop) {
		$(this.el).stop().animate({
			opacity: 1,
			top: this.elementTop > 0 && fromTop < this.elementTop ? this.elementTop : 0
		}, this.options.animateTime);
	};

	StickyChimp.prototype.onResize = function() {
		this.documentHeight = $(document).height();
		this.windowHeight = $(window).height();
	};

	StickyChimp.prototype.onScroll = function() {
		var now = +new Date(),
		fromTop = $(window).scrollTop(),
		atBottom = fromTop >= (this.documentHeight - this.windowHeight - 5);
		console.log('onscroll');
		if(this.elementTop === 0) {
			// If element top is 0 we can defer the scroll events and reduce methods fired.
			if((now - this.lastScroll < 250)) {
				return;
			}
		} else {
			// However due to continue change in the menu position when scrolling we need to fire 
			// each of the scroll events when the menu top is > 0 ensuring smooth animation.
			var adjustedTop = fromTop < 0 ? 0 : fromTop;
			$(this.el).css('top', fromTop > this.elementTop ? 0 : this.elementTop - adjustedTop);
		}

		if(fromTop < 0) {
			return;
		}

		// Clear animation queue and set to visible if user hits the top of the page suddenly.
		if(fromTop <= 0) {
			$(this.el).stop(true);
			$(this.el).show().fadeTo(0, 1).css('top', this.elementTop);
		}

		if (!atBottom && fromTop > this.lastFromTop) {
			this.sclUp = 0;
			this.lowerHit = false;
			this.sclDown += (fromTop - this.lastFromTop);

			if (!this.upperHit && (this.sclDown > this.elementHeight)) {
				this.upperHit = true;
				this.hideMenu(fromTop);
			}
		} else {
			this.sclDown = 0;
			this.upperHit = false;
			this.sclUp += (this.lastFromTop - fromTop);
			
			if (!this.lowerHit && (this.sclUp > this.elementHeight || fromTop >= this.windowHeight)) {
				this.lowerHit = true;
				this.showMenu(fromTop);
			}
		}

		this.lastFromTop = fromTop;
		this.lastScroll = now;
	};

	$.fn.stickychimp = function (options) {
		new StickyChimp(this, options);
	};

	$(window).on('load', function () {
		$('[data-toggle="stickychimp"]').each(function () {
			var el = $(this);

			new StickyChimp(el, el.data());
		});
	});	

}(jQuery));