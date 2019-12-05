import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { createStore, compose, applyMiddleware } from 'redux';


const SNS = ({Component , store}) => {
    return(
        <Provider store={store}>
        <Head>
            <title>SNS</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css" />
        </Head>
        <AppLayout>
            <Component />
        </AppLayout>
        </Provider>
    )
};

SNS.propTypes = {
    Component : PropTypes.elementType,
    store : PropTypes.object,
}

export default withRedux((initialState , options) => {
    const middlewares = [];
    const enhancer = compose(applyMiddleware(...middlewares))
    const store = createStore(reducer , initialState , enhancer);
    // 여기에 store 커스터마이징
    return store;
})(SNS);