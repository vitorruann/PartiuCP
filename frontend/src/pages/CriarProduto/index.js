import React, { useState } from 'react';
import api from '../../services/api';

export default function CriarProduto({ history }) {

    const [nomeProduto, setProduto] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/criarProdutos', { nomeProduto });

        history.push('/listaProdutos');
    }

    return (
        <>
            <p>
                <strong>Produto</strong>
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="produto">Produto: </label>
                <input
                    type="produto"
                    id="produto"
                    placeholder="Nome do produto"
                    value={nomeProduto}
                    onChange={event => setProduto(event.target.value)}
                />

                <button className="btn" type="submit">Criar Produto</button>
            </form>
        </>
    )
}