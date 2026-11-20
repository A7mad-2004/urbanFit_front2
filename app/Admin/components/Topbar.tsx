"use client";

interface TopbarProps {
  toggleSidebar: () => void;
  title: string; 
}

export default function Topbar({ toggleSidebar, title }: TopbarProps) {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h1>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <i className="fas fa-bell" style={{ color: '#6B655C' }}></i>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          backgroundColor: '#D97757', color: '#fff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontWeight: 'bold' 
        }}>
          A
        </div>
      </div>
    </div>
  );
}