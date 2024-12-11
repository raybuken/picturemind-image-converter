
import Link from "next/link";

function Navbar() {
  return (
    <nav className="navbar bg-base-100">
        <Link href={'/'} className="btn btn-ghost text-xl">Picturemind</Link>
    </nav>
  )
}

export default Navbar