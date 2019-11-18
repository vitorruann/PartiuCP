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

export default function CriarProduto({ history }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const [nomeProduto, setProduto] = useState('');

    async function criarProduto(event) {
        event.preventDefault();

        if (nomeProduto === "") {
        
            alert("Valor invalido");
        
        } else {
        
            const response = await api.post('/criarProdutos', { nomeProduto });
            if (!response) {
                alert("Produto já existe");
            } else {

                history.push('/listaProdutos');
            
            }
        }
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


    return (
        <>
            <p>
                <strong>Produto</strong>
            </p>
            <form onSubmit={criarProduto}>
                <label htmlFor="produto">Produto: </label>
                <input
                    className="input"
                    type="produto"
                    id="produto"
                    placeholder="Digite o nome do produto a ser criado"
                    value={nomeProduto}
                    onChange={event => setProduto(event.target.value)}
                />

                <button className="btn" type="submit">Criar Produto</button>
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