"use client";

import { useLocation } from "@/lib/router";
import SEO from "@/components/SEO";
import { Link } from "@/lib/router";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title="Page Not Found | Palacio Event Centre"
        description="The page you requested could not be found on Palacio Event Centre."
        pathname={location.pathname}
        noindex
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
