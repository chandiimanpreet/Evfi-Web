import { initializeApp } from "firebase/app";
import{ getMessaging } from "firebase/messaging";

// Production Key
const firebaseConfig = {
	apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
	authDomain: "evfi-prod.firebaseapp.com",
	databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "evfi-prod",
	storageBucket: "evfi-prod.appspot.com",
	messagingSenderId: "758735537136",
	appId: "1:758735537136:web:f0cec73edea6123e55d335"
};


// Personal Key

// const firebaseConfig = {
// 	apiKey: "AIzaSyDd-qvMFwNEFpUz-iBpkz9bdeRC6xrQoSg",
// 	authDomain: "evfi-test.firebaseapp.com",
// 	projectId: "evfi-test",
// 	storageBucket: "evfi-test.appspot.com",
// 	messagingSenderId: "656000451427",
// 	appId: "1:656000451427:web:5c8973f5e38b0f829ec956",
// 	measurementId: "G-3FG0EWB6SX"
// };

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export default firebaseConfig;

// // Manpreet Key

// export default firebaseConfig;