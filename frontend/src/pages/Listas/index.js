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
    const [value, setValue] = React.useState('lista');

    const [listas, setListas] = useState([]);
    
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


    let num = 0;
    return (
        <>
            <h1>Listas</h1>

            {listas.map(lista => (
                <label htmlFor={num} key={lista._id}>
                    <input type="checkbox" id={num++} />
                    <strong>{lista.nomeLista}</strong>
                </label>
            ))}
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