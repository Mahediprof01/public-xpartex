"use client";
import React, { ComponentPropsWithoutRef, ReactNode, FC, SVGProps } from "react";
// using native <img> for backgrounds avoids next/image handling during quick tests

const cn = (...inputs: (string | boolean | undefined | null)[]) => {
  return inputs.filter(Boolean).join(" ");
};

const ArrowRightIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M8.22 2.72a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 8.5H3.75a.75.75 0 0 1 0-1.5h8.19L8.22 3.78a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const BentoGrid: FC<BentoGridProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoCard: FC<BentoCardProps> = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",

      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",

      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-sky-400 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />

      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {name}
      </h3>

      <p className="max-w-lg text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <a
        href={href}
        className="pointer-events-auto text-sm font-semibold text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500 flex items-center"
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

// --- Example Icons ---

const FileTextIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const IntegrationIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
const ShareIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);
const GlobeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

type Feature = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  description: string;
  href: string;
  cta: string;
  className: string;
  background: ReactNode;
};

const features: Feature[] = [
  {
    Icon: FileTextIcon,
    name: "Top Deals",
    description: "Custom-fit t-shirts tailored to your specs and branding.",
    href: "/products?category=tailored",
    cta: "Shop Tailored",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        <img src="/classic-polo-shirt.png" alt="Classic polo shirt" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    Icon: IntegrationIcon,
    name: "Top Ranking",
    description: "Premium jackets crafted per order with flexible MOQ options.",
    href: "/products?category=tailored",
    cta: "Order Now",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0">
        <img src="/cotton-t-shirt.jpg" alt="Cotton t-shirt" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    Icon: ShareIcon,
    name: "New Arrivals",
    description: "Personalize fabrics, colors, and labels for your brand.",
    href: "/products?category=tailored",
    cta: "Customize",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0">
        <img src="/cozy-hoodie.png" alt="Cozy hoodie" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Tailored Products",
    description: "Connect with vetted suppliers for worldwide production.",
    href: "/suppliers",
    cta: "Find Suppliers",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0">
        <img src="/denim-jeans.png" alt="Denim jeans" className="w-full h-full object-cover" />
      </div>
    ),
  },
];

export default function TailoredProducts() {
  return (
    <section className="w-full">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900"></h2>
          <a href="/products?category=tailored" className="text-sky-400 hover:text-sky-400 font-medium">
            View All →
          </a>
        </div>

        <BentoGrid className="auto-rows-[18rem] sm:auto-rows-[20rem] md:auto-rows-[22rem] gap-4">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} className={feature.className} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
