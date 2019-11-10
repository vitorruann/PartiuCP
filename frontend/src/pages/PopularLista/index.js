import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function PopularLista() {

    const [popularLista, setPopularlista] = useState([]);

    useEffect(() => {
        async function carregarProdutos() {

            const lista_id = localStorage.getItem('lista');
            const response = await api.get('/produtosLista', {
                headers: { lista_id }
            });

            setPopularlista(response.data);
        }

        carregarProdutos();
    }, []);

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function loadProdutos() {
            const response = await api.get('/listaProdutos');

            setProdutos(response.data);
        }

        loadProdutos();
    }, []);

    const [produto, setProduto] = useState('');

    async function handleSubmit(event) {
        

        const lista_id = localStorage.getItem('lista');

        await api.post('/popularLista', { produto }, {
            headers: { lista_id }
        });

        const response = await api.get('/produtosLista', {
            headers: { lista_id }
        });

        setPopularlista(response.data);

    }

    return (
        <>
            <h1>Itens da Lista</h1>

            <ul className="popular-list">
                {popularLista.map(produtoLista => (
                    <li key={produtoLista._id}>
                        <strong>{produtoLista.produto}</strong>
                    </li>
                ))}
            </ul>

            <div>
                <form onSubmit={handleSubmit} >
                <input 
                id="produto" 
                type="produto" 
                placeholder="Digite o produto a ser inserido"
                value={produto}
                onChange={event => setProduto(event.target.value)}
                />
                    <select
                        onChange={event => setProduto(event.target.value)} >
                        <option value="">Selecione o produto</option>
                        {produtos.map(produto => (
                            <option
                                key={produto._id}
                                value={produto.nomeProduto}
                                onChange={event => setPopularlista(event.target.value)}
                            >{produto.nomeProduto}
                            </option>
                        ))}
                    </select>

                    <button className="btn" type="submit">Cadastrar Produto</button>
                </form>
            </div>
        </>
    )
}