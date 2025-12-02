import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import FormInput from './FormInput';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFocused, setIsFocused] = useState({ name: false, email: false, message: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: keyof typeof isFocused) => setIsFocused({ ...isFocused, [field]: true });
  
  const handleBlur = (field: keyof typeof isFocused) => {
    if (formData[field] === '') setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center max-w-5xl mx-auto">
      
      {/* Left: Contact Info */}
      <div>
        <h3 className="text-4xl font-heading font-bold text-white mb-2">
          INITIATE <br/><span className="text-primary">HANDSHAKE</span>
        </h3>
        <p className="font-body text-text/60 mb-8">
          Ready to validate the next block? Whether it's a project collaboration or an internship opportunity, my node is listening.
        </p>

        <div className="space-y-6 font-code text-sm">
          <div className="flex items-center gap-4 p-4 border border-text/10 bg-dark-base hover:border-primary/50 transition-colors group">
            <div className="p-3 bg-primary/10 text-primary rounded group-hover:bg-primary group-hover:text-dark-base transition-colors">
              <FaEnvelope size={20} />
            </div>
            <div>
              <p className="text-text/40 text-xs">EMAIL_PROTOCOL</p>
              <a href="mailto:taninwat.kaewpankan@gmail.com" className="text-white hover:text-primary transition-colors">
                taninwat.kaewpankan@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/taninwat-k-a187951aa/" target="_blank" className="flex-1 flex items-center justify-center gap-2 p-4 border border-text/10 bg-dark-base hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all group">
              <FaLinkedin size={24} className="text-text/50 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">LINKEDIN</span>
            </a>
            <a href="https://github.com/Taninwat-55" target="_blank" className="flex-1 flex items-center justify-center gap-2 p-4 border border-text/10 bg-dark-base hover:bg-[#333] hover:border-white hover:text-white transition-all group">
              <FaGithub size={24} className="text-text/50 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">GITHUB</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-primary/20"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-primary/20"></div>

        <div className="bg-base/80 backdrop-blur-md p-8 border border-text/10 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaperPlane size={24} />
              </div>
              <h4 className="text-xl font-heading text-white mb-2">TRANSACTION BROADCASTED</h4>
              <p className="text-text/60 font-code text-sm">Your message has been added to the mempool.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput 
                label="PUBLIC_KEY (Name)" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocused.name}
              />
              <FormInput 
                label="ADDRESS (Email)" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocused.email}
                type="email"
              />
              <FormInput 
                label="DATA_PAYLOAD (Message)" 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocused.message}
                type="textarea"
                rows={4}
              />
              
              <button type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-dark-base font-bold font-heading tracking-widest transition-colors flex items-center justify-center gap-2">
                <FaPaperPlane /> SIGN & BROADCAST
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;