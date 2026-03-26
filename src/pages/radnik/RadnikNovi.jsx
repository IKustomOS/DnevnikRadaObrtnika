import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import RadnikService from "../../services/radnik/RadnikService";


export default function RadnikNovi() {

    const navigate = useNavigate()

    async function dodaj(radnik) {
        //console.table(radnik) // ovo je za kontrolu da li je sve OK
        await RadnikService.dodaj(radnik).then(() => {
            navigate(RouteNames.RADNIK)
        })
    }


    function odradiSubmit(e) { //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            satnica: parseFloat(podaci.get('satnica')),
            redovniSati: parseInt(podaci.get('redovniSati')),
            prekovremeniSati: parseInt(podaci.get('prekovremeniSati')),
            bolovanjeSati: parseInt(podaci.get('bolovanjeSati')),
            bonus: parseFloat(podaci.get('bonus')),
            penali: parseFloat(podaci.get('penali'))
        })

    }

    return (
        <>
            <h3>
                Unos novog radnika
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Form.Group controlId="satnica">
                    <Form.Label>Satnica</Form.Label>
                    <Form.Control type="number" name="satnica" step={0.01} required />
                </Form.Group>

                <Form.Group controlId="redovniSati">
                    <Form.Label>Redovni sati</Form.Label>
                    <Form.Control type="number" name="redovniSati" step={1} required />
                </Form.Group>

                <Form.Group controlId="prekovremeniSati">
                    <Form.Label>Prekovremeni sati</Form.Label>
                    <Form.Control type="number" name="prekovremeniSati" step={1} required />
                </Form.Group>

                <Form.Group controlId="bolovanjeSati">
                    <Form.Label>Bolovanje sati</Form.Label>
                    <Form.Control type="number" name="bolovanjeSati" step={1} required />
                </Form.Group>

                <Form.Group controlId="bonus">
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control type="number" name="bonus" step={0.01} required />
                </Form.Group>

                <Form.Group controlId="penali">
                    <Form.Label>Penali</Form.Label>
                    <Form.Control type="number" name="penali" step={0.01} required />
                </Form.Group>

                <Form.Group controlId="aktivan">
                    <Form.Check label="Aktivan" name="aktivan" />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.RADNIK} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Upis novog radnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}