import styles from './header.module.scss'
import { AuthButton } from '../auth-button'
import { ActiveLink } from '../active-link'

export const Header = () => {
  const activeClassName = styles['link-active']

  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <img src='/images/logo.svg' alt='ig.news' />

        <nav className={styles['nav-links']}>
          <ActiveLink activeClassName={activeClassName} href='/'>
            <a className={styles.link}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={activeClassName} href='/posts'>
            <a className={styles.link}>Posts</a>
          </ActiveLink>
        </nav>

        <AuthButton />
      </div>
    </header>
  )
}
