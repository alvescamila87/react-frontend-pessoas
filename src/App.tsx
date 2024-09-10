import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Pessoas from './views/pessoas'
import Menu from './views/menu/menu'
import ListaPessoas from './views/lista'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path="/listar" element={<ListaPessoas/>}/>
          <Route path="/cadastro" element={<Pessoas />}/>
          <Route path="/relatorio" element="A DEFINIR"/>
          <Route path="*" element={<Menu />}/>
        </Routes>
      </BrowserRouter>      
    </div>
    
  )
}

export default App
