import React, { useEffect, useRef, useState } from 'react';

interface BlockWrapperProps {
  id: string;
  blockNumber: string;
  title: string;
  hash: string;
  prevHash?: string;
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}

const BlockWrapper = ({
  id,
  blockNumber,
  title,
  hash,
  prevHash = "0000000000000000...",
  children,
  className = '',
  isLast = false,
}: BlockWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className={`
        relative w-screen h-screen flex-shrink-0 
        flex flex-col items-center p-6 md:p-12
        border-r border-primary/5 bg-transparent
        snap-start ${className}
      `}
    >
      {/* Chain Connector */}
      {!isLast && (
        <>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-primary/50 to-transparent z-20" />
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-dark-base border border-primary rounded-full z-30 shadow-[0_0_10px_#F7931A]" />
        </>
      )}

      {/* Block Header (Absolute Positioned) */}
      <div className="absolute top-24 left-8 md:left-16 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text/10 select-none">
          {blockNumber}
        </h2>
        <span className="text-primary font-heading text-sm tracking-[0.2em] uppercase glow-text">
          {title}
        </span>
      </div>

      {/* Content Container - Added pt-32 to push content below header */}
      <div 
        className={`w-full max-w-7xl h-full flex flex-col justify-center pt-32 relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {children}
      </div>

      {/* Footer Hash */}
      <div className="hidden md:block absolute bottom-8 left-8 md:left-16 font-code text-[10px] md:text-xs text-text/30">
        <div className="mb-1">PREV: {prevHash.substring(0, 24)}...</div>
        <div className="text-primary/60">HASH: {hash}</div>
      </div>
    </section>
  );
};

export default BlockWrapper;