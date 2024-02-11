
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:  "AIzaSyBbk8yeKd0IMVyB5VYCAhuPBmxwc7N5aKo",
    authDomain: "sustainable-transport-hub.firebaseapp.com",
    projectId:  "sustainable-transport-hub",
    storageBucket: "sustainable-transport-hub.appspot.com",
    messagingSenderId: "218190374335",
    appId:  "1:218190374335:web:77f4268e4b9ed77a772d0a",
    measurementId: "G-6JEK3MLKMC"
};


// Initialize Firebase

// Function to post a message in the forum
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to post a message in the forum
function postMessage() {
    let postText = document.getElementById('postText').value;
    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];
    if (file) {
        let ref = storageRef(storage, 'forum_files/' + file.name);
        uploadBytes(ref, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {
                addDoc(collection(db, "posts"), {
                    text: postText,
                    imageUrl: url,
                    timestamp: serverTimestamp()
                }).then(() => {
                    document.getElementById('postText').value = ''; // Clear the textarea
                    fileInput.value = ''; // Clear the file input
                    // Append the new message to the postsDiv
                    appendMessage(postText, url);
                });
            });
        });
    } else {
        addDoc(collection(db, "posts"), {
            text: postText,
            timestamp: serverTimestamp()
        }).then(() => {
            document.getElementById('postText').value = ''; // Clear the textarea
            // Append the new message to the postsDiv
            appendMessage(postText);
        });
    }
}

// Function to append a message to the postsDiv
function appendMessage(text, imageUrl) {
    let postsDiv = document.getElementById('posts');
    let postElement = document.createElement('div');
    postElement.innerText = text;
    if (imageUrl) {
        let image = document.createElement('img');
        image.src = imageUrl;
        postElement.appendChild(image);
    }
    postsDiv.appendChild(postElement);
}

