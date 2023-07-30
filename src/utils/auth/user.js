import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";


export const getUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const db = getFirestore();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const snapshot = await getDoc(doc(db, "UserChargingRegister", user.uid));
                    if (snapshot.exists()) {
                        resolve({ user: snapshot.data() });
                    } else {
                        resolve({ user: null });
                    }
                }
                catch (error) {
                    reject({ error: error.message });
                }
            } else {
                resolve({ user: null });
            }
        })
    });
}


export const logInUser = (mobile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getAuth().currentUser.uid;
            const db = getFirestore();
            const snapshot = await getDoc(doc(db, "UserChargingRegister", auth));
            if (snapshot.exists()) {
                resolve(snapshot.data());
            } else {
                const data = {
                    PhoneNumber: mobile, uid: auth, level1: false, isProvider: false, level2: false
                }
                await setDoc(doc(db, "UserChargingRegister", auth), data);
                resolve(data);
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
}

export const registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth().currentUser.uid;
        const db = getFirestore();
        try {
            await setDoc(doc(db, "UserChargingRegister", auth), data, { merge: true });
            resolve({ message: "success" });
        } catch (error) {
            reject({ error: error.message });
        }
    });
}