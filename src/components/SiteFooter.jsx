import Link from 'next/link';
import { ExternalLink, Github, Linkedin, Twitter, MessageSquareCode } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: ExternalLink,
      href: 'https://www.fiverr.com/nawazdev/design-and-develop-responsive-full-stack-websites-for-your-business',
      label: 'Fiverr',
    },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    {
      icon: MessageSquareCode,
      href: 'https://stackoverflow.com',
      label: 'Stack Overflow',
    },
  ];

  return (
    <footer className="bg-secondary py-4 border-t border-cyan-500 dark:border-slate-500">
      <div className="container">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-2">
          {/* Copyright */}
          <p className="">© {currentYear} Nawaz. All rights reserved.</p>

          {/* Social Links */}
          <ul className="flex gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <li key={index}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="bg-secondary-card size-9 flex-center rounded-lg transition-300 hover:scale-110 hover:-translate-y-0.5"
                  >
                    <Icon className="size-5 text-tertiary" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
