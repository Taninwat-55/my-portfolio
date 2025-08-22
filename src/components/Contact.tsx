import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope } from 'react-icons/fa';
import FormInput from './FormInput';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: keyof typeof isFocused) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: keyof typeof isFocused) => {
    if (formData[field] === '') {
      setIsFocused({ ...isFocused, [field]: false });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': form.getAttribute('name') || 'contact',
        ...formData,
      }).toString(),
    })
      .then(() => {
        // Form outro animation on success
        const formChildren = gsap.utils.toArray('.animate-in-form > *');
        gsap.to(formChildren, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          onComplete: () => {
            setIsSubmitted(true);
          },
        });
        setFormData({ name: '', email: '', message: '' });
        setIsFocused({ name: false, email: false, message: false });
      })
      .catch((error) => {
        // You can still show a toast for errors
        console.error('Form submission error:', error);
      });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation on scroll
      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tlIntro
        .fromTo(
          sectionRef.current!.querySelectorAll('.animate-in'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
        .to('.submit-btn', {
          scale: 1.1,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
        });

      // Outro animation on scroll away
      gsap.to(sectionRef.current!.querySelectorAll('.animate-out-scroll'), {
        y: -100,
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 20%',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='py-20 bg-base dark:bg-dark-base'
      aria-labelledby='contact-heading'
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center animate-in animate-out-scroll'>
          <h2
            id='contact-heading'
            className='text-4xl font-heading font-bold text-text dark:text-dark-text mb-4'
          >
            Get In Touch
          </h2>
          <p className='max-w-2xl mx-auto text-lg font-body text-text/70 dark:text-dark-text/70 mb-12'>
            I'm actively seeking internship opportunities where I can
            contribute, learn, and grow. If you have a role that might be a good
            fit, I'd love to hear from you.
          </p>
        </div>

        <div className='max-w-xl mx-auto animate-in animate-out-scroll'>
          {isSubmitted ? (
            <div className='bg-dark-base/20 p-8 rounded-lg border border-highlight/50 text-center'>
              <h3 className='text-3xl font-heading font-bold text-primary mb-4'>
                Message Sent!
              </h3>
              <p className='text-lg font-body text-text/80'>
                Thank you for your message. I will get back to you soon.
              </p>
            </div>
          ) : (
            <div className='bg-dark-base/20 p-8 rounded-lg border border-highlight/50'>
              <div className='flex justify-center items-center gap-3 mb-6'>
                <a
                  href='mailto:taninwat.kaewpankan@gmail.com'
                  className='flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-primary/20 text-text dark:text-dark-text hover:bg-highlight/40 transition-colors font-body'
                >
                  <FaEnvelope /> Email Me
                </a>
              </div>
              <form
                name='contact'
                ref={formRef}
                method='POST'
                data-netlify='true'
                data-netlify-honeypot='bot-field'
                onSubmit={handleSubmit}
                className='space-y-6 animate-in-form'
              >
                <input type='hidden' name='form-name' value='contact' />
                <p className='hidden'>
                  <label>
                    Don’t fill this out: <input name='bot-field' />
                  </label>
                </p>

                <FormInput
                  label='Your Name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  isFocused={isFocused.name}
                />

                <FormInput
                  label='Your Email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  isFocused={isFocused.email}
                  type='email'
                />

                <FormInput
                  label='Message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  isFocused={isFocused.message}
                  type='textarea'
                  rows={4}
                />

                <button
                  type='submit'
                  className='submit-btn w-full p-3 bg-primary text-dark-text rounded-lg hover:bg-secondary transition-colors font-body font-semibold'
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
