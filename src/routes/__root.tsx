import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">This look doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Back to MirrorMe
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "root" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-xl">Something glitched in the mirror.</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 rounded-full bg-gradient-primary px-6 py-2 text-sm text-primary-foreground"
        >Retry</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "MirrorMe AI — See Yourself Before You Buy" },
      { name: "description", content: "Your AI personal stylist. Generate outfits, try them on, and shop with total confidence." },
      { name: "theme-color", content: "#0a0710" },
      { property: "og:title", content: "MirrorMe AI — See Yourself Before You Buy" },
      { property: "og:description", content: "Your AI personal stylist. Generate outfits, try them on, and shop with total confidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "MirrorMe AI — See Yourself Before You Buy" },
      { name: "twitter:description", content: "Your AI personal stylist. Generate outfits, try them on, and shop with total confidence." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6dfb0b00-8d1f-4b98-b74f-bf21805d0481/id-preview-0925fd4c--9f178146-d3da-471c-bc04-9bcd15bd686e.lovable.app-1780210978203.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6dfb0b00-8d1f-4b98-b74f-bf21805d0481/id-preview-0925fd4c--9f178146-d3da-471c-bc04-9bcd15bd686e.lovable.app-1780210978203.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
