import { Spinner } from 'react-bootstrap';
import Tasks from './components/tasks/tasks';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/public/layout';

const Main = () => {

  // Estado que indica si la aplicación ha terminado de inicializarse.
  const [initialized, setInitialized] = useState(false);

  // Hook que se ejecuta después de que el componente se monta. Simula un retraso de 1 segundo (1000 ms) antes de establecer initialized a true.
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        setInitialized(true);
      }, 1000);
    }
  }, [initialized]);

  /*
  * Mientras initialized es false, se muestra un spinner de carga centrado en la pantalla con el texto "Loading...".
  */
  if (!initialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '800px', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>
          <Spinner animation="border" variant="primary" />{" "}
          Loading...
        </h2>
      </div>
    );
  }

  // Configuración de rutas
  /**
   * Una vez que initialized es true, se configuran las rutas utilizando Routes y Route de React Router.
   * La ruta raíz / renderiza el componente Layout.
   * La ruta /tasks también renderiza el componente Tasks.
   */
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}

/**
 * El componente App simplemente renderiza el componente Main.
 * @returns
 */
function App() {
  return (
    <Main />
  );
}

export default App;