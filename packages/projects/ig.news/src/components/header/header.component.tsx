import Link from 'next/link'
import cla from 'classnames'

import styles from './header.module.scss'
import { AuthButton } from '../auth-button'

export const Header = () => (
  <header className={styles.wrapper}>
    <div className={styles.content}>
      <img src='/images/logo.svg' alt='ig.news' />

      <nav className={styles['nav-links']}>
        <Link href='/'>
          <a className={cla(styles.link, `${styles['link-active']}`)}>Home</a>
        </Link>
        <Link href='/posts'>
          <a className={styles.link}>Posts</a>
        </Link>
      </nav>

      <AuthButton />
    </div>
  </header>
)
