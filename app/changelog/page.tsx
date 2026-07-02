import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Changelog — On Board",
  description:
    "What's new in On Board — the latest release notes, updated automatically from the App Store.",
};

// Re-fetch at most once an hour so new App Store releases surface on their own (ISR).
export const revalidate = 3600;

type Release = {
  version: string;
  notes: string[];
  date: string | null;
};

// The iTunes Lookup API returns only the CURRENT version's release notes, so this
// renders the latest release. A full historical changelog would require persisting
// past releases into a stored list over time.
async function getLatestRelease(): Promise<Release | null> {
  const appStoreId = process.env.APP_STORE_ID;
  if (!appStoreId) return null; // Pre-launch: no App Store listing yet → "coming soon".

  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${encodeURIComponent(appStoreId)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const app = data?.results?.[0];
    if (!app?.version) return null;

    const notes: string[] = String(app.releaseNotes ?? "")
      .split("\n")
      .map((line) => line.replace(/^[•\-\s]+/, "").trim())
      .filter(Boolean);

    return {
      version: String(app.version),
      notes,
      date: app.currentVersionReleaseDate ?? null,
    };
  } catch {
    // Network/parse failure → fall back to the empty state rather than erroring the page.
    return null;
  }
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ChangelogPage() {
  const release = await getLatestRelease();
  const releaseDate = formatDate(release?.date ?? null);

  return (
    <>
      <main className="flex-1 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-block mt-12 mb-8 text-sm hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            ← Back
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Changelog
          </h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
            What&apos;s new in On Board.
          </p>

          {release ? (
            <article
              className="rounded-2xl p-7"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
                <h2 className="text-xl font-bold">Version {release.version}</h2>
                {releaseDate && (
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {releaseDate}
                  </span>
                )}
              </div>

              {release.notes.length > 0 ? (
                <ul
                  className="space-y-2 text-[15px] leading-relaxed list-disc pl-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {release.notes.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  This release has no published notes.
                </p>
              )}
            </article>
          ) : (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <span className="text-3xl block mb-4">📌</span>
              <h2 className="font-bold text-base mb-2">Coming soon</h2>
              <p
                className="text-sm leading-relaxed max-w-sm mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                Once On Board launches on the App Store, every update&apos;s
                release notes will show up here automatically.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}


