import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getDict, type Locale } from '../i18n';
import { CONTACT_EMAIL } from '../site';

const fieldClass =
  'w-full rounded-[12px] border border-muted-4 bg-white px-4 py-[14px] text-[14px] font-semibold text-ink placeholder:text-muted-2 outline-none transition-[border-color,box-shadow] focus:border-brand focus:ring-2 focus:ring-brand/25 focus-visible:outline-none';
const labelClass = 'mb-[6px] block text-[12.5px] font-extrabold text-ink';

export default function Contact({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact;
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
      setErrorMessage(t.error);
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
      <div className="site-container py-16 lg:py-24">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="section-title">{t.title}</h2>
            <p className="section-lead mt-5 max-w-[420px] text-pretty">{t.lead}</p>

            <dl className="mt-9 max-w-[420px] border-b border-line-2 text-[14.5px]">
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line-2 py-[14px]">
                <dt className="font-extrabold text-ink">{t.email}</dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-bold text-brand underline decoration-brand/30 transition-colors hover:text-brand-deep hover:decoration-brand-deep"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line-2 py-[14px]">
                <dt className="font-extrabold text-ink">{t.responseTitle}</dt>
                <dd className="font-medium text-ink-3">{t.responseBody}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line-2 py-[14px]">
                <dt className="font-extrabold text-ink">{t.supportTitle}</dt>
                <dd className="font-medium text-ink-3">{t.supportBody}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[24px] bg-paper-2 p-6 sm:p-8">
            {status === 'success' ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint">
                  <CheckCircle className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-[24px] font-extrabold text-ink">{t.sentTitle}</h3>
                <p className="mt-2 text-[15px] font-medium text-muted">
                  {t.sentBody}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[15px] font-extrabold text-brand transition-colors hover:text-brand-deep"
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      {t.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                      placeholder={t.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {t.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                    placeholder={t.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    {t.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    placeholder={t.messagePlaceholder}
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
                  className="group mt-1 flex w-full items-center justify-center gap-2 rounded-[24px] bg-brand px-6 py-[14px] text-[16px] font-bold text-white shadow-btn-inset-lg transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span>{t.sending}</span>
                  ) : (
                    <>
                      <span>{t.send}</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
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
