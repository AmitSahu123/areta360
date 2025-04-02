import React from 'react';
import styles from './Collections.module.css';
import { IoCartOutline, IoNotificationsOutline, IoBagOutline } from 'react-icons/io5';
import { MdPlayCircleOutline, MdOutlineBuildCircle } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { TbShirt } from 'react-icons/tb';
import { GiClothes, GiTrousers, GiMonclerJacket } from 'react-icons/gi';

interface StyleCard {
  id: string;
  image: string;
  label: string;
}

const styleCards: StyleCard[] = [
  {
    id: '1',
    image: '/images/casual.jpg',
    label: 'Casual'
  },
  {
    id: '2',
    image: '/images/trendy.jpg',
    label: 'Trendy'
  },
  {
    id: '3',
    image: '/images/polo-style.jpg',
    label: 'Polo Style'
  },
  {
    id: '4',
    image: '/images/sunny-look.jpg',
    label: 'Sunny look'
  }
];

const Collections = () => {
  return (
    <div className={styles.container}>
      <div className={styles.statusBar}>
        <div className={styles.time}>12:30</div>
        <div className={styles.statusIcons}>
          <div className={styles.signal}>
            <div className={styles.signalDot}></div>
            <div className={styles.signalDot}></div>
            <div className={styles.signalDot}></div>
            <div className={styles.signalDot}></div>
          </div>
          <div className={styles.battery}></div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton}>
            <IoIosArrowBack />
          </button>
          <h1>Collections</h1>
        </div>
        <div className={styles.headerIcons}>
          <button className={styles.iconButton}>
            <IoCartOutline />
          </button>
          <button className={styles.iconButton}>
            <IoNotificationsOutline />
          </button>
          <button className={styles.iconButton}>
            <MdPlayCircleOutline />
          </button>
        </div>
      </header>

      <div className={styles.tabContainer}>
        <button className={`${styles.tab} ${styles.activeTab}`}>YOURS</button>
        <button className={styles.tab}>TRENDING</button>
        <button className={styles.tab}>ALL COLLECTIONS</button>
      </div>

      <div className={styles.customizeText}>Start Customise</div>

      <div className={styles.grid}>
        {styleCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img 
                src={card.image} 
                alt={card.label} 
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3>{card.label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.floatingButton} aria-label="Add new style">＋</button>

      <nav className={styles.bottomNav}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <div className={styles.navIcon}>
            <img src="/icons/cursor.png" alt="Cursor" />
          </div>
          <span className={styles.navLabel}>Cursor</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <img src="/icons/lock.png" alt="Lock" />
          </div>
          <span className={styles.navLabel}>Lock</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <img src="/icons/pant.png" alt="Pant" />
          </div>
          <span className={styles.navLabel}>Pant</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <img src="/icons/style.png" alt="Style" />
          </div>
          <span className={styles.navLabel}>Style</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <img src="/icons/accessories.png" alt="Accessories" />
          </div>
          <span className={styles.navLabel}>Accessories</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <img src="/icons/tools.png" alt="Tools" />
          </div>
          <span className={styles.navLabel}>Tools</span>
        </div>
      </nav>
    </div>
  );
};

export default Collections; 