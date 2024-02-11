import { FC } from "react"
import Link from "next/link"

type linksType = {
  path: string,
  name: string
}

const links = [
  { path: '', name: 'home', action: 'scrollToTop'},
  { path: '#about', name: 'about'},
  { path: '#projects', name: 'my projects'},
  { path: '#contact', name: 'contact'},
]

type NavProps = {
  containerStyles: string,
  linkStyles: string,
  underlineStyles:string
}


const Nav:FC<NavProps> = ({ containerStyles, linkStyles, underlineStyles }) => {
  const scrollToTop = () => (
    window.scrollTo(0,0)
  )

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
        <Link
          scroll={true}
          href={link.path}
          key={index}
          className={`capitalize ${linkStyles}`}
          onClick={scrollToTop}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export default Nav