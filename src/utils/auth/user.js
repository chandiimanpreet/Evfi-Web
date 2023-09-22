import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { GeoPoint, addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { Geohash } from "../queries/searchQueries";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';
import firebaseConfig from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig)
const storage = getStorage(app);

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
                        console.log(data)
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
        console.log(data);
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
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        const db = getFirestore();
        try {
            const chargersImageUrl = [];

            for (const img of chargerImages) {
                const chargersImageRef = ref(storage, `chargers/${auth.currentUser.uid}/${img.name}`);
                const uploadResult = await uploadBytes(chargersImageRef, img);
                chargersImageUrl.push(await getDownloadURL(uploadResult.ref));
            }

            const aadharImagesUrl = [];

            for (const img of idproofImages) {
                const aadharImageRef = ref(storage, `id_proofs/${img.name + auth.currentUser.uid}`);
                const uploadResult = await uploadBytes(aadharImageRef, img);
                aadharImagesUrl.push(await getDownloadURL(uploadResult.ref));
            }
            const docRef=doc(collection(db, 'chargers'));
            await setDoc(docRef, {
                userId: auth.currentUser.uid,
                g: {
                    geopoint: new GeoPoint(chargerData.chargerLocation.lat, chargerData.chargerLocation.lng),
                    geohash: Geohash.encode(chargerData.chargerLocation.lat, chargerData.chargerLocation.lng, 9)
                },
                info: {
                    ...chargerData,
                    chargerLocation: null,
                    openingTime: new Timestamp(new Date(chargerData.openingTime['$d']).getTime() / 1000, 0),
                    closingTime: new Timestamp(new Date(chargerData.closingTime['$d']).getTime() / 1000, 0),
                    aadharImagesUrl,
                    chargersImageUrl,
                    batteryCapacity: '',
                    chargerInfo: '',
                    mileage: '',
                    vehicleManufacturer: '',
                    vehicleRegistration: '',
                    id:docRef.id
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
            console.log(chargerData);
            const data = {
                status: 1,
                userId: auth,
                chargerId: chargerData.id,
                timeSlot:{
                    from:new Timestamp(new Date(chargerData.start['$d']).getTime() / 1000, 0),
                    end:new Timestamp(new Date(chargerData.end['$d']).getTime() / 1000, 0)
                },
                price: chargerData.info.price,
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

export const getParticularUser = (userId, chargerId) => {
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


