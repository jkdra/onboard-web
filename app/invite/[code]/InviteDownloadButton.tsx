"use client";

import React from "react";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Download CTA that performs a deferred deep-link hand-off before sending the
 * user to TestFlight / the App Store: it copies this invite page's URL to the
 * clipboard. The freshly-installed iOS app reads that back off the clipboard
 * (PendingReferralCode.hydrateFromPasteboardIfNeeded) and pre-fills the code,
 * so the user never has to type it. Universal links only fire when the app is
 * already installed — this covers the not-yet-installed case Firebase Dynamic
 * Links used to handle before it shut down.
 *
 * Best-effort: clipboard writes can be blocked (permissions, insecure context);
 * the download still proceeds and the code stays visible on-screen as a manual
 * fallback.
 */
export default function InviteDownloadButton({ href, className, style, children }: Props) {
  const handleClick = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        void navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
    } catch {
      // ignore — the anchor still navigates to the store
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
