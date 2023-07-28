import { getDatabase, push, ref } from 'firebase/database';
import firebaseConfig from '../config/firebaseConfig'
import { initializeApp } from 'firebase/app';

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // geohash Base32 map

export class Geohash {

    static encode(latitude, longitude, precision) {
        // If precision is not given, find the smallest precision that matches the given latitude and longitude
        if (typeof precision === 'undefined') {
            for (let p = 1; p <= 12; p++) {
                const hash = Geohash.encode(latitude, longitude, p);
                const posn = Geohash.decode(hash);
                if (posn.latitude === latitude && posn.longitude === longitude) {
                    return hash;
                }
            }
            precision = 12; // Set to maximum precision
        }

        latitude = Number(latitude);
        longitude = Number(longitude);
        precision = Number(precision);

        if (isNaN(latitude) || isNaN(longitude) || isNaN(precision)) {
            throw new Error('Invalid geohash');
        }

        let characterIndex = 0; // Index into base32 map
        let bit = 0; // Each character holds 5 bits
        let isEvenBit = true; // Used for alternating between latitude and longitude bits
        let geohash = '';

        let minLatitude = -90, maxLatitude = 90;
        let minLongitude = -180, maxLongitude = 180;

        // Create the geohash character by alternating between bits of latitude and longitude
        while (geohash.length < precision) {
            if (isEvenBit) {
                const midLongitude = (minLongitude + maxLongitude) / 2;
                if (longitude >= midLongitude) {
                    characterIndex = characterIndex * 2 + 1;
                    minLongitude = midLongitude;
                } else {
                    characterIndex = characterIndex * 2;
                    maxLongitude = midLongitude;
                }
            } else {
                const midLatitude = (minLatitude + maxLatitude) / 2;
                if (latitude >= midLatitude) {
                    characterIndex = characterIndex * 2 + 1;
                    minLatitude = midLatitude;
                } else {
                    characterIndex = characterIndex * 2;
                    maxLatitude = midLatitude;
                }
            }
            isEvenBit = !isEvenBit;

            if (++bit === 5) {
                // 5 bits give us a character: append it and start over
                geohash += base32.charAt(characterIndex);
                bit = 0;
                characterIndex = 0;
            }
        }

        return geohash;
    }

    static decode(geohash) {
        // Calculate the bounding box of the geohash
        const bounds = Geohash.calculateBounds(geohash);
        const minLatitude = bounds.sw.latitude, minLongitude = bounds.sw.longitude;
        const maxLatitude = bounds.ne.latitude, maxLongitude = bounds.ne.longitude;

        // Calculate the approximate latitude and longitude coordinates from the bounding box
        let latitude = (minLatitude + maxLatitude) / 2;
        let longitude = (minLongitude + maxLongitude) / 2;

        // Calculate the precision based on the range of latitude and longitude
        latitude = latitude.toFixed(Math.floor(2 - Math.log(maxLatitude - minLatitude) / Math.LN10));
        longitude = longitude.toFixed(Math.floor(2 - Math.log(maxLongitude - minLongitude) / Math.LN10));

        return { latitude: Number(latitude), longitude: Number(longitude) };
    }

    static calculateBounds(geohash) {
        if (geohash.length === 0) {
            throw new Error('Invalid geohash');
        }

        geohash = geohash.toLowerCase();

        let isEvenBit = true; // Used for alternating between latitude and longitude bits
        let minLatitude = -90, maxLatitude = 90;
        let minLongitude = -180, maxLongitude = 180;

        for (let i = 0; i < geohash.length; i++) {
            const char = geohash.charAt(i);
            const characterIndex = base32.indexOf(char);
            if (characterIndex === -1) {
                throw new Error('Invalid geohash');
            }

            // Extract bits from the character and adjust latitude and longitude ranges accordingly
            for (let bit = 4; bit >= 0; bit--) {
                const bitValue = (characterIndex >> bit) & 1;
                if (isEvenBit) {
                    // Longitude
                    const midLongitude = (minLongitude + maxLongitude) / 2;
                    if (bitValue === 1) {
                        minLongitude = midLongitude;
                    } else {
                        maxLongitude = midLongitude;
                    }
                } else {
                    // Latitude
                    const midLatitude = (minLatitude + maxLatitude) / 2;
                    if (bitValue === 1) {
                        minLatitude = midLatitude;
                    } else {
                        maxLatitude = midLatitude;
                    }
                }
                isEvenBit = !isEvenBit;
            }
        }

        const bounds = {
            sw: { latitude: minLatitude, longitude: minLongitude },
            ne: { latitude: maxLatitude, longitude: maxLongitude },
        };

        return bounds;
    }
}

export const saveQuery = (data) => {
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);

    return new Promise(async (resolve, reject) => {
        const dbRef = ref(database, "RouteMap");
        const startHash = Geohash.encode(data.start[1], data.start[0]);
        const endHash = Geohash.encode(data.end[1], data.end[0]);

        try {
            await push(dbRef, {
                geohash: startHash,
                geopoint: `${data.start[1]}, ${data.start[0]}`
            });
            await push(dbRef, {
                geohash: endHash,
                geopoint: `${data.end[1]}, ${data.end[0]}`
            });
            resolve({ msg: "Success" });
        } catch (error) {
            reject(error);
        }
    });
}