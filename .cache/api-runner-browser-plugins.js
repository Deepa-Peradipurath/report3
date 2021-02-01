module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[],"stylesProvider":{"injectFirst":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-nprogress/gatsby-browser.js'),
      options: {"plugins":[],"color":"red","showSpinner":true},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"MyPepsiCo","short_name":"MyPepsiCo","start_url":"/","background_color":"#002c5f","theme_color":"#fa9614","display":"fullscreen","icon":"src/data/images/pepsico.png","crossOrigin":"use-credentials","legacy":false,"include_favicon":false,"cache_busting_mode":"query","theme_color_in_head":true,"cacheDigest":"2aab9859eb592fa127cbf66933d85add"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[],"appendScript":"/Users/developer/report3/src/data/service-web/sw-code.js"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
