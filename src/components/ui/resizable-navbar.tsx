"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  forceLight?: boolean;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NavbarSurfaceContext = React.createContext({
  isLightSurface: false,
});

const useNavbarSurface = () => React.useContext(NavbarSurfaceContext);

const isInternalRoute = (href: string) => href.startsWith("/");

const NavLink = ({
  href,
  className,
  children,
  onClick,
  onMouseEnter,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
}) => {
  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={className} onClick={onClick} onMouseEnter={onMouseEnter}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick} onMouseEnter={onMouseEnter}>
      {children}
    </a>
  );
};

export const Navbar = ({ children, className, forceLight }: NavbarProps) => {
  const ref = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [isLightSurface, setIsLightSurface] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const isScrollingDown = latest > previous;

    setVisible(latest > 80);
    setHidden(isScrollingDown && latest > 120);
    setIsLightSurface(forceLight || latest > window.innerHeight * 0.65);
    lastScrollY.current = latest;
  });

  return (
    <NavbarSurfaceContext.Provider value={{ isLightSurface: forceLight || isLightSurface }}>
      <motion.nav
        ref={ref}
        aria-label="Primary"
        className={cn(
          "fixed top-3 z-50 left-3 right-3 sm:left-4 sm:right-4 transition-[opacity,transform] duration-200 ease-out",
          hidden
            ? "pointer-events-none -translate-y-28 opacity-0"
            : "pointer-events-auto translate-y-0 opacity-100",
          className,
        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
      )}
      </motion.nav>
    </NavbarSurfaceContext.Provider>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const { isLightSurface } = useNavbarSurface();

  return (
    <motion.div
      animate={{
        width: visible ? "72%" : "100%",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 34,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-[900px] flex-row items-center justify-between self-start rounded-full px-2 h-[56px] lg:flex transition-[backdrop-filter,box-shadow] duration-300",
        visible ? "backdrop-blur-lg shadow-[0_14px_36px_rgba(5,7,12,0.12)]" : "backdrop-blur-md shadow-[0_6px_20px_rgba(5,7,12,0.06)]",
        isLightSurface
          ? "border border-slate-950/10 bg-white/[0.74] text-slate-950 supports-[backdrop-filter]:bg-white/[0.64]"
          : "border border-white/12 bg-white/[0.06] text-white supports-[backdrop-filter]:bg-white/[0.04]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { isLightSurface } = useNavbarSurface();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 lg:flex lg:space-x-1",
        isLightSurface
          ? "text-slate-600 hover:text-slate-950"
          : "text-white/68 hover:text-white",
        className,
      )}
    >
      {items.map((item, idx) => (
        <NavLink
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className={cn(
            "relative px-3 py-1 text-[13px] transition",
            isLightSurface
              ? "text-slate-600 hover:text-slate-950"
              : "text-white/70 hover:text-white",
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className={cn(
                "absolute inset-0 h-full w-full rounded-full",
                isLightSurface ? "bg-red-100" : "bg-red-700/18",
              )}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </NavLink>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const { isLightSurface } = useNavbarSurface();

  return (
    <motion.div
      animate={{
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "18px" : "20px",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 34,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-0 py-[8px] lg:hidden transition-[backdrop-filter,box-shadow] duration-300",
        visible ? "backdrop-blur-lg shadow-[0_14px_36px_rgba(5,7,12,0.12)]" : "backdrop-blur-md shadow-[0_6px_20px_rgba(5,7,12,0.06)]",
        isLightSurface
          ? "border border-slate-950/10 bg-white/[0.74] text-slate-950 supports-[backdrop-filter]:bg-white/[0.64]"
          : "border border-white/12 bg-white/[0.06] text-white supports-[backdrop-filter]:bg-white/[0.04]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
        "absolute inset-x-0 top-12 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-red-700/20 bg-[#05070c]/95 px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const { isLightSurface } = useNavbarSurface();
  const iconClassName = isLightSurface ? "text-slate-950" : "text-white";

  return isOpen ? (
    <IconX className={iconClassName} onClick={onClick} />
  ) : (
    <IconMenu2 className={iconClassName} onClick={onClick} />
  );
};

export const NavbarLogo = ({
  href = "/",
  label = "Ractysh Infra Pvt Ltd",
  mobile = false,
}: {
  href?: string;
  label?: string;
  mobile?: boolean;
}) => {
  const { isLightSurface } = useNavbarSurface();

  return (
    <NavLink
      href={href}
      className={cn(
        "relative z-20 flex min-w-0 items-center gap-1.5 px-1 py-0 transition-opacity hover:opacity-85",
        mobile ? "mr-2" : "mr-3",
      )}
    >
      <Image
        src="/images/brand/ractysh-logo.png"
        alt={`${label} logo`}
        width={32}
        height={32}
        className={cn(
          "object-contain",
          mobile ? "h-8 w-8" : "h-6 w-6 sm:h-7 sm:w-7",
        )}
        priority
        unoptimized
      />
      <div className={cn("flex flex-col leading-tight", !mobile && "gap-y-[1px]")}>
        <span
          className={cn(
            "whitespace-nowrap font-bold leading-none tracking-tight",
            mobile
              ? "text-base"
              : "text-xs sm:text-sm",
            isLightSurface ? "text-slate-950" : "text-white",
          )}
        >
          RACTYSH INFRA
        </span>
        <span
          className={cn(
            "whitespace-nowrap font-medium tracking-wider leading-none text-[#C4A87C]",
            mobile
              ? "text-[10px]"
              : "text-[9px] uppercase sm:text-[10px]",
          )}
        >
          Pvt Ltd
        </span>
      </div>
    </NavLink>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const { isLightSurface } = useNavbarSurface();
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-3 py-1 text-center text-xs font-bold transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary: "bg-[#991b1b] text-white shadow-[0_0_24px_rgba(127,29,29,0.3)]",
    secondary: isLightSurface
      ? "bg-transparent text-slate-700 shadow-none hover:text-slate-950"
      : "bg-transparent text-white/78 shadow-none hover:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.16)]",
    gradient:
      "bg-gradient-to-b from-red-500 to-red-900 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.22)_inset]",
  };

  return React.createElement(
    Tag,
    {
      href: href || undefined,
      className: cn(baseStyles, variantStyles[variant], className),
      ...props,
    },
    children,
  );
};
