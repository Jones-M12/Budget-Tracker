// console.log("Giving a shoutout from the service-worker!");


// //reference to files to be cached, from public folder
// const FILES_TO_CACHE = [
//     "/",
//     "/index.html",
//     "/index.js",
//     "/styles.css",
//     "/db.js",
//     "/icons/icon-192x192.png",
//     "/icons/icon-512x512.png",
//   ];

//   //use for static assests (icons & pictures)
// // reference to see DevTools-> Application--> Cache
// const CACHE_NAME = "static-cache-v2";

// //use for API calls
// // reference to see DevTools-> Application--> Cache
// const DATA_CACHE_NAME = "data-cache-v1";

// // install-- handles service worker being setup
// self.addEventListener("install", function(evt) {
//   evt.waitUntil(
//     //caches is a global varibale to open up Cache_Name
//     caches.open(CACHE_NAME).then(cache => {
//       //then cache is accessed 
//       console.log("Your files were pre-cached successfully!");
//       //adds all file names from lines 1-19
//       return cache.addAll(FILES_TO_CACHE);
//     })
//   );

//   self.skipWaiting(); //idc to wait for old verison to deactive, just activate new one
// });

// self.addEventListener("activate", function(evt) {
//   evt.waitUntil(
//     //grab all the differenct caches that have been setup
//     caches.keys().then(keyList => {
//       return Promise.all(
//         //iterate over all caches and remove any that are not listed/define lines 23 & 27
//         //remove aold cache data that is not needed anymore
//         keyList.map(key => {
//           if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//             console.log("Removing old cache data", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );

//   self.clients.claim(); 
// });

// // fetch
// // setup event listener upon fetch--- working API being called from the browser
// //Fetch- is a built in function that supports making network request 
// self.addEventListener("fetch", function(evt) {
//   // cache successful requests to the API
//   if (evt.request.url.includes("/api/")) { //checking event to make sure it includes /api/
//     evt.respondWith(
//       caches.open(DATA_CACHE_NAME).then(cache => {
//         return fetch(evt.request)
//           .then(response => {
//             // If the response was good, clone it and store it in the cache.
//             if (response.status === 200) {
//               cache.put(evt.request.url, response.clone());
//             }

//             return response; //add response to be used in the cache for next time
//           })
//           .catch(err => {
//             // Network request failed, try to get it from the cache.
//             return cache.match(evt.request); //returns whatever is in the cache during fail
//           });
//       }).catch(err => console.log(err))
//     );

//     return;
//   }

//   // if the request is not for the API, serve static assets using "offline-first" approach.
//   // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
//   evt.respondWith(
//     caches.match(evt.request).then(function(response) {
//       return response || fetch(evt.request);
//     })
//   );
// });