import { ReactElement, cloneElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import c from 'classnames'

type ActiveLinkProps = LinkProps & {
  children: ReactElement
  activeClassName: string
}

export const ActiveLink = ({
  children,
  activeClassName,
  href,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const className = c(children.props.className, {
    [activeClassName]: asPath === href,
  })

  return (
    <Link href={href} {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}
