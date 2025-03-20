import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxhjc7OfunYt4LrQTBFtsggXWEp0xgR6M",
  authDomain: "bodyachepwebsite4.firebaseapp.com",
  projectId: "bodyachepwebsite4",
  storageBucket: "bodyachepwebsite4.firebasestorage.app",
  messagingSenderId: "737853988712",
  appId: "1:737853988712:web:5abce6ae4dc83010ec40dd",
  measurementId: "G-VDSLYH0J00"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Запис даних в Firebase
function saveMessage(message) {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push({
      text: message,
      timestamp: Date.now(),
    });
  }
  
  // Виведення повідомлень з Firebase
  function getMessages() {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', function(snapshot) {
      const messages = snapshot.val();
      console.log(messages);
      // Тут можна оновити інтерфейс чату
    });
  }
  