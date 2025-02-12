import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'

function App() {
  return (
    <>
    {/* Routes é igua o switch case, ele é o switch que fica observando a url 
    e o route é o case, vai cair em tal pagina de acordo com a /url*/}

    {/* e o BrowserRouter é para bilitar o processo de rotas, e ele envolve todas as tags de rotas  */}
        <BrowserRouter>

          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App