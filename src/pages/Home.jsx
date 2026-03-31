import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/DnevnikRadaObrtnika_logo1.png';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
    return (
        <>

            <div style={{ maxHeight: '300px', maxWidth: '100%', margin: 'auto' }}>
                <img src={slika} style={{ maxHeight: '20rem', maxWidth: '20rem' }} />
            </div>

            <h1>Dobrodošli na <br /> {IME_APLIKACIJE}</h1>

           <div>
           <DotLottieReact
                src="https://lottie.host/44b73372-03bf-4760-8e97-e96c1cd1a2d3/YV9xpZpnp1.lottie"
                loop
                autoplay
            />
            </div>
        </>
    )
}