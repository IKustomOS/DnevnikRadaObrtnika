import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import RadnikService from "../../services/radnik/RadnikService";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

export default function RadnikPregled() {

    const navigate = useNavigate()
    const [radnici, setRadnici] = useState([])

    useEffect(() => {
        ucitajRadnike()
    }, [])

    async function ucitajRadnike() {
        await RadnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setRadnici(odgovor.data);
        });
    }

    async function obrisi(id) {
        if (!confirm('Sigurno obrisati')) {
            return
        }
        await RadnikService.obrisi(id)
        ucitajRadnike()
    }

    return (
        <>
            <Link to={RouteNames.RADNIK_NOVI}
                className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog radnika
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Satnica</th>
                        <th>Broj sati</th>
                        <th>Prekovremeni</th>
                        <th>Bolovanje</th>
                        <th>Bonus</th>
                        <th>Penali</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {radnici && radnici.map(radnik => (
                        <tr key={radnik.id}>
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
                            <td>
                                <NumericFormat
                                    value={radnik.redovniSati}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' h'}
                                    decimalScale={1}
                                />
                            </td>
                            <td>
                                <NumericFormat
                                    value={radnik.prekovremeniSati}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' h'}
                                    decimalScale={1}
                                />
                            </td>
                            <td>
                                <NumericFormat
                                    value={radnik.bolovanjeSati}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' h'}
                                    decimalScale={1}
                                />
                            </td>
                            <td>
                                <NumericFormat
                                    value={radnik.bonus}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                />
                            </td>
                            <td>
                                <NumericFormat
                                    value={radnik.penali}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                />
                            </td>
                            <td>
                                <Button onClick={() => { navigate(`/radnik/${radnik.id}`) }}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => { obrisi(radnik.id) }}>
                                    Obriši
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )
}