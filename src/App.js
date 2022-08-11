import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import {Container, Menu, PageBody} from '../src/AppStyled'

import HomeScreen from './pages/HomeScreen';
import Tela2Screen from './pages/Tela2Screen';
import MenuItem from './components/MenuItem';
import Cart from '../src/components/Cart'
import PrivateRoute from './components/PrivateRoute';

import ReactTooltip from 'react-tooltip';

export default () => {
    const name = useSelector(state => state.user.name);

    return (
        <BrowserRouter>
            <Container>
                <Menu>
                    <MenuItem 
                        icon="/assets/store.png" 
                        link="/"
                        title='Loja'
                    />
                    <MenuItem 
                        icon="/assets/order.png" 
                        link="/orders"
                        title='Pedidos'
                    />
                    <MenuItem 
                        icon="/assets/profile.png" 
                        link="/profile"
                        title='Meu Perfil'
                    />
                </Menu>
                <PageBody>
                    <Switch>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>
                        <PrivateRoute exact path="/orders">
                            <div>TELA DE PEDIDOS</div>
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                            <div>TELA DE PERFIL</div>
                        </PrivateRoute>
                        <Route path="/tela2/:nome">
                            <Tela2Screen />
                        </Route>
                    </Switch>
                </PageBody>
                <Cart />
                <ReactTooltip 
                    id='tip-top' 
                    place='top'
                    effect='solid'
                />
                <ReactTooltip 
                    id='tip-right'
                    place='right'
                    effect='solid'
                />
            </Container>
        </BrowserRouter>
    );
}