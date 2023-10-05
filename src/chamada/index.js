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


  async function alterar(id) {
    let url = `http://localhost:5000/alterar/${id}`

    setNome('');

    let resposta = await axios.put(url, { nome: nome })


  }

  return (
    <div className="pagina-autozone">

      <div className='cabecalho'>
        <img src='/assets/images/imautozone.png' />
      </div>

      <nav>
        <h1>Venha para a AutoZone</h1>
      </nav>

      <div className='meio'>
        <div>
          <h1>Venha para a AutoZone, aqui você encontra a peça que precisa para seu carro </h1>
          <p>Adicione sugestões de produtos abaixo</p>
        </div>
        <img src='/assets/images/autozonee.jpg' />
      </div>

      <aside>
        <div>
          <h1>Adicione uma peça, ou item</h1>

          <p>Nome do item</p>
          <div className='input'>
            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <p>Marca</p>
          <div className='input'>
            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <p>Categoria</p>
          <div className='input'>
            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <p>Valor</p>
          <div className='input'>
            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <p>Modelo</p>
          <div className='input'>
            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <button onClick={Salvar}>Salvar</button>
          <button onClick={listar}>Mostrar lista</button>
          
        </div>
      </aside>

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
                  <button onClick={() => alterar(item.id_chamada)}>alterar</button>
                </tr>
              ))}
            </tbody>
          </table>

    </div>
  );
}


