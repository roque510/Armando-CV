import Script from "next/script";

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * Loads Microsoft Clarity. No-op unless NEXT_PUBLIC_CLARITY_PROJECT_ID is set,
 * so it's safe in local/dev and won't run until the ID is configured.
 */
export default function ClarityAnalytics() {
  if (!PROJECT_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${PROJECT_ID}");`}
    </Script>
  );
}
