"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  DownloadIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/icons";

const EMAIL = "roque09215@gmail.com";
const GITHUB = "https://github.com/roque510";
const LINKEDIN = "https://www.linkedin.com/in/armando-roque-547914133/";
const RESUME = "/Armando-Roque-Resume-2026.pdf";
const RESUME_NAME = "Armando Roque - Resume 2026.pdf";

type NavItem = { key: string; href: string; hash?: boolean; route?: string };

const NAV: NavItem[] = [
  { key: "about", href: "/#about", hash: true },
  { key: "skills", href: "/#skills", hash: true },
  { key: "experience", href: "/#experience", hash: true },
  { key: "work", href: "/#work", hash: true },
  { key: "blog", href: "/blog", route: "/blog" },
  { key: "contact", href: "/#contact", hash: true },
];

export default function Header() {
  const t = useTranslations("Nav");
  const tH = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const switchLocale = (next: "en" | "es") => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  const isActive = (item: NavItem) =>
    item.route ? pathname.startsWith(item.route) : false;

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap header-row">
          <Link className="brand" href="/" aria-label="Armando Roque — home">
            <Image
              className="brand-logo"
              src="/logo-ar-white.png"
              alt=""
              width={40}
              height={40}
              priority
            />
            <span className="brand-name">
              <b>Armando Roque</b>
              <span>{tH("brandRole")}</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={isActive(item) ? "active" : undefined}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <span className="header-spacer" />

          <div className="header-actions">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={locale === "en" ? "on" : undefined}
                onClick={() => switchLocale("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={locale === "es" ? "on" : undefined}
                onClick={() => switchLocale("es")}
              >
                ES
              </button>
            </div>

            <a
              className="icon-btn hide-sm"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-evt="contact_github"
            >
              <GitHubIcon />
            </a>
            <a
              className="icon-btn hide-sm"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-evt="contact_linkedin"
            >
              <LinkedInIcon />
            </a>
            <a
              className="icon-btn"
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              data-evt="contact_email"
            >
              <MailIcon />
            </a>
            <a
              className="btn btn-ghost btn-sm hide-sm"
              href={RESUME}
              download={RESUME_NAME}
              data-evt="resume_download"
            >
              <DownloadIcon />
              {tH("resume")}
            </a>
            <a
              className="btn btn-primary btn-sm"
              href={`mailto:${EMAIL}`}
              data-evt="contact_email"
            >
              {tH("letsTalk")}
            </a>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`drawer-backdrop${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`drawer${drawerOpen ? " open" : ""}`} aria-label="Mobile menu">
        <div className="drawer-top">
          <span className="brand-name">
            <b>{tH("menu")}</b>
          </span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        {NAV.map((item) => (
          <Link key={item.key} href={item.href} onClick={() => setDrawerOpen(false)}>
            {t(item.key)}
          </Link>
        ))}
        <a
          href={RESUME}
          download={RESUME_NAME}
          data-evt="resume_download"
          onClick={() => setDrawerOpen(false)}
        >
          {tH("downloadResume")}
        </a>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <a
            className="btn btn-primary btn-block"
            href={`mailto:${EMAIL}`}
            style={{ flex: 1 }}
            data-evt="contact_email"
          >
            {tH("letsTalk")}
          </a>
        </div>
      </aside>
    </>
  );
}
