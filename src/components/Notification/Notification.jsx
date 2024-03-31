import React from 'react';
import styles from 'styles/Notification.module.css';

export const Notification = ({ message }) => {
  return (
    <div className={styles.notification}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
