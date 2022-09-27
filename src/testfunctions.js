const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.onCreate = functions.firestore
  .document("users/{docId}")
  .onCreate(async (snapshot) => {
    const data = snapshot.data();
    const docId = snapshot.id;
    const copyRef = db.collection("users").doc(docId);
    await copyRef.set(data);
  });
