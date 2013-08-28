# StickyChimp

The new MailChimp site looks very snazzy but I found myself overly fond of how the navigation menu reacts and displays when they assume the user requires it but hides it when not. This is a quick and simple jQuery plugin for that very feature.

## Demo

You can find a demo of StickyChimp at [http://nbrock.github.io/StickyChimp](http://nbrock.github.io/StickyChimp). The original MailChimp menu can be viewed at [http://mailchimp.com/](http://mailchimp.com/).

## Usage

The menu element you use StickyChimp upon needs to be __position: fixed__.

	$('.nav').stickychimp();
