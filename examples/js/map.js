!function(t){function o(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var r={};return o.m=t,o.c=r,o.p="",o(0)}([function(t,o,r){"use strict";function i(){String.prototype.format||(String.prototype.format=function(t){var o=this;if(arguments.length>0)if(1==arguments.length&&"object"==typeof t){for(var r in t)if(void 0!=t[r]){var i=new RegExp("({"+r+"})","g");o=o.replace(i,t[r])}}else for(var n=0;n<arguments.length;n++)if(void 0!=arguments[n]){var i=new RegExp("({["+n+"]})","g");o=o.replace(i,arguments[n])}return o})}var n=r(1),e=function(){function t(t){this.provider=t,this.mapProvider=new n.MapProvider(t)}return t.prototype.getMapTile=function(t,o,r){return this.mapProvider.getMapTile(t,o,r)},t}();o.MapServer=e,function(t,o){t.document?o(t):function(t){if(!t.document)throw new Error("MapServer requires a window with a document");return o(t)}}("undefined"!=typeof window?window:this,function(t,o){o||(t.MapServer=e,i())})},function(t,o,r){"use strict";var i=r(2),n=r(8),e=r(9),a=r(10),s={GoogleProvider_AERIAL:i.GoogleProvider_AERIAL,GoogleProvider_HYBRID:i.GoogleProvider_HYBRID,GoogleProvider_ROAD:i.GoogleProvider_ROAD,TianDiProvider_AERIAL:e.TianDiProvider_AERIAL,TianDiProvider_ROAD:e.TianDiProvider_ROAD,GaoDeProvider_AERIAL:n.GaoDeProvider_AERIAL,GaoDeProvider_ROAD:n.GaoDeProvider_ROAD,GaoDeProvider_LABEL:n.GaoDeProvider_LABEL},u=function(){function t(t){t=s[t],t&&(this.provider=new t)}return t.prototype.getMapTile=function(t,o,r){var i=new a.MapTile(this.provider,t,o,r);return i},t}();o.MapProvider=u},function(t,o,r){"use strict";var i=this&&this.__extends||function(t,o){function r(){this.constructor=t}for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)},n=r(3),e=function(t){function o(){t.call(this)}return i(o,t),o.prototype.getTileUrls=function(t){if(t.row<0||t.row>=Math.pow(2,t.zoom))return null;var o=this.sourceCoordinate(t),r=t.row%4,i="Galileo".substr(0,Math.floor(8*Math.random())),n=this.urlTemplate,e=n.format(r,o.column,o.row,o.zoom,i);return[e]},o.prototype.toString=function(){return"GoogleProvider_"+this.type},o}(n.AbstractMapProvider);o.GoogleProvider=e;var a=function(t){function o(){t.call(this),this.type="AERIAL",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return i(o,t),o}(e);o.GoogleProvider_AERIAL=a;var s=function(t){function o(){t.call(this),this.type="HYBRID",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=p&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return i(o,t),o}(e);o.GoogleProvider_HYBRID=s;var u=function(t){function o(){t.call(this),this.type="ROAD",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return i(o,t),o}(e);o.GoogleProvider_ROAD=u},function(t,o,r){"use strict";var i=r(4),n=r(5),e=r(6),a=function(){function t(o,r,a,s){void 0===o&&(o=t.MIN_ZOOM),void 0===r&&(r=t.MAX_ZOOM),void 0===a&&(a=0),void 0===s&&(s=0);var u=new n.Transformation(10680707.79,0,33554431.85+a,0,-10680708.9,33554430.57+s);this.projection=new e.MercatorProjection(26,u),this.topLeftOutLimit=new i.Coordinate(0,Number.NEGATIVE_INFINITY,o),this.bottomRightInLimit=new i.Coordinate(1,Number.POSITIVE_INFINITY,0).zoomTo(r)}return t.prototype.geometry=function(){return this.projection.toString()},t.prototype.sourceCoordinate=function(t){for(var o=t.column%Math.pow(2,t.zoom);0>o;)o+=Math.pow(2,t.zoom);return new i.Coordinate(t.row,o,t.zoom)},t.prototype.outerLimits=function(){return[this.topLeftOutLimit.clone(),this.bottomRightInLimit.clone()]},t.prototype.locationCoordinate=function(t){return this.projection.locationCoordinate(t)},t.prototype.coordinateLocation=function(t){return this.projection.coordinateLocation(t)},Object.defineProperty(t.prototype,"tileWidth",{get:function(){return 256},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tileHeight",{get:function(){return 256},enumerable:!0,configurable:!0}),t.MIN_ZOOM=1,t.MAX_ZOOM=20,t}();o.AbstractMapProvider=a},function(t,o){"use strict";var r=function(){function t(t,o,r){this.row=t,this.column=o,this.zoom=r}return t.prototype.container=function(){return new t(Math.floor(this.row),Math.floor(this.column),this.zoom)},t.prototype.zoomTo=function(o){return new t(this.row*Math.pow(2,o-this.zoom),this.column*Math.pow(2,o-this.zoom),o)},t.prototype.zoomBy=function(o){return new t(this.row*Math.pow(2,o),this.column*Math.pow(2,o),this.zoom+o)},t.prototype.isRowEdge=function(){return Math.round(this.row)==this.row},t.prototype.isColumnEdge=function(){return Math.round(this.column)==this.column},t.prototype.isEdge=function(){return this.isRowEdge()&&this.isColumnEdge()},t.prototype.up=function(o){return void 0===o&&(o=1),new t(this.row-o,this.column,this.zoom)},t.prototype.right=function(o){return void 0===o&&(o=1),new t(this.row,this.column+o,this.zoom)},t.prototype.down=function(o){return void 0===o&&(o=1),new t(this.row+o,this.column,this.zoom)},t.prototype.left=function(o){return void 0===o&&(o=1),new t(this.row,this.column-o,this.zoom)},t.prototype.equalTo=function(t){return t&&t.row==this.row&&t.column==this.column&&t.zoom==this.zoom},t.prototype.clone=function(){return new t(this.row,this.column,this.zoom)},t.prototype.toString=function(){return this.column+","+this.row+","+this.zoom},t}();o.Coordinate=r},function(t,o){"use strict";var r=function(){function t(t,o,r,i,n,e){this.ax=t,this.bx=o,this.cx=r,this.ay=i,this.by=n,this.cy=e}return t.prototype.toString=function(){return"T(["+this.ax+","+this.bx+","+this.cx+"]["+this.ay+","+this.by+","+this.cy+"])"},t.prototype.transform=function(t){var o=t[0],r=t[1];return[this.ax*o+this.bx*r+this.cx,this.ay*o+this.by*r+this.cy]},t.prototype.untransform=function(t){var o=t[0],r=t[1];return[(o*this.by-r*this.bx-this.cx*this.by+this.cy*this.bx)/(this.ax*this.by-this.ay*this.bx),(o*this.ay-r*this.ax-this.cx*this.ay+this.cy*this.ax)/(this.bx*this.ay-this.by*this.ax)]},t}();o.Transformation=r},function(t,o,r){"use strict";var i=r(7),n=r(4),e=function(){function t(t,o){o&&(this.T=o),this.zoom=t}return t.prototype.project=function(t){return t=this.rawProject(t),this.T&&(t=this.T.transform(t)),t},t.prototype.unproject=function(t){return this.T&&(t=this.T.untransform(t)),t=this.rawUnproject(t)},t.prototype.locationCoordinate=function(t){var o=[Math.PI*t.lon/180,Math.PI*t.lat/180];return o=this.project(o),new n.Coordinate(o[1],o[0],this.zoom)},t.prototype.coordinateLocation=function(t){t=t.zoomTo(this.zoom);var o=[t.column,t.row];return o=this.unproject(o),new i.LonLat(180*o[0]/Math.PI,180*o[1]/Math.PI)},t.prototype.rawProject=function(t){return[t[0],Math.log(Math.tan(.25*Math.PI+.5*t[1]))]},t.prototype.rawUnproject=function(t){return[t[0],2*Math.atan(Math.pow(Math.E,t[1]))-.5*Math.PI]},t.prototype.toString=function(){return"Mercator("+this.zoom+", "+this.T.toString()+")"},t}();o.MercatorProjection=e},function(t,o){"use strict";var r=function(){function t(t,o){this.lon=t,this.lat=o}return t.fromString=function(o,r){void 0===r&&(r=!0);var i=o.split(/\s*,\s*/,2);return r||(i=i.reverse()),new t(parseFloat(i[0]),parseFloat(i[1]))},t.prototype.equals=function(t){return t&&t.lat==this.lat&&t.lon==this.lon},t.prototype.clone=function(){return new t(this.lon,this.lat)},t.prototype.normalize=function(){var o=this.clone();for(o.lat=Math.max(t.MIN_LAT,Math.min(t.MAX_LAT,o.lat));o.lon>180;)o.lon-=360;for(;o.lon<-180;)o.lon+=360;return o},t.prototype.toString=function(t){return void 0===t&&(t=5),[this.lon.toFixed(t),this.lat.toFixed(t)].join(",")},t.MAX_LAT=84,t.MIN_LAT=-84,t.MAX_LON=180,t.MIN_LON=-180,t}();o.LonLat=r},function(t,o,r){"use strict";var i=this&&this.__extends||function(t,o){function r(){this.constructor=t}for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)},n=r(3),e=function(t){function o(){t.call(this)}return i(o,t),o.prototype.getTileUrls=function(t){if(t.row<0||t.row>=Math.pow(2,t.zoom))return null;var o=this.sourceCoordinate(t),r=t.row%4+1,i=this.urlTemplate,n=i.format(r,o.column,o.row,o.zoom);return[n]},o.prototype.toString=function(){return"GaoDeProvider_"+this.type},o}(n.AbstractMapProvider);o.GaoDeProvider=e;var a=function(t){function o(){t.call(this),this.type="ROAD",this.urlTemplate="http://webrd0{0}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={1}&y={2}&z={3}"}return i(o,t),o}(e);o.GaoDeProvider_ROAD=a;var s=function(t){function o(){t.call(this),this.type="AERIAL",this.urlTemplate="http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=6&x={1}&y={2}&z={3}"}return i(o,t),o}(e);o.GaoDeProvider_AERIAL=s;var u=function(t){function o(){t.call(this),this.type="LABEL",this.urlTemplate="http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=8&x={1}&y={2}&z={3}"}return i(o,t),o}(e);o.GaoDeProvider_LABEL=u},function(t,o,r){"use strict";var i=this&&this.__extends||function(t,o){function r(){this.constructor=t}for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)},n=r(3),e=function(t){function o(){t.call(this)}return i(o,t),o.prototype.getTileUrls=function(t){if(t.row<0||t.row>=Math.pow(2,t.zoom))return null;var o=this.sourceCoordinate(t),r=t.row%7,i=this.urlTemplate,n=i.format(r,o.column,o.row,o.zoom);return[n]},o.prototype.toString=function(){return"TianDiProvider_"+this.type},o}(n.AbstractMapProvider);o.TianDiProvider=e;var a=function(t){function o(){t.call(this),this.type="AERIAL",this.urlTemplate="http://t{0}.tianditu.com/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={3}&TILEROW={2}&TILECOL={1}&FORMAT=tiles"}return i(o,t),o}(e);o.TianDiProvider_AERIAL=a;var s=function(t){function o(){t.call(this),this.type="ROAD",this.urlTemplate="http://t{0}.tianditu.com/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={3}&TILEROW={2}&TILECOL={1}&FORMAT=tiles"}return i(o,t),o}(e);o.TianDiProvider_ROAD=s},function(t,o,r){"use strict";var i=r(4),n=r(7),e=function(){function t(t,o,r,i){this.provider=t,this.lonlat=new n.LonLat(o,r);var e=t.locationCoordinate(this.lonlat),a=i-e.zoom;this.coordinate=e.zoomBy(a).container();var s=this.coordinate.zoomBy(-a),u=Math.pow(2,a);this.scaleValue=t.tileWidth*u,this.offset=[(e.column-s.column)*this.scaleValue,(e.row-s.row)*this.scaleValue],this.realMaxCoordinate=e}return t.prototype.getUrls=function(){return void 0===this.urls&&(this.urls=this.provider.getTileUrls(this.coordinate)),this.urls},t.prototype.getOffsetLonlat=function(t){var o=this.realMaxCoordinate.column-t[0]/this.scaleValue,r=this.realMaxCoordinate.row-t[1]/this.scaleValue,n=new i.Coordinate(r,o,this.realMaxCoordinate.zoom);return this.provider.coordinateLocation(n)},t.prototype.toString=function(){var t=this.lonlat,o=[Math.PI*t.lon/180,Math.PI*t.lat/180],r=this.provider.projection.rawProject(o),i="provider:"+this.provider.toString()+"\nlonlat:"+t.toString()+"(经纬度-地理坐标)\ntransformXY:"+r.toString()+"(投影坐标)\nmaxCoordinate:"+this.realMaxCoordinate.container().toString()+"(26级瓦片坐标)\ncoordinate:"+this.coordinate.toString()+"(瓦片坐标)\nscaleValue:"+this.scaleValue.toString()+"\noffset:"+this.offset+"(偏移坐标)\nurls:"+this.getUrls()+"(瓦片服务地址)\n";return i},t}();o.MapTile=e}]);