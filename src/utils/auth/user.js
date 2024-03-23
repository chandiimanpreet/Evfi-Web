import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { GeoPoint, addDoc, arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { Geohash } from "../queries/searchQueries";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from "../config/firebaseConfig";
import { STATUS_REQUESTED } from "../../constants";

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
                    chargers: [],
                    bookings: [],
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

export const requestCharger = (chargerData, bookedTimeSlot, AMPM, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getAuth().currentUser.uid;
            const db = getFirestore();
            const dateFormat = Intl.DateTimeFormat('en-In', { day: 'numeric', month: 'long', year: 'numeric' });
            let prevTimeSlot;

            try {
                prevTimeSlot = await getORUpdateTimeSlotOFCharger(chargerData.chargerId, -1);       // getting already existed timeSlot
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
                price: price,
                bookingDate: dateFormat.format(new Date()),
                timeSlot: bookedTimeSlot
            }

            try {
                const booking = await addDoc(collection(db, "booking"), data);

                await setDoc(doc(db, 'user', auth), {
                    bookings: arrayUnion(booking.id),
                }, { merge: true });

                await getORUpdateTimeSlotOFCharger(chargerData.chargerId,
                    newTimeSlots(prevTimeSlot, bookedTimeSlot));

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

export const getBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        const db = getFirestore();
        try {
            const docRef = doc(db, "booking", bookingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                resolve(docSnap.data())
            } else {
                reject({ error: "Booking id " + bookingId + "doesn't exist" });
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};

const StatesVsPrice = {
    'Andhra Pradesh': 9.95, 'Assam': 7.15, 'Bihar': 8.05, 'Chhattisgarh': 4.85,
    'Delhi': 8.00, 'Goa': 4.25, 'Gujarat': 5.20, 'Haryana': 7.10, 'Himachal Pradesh': 5.45,
    'Jharkhand': 4.25, 'Karnataka': 8.15, 'Kerala': 7.90, 'Madhya Pradesh': 6.65, 'Maharashtra': 11.82,
    'Manipur': 6.75, 'Meghalaya': 5.90, 'Mizoram': 6.00, 'Nagaland': 7.00, 'Odisha': 6.20,
    'Punjab': 6.63, 'Rajasthan': 7.95, 'Sikkim': 4.00, 'Tamil Nadu': 6.60, 'Telangana': 9.50,
    'Tripura': 7.20, 'Uttar Pradesh': 7.00, 'Uttarakhand': 6.25, 'West Bengal': 8.99,
};


// const EVs = [
//     'Kia Soul', 'Tata Tiago',
//     'Tata Tigor',
//     'Tata Nexon',
//     'MG Comet'
// ];

// const MyPricing = () => {
//     for (var i = 0; i < states.values.length; i++) {
//         // st = states.values[i];
//         // costPerKWH[st] = Tarrifs[i];
//     }
// }

// const xDistCost = (batteryCap, state, range, dist) => {
//     const myState = States.Delhi;
//     for (var i = 0; i < States.values.length; i++) {
//         if (States.values[i].toString() == state) {
//             myState = States.values[i];
//         }
//     }
//     return (batteryCap / range) * dist * (costPerKWH[myState]!);
// }

export const fullChargeCost = (batteryCap, state) => {
    return Math.round(parseInt(batteryCap) * StatesVsPrice[state]);
}


// var batteryCapacity = TextEditingController();

// var mileage = TextEditingController();

// var distance = TextEditingController();

// title: const Text('Home EV Charging Calculator'),
//     _makeField('Battery Capacity', 'kWh', batteryCapacity),
//     _makeField('Mileage/Range', 'Km', mileage),
//     _makeField('Distance', 'Km', distance),
//     double bCap = double.parse(batteryCapacity.text);
//     double range = double.parse(mileage.text);
//     double dist = double.parse(distance.text);
// print(
//     '-----------Using standard 3.2 kWh charger for Andhra Pradesh ');
//     double priceForDist = 0, priceForFullCharge = 0;
// priceForDist =
//     (bCap / range) * dist * costPerKWH[States.AndhraPradesh]!;
// priceForFullCharge = bCap * costPerKWH[States.AndhraPradesh]!;
// debugPrint(
//     '**Price to travel $dist km using any EV: ${priceForDist.toStringAsFixed(2)}');
// debugPrint(
//     '**Price for a full charge of $bCap kWh battery EV: ${priceForFullCharge.toStringAsFixed(2)}');
//             },


// Helpers
export const convertTimeforUserUI = (timeSlot) => {

    let time;
    let greaterThan12 = timeSlot >= 12 ? true : false;

    let zeroString = '0'.repeat(24);

    if (timeSlot >= 0)
        time = zeroString.substring(0, timeSlot) + '1' + zeroString.substring(timeSlot + 1);

    for (let i = 0; i < time.length; i++) {
        if (time[i] === '1') {
            time = i;
        }
    }

    time = time >= 12 ? time - 12 : time;
    time = `${time === 0 ? 12 : time}:00 - ${(time + 1)}:00`.concat(greaterThan12 ? ' PM' : ' AM');
    return time;
}

export const decimalToBinary = (decimalNumber) => {

    const binaryNo = decimalNumber >= 0 ? decimalNumber.toString(2) : 0;
    const addZeros = Math.max(0, 24 - binaryNo.length);

    const zeroPadding = "0".repeat(addZeros);
    return zeroPadding.concat(binaryNo);
}

const newTimeSlots = (prevTimeSlot, bookedTimeSlot) => {


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

    const setDesiredBit = 1 << bookedTimeSlot;      // making the desired bit one
    return prevTimeSlot | setDesiredBit;
};

