import React, { useState } from 'react';
import { LINKEDIN_URL, EMAIL } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Networking',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Constructing a professional mailto link as a reliable front-end only solution
    // This ensures the email is actually sent from the user's client to alex.siedler@gmail.com
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(formData.subject + ' - ' + formData.name)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Simulate a brief loading state for better UX before opening the mail client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: 'General Networking',
        message: ''
      });

      // Return to idle after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="animate-in fade-in slide-in-from-left duration-700">
        <h1 className="text-4xl font-bold mb-6">Let's Connect</h1>
        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
          I'm passionate about building digital collaboration ecosystems and sharing knowledge within the tech community. Whether you want to discuss the latest in AI-driven automation, share insights about the M365 and Atlassian stacks, or reach out regarding professional career opportunities, I'm always open to networking.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Direct Message</p>
              <a href={`mailto:${EMAIL}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors">{EMAIL}</a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.432.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">LinkedIn</p>
              <a 
                href={LINKEDIN_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Location</p>
              <p className="font-semibold text-slate-800">Düsseldorf, NRW, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 animate-in fade-in slide-in-from-right duration-700 relative overflow-hidden">
        {status === 'success' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 scale-110 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Prepared!</h2>
            <p className="text-slate-500 mb-8">Your email client has been opened. Just click 'Send' in your mail app to finish.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-blue-600 font-bold hover:underline"
            >
              Send another message
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-8 text-slate-900">Send a Message</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input 
                required
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                required
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
            <select 
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            >
              <option>General Networking</option>
              <option>Career Opportunity</option>
              <option>Speaking / Event Invitation</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
            <textarea 
              required
              id="message" 
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              placeholder="Hi Alexander, I saw your portfolio and would like to..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Email...
              </>
            ) : 'Send Message'}
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed uppercase tracking-widest font-bold">
            I'll get back to you as soon as possible. Usually within 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;