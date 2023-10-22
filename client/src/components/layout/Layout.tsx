import React, { FC, PropsWithChildren } from 'react';
import styles from "./Layout.module.css";
import { Layout as AntLayout } from 'antd';
import Header from '../header/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content>
        {children}
      </AntLayout.Content>
    </div>
  )
};

export default Layout;
