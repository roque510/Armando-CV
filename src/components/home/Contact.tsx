import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { MailIcon } from "@/components/ui/icons";

const EMAIL = "roque09215@gmail.com";
const GITHUB = "https://github.com/roque510";
const LINKEDIN = "https://www.linkedin.com/in/armando-roque-547914133/";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal className="contact-card">
          <div className="grid-ov" />
          <div className="contact-inner">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="tick" />
              {t("eyebrow")}
              <span className="tick" />
            </span>
            <h2 style={{ marginTop: 16 }}>{t("title")}</h2>
            <p>{t("sub")}</p>
            <div className="contact-actions">
              <a
                className="btn btn-primary btn-lg"
                href={`mailto:${EMAIL}`}
                data-evt="contact_email"
              >
                <MailIcon />
                {EMAIL}
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                data-evt="contact_linkedin"
              >
                LinkedIn
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                data-evt="contact_github"
              >
                GitHub
              </a>
            </div>
            <div className="contact-mail subtle">{t("footnote")}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
