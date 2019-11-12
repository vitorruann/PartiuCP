import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const useStyles = makeStyles({
    root: {
        width: 400,
    },
});

export default function PopularLista({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('lista');

    const [popularLista, setPopularlista] = useState([]);

    const [produtos, setProdutos] = useState([]);

    const [produto, setProduto] = useState('');

    //Função para carregar os produtos da lista selecionada pelo ID, trazendo as informações do banco banco de dados
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

    //função para carregar todos os produtos gerais do banco de dados e inserir no select
    useEffect(() => {
        async function loadProdutos() {
            const response = await api.get('/listaProdutos');

            setProdutos(response.data);
        }

        loadProdutos();
    }, []);

    //função para inserir um produto novo na lista, depois de inserir, é carregado novamente os produtos dessa lista.
    
    async function handleSubmit() {

        const lista_id = localStorage.getItem('lista');

        await api.post('/popularLista', { produto }, {
            headers: { lista_id }
        });
        this.carregarProdutos();
    }

    function menu(event, newValue) { 
        
        setValue(newValue)

        if (value === "home") {    
            history.push('/');   
        } else if (value === "produto") {
            history.push('/criarProdutos'); 
        } else if (value === "lista") {
            history.push('/criarLista'); 
        }
    }


    let num = 0;
    return (
        <>
            <h1>Itens da Lista</h1>

            {popularLista.map(produtoLista => (
                <label htmlFor={num} key={produtoLista._id}>
                    <input type="checkbox" id={num++} value={produtoLista._id} />
                    <strong>{produtoLista.produto}</strong>
                    
                </label>
            ))}

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
                    <button className="btn" type="submit">Excluir Produto</button>
                </form>

                <BottomNavigation
                value={value}
                onChange={menu}
                showLabels
                className={classes.root}
            >   
               <BottomNavigationAction value="home" label="Home" icon={<HomeRoundedIcon />} />
                <BottomNavigationAction value="produto" label="Produtos" icon={<ShoppingCartSharpIcon />} />
                <BottomNavigationAction value="lista" label="Listas" icon={<ListAltRoundedIcon />} />
            </BottomNavigation>
            </div>
        </>
    )
}