(function ($) {
	"use strict";

	var defaults = {
		animateTime: 300
	};

	var StickyChimp = function(el, options) {
		this.options = $.extend(defaults, options);
		this.el = el;

		this.elementHeight = el.height() * 2;
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
		$(this.el).animate({
			opacity: 0,
			top: '-=' + this.elementHeight
		}, this.options.animateTime);
	};

	StickyChimp.prototype.showMenu = function() {
		$(this.el).animate({
			opacity: 1,
			top: this.elementTop
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

		if((now - this.lastScroll < 250)) {
			return;
		}

		if (!atBottom && fromTop > this.lastFromTop) {
			this.sclUp = 0;
			this.lowerHit = false;
			this.sclDown += (fromTop - this.lastFromTop);

			if (!this.upperHit && (this.sclDown > this.elementHeight)) {
				this.upperHit = true;
				this.hideMenu();
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

}(jQuery));