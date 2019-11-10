import React, { useState } from 'react';
import api from '../../services/api';

export default function CriarLista({ history }) {

    const [nomeLista, setLista] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/criarLista', { nomeLista });

        history.push('/listas');
    }

    return (
        <>
            <p>
                <strong>Listas</strong>
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="lista">Lista: </label>
                <input
                    type="Lista"
                    id="Lista"
                    placeholder="Nome do Lista"
                    value={nomeLista}
                    onChange={event => setLista(event.target.value)}
                />

                <button className="btn" type="submit">Criar Lista</button>
            </form>
        </>
    )
}