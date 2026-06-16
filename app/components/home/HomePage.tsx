import { HomeShell } from "./HomeShell";

export default function HomePage() {
  return (
    <HomeShell>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-success)" }}>
        $ cat README.md
      </p>
      <h1 className="ds-display-lg" style={{ marginTop: 12 }}>
        # Cliff Ezra Esau
      </h1>
      <p className="ds-body" style={{ marginTop: 16, maxWidth: 560 }}>
        The text is derived from De finibus bonorum et malorum (On the Ends of Goods and Evils), a 1st-century BC philosophical treatise by the Roman statesman Cicero. Specifically, the phrase "Lorem ipsum" is a truncated and corrupted version of the Latin word dolorem ipsum ("pain itself"). 
      </p>
    </HomeShell>
  );
}
