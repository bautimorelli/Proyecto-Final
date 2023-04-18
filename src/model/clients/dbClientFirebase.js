import admin from "firebase-admin"
import serviceAccount from "./firebaseKey.json" assert { type: "json" }

const firebaseInit = (url) => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: url,
	})
}

export default firebaseInit

