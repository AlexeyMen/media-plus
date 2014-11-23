// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.match('xbmc/control/:action', 'xbmc#control', {via: 'GET'});
  this.match('xbmc/play/:pos', 'xbmc#play', {via: 'GET'});
  this.match('xbmc/thumbnail', 'xbmc#thumbnail', {via: 'GET'});
  this.match('xbmc/playlist', 'xbmc#playlist', {via: 'GET'});
  this.match('xbmc/composition', 'xbmc#composition', {via: 'GET'});
}
