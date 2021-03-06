import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageLayout from '../../layouts/pageLayout';
import Home from '../home';
import User from '../user';
import Menu from '../menu';

export default function Admin() {
  return (
    <PageLayout>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/menu" component={Menu} />
      </Switch>
    </PageLayout>
  );
}
