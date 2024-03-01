import Link from 'next/link'
import React from 'react'
interface NavBarProps {
    name: string;
    url: string;
  }
  
  export default function NavBar({ name, url }: NavBarProps) {
    return (
    <div className="container">
        <nav className="navbar navbar-light bg-light">
            <Link href={`/${url}`}>
                <button type="button" className="btn btn-light">{name}</button>
            </Link>
        </nav>
    </div>
  )
}
