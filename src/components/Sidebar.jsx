import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FileText } from 'lucide-react';

// Componente recursivo para renderizar cada nodo del Árbol N-ario
function MenuItem({ nodo, onSelect }) {
  const [abierto, setAbierto] = useState(false);
  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

  const handleClick = () => {
    if (tieneHijos) {
      setAbierto(!abierto);
    }
    onSelect(nodo);
  };

  return (
    <div className="menu-item-container">
      <div 
        onClick={handleClick}
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '8px 12px', 
          borderRadius: '6px', 
          margin: '4px 0', 
          transition: 'background 0.2s',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center', color: '#64748b' }}>
          {tieneHijos ? (abierto ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <FileText size={16} />}
        </span>
        <span style={{ fontWeight: tieneHijos ? '600' : '400', color: '#1e293b', fontSize: '0.95rem' }}>
          {nodo.titulo}
        </span>
      </div>

      {tieneHijos && abierto && (
        <div style={{ paddingLeft: '20px', borderLeft: '2px solid #cbd5e1', marginLeft: '12px' }}>
          {nodo.hijos.map((hijo, index) => (
            <MenuItem key={index} nodo={hijo} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ arbolRaiz, onSelectNode }) {
  return (
    <aside style={{ width: '300px', height: '100vh', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px', overflowY: 'auto', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Folder size={20} color="#3b82f6" /> {arbolRaiz.titulo}
      </h2>
      <nav>
        {arbolRaiz.hijos.map((hijo, index) => (
          <MenuItem key={index} nodo={hijo} onSelect={onSelectNode} />
        ))}
      </nav>
    </aside>
  );
}