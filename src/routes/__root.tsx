import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/CtaFooter";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { MobileActionBar } from "@/components/site/MobileActionBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Patonics International Trading Co." },
      {
        name: "description",
        content: "Indian exporter of agricultural commodities and diverse products since 1983.",
      },
      { name: "theme-color", content: "#1b2a1f" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300..700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Structured data for the trading company. Search engines and AI answer
 * engines read this to attribute the products, markets and contact routes
 * to the right legal entity.
 */
const ORGANISATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Patonics International Trading Co.",
  alternateName: "Patonics International",
  foundingDate: "2023-01-22",
  description:
    "Indian exporter of agricultural commodities, agro-processed products, ceramics, textiles and paper and packaging, trading since 1983.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37, Akshar Business Center, NH 8-A, Jambudiya",
    addressRegion: "Gujarat",
    postalCode: "363642",
    addressCountry: "IN",
  },
  email: "trade@patonics.in",
  telephone: "+917990612581",
  hasCredential: "ISO 9001:2015",
  areaServed: [
    "United States",
    "Canada",
    "United Arab Emirates",
    "Turkey",
    "China",
    "Japan",
    "Australia",
    "Europe",
    "Africa",
    "South Asia",
  ],
  knowsAbout: [
    "Red chilli powder",
    "Kashmiri chilli powder",
    "Turmeric powder",
    "Cumin powder",
    "Roasted cumin powder",
    "Coriander powder",
    "Cumin coriander powder",
    "Ground spices",
    "Ceramics",
    "Textiles",
    "Paper and packaging",
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/*
          Scroll-reveal hides elements until an observer brings them in. With
          JavaScript off that observer never runs, so cancel the hiding rule
          and show everything immediately.
        */}
        {/*
          Set via dangerouslySetInnerHTML, not as a JSX child: React escapes a
          string child on the server while the browser parses noscript content
          as raw text, which makes the two sides disagree on hydration.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.reveal{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION_JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * The chrome every page shares. Keeping it here rather than in each route means
 * the header, footer and progress bar are mounted once and survive navigation,
 * so the sticky header does not rebuild between pages.
 */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname, status } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, status: s.status }),
  });

  // After a route change, move focus to the main region, so a keyboard or
  // screen-reader user is not left parked in the nav having to tab through it
  // again on every page.
  //
  // Waits for `status === "idle"`: the pathname in router state changes when a
  // navigation starts, and at that point the outgoing <main> has gone while the
  // incoming one has not been committed, so the lookup finds nothing.
  //
  // The ref starts at the current path, so a fresh page load is skipped. There,
  // focus belongs at the top of the document, or the skip link and the nav sit
  // behind the user and can only be reached by shift-tabbing backwards.
  const lastFocused = useRef(pathname);
  useEffect(() => {
    if (status !== "idle" || lastFocused.current === pathname) return;
    lastFocused.current = pathname;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, status]);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
      <MobileActionBar />
    </QueryClientProvider>
  );
}
