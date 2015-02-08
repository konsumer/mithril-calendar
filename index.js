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