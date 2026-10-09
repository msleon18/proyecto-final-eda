import React, { useState } from 'react';
import { crearArbolMenu } from './menuTree';
import Sidebar from './components/Sidebar';

export default function App() {
  const [arbol] = useState(() => crearArbolMenu());
  const [nodoSeleccionado, setNodoSeleccionado] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif', margin: 0, overflow: 'hidden' }}>
      {/* Menú lateral basado en Árbol N-ario */}
      <Sidebar arbolRaiz={arbol} onSelectNode={setNodoSeleccionado} />

      {/* Área de contenido principal para mostrar la sustentación */}
      <main style={{ flex: 1, padding: '40px', background: '#ffffff', overflowY: 'auto' }}>
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '25px' }}>
          <h1 style={{ color: '#0f172a', fontSize: '2rem', margin: 0 }}>Challenge 09: Árbol N-ario</h1>
          <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
            Menú lateral dinámico con submenús desplegables implementado mediante una estructura de datos jerárquica.
          </p>
        </header>

        <section style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '1.2rem' }}>Inspección del Nodo Seleccionado:</h3>
          {nodoSeleccionado ? (
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: '8px 0' }}><strong>Título del Nodo:</strong> {nodoSeleccionado.titulo}</p>
              <p style={{ margin: '8px 0' }}><strong>Ruta Asociada:</strong> <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{nodoSeleccionado.ruta}</code></p>
              <p style={{ margin: '8px 0' }}><strong>Cantidad de Hijos (Submenús):</strong> {nodoSeleccionado.hijos.length}</p>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontStyle: 'italic' }}>Haz clic en cualquier opción del menú lateral izquierdo para ver sus propiedades lógicas en tiempo real.</p>
          )}
        </section>
      </main>
    </div>
  );
}