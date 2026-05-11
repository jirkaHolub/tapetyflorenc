"use client";

import { useActionState, useRef, useState } from "react";
import { submitVisualization, type SubmitState } from "./actions";

const initialState: SubmitState = { status: "idle" };

export default function Page() {
  const [state, formAction, pending] = useActionState(
    submitVisualization,
    initialState,
  );
  const [showLink2, setShowLink2] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
        <span className="eyebrow">Zdarma · Do 24 hodin</span>
        <h1>
          Uvidíte tapetu ve svém pokoji{" "}
          <span className="hl">dřív, než ji koupíte</span>.
        </h1>
        <p className="sub">
          Pošlete odkaz na tapetu a fotku stěny. Náš designér Vám zdarma
          připraví realistickou vizualizaci, ať máte jistotu, že do Vašeho
          pokoje sedne.
        </p>

        <form ref={formRef} action={formAction}>
          <div className="row">
            <div>
              <label htmlFor="firstName">Jméno</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Příjmení</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vas@email.cz"
            />
          </div>

          <div>
            <label htmlFor="link1">Odkaz na tapetu z e-shopu</label>
            <input
              id="link1"
              name="link1"
              type="url"
              required
              placeholder="https://..."
            />
          </div>

          {!showLink2 && (
            <button
              type="button"
              className="add-link"
              onClick={() => setShowLink2(true)}
            >
              + Přidat druhou tapetu pro porovnání
            </button>
          )}

          <div className={`second-link${showLink2 ? " show" : ""}`}>
            <label htmlFor="link2">Odkaz na druhou tapetu</label>
            <input
              id="link2"
              name="link2"
              type="url"
              placeholder="https://..."
            />
          </div>

          <div>
            <label>Fotka pokoje</label>
            <div
              className={`drop${dragOver ? " drag" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file && formRef.current) {
                  const input = formRef.current.elements.namedItem(
                    "roomPhoto",
                  ) as HTMLInputElement;
                  const dt = new DataTransfer();
                  dt.items.add(file);
                  input.files = dt.files;
                  setFileName(file.name);
                }
              }}
            >
              <div className="icon">+</div>
              <b>Klikněte nebo přetáhněte fotku</b>
              <span className="hint">JPG/PNG, max 10 MB</span>
              {fileName && <div className="file-name">✓ {fileName}</div>}
              <input
                type="file"
                name="roomPhoto"
                accept="image/*"
                required
                onChange={(e) =>
                  setFileName(e.target.files?.[0]?.name ?? null)
                }
              />
            </div>
          </div>

          {state.status === "error" && (
            <div className="alert err">{state.message}</div>
          )}

          <button type="submit" className="cta" disabled={pending}>
            {pending ? "Odesílám…" : "Odeslat poptávku"}
          </button>

          <p className="trust">
            Zdarma &nbsp;·&nbsp; Bez závazku &nbsp;·&nbsp; Odpověď do 24 hodin
          </p>
        </form>

        <figure className="team">
          <img src="/tym.jpg" alt="Náš tým – Tapety Metro Florenc" />
          <figcaption>
            Vizualizaci pro Vás osobně připravíme my dva. Na e-mail Vám
            přijde přímo od nás.
          </figcaption>
        </figure>
      </main>

      <footer className="site">
        © 2026 Tapety Metro Florenc · Křižíkova 22, Praha 8
      </footer>
    </>
  );
}
