import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';


const SNS = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
        <Head>
            <title>SNS</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.css" />
        </Head>
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
        </Provider>
    )
};

SNS.propTypes = {
    Component : PropTypes.elementType.isRequired,
    store : PropTypes.object.isRequired
}

SNS.getInitialProps = async (context) => {
    console.log(context);
    const { ctx, Component } = context;
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
  
export default withRedux(configureStore)(SNS);