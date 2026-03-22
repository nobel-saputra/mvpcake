"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">🎂</span>
          <span className="logo-text">SweetCake</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-line menu-line-short"></span>
          <span className="menu-line"></span>
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${!isAdmin ? "nav-link-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            🏠 Beranda
          </Link>
          <Link
            href="/admin"
            className={`nav-link ${isAdmin ? "nav-link-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            ⚙️ Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
