import Link from "next/link";

interface LiveProjectButtonProps {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
}

const baseClasses =
  "inline-block rounded-full border-2 border-frost text-frost font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-center hover:bg-frost/10 transition-colors duration-200";

export function LiveProjectButton({
  label,
  href,
  external = false,
  className = "",
}: LiveProjectButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {label}
    </Link>
  );
}
