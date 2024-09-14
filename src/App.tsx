import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Pessoas from './views/pessoas'
import Menu from './views/menu/menu'
import ListaPessoas from './views/lista'
import Relatorio from './views/relatorio'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu /> 
        <Routes>
          <Route path="/" element={<ListaPessoas/>}/>
          <Route path="/cadastro" element={<Pessoas />}/>
          <Route path="/relatorio" element={<Relatorio />}/>
          <Route path="/*" element={<ListaPessoas/>}/>
        </Routes>
      </BrowserRouter>      
    </div>
    
  )
}

export default App
