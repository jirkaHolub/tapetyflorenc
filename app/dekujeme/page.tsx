import type { Metadata } from "next";
import { LeadEvent } from "./lead-event";

export const metadata: Metadata = {
  title: "Děkujeme",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dekujeme" },
};

export default function ThankYouPage() {
  return (
    <>
      <header className="site">
        <div className="inner">
          <a href="/" className="brand">
            <img src="/logo.svg" alt="Tapety Metro Florenc" />
          </a>
          <div className="tab">VIZUALIZACE ZDARMA</div>
        </div>
      </header>

      <main>
        <span className="eyebrow">Hotovo</span>
        <h1>
          Máme to. Vizualizaci Vám pošleme{" "}
          <span className="hl">do 24 hodin</span>.
        </h1>
        <p className="sub">
          Zkontrolujte si e-mail a pro jistotu i složku Hromadné. Pokud bude
          potřeba něco doladit, ozveme se zpátky.
        </p>
      </main>

      <footer className="site">
        © 2026 Tapety Metro Florenc · Křižíkova 22, Praha 8
      </footer>

      <LeadEvent />
    </>
  );
}
