# StickyChimp

The new MailChimp site looks very snazzy but I found myself overly fond of how the navigation menu reacts and displays when they assume the user requires it but hides it when not. This is a quick and simple jQuery plugin for that very feature.

## Demo

You can find a demo of StickyChimp at [http://nbrock.github.io/StickyChimp](http://nbrock.github.io/StickyChimp). The original MailChimp menu can be viewed at [http://mailchimp.com/](http://mailchimp.com/).

## Usage

The menu element you use StickyChimp upon needs to be __position: fixed__.

### Data Attributes

You can use this plugin purely through the markup API without writing a single line of JavaScript. This should be your first consideration when using the plugin.

To activate without writing JavaScript. Add ```data-toggle="stickychimp"``` to the element upon which you want to enable the plugin.

```html
<nav class="navbar" data-toggle="stickychimp">
	...
</nav>
```

### Programmatic API

That said, in some situations it may be desirable to enable the plugin in a more traditional manor using the programmatic API.

```html
<nav class="navbar">
	...
</nav>

<script>
	$(document).ready(function() {
		$('.navbar').stickychimp();
	});
</script>
```
