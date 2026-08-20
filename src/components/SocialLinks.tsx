'use client';

import React from 'react';
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/dumtochukwu_/';

function handleInstagramClick(e: React.MouseEvent) {
  e.preventDefault();
  const appUrl = 'instagram://user?username=dumtochukwu_';

  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Try the app first, fall back to the web profile if it doesn't open
    const timeout = setTimeout(() => {
      window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
    }, 500);

    window.location.href = appUrl;

    window.addEventListener('blur', () => clearTimeout(timeout), { once: true });
  } else {
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
  }
}

const ITEMS = [
  { label: 'Instagram', href: INSTAGRAM_URL, accent: 'var(--coral)', icon: Instagram, onClick: handleInstagramClick },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-ejere-5056161a1', accent: 'var(--sky)', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/davedumto', accent: 'var(--violet)', icon: Github },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61550060649755', accent: 'var(--blue)', icon: Facebook },
];

export function SocialLinks({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex gap-3">
      {ITEMS.map(({ label, href, accent, icon: Icon, onClick }) => (
        <a
          key={label}
          href={href}
          onClick={onClick}
          {...(onClick ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          className={`icon-btn ${dark ? 'icon-btn--dark' : ''}`}
          style={{ '--icon-accent': accent } as React.CSSProperties}
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
