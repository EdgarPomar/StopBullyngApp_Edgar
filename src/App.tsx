import React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <AppBar />
      <main style={{ marginTop: '60px', marginBottom: '50px', padding: '20px' }}>
        <h2>Bienvenido a Guardianes de la Convivencia</h2>
        <p>Comienza tu aventura educativa...</p>
      </main>
      <Footer />
    </div>
  );
};
export default App;
