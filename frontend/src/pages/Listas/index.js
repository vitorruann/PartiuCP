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

export default function Listas({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const [listas, setListas] = useState([]);
    const [nomeLista, setNomeLista] = useState([]);

    useEffect(() => {
        async function loadListas() {
            const response = await api.get('/listas');

            setListas(response.data);
        }

        loadListas();
    }, []);

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

    async function removerLista(event) {

        await api.post('/removerLista', { nomeLista });

        
        this.loadListas();
    }

    let num = 0;
    return (
        <>
            <h1>Listas</h1>

            <form onSubmit={removerLista}>
                {listas.map(lista => (
                    <label htmlFor={num} key={lista._id}>
                        <input
                            name="grp1"
                            type="radio"
                            id={num++}
                            value={lista.nomeLista}
                            onChange={event => setNomeLista(event.target.value)}
                        />
                        <strong>{lista.nomeLista}</strong>
                    </label>
                ))}
                <button className="btn">Excluir Lista</button>
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

/* <form onSubmit="">
                <div>
                    {produtos.map(produto => (
                        <label htmlFor={num} key={produto._id}>
                            <input
                            type="checkbox"
                            id={num++}
                            value={produto.nomeProduto} />
                            <strong>{produto.nomeProduto}</strong>
                        </label>
                    ))}
                <button className="btn">Excluir Produto</button>
                </div>
            </form> */