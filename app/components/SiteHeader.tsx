import Link from "next/link";
import HoverLogo from "@/app/components/HoverLogo";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-6">
      <Link href="/" aria-label="On Board home">
        <HoverLogo size={36} />
      </Link>
      <Link
        href="/changelog"
        className="text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity"
      >
        Changelog
      </Link>
    </header>
  );
}
