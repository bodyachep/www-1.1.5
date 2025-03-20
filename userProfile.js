// ініціалізація Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-app-id.firebaseapp.com",
    databaseURL: "https://your-app-id.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-app-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);
  
  // Функція для отримання даних з Firebase
  function getDataFromDatabase() {
      const ref = database.ref("messages");
      ref.once("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);
      });
  }
  