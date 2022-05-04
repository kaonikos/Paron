import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesBlackConfiguration from "./particlesBlackConfiguration";
import particlesWhiteConfiguration from './particlesWhiteCofiguration'
import {useSelector} from "react-redux";

const ParticlesComponent = () => {

    const displayedScreen = useSelector((state) => state.displayedScreen)
    const darkMode = useSelector((state) => state.darkMode)

    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
        <div style={{opacity: "1"}}>
            {displayedScreen === 'splashscreen' ?
                <></> :
                <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={darkMode ? particlesWhiteConfiguration : particlesBlackConfiguration}
            />}
        </div>
    );
};

export default ParticlesComponent
