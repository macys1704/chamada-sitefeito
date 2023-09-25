import './index.scss';
import { useState } from 'react';
import axios from 'axios';

export default function Chamada() {
  const [nome, setNome] = useState('');
  const [listaChamada, setListaChamada] = useState([]);
  

  async function Salvar() {

    try {

      let inscricao = {
        nome: nome
        
      };

      
      setNome('');
      listar()
     

      let url = 'http://localhost:5000/inserir';
      let resposta = await axios.post(url, inscricao);
      

    } catch (err) {

    }



  }

  async function listar() {
    let url = 'http://localhost:5000/consulta';

    let resposta = await axios.get(url);
    setListaChamada(resposta.data);
  }

  async function apagar(id) {
    let url = `http://localhost:5000/deletar/${id}`

    let resposta = await axios.delete(url, id)
    console.log(resposta.data.erro)
    listar()
  }

  return (
    <div className="chamada">
      <nav>
        <h1>Chamada</h1>
        <input value={nome} onChange={(e) => setNome(e.target.value)}></input>
        <button onClick={Salvar}>Salvar</button>
        <button onClick={listar}>Mostrar Lista</button>
        
        <table>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {listaChamada.map((item) => (
              <tr key={item.id_chamada}>
                <td>{item.id_chamada}</td>
                <td>{item.nm_nome}</td>
                <button onClick={() => apagar(item.id_chamada)}>APAGAR</button>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
    </div>
  );
}


