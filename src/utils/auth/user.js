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

export const getProviderPhoneNumber=(id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const db = getFirestore();
            const snapshot=await getDoc(doc(db,"user",id));
            if(snapshot.exists()){
                resolve(snapshot.data().phoneNumber);
            }
        } catch (error) {
            reject({ error: error.message });
        }
    })
}

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
                    level2: false,
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
                },
                timeSlot: 0,
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

export const decimalToBinary = (decimalNumber) => {

    const binaryNo = decimalNumber > 0 ? decimalNumber.toString(2) : 0;
    const addZeros = Math.max(0, 24 - binaryNo.length);

    const zeroPadding = "0".repeat(addZeros);

    return zeroPadding.concat(binaryNo);
}

const binaryToDecimal = (num) => {
    return parseInt(num, 2);
};

const newTimeSlots = (prevTimeSlot, bookedTimeSlot) => {

    const prevBin = decimalToBinary(prevTimeSlot).padStart(24, '0');

    let newTimeSlot = "";

    for (let i = 0; i < 24; i++) {
        newTimeSlot += (i === bookedTimeSlot) ? "1" : prevBin[i];
    }

    return newTimeSlot;
};

const getORUpdateTimeSlotOFCharger = (chargerId, newTiming) => {
    return new Promise(async (resolve, reject) => {

        const db = getFirestore();

        try {
            const docRef = doc(db, "chargers", chargerId);

            if (newTiming === -1) {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Charger Data:", docSnap.data());
                } else {
                    console.log("No such Charger!");
                }

                resolve(docSnap.data().timeSlot);
            } else {
                await updateDoc(docRef, {
                    timeSlot: newTiming
                })

                resolve({ msg: "success" });
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
}

export const requestCharger = (chargerData, bookedTimeSlot, AMPM) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getAuth().currentUser.uid;
            const db = getFirestore();
            const dateFormat = Intl.DateTimeFormat('en-In', { day: 'numeric', month: 'long', year: 'numeric' });
            let prevTimeSlot;

            try {
                prevTimeSlot = await getORUpdateTimeSlotOFCharger(chargerData.chargerId, -1);
            } catch (err) {
                reject({ error: err.message });
            }

            if (AMPM === 'AM' && bookedTimeSlot === 12) {
                bookedTimeSlot = 0;
            } else if (AMPM === 'PM' && bookedTimeSlot !== 12) {
                bookedTimeSlot = bookedTimeSlot + 12;
            }

            const data = {
                uId: auth,
                status: STATUS_REQUESTED,
                chargerId: chargerData.chargerId,
                providerId: chargerData.uid,
                price: chargerData.info.price,
                bookingDate: dateFormat.format(new Date()),
                timeSlot: binaryToDecimal(newTimeSlots(0, bookedTimeSlot)),
            }

            try {
                await addDoc(collection(db, "booking"), data);

                await getORUpdateTimeSlotOFCharger(chargerData.chargerId,
                    binaryToDecimal(newTimeSlots(prevTimeSlot, bookedTimeSlot)));

                resolve({ message: "success" });
            } catch (error) {
                reject({ error: error.message });
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

export const updateBookedCharger = (id, status) => {

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



export const addComplaint = (chargerId, complaintData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const storage = getStorage();

            const imgs = [];
            for (const image of complaintData.images) {
                const imageRef = ref(storage, `complaints/${chargerId}/${image.name}`);
                const uploadResult = await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imgs.push(imageUrl);
            }

            const complaintCollectionRef = collection(db, 'complaints');
            const newComplaintRef = await addDoc(complaintCollectionRef, {
                chargerId: chargerId,
                userId: complaintData.userId,
                providerId: complaintData.providerId,
                description: complaintData.description,
                images: imgs,
            });

            const chargerDocRef = doc(db, 'chargers', chargerId);
            await updateDoc(chargerDocRef, {
                complaints: arrayUnion(newComplaintRef.id)
            });

            console.log("Complaint added successfully");
            resolve({ message: "Complaint added successfully" });
        } catch (error) {
            console.error("Error adding complaint:", error);
            reject({ error: error.message });
        }
    });
};
