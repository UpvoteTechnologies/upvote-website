import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const fieldClass =
  'w-full rounded-[13px] border border-line-2 bg-white px-4 py-[14px] text-[14px] font-semibold text-ink placeholder:text-muted-4 outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/25';
const labelClass = 'mb-[6px] block text-[12.5px] font-extrabold text-ink';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="border-t border-line bg-paper">
      <div className="site-container py-16 lg:py-[88px]">
        <div className="mb-10 text-center lg:mb-11">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-lead mx-auto mt-[14px] max-w-[560px]">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-[18px] lg:grid-cols-5">
          <div className="rounded-[22px] bg-brand-dark p-7 sm:p-8 lg:col-span-2">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" stroke="#9FE3BE" strokeWidth="1.8" />
              <path d="m3.5 7 8.5 6 8.5-6" stroke="#9FE3BE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="mt-4 text-[21px] font-extrabold text-white">Contact Information</h3>
            <p className="mt-2 text-[13.5px] font-medium leading-[1.5] text-white/[.72]">
              Reach out and we'll get back to you as soon as possible
            </p>

            <div className="mt-7 flex flex-col gap-[18px]">
              <div>
                <h4 className="text-[13.5px] font-extrabold text-white">Email</h4>
                <a
                  href="mailto:admin@upvote.app"
                  className="mt-[2px] block text-[13px] font-semibold text-brand-mint transition-colors hover:text-white"
                >
                  admin@upvote.app
                </a>
              </div>
              <div>
                <h4 className="text-[13.5px] font-extrabold text-white">Response Time</h4>
                <p className="mt-[2px] text-[12.5px] font-medium text-white/[.72]">We typically respond within 24-48 hours</p>
              </div>
              <div>
                <h4 className="text-[13.5px] font-extrabold text-white">App Support</h4>
                <p className="mt-[2px] text-[12.5px] font-medium text-white/[.72]">For app issues, open Settings → Help</p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-line bg-paper-2 p-6 sm:p-8 lg:col-span-3">
            {status === 'success' ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint">
                  <CheckCircle className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-[24px] font-extrabold text-ink">Message Sent!</h3>
                <p className="mt-2 text-[15px] font-medium text-muted">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[15px] font-extrabold text-brand transition-colors hover:text-brand-deep"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 rounded-[13px] border border-[#F3C9C2] bg-[#FBE9E6] p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B32D1A]" />
                    <p className="text-[14px] font-semibold text-[#B32D1A]">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group mt-1 flex w-full items-center justify-center gap-2 rounded-[13px] bg-brand px-6 py-[15px] text-[15px] font-extrabold text-white shadow-btn-inset-lg transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
