import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient } from '@apollo/client'

function App() {
  const client = new ApolloClient({
    request: (operation) => {
      const token = localStorage.getItem('id_token');

      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
    uri: '/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;