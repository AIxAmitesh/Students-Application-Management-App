import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Search, User, LogOut, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { cn } from '../utils';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileAboutOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Universities', href: '/universities' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blog', href: '/blog' },
  ];

  const aboutLinks = [
    { name: 'Overview', href: '/about/overview' },
    { name: 'Guiding principles', href: '/about/principles' },
    { name: 'Leadership and board', href: '/about/leadership' },
    { name: 'Next Chapter', href: '/about/next-chapter' },
    { name: 'Partners', href: '/about/partners' },
    { name: 'Reports and insights', href: '/about/reports' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">UniApply India</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                    location.pathname === link.href
                      ? "border-indigo-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* About Dropdown */}
              <div className="relative flex items-center" ref={aboutRef}>
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors h-full",
                    isAboutOpen || location.pathname.startsWith('/about')
                      ? "border-indigo-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  About
                  <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", isAboutOpen && "rotate-180")} />
                </button>
                
                {isAboutOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 mt-1">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsAboutOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user && (
              <Link
                to="/apply"
                className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                title="Application Queue"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {items.length}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-semibold transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold border border-indigo-200">
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                  location.pathname === link.href
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile About Accordion */}
            <div>
              <button
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className={cn(
                  "w-full flex items-center justify-between pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors",
                  location.pathname.startsWith('/about')
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                About
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileAboutOpen && "rotate-180")} />
              </button>
              {isMobileAboutOpen && (
                <div className="bg-gray-50 py-1 space-y-1">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileAboutOpen(false);
                      }}
                      className="block pl-10 pr-4 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {user ? (
              <div className="space-y-1">
                <Link
                  to="/apply"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-gray-700 font-bold hover:bg-gray-50 transition-all"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-gray-400" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </div>
                  Application Queue
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-gray-700 font-bold hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold border border-indigo-200">
                    {user.name.charAt(0)}
                  </div>
                  {user.name}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-red-600 font-bold hover:bg-red-50 transition-all"
                >
                  <LogOut className="h-5 w-5 ml-1.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-indigo-600 font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
