import { useEffect, useState } from "react";
import RadniciService from "../../services/radnici/RadniciService";

export default function RadnikPregled() {


    const [radnici, setRadnici] = useState([])

    useEffect(() => {
        ucitajRadnike()
    }, [])

    async function ucitajRadnike() {
        await RadniciService.get().then((odgovor) => {
            setRadnici(odgovor.data);
        });
    }

    return (
        <>
            <ul>
                {radnici && radnici.map(radnik => (
                    <li>{radnik.ime}</li>
                ))}
            </ul>
        </>
    )
}