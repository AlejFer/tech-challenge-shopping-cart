import React from 'react';
import { AppStyles } from './AppStyles';
import ProductList from '../../containers/ProductList';

function App() {
  return (
      <AppStyles className="App">
          <header className="App-header">
              <ProductList />
          </header>
      </AppStyles>
  );
}

export default App;
