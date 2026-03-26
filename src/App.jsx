import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import RadnikPregled from './pages/radnik/RadnikPregled'
import './App.css'
import RadnikNovi from './pages/radnik/RadnikNovi'
import RadnikPromjena from './pages/radnik/RadnikPromjena'

function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.RADNIK} element={<RadnikPregled />} />
        <Route path={RouteNames.RADNIK_NOVI} element={<RadnikNovi />} />
        <Route path={RouteNames.RADNIK_PROMJENA} element={<RadnikPromjena />} />

      </Routes>
      <hr />
      &copy; Ivan K.
    </Container>
  )
}

export default App
