import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  const socialLinks = [
    { href: 'https://github.com/Taninwat-55', label: 'GitHub', icon: FaGithub },
    { href: 'https://www.linkedin.com/in/taninwat-k-a187951aa/', label: 'LinkedIn', icon: FaLinkedin },
    { href: 'https://x.com/IceishhK', label: 'X (formerly Twitter)', icon: FaXTwitter },
  ];

  return (
    <footer className="mt-20 py-8" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="border-t border-glass-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Left Side */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">Taninwat Kaewpankan</h3>
            <p className="text-text-secondary">
              Full-Stack Developer | Open to opportunities
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center sm:items-end gap-4">
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-secondary hover:text-text-hover transition-colors"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-xs text-text-secondary/70">
              &copy; {new Date().getFullYear()} Taninwat Kaewpankan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;