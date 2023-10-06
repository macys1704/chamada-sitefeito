import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chamada() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState(0);
  const [modelo, setModelo] = useState('');
  const [listaChamada, setListaChamada] = useState([]);
  const [id, setId] = useState(0);
  const [erro,setErro] = useState('');

  async function Salvar() {
    try {
      let inscricao = {
        nome: nome,
        marca: marca,
        categoria: categoria,
        valor: valor,
        modelo: modelo
      }

      if (id === 0) {
        await axios.post('http://localhost:5000/inserir', inscricao);
        alert('Produto cadastrado com sucesso!')  
      } 
     
      else {
        await axios.put(`http://localhost:5000/alterar/${id}`, inscricao);
        alert('Produto alterado com sucesso!');
      }

      listar();
      limpar();

     
    } catch (err) {
      setErro(err.response.data.erro); 
    }
  }

  function limpar() {
    setNome('');
    setCategoria('');
    setMarca('');
    setModelo('');
    setValor(0);
    setId(0);
  }

  async function listar() {
    try {
      let url = 'http://localhost:5000/consulta';
      let resposta = await axios.get(url);
      setListaChamada(resposta.data);
    } catch (err) {
      setErro(err.response.data.erro); 
    }
  }

  async function apagar(id) {
    try {
      let url = `http://localhost:5000/deletar/${id}`;
      await axios.delete(url);
      listar();
    } catch (err) {
      setErro(err.response.data.erro); 
    }
  }

  function alterar(item) {
    setNome(item.produto);
    setCategoria(item.categoria);
    setMarca(item.marca);
    setModelo(item.modelo);
    setValor(item.valor);
    setId(item.id);
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="pagina-autozone">
      <header className='cabecalho'>
        <img src='/assets/images/imautozone.png' alt="AutoZone Logo" />
      </header>

      <main>
        <div className='meio'>
          <div>
            <h1>Venha para a AutoZone, aqui você encontra a peça que precisa para seu carro</h1>
            <p>Adicione sugestões de produtos abaixo</p>
          </div>
          <img src='/assets/images/autozonee.jpg' alt="AutoZone Store" />
        </div>

        <aside>
          <div className='section'>
            <h1>ADICIONE UM PRODUTO</h1>

            <div className='input'>
              <p>Nome do item</p>
              <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className='input'>
              <p>Marca</p>
              <input type='text' value={marca} onChange={e => setMarca(e.target.value)} />
            </div>

            <div className='input'>
              <p>Categoria</p>
              <input type='text' value={categoria} onChange={e => setCategoria(e.target.value)} />
            </div>

            <div className='input'>
              <p>Valor</p>
              <input type='number' value={valor} onChange={e => setValor(e.target.value)} />
            </div>

            <div className='input'>
              <p>Modelo</p>
              <input type='text' value={modelo} onChange={e => setModelo(e.target.value)} />
            </div>

            <h3>{erro}</h3>

            <div className='buttons'>
              <button onClick={Salvar}>
                {id === 0 ? 'Salvar' : 'Alterar'}
              </button>
              <button id='b1' onClick={listar}>Mostrar lista</button>
            </div>
          </div>
        </aside>
      </main>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Produto</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaChamada.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.produto}</td>
              <td>{item.marca} </td>
              <td>{item.categoria} </td>
              <td>{item.valor} </td>
              <td>{item.modelo} </td>
              <td>
                <button onClick={() => apagar(item.id)}>APAGAR</button>
                <button onClick={() => alterar(item)}>ALTERAR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
