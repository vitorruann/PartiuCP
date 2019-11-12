import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import CriarProduto from './pages/CriarProduto';
import Produtos from './pages/Produtos';

import CriarLista from './pages/CriarLista';
import Lista from './pages/Listas';
import PopularLista from './pages/PopularLista';

import SimpleBottomNavigation from './pages/SimpleBottomNavigation';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/criarProdutos" component={CriarProduto} />
                <Route path="/listaProdutos" component={Produtos} />
                <Route path="/criarLista" component={CriarLista} />
                <Route path="/listas" component={Lista} />
                <Route path="/popularLista" component={PopularLista} />
                <Route path="/teste" component={SimpleBottomNavigation}/>
            </Switch>
        </BrowserRouter>
    );
}