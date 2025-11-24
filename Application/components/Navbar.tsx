import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface NavbarItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface NavbarProps {
  onSearchClick?: () => void;
  items?: NavbarItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, items = [] }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleItemClick = (itemOnClick?: () => void) => {
    if (itemOnClick) itemOnClick();
    setMobileMenuOpen(false);
    // Return focus to menu button when closing
    menuButtonRef.current?.focus();
  };

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Focus trap and keyboard navigation
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([disabled])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first menu item when opened
    const firstButton = mobileMenuRef.current?.querySelector<HTMLElement>('button');
    firstButton?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="ui-navbar">
      <div className="ui-navbar__left">
        <button
          ref={menuButtonRef}
          className={`ui-navbar__menu ${isMobileMenuOpen ? 'ui-navbar__menu--open' : ''}`}
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setMobileMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="ui-navbar__logo">
          Movie Night
        </Link>
        <ul className="ui-navbar__links">
          {items.map(item => (
            <li key={item.label}>
              <button
                type="button"
                onClick={item.onClick}
                className={`ui-navbar__link ${item.active ? 'ui-navbar__link--active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="ui-navbar__right">
        {onSearchClick && (
          <button onClick={onSearchClick} className="ui-navbar__search" aria-label="Focus search">
            <span className="ui-icon-search" />
            <span className="ui-navbar__search-text">Search</span>
          </button>
        )}
        <div className="ui-navbar__profile" aria-hidden="true">
          <span className="ui-navbar__avatar">AO</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`ui-navbar__mobile ${isMobileMenuOpen ? 'ui-navbar__mobile--open' : ''}`}
        onClick={(e) => {
          // Close menu if clicking the overlay background (not the links)
          if (e.target === e.currentTarget) {
            setMobileMenuOpen(false);
          }
        }}
      >
        <ul className="ui-navbar__mobile-links">
          {onSearchClick && (
            <li>
              <button
                type="button"
                onClick={() => {
                  onSearchClick();
                  setMobileMenuOpen(false);
                }}
                className="ui-navbar__mobile-link"
              >
                <span className="ui-icon-search">🔍</span>
                Search
              </button>
            </li>
          )}
          {items.map(item => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => handleItemClick(item.onClick)}
                className={`ui-navbar__mobile-link ${item.active ? 'ui-navbar__mobile-link--active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
