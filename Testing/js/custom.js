Notification.requestPermission(function(status) {
  console.log("Notification permission status:", status);
});

function displayNotification() {
  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification("Thanks for subscribing for to our notifications.");
    });
  }
}

var now = new Date();
var millisTill20 =
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 45, 0, 0) -
  now;

setTimeout(function() {
  displayNotification();
}, millisTill20);
