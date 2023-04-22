import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./components/game";
import { Nav } from './components/nav-bar'
import { LeaderBoards } from "./components/leaderboards";
import { Footer } from "./components/footer";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import './styles/styles.css'
 
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDs7oKzMuuURyHgIv6rl_u6C_eJT6nfWQc",
    authDomain: "can-you-find-10bf9.firebaseapp.com",
    projectId: "can-you-find-10bf9",
    storageBucket: "can-you-find-10bf9.appspot.com",
    messagingSenderId: "438049237266",
    appId: "1:438049237266:web:affeb0d44a666ef86aabcb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getLeaderboards = async() => {
    // Get leaderboard names and times from firestore database.
    const leaderboardCol = collection(db, `leaderboards`);
    const leaderboardSnapshot = await getDocs(leaderboardCol);
    const leaderboards = leaderboardSnapshot.docs.map(doc => doc.data());
    return leaderboards
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Game getLeaderboards={getLeaderboards} db={db} />}/>
          <Route path='/leaderboards' element={<LeaderBoards getLeaderboards={getLeaderboards} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
