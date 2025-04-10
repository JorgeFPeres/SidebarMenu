import React from 'react';
import { MenuProvider } from './contexts/MenuContext';
import Sidebar from './components/menu-sidebar';

function App() {
  return (
    <MenuProvider>
      <Sidebar />
    </MenuProvider>
  );
}

export default App;
