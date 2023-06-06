import React from 'react';
import classnames from 'classnames';
import formatter from '@uiw/formatter';
import GitHubCorners from '@uiw/react-github-corners';
import styles from './App.module.less';
import Google from './Google';
import data from '../../data.json';


interface DataItem {
  status?: number;
  time?: number;
  type?: 'web' | 'scholar';
  message?: string;
  url: string;
}

export default function App() {
  return (
    <div className={styles.warpper}>
      <GitHubCorners size={62} fixed href="https://github.com/jaywcjlove/google" />
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
              const isNotFound = item.status === 400 || item.status === 0;
              return (
                <tr
                  key={idx}
                  className={classnames({
                    [`${styles.notFound}`]: isNotFound,
                    [`${styles.timeout}`]: item.status === 408,
                    [`${styles.success}`]: item.status === 200,
                  })}
                >
                  <td>{idx + 1}</td>
                  <td><a href={item.url} target="__blank">{item.url}</a></td>
                  <td className={styles.status} title={item.message}><span>{item.status || '-'}</span></td>
                  <td>{item.type || '-'}</td>
                  <td>{item.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table> 
      </aside>
      <div className={styles.update}>Last cache created on {formatter('YYYY/MM/DD', new Date(data.update))}</div>
    </div>
  );
};
