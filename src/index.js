import {initializeApp} from 'firebase/app'
import {collection, getFirestore, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBV7QS-iHyRWGEDFTccFF_vOMiIFQ4sP8M",
    authDomain: "fir-a6fc0.firebaseapp.com",
    projectId: "fir-a6fc0",
    storageBucket: "fir-a6fc0.appspot.com",
    messagingSenderId: "446420891919",
    appId: "1:446420891919:web:90b394d3ad09e1083c267a",
    measurementId: "G-P6XMPNXNX0"
  };

  //intit firebase app
  initializeApp(firebaseConfig)

  // init service
  const db = getFirestore()
  const auth = getAuth()


  //collection ref
  const colRef = collection(db, 'books')

  // queries
  const q = query(colRef, orderBy('createdAt'))

  // get real time collection data
  onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
  })


  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp() 
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

//get a single document
const docRef = doc(db, 'books', '3Q0A3vOygcPROrZfHpvV')
// getDoc(docRef).then((doc) =>{
//     console.log(doc.data(), doc.id)
// })

onSnapshot(docRef, (doc) =>{
    console.log(doc.data(), doc.id)
})

//updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated'
    }).then(updateForm.reset())

})

//signing up users
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log('user created', cred.user)
        signupForm.reset()
    }).catch((err) =>{
        console.log(err.message)
    })
})

//logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
        console.log('the user signed out')
    }).catch((err) =>{
        console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email, password).then((cred =>{
        console.log('user logged in', cred.user)
    })).catch((err) => {
        console.log(err.message)
    })
})

//subscribe to auth

onAuthStateChanged(auth, (user) => {
    console.log('auth state changed', user)
})

//unsub from changes (auth and db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () =>{
    
})