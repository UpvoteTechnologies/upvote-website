import { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';

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
    <section id="contact" className="py-24 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-upvote rounded-3xl p-8 text-white shadow-xl">
                <Mail className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-white/90 mb-8">
                  Reach out and we'll get back to you as soon as possible
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:admin@upvote.app"
                        className="text-white/90 hover:text-white transition-colors"
                      >
                        admin@upvote.app
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-white/90 text-sm">
                        We typically respond within 24-48 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">App Support</h4>
                      <p className="text-white/90 text-sm">
                        For app issues, open Settings → Help
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-upvote-pink hover:text-upvote-orange transition-colors font-semibold text-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-upvote-pink focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-upvote-pink focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-upvote-pink focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-upvote-pink focus:border-transparent transition-all outline-none resize-none text-gray-900 placeholder-gray-400"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-start space-x-3 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 font-medium">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-upvote text-white px-8 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 group"
                    >
                      {status === 'loading' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
