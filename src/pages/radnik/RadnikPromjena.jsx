import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/radnik/RadnikService";
import { useEffect, useState } from "react";

export default function SmjerPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [radnik,setRadnik] = useState({})
    const [aktivan,setAktivan] = useState(false)

    async function ucitajRadnik() {
        await RadnikService.getBySifra(params.sifra).then((odgovor)=>{
            
            const s = odgovor.data
            // po potrebi prilagođavam podatke
            
            s.datumPokretanja = s.datumPokretanja.substring(0,10)
            
            setRadnik(s)

            setAktivan(s.aktivan)
        })
    }

    useEffect(()=>{
        ucitajRadnik()
    },[])

    async function promjeni(radnik){
        //console.table(radnik) // ovo je za kontrolu da li je sve OK
        await RadnikService.promjeni(radnik).then(()=>{
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
            Unos novog smjera
        </h3>
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required 
                defaultValue={smjer.naziv} />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" step={1} 
                defaultValue={smjer.trajanje}/>
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01} 
                defaultValue={smjer.cijena}/>
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum pokretanja smjera</Form.Label>
                <Form.Control type="date" name="datumPokretanja" 
                defaultValue={smjer.datumPokretanja}/>
            </Form.Group>

            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan" 
                checked={aktivan}
                onChange={(e)=>{setAktivan(e.target.checked)}}
                />
            </Form.Group>

            <hr style={{marginTop: '50px', border: '0'}} />

            <Row>
                <Col>
                    <Link to={RouteNames.SMJEROVI} className="btn btn-danger">
                    Odustani
                    </Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success">
                       Promjeni smjer
                    </Button>
                </Col>
            </Row>

        </Form>
        </>
    )
}