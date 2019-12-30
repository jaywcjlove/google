import React from 'react';
import classnames from 'classnames';
import GitHubCorners from '@uiw/react-github-corners';
import styles from './App.module.less';
import Google from './Google';
import data from '../../data.json';


interface DataItem {
  status?: number;
  type?: 'web' | 'scholar';
  url: string;
}

const App = () => (
  <div className={styles.warpper}>
    <GitHubCorners fixed href="https://github.com/jaywcjlove/google" />
    <header className={styles.header}>
      <Google />
    </header>
    <aside className={styles.body}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>URL</th>
            <th>Status</th>
            <th>Type</th>
            <th>Response Time</th>
          </tr>
        </thead>
        <tbody>
          {((data.data || []) as DataItem[]).map((item, idx) => {
            const isNotFound = item.status === 400;
            return (
              <tr key={idx} className={classnames({ [`${styles.notFound}`]: isNotFound })}>
                <td>{idx + 1}</td>
                <td><a href={item.url} target="__blank">{item.url}</a></td>
                <td>{item.status || '-'}</td>
                <td>{item.type || '-'}</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </table> 
    </aside>
  </div>
);

export default App;
