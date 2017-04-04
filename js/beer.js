$(document).ready(function() {
  var waypoint = new Waypoint({
    element: document.getElementById('callAnim'),
    handler: function() {
      $('#liquid')
      .animate({
        height: '200px'
      }, 2500);
      $('.beer-foam')
      .animate({
        bottom: '200px'
      }, 2500);
    }
  })
});

