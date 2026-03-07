import type { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface PageLayoutProps {
  children: ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

const PageLayout = ({ children, isDark, onToggleTheme }: PageLayoutProps) => {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header isDark={isDark} onToggleTheme={onToggleTheme} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
