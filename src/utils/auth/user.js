import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref, set, update } from 'firebase/database';


export const getUser = async () => new Promise((resolve, reject) => {
    const auth = getAuth();
    const database = getDatabase();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const dbRef = ref(database)
            get(child(dbRef, `Users/${user.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({ user: snapshot.val() })
                    } else {
                        resolve({ user: null })
                    }
                })
                .catch((error) => {
                    reject({ error: error.message })
                })
        } else {
            resolve({ user: null })
        }
    })
})


export const logInUser =async (mobile) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth().currentUser.uid;
        const database = getDatabase();
        const dbRef = ref(database);
        get(child(dbRef, `Users/${auth}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val())
                } else {
                    const data = {
                        mobile: mobile, registered: false, uid: auth
                    }
                    set(ref(database, "Users/" + auth), data)
                        .then(() => {
                            resolve({ registered: false });
                        })
                        .catch((error) => {
                            reject({ error: error.message })
                        })
                }
            })
            .catch((error) => {
                reject({ error: error.message })
            })
    })
}
export const registerUser =async (data) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth().currentUser.uid;
        const database = getDatabase();
        update(ref(database, "Users/" + auth), data)
            .then(() => {
                resolve({ registered: true });
            })
            .catch((error) => {
                reject({ error: error.message });
            })
    })
}