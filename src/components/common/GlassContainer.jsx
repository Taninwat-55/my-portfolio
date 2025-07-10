function GlassContainer({ children, className = '' }) {
  const baseClasses = `
    relative p-6 sm:p-8 rounded-2xl 
    bg-glass-bg backdrop-blur-lg 
    border border-glass-border 
    transition-all duration-300
    hover:border-glass-border-hover
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Subtle shine effect */}
      <div className='absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none'></div>

      {/* Content */}
      {children}
    </div>
  );
}

export default GlassContainer;
