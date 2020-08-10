// show a notification after 15 seconds (the notification
// permission must be granted first)

// setTimeout(() => {
//     self.registration.showNotification("This is Web Service notification")
// }, 3000)

// // register a custom navigation route
// const customRoute = new workbox.routing.NavigationRoute(({ event }) => {
// // ...
// })
// workbox.routing.registerRoute(customRoute)

/* eslint-disable */

self.addEventListener('activate', handleActivate);

// See SO article: https://stackoverflow.com/questions/45467842/how-to-clear-cache-of-service-worker
function handleActivate(event) {
    return event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //console.log('cache name: ', cacheName);
                    caches.delete(cacheName);
                })
            );
        })
    );
}
// importScripts('swenv.js'); // this file conatins all push env specific properties
// // Push worker code for web/push notifications  
// // 86acbd31cd7c09cf30acb66d2fbedc91daa48b86:1593019119.7563963
// importScripts('https://aswpsdkus.com/notify/v1/ua-sdk.min.js')
// uaSetup.worker(self, {
// defaultIcon: process.env.DEFAULT_ICON,
// defaultTitle: process.env.DEFAULT_TITLE,
// defaultActionURL: process.env.DEFAULT_ACTION_URL,
// appKey: process.env.APP_KEY,
// token: process.env.TOKEN,
// vapidPublicKey: process.env.VALID_PUBLIC_KEY,
// })  
  
