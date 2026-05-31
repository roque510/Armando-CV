import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";

const EMAIL = "roque09215@gmail.com";
const GITHUB = "https://github.com/roque510";
const LINKEDIN = "https://www.linkedin.com/in/armando-roque-547914133/";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-row">
          <Link className="brand footer-brand" href="/">
            <Image
              className="brand-logo"
              src="/logo-ar-white.png"
              alt=""
              width={40}
              height={40}
            />
            <span className="brand-name">
              <b>Armando Roque</b>
              <span>{t("role")}</span>
            </span>
          </Link>
          <div className="footer-socials">
            <a
              className="icon-btn"
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              data-evt="contact_email"
            >
              <MailIcon />
            </a>
            <a
              className="icon-btn"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-evt="contact_github"
            >
              <GitHubIcon />
            </a>
            <a
              className="icon-btn"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-evt="contact_linkedin"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="footer-note">
          <span>
            © {year} Armando Roque · {t("builtWith")}
          </span>
          <span className="mono">{t("openLine")}</span>
        </div>
      </div>
    </footer>
  );
}
