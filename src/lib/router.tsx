"use client";

import LinkBase from "next/link";
import { useParams as useNextParams, usePathname } from "next/navigation";
import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

type LinkBaseProps = Omit<ComponentPropsWithoutRef<typeof LinkBase>, "href"> & {
  to: string;
};

type NavLinkRenderState = {
  isActive: boolean;
  isPending: boolean;
};

export interface NavLinkProps extends Omit<LinkBaseProps, "className"> {
  className?: string | ((state: NavLinkRenderState) => string);
}

export const Link = forwardRef<HTMLAnchorElement, LinkBaseProps>(
  ({ to, ...props }, ref) => <LinkBase ref={ref} href={to} {...props} />,
);

Link.displayName = "Link";

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, ...props }, ref) => {
    const location = useLocation();
    const [targetPath, targetHash = ""] = to.split("#");
    const normalizedTargetPath = targetPath || "/";
    const isHashLink = to.includes("#");
    const isActive = isHashLink
      ? location.pathname === normalizedTargetPath && location.hash === `#${targetHash}`
      : normalizedTargetPath === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(normalizedTargetPath);

    const resolvedClassName =
      typeof className === "function"
        ? className({ isActive, isPending: false })
        : className;

    return <Link ref={ref} to={to} className={resolvedClassName} {...props} />;
  },
);

NavLink.displayName = "NavLink";

export const useLocation = () => {
  const pathname = usePathname() ?? "/";
  const [browserLocation, setBrowserLocation] = useState({
    search: "",
    hash: "",
  });

  useEffect(() => {
    const updateLocation = () => {
      setBrowserLocation({
        search: window.location.search,
        hash: window.location.hash,
      });
    };

    updateLocation();
    window.addEventListener("hashchange", updateLocation);
    window.addEventListener("popstate", updateLocation);

    return () => {
      window.removeEventListener("hashchange", updateLocation);
      window.removeEventListener("popstate", updateLocation);
    };
  }, [pathname]);

  return { pathname, ...browserLocation };
};

export const useParams = <
  T extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >,
>() => useNextParams() as T;
