module.exports = {
  openstreetmap: {
    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  opencyclemap: {
    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
    options: {
      attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }
  },

  mapbox_dark: {
    name: 'Mapbox Dark',
    url: 'https://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    options: {
      apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
      mapid: 'mapbox.dark',
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  },
  mapbox_light: {
    name: 'Mapbox Light',
    url: 'http://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    options: {
      apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
      mapid: 'mapbox.light',
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  },
  mapbox_highcontrast: {
    name: 'Mapbox High Contrast',
    url: 'http://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    options: {
      apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
      mapid: 'mapbox.high-contrast',
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  }
};
