import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { GeoPoint, addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { Geohash } from "../queries/searchQueries";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from "../config/firebaseConfig";
// import { getMessaging } from "firebase/messaging";
import { STATUS_REQUESTED } from "../../constants";
// import { fun } from "../../help";


const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
// const messaging = getMessaging(app);

export const getUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const db = getFirestore();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const snapshot = await getDoc(doc(db, "user", user.uid));
                    if (snapshot.exists()) {
                        resolve({ user: snapshot.data() });
                    } else {
                        reject({ error: "User doesn't exists" });
                    }
                }
                catch (error) {
                    reject({ error: error.message });
                }
            } else {
                reject({ error: "User doesn't exists" });
            }
        })
    });
};

export const logInUser = (mobile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getAuth().currentUser.uid;
            const db = getFirestore();
            const snapshot = await getDoc(doc(db, "user", auth));
            if (snapshot.exists()) {
                resolve(snapshot.data());
            } else {
                const data = {
                    phoneNumber: mobile,
                    uid: auth,
                    level1: false,
                    level2: {
                        batteryCapacity: '',
                        chargerInfo: '',
                        mileage: '',
                        vehicleManufacturer: '',
                        vehicleRegistrationNumber: '',
                    },
                    level3: false,
                    name: '',
                    chargers: [],
                    firstName: "",
                    lastName: "",
                    email: "",
                    country: "India",
                    state: "",
                    city: "",
                    pinCode: "",
                }
                setDoc(doc(db, "user", auth), data)
                    .then(() => {
                        resolve(data);
                    })
                    .catch((error) => {
                        reject({ error: error.message });
                    })
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

export const registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth().currentUser.uid;
        const db = getFirestore();
        try {
            await setDoc(doc(db, "user", auth), data, { merge: true });
            resolve({ message: "success" });
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

export const logoutUser = () => {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                resolve("Successfully logged out");
            })
            .catch((error) => {
                reject({ error: error.message });
            })
    })
};

export const addCharger = (chargerData, chargerImages, idproofImages) => {
    console.log(chargerData);
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        const db = getFirestore();
        try {
            const imageUrl = [];

            for (const img of chargerImages) {
                const chargersImageRef = ref(storage, `chargers/${auth.currentUser.uid}/${img.name}`);
                const uploadResult = await uploadBytes(chargersImageRef, img);
                imageUrl.push(await getDownloadURL(uploadResult.ref));
                imageUrl.push(await getDownloadURL(uploadResult.ref));
            }

            const aadharImages = [];

            for (const img of idproofImages) {
                const aadharImageRef = ref(storage, `id_proofs/${img.name + auth.currentUser.uid}`);
                const uploadResult = await uploadBytes(aadharImageRef, img);
                aadharImages.push(await getDownloadURL(uploadResult.ref));
            }
            const chargerLocation = chargerData.chargerLocation;
            delete chargerData.chargerLocation;
            const docRef = doc(collection(db, 'chargers'));
            await setDoc(docRef, {
                uid: auth.currentUser.uid,
                chargerId: docRef.id,
                g: {
                    geopoint: new GeoPoint(chargerLocation.lat, chargerLocation.lng),
                    geohash: Geohash.encode(chargerLocation.lat, chargerLocation.lng, 9)
                },
                info: {
                    ...chargerData,
                    aadharImages,
                    imageUrl,
                }
            });
            await setDoc(doc(db, 'user', auth.currentUser.uid), {
                chargers: arrayUnion(docRef.id),
                level3: true
            }, { merge: true });
            resolve({ chargerId: docRef.id });
        } catch (error) {
            reject({ msg: error.message });
        }
    })
};

export const requestCharger = (chargerData, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getAuth().currentUser.uid;
            const db = getFirestore();
            const timeFormat = new Intl.DateTimeFormat('en-In', { timeStyle: 'short' });
            const dateFormat = Intl.DateTimeFormat('en-In', { day: 'numeric', month: 'long', year: 'numeric' });
            const data = {
                status: STATUS_REQUESTED,
                uId: auth,
                chargerId: chargerData.chargerId,
                providerId: chargerData.uid,
                timeSlot: (timeFormat.format(new Date(chargerData.start['$d'])) + " - " + timeFormat.format(new Date(chargerData.end['$d']))).toUpperCase(),
                price: chargerData.info.price,
                bookingDate: dateFormat.format(new Date())
            }
            try {
                await addDoc(collection(db, "booking"), data);
                resolve({ message: "success" });

            } catch (error) {
                reject({ error: error.message });
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

export const updateCharger = (id, status) => {

    return new Promise(async (resolve, reject) => {
        const db = getFirestore();
        try {
            const docRef = doc(db, "booking", id);

            await updateDoc(docRef, {
                status: status
            },)

            resolve({ msg: "success" });
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

export const getUserAndChargers = (userId, chargerId) => {
    return new Promise(async (resolve, reject) => {
        const db = getFirestore();
        try {
            const docRef1 = doc(db, "user", userId);
            const docSnap1 = await getDoc(docRef1);
            const docRef2 = doc(db, "chargers", chargerId);
            const docSnap2 = await getDoc(docRef2);

            if (docSnap1.exists() && docSnap2.exists()) {
                resolve({
                    user: docSnap1.data(),
                    charger: docSnap2.data(),
                })
            } else {
                reject({ error: "User doesn't exist" });
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};


// fun();
