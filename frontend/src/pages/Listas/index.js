import React, { useEffect, useState } from 'react';
import api from '../../services/api';


export default function Listas() {
    const [listas, setListas] = useState([]);
    useEffect(() => {
        async function loadListas() {
            const response = await api.get('/listas');

            setListas(response.data);
        }

        loadListas();
    }, []);

    return (
        <>
            <h1>Listas</h1>
            <ul className="listas">
                {listas.map(lista => (
                    <li key={lista._id}>
                        <header>
                            <strong>{lista.nomeLista}</strong>
                        </header>
                    </li>
                ))}
            </ul>
        </>


    )
}