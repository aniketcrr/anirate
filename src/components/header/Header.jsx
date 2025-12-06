import React, { useState } from 'react';
import { Container } from '../index';
import LogoutBtn from './LogoutBtn';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    { name: "home", slug: "/", active: true },
    { name: "create post", slug: "/add-post", active: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E1E2A] shadow-lg">
      <Container>
        <div className="flex w-full items-center justify-between py-3 px-2">
          <Link to="/" className="flex items-center gap-2 text-[#F0F0F0]">
            <div className="size-6 text-[#7B68EE]">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 
                10 10 10-4.48 10-10S17.52 2 12 2zm0 
                18c-4.41 0-8-3.59-8-8s3.59-8 
                8-8 8 3.59 8 8-3.59 8-8 
                8zm-2.5-3.5l6-4.5-6-4.5v9z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">AniRate</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItem.map(
              (item) =>
                item.active && (
                  <Link
                    key={item.slug}
                    to={item.slug}
                    className="text-sm font-medium text-[#F0F0F0] hover:text-[#7B68EE]"
                  >
                    {item.name}
                  </Link>
                )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {authStatus ? (
              <LogoutBtn />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="h-10 min-w-[84px] rounded-lg border border-[#7B68EE] px-4 text-sm font-bold text-[#F0F0F0] hover:bg-[#7B68EE]/20"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="h-10 min-w-[84px] rounded-lg bg-[#7B68EE] px-4 text-sm font-bold text-[#F0F0F0] hover:bg-[#7B68EE]/80"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-[#F0F0F0] hover:bg-white/10 transition"
          >
            <span
              className="material-symbols-rounded transition-transform duration-200"
              style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {open ? "close" : "menu"}
            </span>
          </button>

        </div>

        {open && (
          <div className="md:hidden bg-[#1E1E2A] border-t border-white/10 px-4 py-3 space-y-3">

            {navItem.map(
              (item) =>
                item.active && (
                  <Link
                    key={item.slug}
                    to={item.slug}
                    onClick={() => setOpen(false)}
                    className="block text-[#F0F0F0] py-2 text-base font-medium hover:text-[#7B68EE]"
                  >
                    {item.name}
                  </Link>
                )
            )}

            {authStatus ? (
              <LogoutBtn />
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="block w-full rounded-lg border border-[#7B68EE] px-4 py-2 text-sm font-bold text-[#F0F0F0]"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setOpen(false);
                  }}
                  className="block w-full rounded-lg bg-[#7B68EE] px-4 py-2 text-sm font-bold text-[#F0F0F0]"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
