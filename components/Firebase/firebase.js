import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
const config = {
  apiKey: "API-KEY",
  authDomain: "AUTH-DOMAIN",
  databaseURL: "DATABASE-URL",
  projectId: "PROJECT-ID",
  storageBucket: "STORAGE-BUCKET",
  messagingSenderId: "MESSAGING-SENDER-ID",
  appId: "APP-ID"
};


// Create class firebase
class Firebase {
  constructor() {
    // If firebase has more than one app
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    // Initialize firebase auth,database and serverValue
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.serverValue = firebase.database.ServerValue;


  }
  // Firebase check if user is signed in
  onAuthUserListener = (next) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        next(authUser)
      }
    });

  // *** Auth API ***
  //Create User function
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // User Sign in function
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // User Sign out function 
  doSignOut = () => this.auth.signOut();


  // *** User API Database ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');


  // *** Flower Database ***
  flower = flowerID => this.db.ref(`flowers/${flowerID}/`);
  flowers = () => this.db.ref('flowers/');

  // ** Comment flower database ***
  singleComment = (flowerID, commentID) => this.db.ref(`flowers/${flowerID}/${commentID}/`)

}
//export Class firebase
export default Firebase
