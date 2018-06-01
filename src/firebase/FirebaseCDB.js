import firebase from 'firebase';

class FirebaseCDB {

    static i = 0;

    static initFB() {
        if (this.i < 1) {
            firebase.initializeApp({
                apiKey: 'AIzaSyB9Rs70Wah95RipfpEdDUnvIrDRVyoDzi8',
                authDomain: 'fireb-ui.firebaseapp.com',
                projectId: 'fireb-ui',
                databaseURL: 'https://fireb-ui.firebaseio.com/',
                storageBucket: 'gs://fireb-ui.appspot.com'
            });
        }
        this.i++;
    }

    static getCloudStorage() {
        this.initFB();
        const firestore = firebase.firestore();
        firestore.settings({ timestampsInSnapshots: true });
        return firebase.firestore();
    }

    static getUserReference() {
        this.initFB();
        return this.getCloudStorage().collection('users').doc('Gc6WWHLaCyolovaLO2A8');
    }

    static getUserStorage() {
        this.initFB();
        return firebase.storage().ref("users");
    }
}

export default FirebaseCDB;