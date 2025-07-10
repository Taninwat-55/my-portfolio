function GlassButton({ children, href, onClick, className = '' }) {
  const baseClasses = `
    relative inline-flex items-center justify-center px-6 py-2.5 rounded-lg 
    text-text-primary font-semibold
    border border-glass-border bg-glass-bg
    backdrop-blur-sm
    shadow-[inset_0_1px_0px_rgba(255,255,255,0.2),0_0_9px_rgba(0,0,0,0.2)]
    transition-all duration-300
    hover:bg-white/20 hover:border-white/50
  `;
  
  const content = <span className="relative z-10">{children}</span>;

  // Render as a link if href is provided
  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={`${baseClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  // Render as a button otherwise
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
}

export default GlassButton;