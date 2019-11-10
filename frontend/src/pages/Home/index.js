import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home({ history }) {
    const [nomeLista, setLista] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/criarLista', { nomeLista });

        const { _id } = response.data;

        localStorage.setItem('lista', _id);

        history.push('/popularLista');
    }

    return (
        <>
            <p>
                <strong>Partiu Compras?</strong>
            </p>

            <Link to="/criarProdutos">
                <button className="btn" type="submit">Criar Produtos</button>
            </Link>

            <Link to="/criarLista">
                <button className="btn" type="submit">Criar Listas</button>
            </Link>

            <form onSubmit={handleSubmit}>
                <label htmlFor="popularLista">Nome da Lista: </label>
                <input
                    type="nomeLista"
                    id="nomeLista"
                    placeholder="Digite o nome da lista para editar"
                    value={nomeLista}
                    onChange={event => setLista(event.target.value)}
                />
                <button className="btn" type="submit">Popular Lista</button>
            </form>
        </>
    )
}