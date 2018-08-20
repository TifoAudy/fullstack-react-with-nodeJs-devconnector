import React from 'react';
import styles from './styles/header.scss';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.primary}>
        <h1 className={styles.heading}>
          <span className={styles.main}>NGOPI.MEN</span>
          <span className={styles.submain}>Connecting other developers</span>
        </h1>
        <div className={styles.btn}>
          <Link to="/auth">
            <Button basic inverted compact size='big' className={styles.start}>
              Start
            </Button>
          </Link>
          <Link to="/">
            <Button basic inverted compact size='big' className={styles.about}>
              About
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default header;
