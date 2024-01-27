importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
	authDomain: "evfi-prod.firebaseapp.com",
	databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "evfi-prod",
	storageBucket: "evfi-prod.appspot.com",
	messagingSenderId: "758735537136",
	appId: "1:758735537136:web:f0cec73edea6123e55d335"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });