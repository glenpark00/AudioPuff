import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const SideBarSection = ({ icon, items, component, text, url, history }) => {
  if (!items || items.length === 0) return null;

  const [threeItems, setThreeItems] = useState(items.slice(0, 3));

  useEffect(() => {
    setThreeItems(items.slice(0, 3))
  }, [items])

  const handleClick = () => {
    if (text === 'Who to follow') {
      let randomItems = [];
      let size = (items.length > 3 ? 3 : items.length)
      for (let i = 0; i < size; i++) {
        let element = items[Math.floor(Math.random() * items.length)];
        if (randomItems.includes(element)) {
          i--;
        } else {
          randomItems.push(element);
        }
      }
      setThreeItems(randomItems);
    } else {
      history.push(url)
    }
  }

  return (
    <div className='side-bar-section'>
      <div className='side-bar-section-top'>
        <div>
          {icon}
          <div>{text}</div>
        </div>
        <div onClick={handleClick}>{items.length > 3 ? (text === 'Who to follow' ? 'Refresh' : 'View all') : ''}</div>
      </div>
      <div className='side-bar-section-line'></div>
      <div>
        {threeItems.map(item => {
          let c = React.cloneElement(component, { item: item });
          return <div key={`sidebar-${text}-${Math.random() * 1000}`}>{c}</div>;
        })}
      </div>
    </div>
  )
}

export default withRouter(SideBarSection);