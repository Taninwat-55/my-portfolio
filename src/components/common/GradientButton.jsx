export default function GradientButton({
  children,
  href,
  onClick,
  className = '',
}) {
  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={`inline-flex items-center justify-center text-white  md:inline px-6 py-2 rounded-full transform transition-transform duration-300 hover:scale-105 text-center ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center text-white  md:inline px-4 py-2 rounded-full transform transition-transform duration-300 hover:scale-105 text-center ${className}`}
    >
      {children}
    </button>
  );
}
