import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Header = ({ isDark, onToggleTheme }: HeaderProps) => {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <NavLink className="site-brand" to="/">
          Alexander Siedler
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default Header;
