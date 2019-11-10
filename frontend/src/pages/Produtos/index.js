import React, { useEffect, useState } from 'react';
import api from '../../services/api';


export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        async function loadProdutos() {
            const response = await api.get('/listaProdutos');

            setProdutos(response.data);
        }

        loadProdutos();
    }, []);

    return (
        <>
            <h1>Produtos</h1>
            <ul className="lista-produtos">
                {produtos.map(produto => (
                    <li key={produto._id}>
                        <header>
                            <strong>{produto.nomeProduto}</strong>
                        </header>
                    </li>
                ))}
            </ul>
        </>


    )
}