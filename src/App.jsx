import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import RadnikPregled from './pages/radnici/RadnikPregled'
import './App.css'

function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.RADNICI} element={<RadnikPregled />} />
      </Routes>
      <hr />
      &copy; Edunova
    </Container>
  )
}

export default App
