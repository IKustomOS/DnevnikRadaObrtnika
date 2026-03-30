import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/DnevnikRadaObrtnika_logo1.png';

export default function Home(){
    return(
    <>

    <div style={{maxHeight: '300px', maxWidth: '100%', margin: 'auto'}}>
                <img src={slika} style={{maxHeight: '20rem', maxWidth: '20rem'}} />          
    </div>

    <h1>Dobrodošli na {IME_APLIKACIJE}</h1>    
    </>
    )
}