import { useState } from 'react';
import toast from 'react-hot-toast';
import GlassContainer from '../common/GlassContainer';
import useScrollReveal from '../../hooks/useScrollReveal';
import { FaEnvelope } from 'react-icons/fa';

function Contact() {
  useScrollReveal([
    {
      selector: '.contact-container',
      config: {
        origin: 'bottom',
        distance: '80px',
        duration: 1500,
        reset: true,
      },
    },
  ]);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const loadingToast = toast.loading('Sending your message...');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': form.getAttribute('name'),
        ...formData,
      }).toString(),
    })
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success(
          'Thank you for your message! I will get back to you soon.'
        );
        // alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Reset form after successful submission
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        toast.error(error, 'Something went wrong. Please try again.');
      });
  };

  return (
    <section
      id='contact'
      className='py-20 px-4'
      aria-labelledby='contact-heading'
    >
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center'>
          <h2 id='contact-heading' className='text-4xl font-bold mb-4'>
            Get In Touch
          </h2>
          <p className='max-w-2xl mx-auto text-text-secondary mb-12'>
            I'm actively seeking internship opportunities where I can
            contribute, learn, and grow. If you have a role that might be a good
            fit, I'd love to hear from you.
          </p>
        </div>

        <GlassContainer className='contact-container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* Left Side: Contact Info */}
            <div>
              <h3 className='text-3xl font-bold text-accent mb-4'>
                Let's Connect
              </h3>
              <p className='text-lg text-text-secondary mb-6'>
                The best way to reach me is via email. I'm available for both
                remote and hybrid roles in the Copenhagen–Malmö area.
              </p>
              <div className='flex items-center gap-3'>
                <FaEnvelope className='text-accent' size={20} />
                <a
                  href='mailto:taninwat.kaewpankan@gmail.com'
                  className='text-lg text-text-primary hover:text-white hover:underline transition-colors'
                >
                  taninwat.kaewpankan@gmail.com
                </a>
              </div>
            </div>

            {/* Right Side: Functional Form */}
            <div className='bg-black/20 p-6 rounded-lg border border-glass-border'>
              <h4 className='text-xl font-semibold mb-2 text-accent'>
                Contact Form
              </h4>
              <form
                name='contact'
                method='POST'
                data-netlify='true'
                data-netlify-honeypot='bot-field'
                onSubmit={handleSubmit}
                className='space-y-4'
              >
                {/* This hidden input is required for Netlify Forms to work correctly in React */}
                <input type='hidden' name='form-name' value='contact' />

                {/* This is the honeypot field for spam prevention. It should be hidden. */}
                <p className='hidden'>
                  <label>
                    Don’t fill this out if you’re human:{' '}
                    <input name='bot-field' />
                  </label>
                </p>

                <div>
                  <label htmlFor='name' className='block mb-1 text-sm'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full p-2 rounded bg-black/30 border border-glass-border focus:outline-none focus:ring-2 focus:ring-accent'
                    placeholder='Jane Doe'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block mb-1 text-sm'>
                    Your Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full p-2 rounded bg-black/30 border border-glass-border focus:outline-none focus:ring-2 focus:ring-accent'
                    placeholder='jane@example.com'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block mb-1 text-sm'>
                    Message
                  </label>
                  <textarea
                    rows='3'
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className='w-full p-2 rounded bg-black/30 border border-glass-border focus:outline-none focus:ring-2 focus:ring-accent'
                    placeholder='Your message...'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-accent hover:bg-accent-hover text-background font-bold py-2 px-4 rounded-lg transition-colors'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </GlassContainer>
      </div>
    </section>
  );
}

export default Contact;
