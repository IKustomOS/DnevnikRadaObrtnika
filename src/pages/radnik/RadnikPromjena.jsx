import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";
import RadnikService from "../../services/radnik/RadnikService";

export default function radnikPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [radnik,setRadnik] = useState({})

    async function ucitajRadnik() {
        await RadnikService.getById(params.id).then((odgovor)=>{
            console.table(odgovor.data)
            const s = odgovor.data
            // po potrebi prilagođavam podatke
        
            
            setRadnik(s)

            setAktivan(s.aktivan)
        })
    }

    useEffect(()=>{
        ucitajRadnik()
    },[])

    async function promjeni(radnik){
        //console.table(radnik) // ovo je za kontrolu da li je sve OK
        await RadnikService.promjeni(params.id,radnik).then(()=>{
            navigate(RouteNames.RADNIK)
        })
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            satnica: parseFloat(podaci.get('satnica')),
            redovniSati: parseInt(podaci.get('redovniSati')),
            prekovremeniSati: parseInt(podaci.get('prekovremeniSati')),
            bolovanjeSati: parseInt(podaci.get('bolovanjeSati')),
            bonus: parseFloat(podaci.get('bonus')),
            penali: parseFloat(podaci.get('penali')),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    return(
        <>
        <h3>
            Unos novog radnika
        </h3>
        <Form onSubmit={odradiSubmit}>
           <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={radnik.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required 
                    defaultValue={radnik.prezime}/>
                </Form.Group>

                <Form.Group controlId="satnica">
                    <Form.Label>Satnica</Form.Label>
                    <Form.Control type="number" name="satnica" step={0.01} required 
                    defaultValue={radnik.satnica}/>
                </Form.Group>

                <Form.Group controlId="redovniSati">
                    <Form.Label>Redovni sati</Form.Label>
                    <Form.Control type="number" name="redovniSati" step={1} required 
                    defaultValue={radnik.redovniSati}/>
                </Form.Group>

                <Form.Group controlId="prekovremeniSati">
                    <Form.Label>Prekovremeni sati</Form.Label>
                    <Form.Control type="number" name="prekovremeniSati" step={1} required 
                    defaultValue={radnik.prekovremeniSati}/>
                </Form.Group>

                <Form.Group controlId="bolovanjeSati">
                    <Form.Label>Bolovanje sati</Form.Label>
                    <Form.Control type="number" name="bolovanjeSati" step={1} required 
                    defaultValue={radnik.bolovanjeSati}/>
                </Form.Group>

                <Form.Group controlId="bonus">
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control type="number" name="bonus" step={0.01} required 
                    defaultValue={radnik.bonus}/>
                </Form.Group>

                <Form.Group controlId="penali">
                    <Form.Label>Penali</Form.Label>
                    <Form.Control type="number" name="penali" step={0.01} required 
                    defaultValue={radnik.penali}/>
                </Form.Group>


            <hr style={{marginTop: '50px', border: '0'}} />

            <Row>
                <Col>
                    <Link to={RouteNames.RADNIK} className="btn btn-danger">
                    Odustani
                    </Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success">
                       Promjeni radnik
                    </Button>
                </Col>
            </Row>

        </Form>
        </>
    )
}