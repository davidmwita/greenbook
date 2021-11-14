// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvkehRWU-VsDRH0FgTqO7_Cq3fEkkGchg",
    authDomain: "include-a1f55.firebaseapp.com",
    projectId: "include-a1f55",
    storageBucket: "include-a1f55.appspot.com",
    messagingSenderId: "649683332523",
    appId: "1:649683332523:web:6ec7695b72634d1706f6ee",
    measurementId: "G-Y9CLMXT5JG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export firestore
const firestore = {
    getReviews: async () => {
        const reviewsCollection = collection(db, "reviews");
        const snapshot = await getDocs(reviewsCollection);
        const reviews = snapshot.docs.map((doc) => doc.data());
        return reviews;
    },

    //   placeOrder: async (order) => {
    //     await addDoc(collection(db, 'orders'), order);
    //   }
};

export default firestore;
