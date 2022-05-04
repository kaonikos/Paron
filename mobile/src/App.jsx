import {useSelector} from "react-redux";
import SplashScreen from "./screens/SplashScreen";
import Home from './screens/Home'
import Login from './screens/Login'
import ParticlesComponent from "./components/ParticlesComponent";

import './assets/theme/themeWhite.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css';

import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

const App = () => {

    const displayedScreen = useSelector((state) => state.displayedScreen)

    const renderScreen = () => {
        switch (displayedScreen) {
            case 'splashscreen': return <SplashScreen/>
            case 'home': return <Home/>
            case 'login': return <Login/>
            default: return null
        }
    }

    return (
        <div className="app">
            <ParticlesComponent />
            {renderScreen()}
        </div>
    );
}

export default App;
