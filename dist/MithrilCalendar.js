!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.MithrilCalendar=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (!window) {
  var m = require('mithril');
}else{
  var m = window.m;
}

module.exports = {
  controller: function(year, month, events, route){
    var r = m.route().split('/');
    route = route || '/' + r[1];
    var ctrl = this;
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = month-1;

    var date = new Date(year, month, 1);
    var now = new Date();

    var out = days.map(function(d){
      return m('.weekday', d);
    });

    date.setDate(date.getDate()-date.getDay());
    for (var i=0; i<35; i++){
      var d = date.getDate();
      var mo = date.getMonth();
      var y = date.getYear();
      var classes = (d === now.getDate() && mo === now.getMonth() && y === now.getYear()) ? '.today' : '';
      out.push(m('.day' + classes, [
        m('span.num', d)
      ]));
      date.setDate(d+1);
    }

    var prev = new Date(year, month-1, 1);
    var next = new Date(year, month+1, 1);
    ctrl.nextLink = m.prop(m('a.next[href="' + route + '/' + (next.getMonth() + 1) + '/' + next.getFullYear() + '"].next', {config: m.route}, months[next.getMonth()]));
    ctrl.prevLink = m.prop(m('a.next[href="' + route + '/' + (prev.getMonth() + 1) + '/' + prev.getFullYear() + '"].prev', {config: m.route}, months[prev.getMonth()]));

    ctrl.calendar = m.prop(m('.days', out));
    ctrl.month = m.prop(months[ month ]);
  },

  // example view
  view: function(ctrl){
    return [
      m('.calendar', [
        ctrl.prevLink(),
        ctrl.nextLink(),
        m('h3.month', ctrl.month()),
        ctrl.calendar()
      ])
    ];
  }
};
},{"mithril":"mithril"}]},{},[1])(1)
});