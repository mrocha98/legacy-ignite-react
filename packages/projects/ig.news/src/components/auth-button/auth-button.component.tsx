import cla from 'classnames'
import { FaGithub as GithubIcon } from 'react-icons/fa'
import { FiX as CrossIcon } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/client'

import styles from './auth-button.module.scss'

export const AuthButton = () => {
  const [session] = useSession()

  const githubIconClassName = cla(
    styles['github-icon'],
    session ? styles['github-icon-signed'] : styles['github-icon-unsigned'],
  )

  return session ? (
    <button type='button' className={styles.wrapper} onClick={() => signOut()}>
      <GithubIcon className={githubIconClassName} />
      {session.user!.name}
      <CrossIcon className={styles['cross-icon']} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.wrapper}
      onClick={() => signIn('github')}
    >
      <GithubIcon className={githubIconClassName} />
      Sign in with Github
    </button>
  )
}
