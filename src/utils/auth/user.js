import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref, set, update } from 'firebase/database';


export const getUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const dbRef = ref(database);
                    const snapshot = await get(child(dbRef, `Users/${user.uid}`));
                    resolve({ user: snapshot.val() });
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
            const database = getDatabase();
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `Users/${auth}`));

            if (snapshot.exists()) {
                resolve(snapshot.val());
            } else {
                const data = {
                    mobile: mobile, uid: auth, username: null, registeredLevel1: false, isProvider: false, registeredLevel2: false, vehicleNo: null, chargerType: null, vehicleType: null
                }
                await set(ref(database, "Users/" + auth), data);
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
        const database = getDatabase();
        try {
            await update(ref(database, "Users/" + auth), data);
            resolve({ message: "success" });
        } catch (error) {
            reject({ error: error.message });
        }
    });
}