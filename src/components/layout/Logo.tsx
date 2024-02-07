import Image from "next/image"
import Link from "next/link"



const Logo = () => {
  return (
    <Link href='/' className="relative">

      <Image src='/logo.svg' width={150} height={150} priority alt="" />
    </Link>
  )
}

export default Logo