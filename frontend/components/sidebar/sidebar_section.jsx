import React from 'react';

const SideBarSection = ({ icon, items, component, text }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className='side-bar-section'>
      <div className='side-bar-section-top'>
        <div>
          {icon}
          <div>{text}</div>
        </div>
        <div>{items.length > 3 ? (text === 'Who to follow' ? 'Refresh' : 'View all') : ''}</div>
      </div>
      <div className='side-bar-section-line'></div>
      <div>
        {items.slice(0, 3).map(item => {
          let c = React.cloneElement(component, { item: item });
          return <div key={`sidebar-${text}-${Math.random() * 1000}`}>{c}</div>;
        })}
      </div>
    </div>
  )
}

export default SideBarSection;