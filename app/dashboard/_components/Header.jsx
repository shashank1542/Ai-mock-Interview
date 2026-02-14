"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse shadow-[0_0_15px_cyan]" />
  );

  const path = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-lg border-b border-cyan-600/50 shadow-[0_0_20px_cyan]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6 text-white font-['Orbitron']">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 hover:brightness-125 transition">
          <Image
            src={logo}
            width={60}
            height={60}
            alt="logo"
            className="drop-shadow-[0_0_10px_cyan]"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider select-none drop-shadow-md">
           JOBSTACLE
          </span>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-lg">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/dashboard/question", label: "Questions" },
            // { href: "/dashboard/dsa", label: "DSA" },
            { href: "https://leetlab.nbaworks.dev/", label: "DSA" },
            { href: "/dashboard/upgrade", label: "Upgrade" },
            { href: "/dashboard/howit", label: "How it works?" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} legacyBehavior>
              <a
                className={`relative px-3 py-2 cursor-pointer transition-all 
                ${
                  path === href
                    ? "text-cyan-400 font-semibold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-cyan-400"
                    : "text-white hover:text-cyan-300"
                }`}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-6">
          <ModeToggle />
          {isUserButtonLoaded ? (
            <UserButton />
          ) : (
            <SkeletonLoader />
          )}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-cyan-600/20 transition"
          >
            {isOpen ? (
              <svg
                className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_5px_cyan]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_5px_cyan]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-black/70 backdrop-blur-md border-t border-cyan-600/50 shadow-[0_0_20px_cyan]">
          <ul className="flex flex-col space-y-4 p-5 text-white font-semibold font-['Orbitron']">
            {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/dashboard/question", label: "Questions" },
                { href: "/dashboard/dsa", label: "DSA" },
                { href: "/dashboard/upgrade", label: "Upgrade" },
                { href: "/dashboard/howit", label: "How it works?" },
              ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} legacyBehavior>
                  <a
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      path === href
                        ? "bg-cyan-600 text-white shadow-[0_0_10px_cyan]"
                        : "hover:bg-cyan-700/50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
