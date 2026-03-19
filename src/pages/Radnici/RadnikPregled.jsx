import { useEffect, useState } from "react";
import RadniciService from "../../services/radnici/RadniciService";
import { Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format"

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
            <Table>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Satnica</th>
                        <th>Broj sati</th>
                    </tr>
                </thead>
                <tbody>
                    {radnici && radnici.map(radnik => (
                        <tr>
                            <td>{radnik.ime}</td>
                            <td>{radnik.prezime}</td>
                            <td>
                                <NumericFormat
                                value={radnik.satnica}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix={' €'}
                                decimalScale={2}
                                />
                            </td>
                            <td>{radnik.broj_sati}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )
}