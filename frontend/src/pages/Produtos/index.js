import React, { useEffect, useState } from 'react';
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

export default function Produtos({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const [produtos, setProdutos] = useState([]);
    const [nomeProduto, setNomeProduto] = useState([]);

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


    useEffect(() => {
        async function loadProdutos() {
            const response = await api.get('/listaProdutos');

            setProdutos(response.data);
        }

        loadProdutos();
    }, []);

    async function removerProduto(event) {

        await api.post('/removerProdutos', { nomeProduto });
        
        this.loadProdutos();
    }

    let num = 0;

    return (
        <>
            <h1>Produtos</h1>

            <form onSubmit={removerProduto}>
                <div>
                    {produtos.map(produto => (
                        <label htmlFor={num} key={produto._id}>
                            <input
                            name="grp1" 
                            type="radio"
                            id={num++}
                            value={produto.nomeProduto} 
                            onChange={event => setNomeProduto(event.target.value)}
                            />
                            <strong>{produto.nomeProduto}</strong>
                        </label>
                    ))}
                <button className="btn">Excluir Produto</button>
                </div>
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
        </>


    )
}