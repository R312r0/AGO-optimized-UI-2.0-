import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { App } from './components/App/App';
import { ApolloProvider } from "@apollo/client";
import { client } from './api/client';
import { Web3ReactProvider } from '@web3-react/core';
import {SystemProvider} from './systemProvider';
import { DashboardProvider } from './providers/dashboard-provider';
import './index.scss';


const getLibrary = (provider) => {
  const library = new Web3(provider)
  return library
}

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
              <SystemProvider>
                  <DashboardProvider>
                      <App/>
                  </DashboardProvider>
              </SystemProvider>
          </Web3ReactProvider>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

