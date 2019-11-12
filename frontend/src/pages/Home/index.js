import React, { useState } from 'react';
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

export default function Home({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('home');
    const [nomeLista, setLista] = useState('');

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