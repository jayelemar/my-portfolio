import Image from "next/image"
import Link from "next/link"



const Logo = () => {
  return (
    <Link href='/' className="relative" aria-label="click to Home Page">
      <Image  src='/logo.svg' width={120} height={40} priority alt="elemar-logo" />
    </Link>
  )
}

export default Logo