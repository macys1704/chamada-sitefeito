import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Chamada() {
  const [nome, setNome] = useState('');
  const [listaChamada, setListaChamada] = useState([]);

  async function Salvar() {
      let inscricao = {
        nome: nome
      };

      let url = 'http://localhost:5000/inserir';
      let resposta = await axios.post(url, inscricao);
      console.log('Inscrição salva:', resposta.data);
      setNome('');

  }

  async function listar() {
      let url = 'http://localhost:5000/consulta';

      let resposta = await axios.get(url);
      setListaChamada(resposta.data);
  }

  return (
    <div className="chamada">
      <nav>
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
                <td>{item.nm_nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
    </div>
  );
}

export default Chamada;
