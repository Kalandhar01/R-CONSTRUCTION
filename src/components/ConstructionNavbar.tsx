"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";

const brandLabel = "Ractysh Infra Pvt Ltd";

const navItems = [
  {
    name: "Home",
    homeLink: "#home",
    pageLink: "/#home",
  },
  {
    name: "Services",
    homeLink: "#services",
    pageLink: "/construction-services",
  },
  {
    name: "Projects",
    homeLink: "#works",
    pageLink: "/works",
  },
  {
    name: "Contact",
    homeLink: "#contact",
    pageLink: "/#contact",
  },
];

export default function ConstructionNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isWorksPage = pathname.startsWith("/works");
  const homeHref = isHomePage ? "#home" : "/#home";
  const contactHref = isHomePage ? "#contact" : "/#contact";
  const sectionNavItems = navItems.map((item) => ({
    name: item.name,
    link: isHomePage ? item.homeLink : item.pageLink,
  }));

  return (
    <Navbar forceLight={isWorksPage}>
      <NavBody>
        <NavbarLogo href={homeHref} label={brandLabel} />
        <NavItems items={sectionNavItems} />
        <div className="relative z-20 flex items-center gap-3">
          <NavbarButton href={contactHref} variant="primary" className="h-9 px-4">
            Contact
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo href={homeHref} label={brandLabel} mobile />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {sectionNavItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-white/78 transition hover:text-red-200"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              href={contactHref}
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Contact
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
