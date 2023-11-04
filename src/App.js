import { useEffect, useState } from "react";
import SplashScreen from "./components/common/SplashScreen";
import "./App.css";
import MainApp from "./components/MainApp";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const splashFunc = () => {
    setTimeout(() => {
      setShowSplash(false);
      console.log("splash screen removed");
    }, 1000);
  };

  useEffect(() => {
    splashFunc();
  });
  return (
    <div className="App">
      {/* <h1>HOLA AMIGAS!</h1> */}
      
        {showSplash && <SplashScreen/>}
        {!showSplash && <MainApp/> }
    </div>
  );
}

export default App;
