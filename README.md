# mithril-calendar

A calendar component for mithril.

You can see a demo, [here](http://konsumer.github.io/mithril-calendar).

## installation

### webpack/browserify/etc

```
npm install --save mithril-calendar
```
then
```js
var MithrilCalendar = require('mithril-calendar');
```
in your code.

### requirejs

```js
define(['mithril','MithrilCalendar'], function(m,MithrilCalendar){
  
});
```

### plain browser globals
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mithril/0.1.30/mithril.min.js"></script>
<script src="http://konsumer.github.io/mithril-calendar/dist/MithrilCalendar.min.js"></script>
```

## usage

Have a look at `index.js` to see how to construct the view, if you don't want it to look like mine, or want to leave out links or whatever, just construct your own view from stuff exposed in the controller.

```js
var MyComponent = {
  controller: function(){
    var now = new Date();
    this.year = m.route.param('year') ? m.route.param('year') : now.getFullYear();
    this.month = m.route.param('month') ? m.route.param('month') : now.getMonth()+1;
    this.calendar = new MithrilCalendar.controller(this.year, this.month);
  },
  view: function(ctrl){
    return MithrilCalendar.view(ctrl.calendar);
  }
}
```

You will also need some CSS. I use LESS, so you can use that from `dist/MithrilCalendar.less` or the CSS file I built from it.

You can also get it via CDN, like this:

```html
<link href="http://konsumer.github.io/mithril-calendar/dist/MithrilCalendar.min.css" media="all" rel="stylesheet" type="text/css" />
```