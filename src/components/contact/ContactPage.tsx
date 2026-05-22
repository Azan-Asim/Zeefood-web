"use client";

import { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";


export default function ContactPage() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    isSubmitted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState({ ...state, isSubmitted: true });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#fef2eb] to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(230,57,70,0.08)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(244,162,97,0.1)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />


      {/* Main Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fdf2ec] text-[#E63946] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E63946]"></span>
              </span>
              Get in Touch
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-[#1a0a04] tracking-tight mb-6 leading-tight">
              Let&apos;s talk about your <span className="text-brand-primary ">Next Meal.</span>
            </h1>
            <p className="text-[#6b5a50] text-lg font-medium max-w-md mb-12">
              Have questions, feedback, or want to partner with ZeeFood? We&apos;d love to hear from you. Drop us a message below.
            </p>

            <div className="flex flex-col gap-8">
              <ContactMethod 
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Address"
                detail="464-Sir Handi Road, Near Gourmet bakers, first round about, Samnabad, Lahore"
              />
              <ContactMethod 
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="Call Us Directly"
                detail="+92 335 415 3368"
              />
              <ContactMethod 
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Email Support"
                detail="hello@zeefood.com"
              />
            </div>
          </div>

          {/* Right Side: Contact Form (Glassmorphism) */}
          <div className="relative">
            {/* Background glowing orb for form */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E63946] to-[#F4A261] rounded-[40px] blur-3xl opacity-10" />
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white p-8 lg:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              {!state.isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={nameId} className="text-xs font-bold text-brand-primary uppercase tracking-widest pl-1">Your Name</label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="John Doe"
                      value={state.name}
                      onChange={(e) => setState({ ...state, name: e.target.value })}
                      className="w-full px-5 py-4   focus:border-blaack rounded-2xl outline-none transition-all placeholder:text-[#c0a898] text-[#1a0a04] font-medium bg-gray-200"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={emailId} className="text-xs font-bold text-brand-primary uppercase tracking-widest pl-1">Email Address</label>
                    <input
                      id={emailId}
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      className="w-full px-5 py-4   focus:border-blaack rounded-2xl outline-none transition-all placeholder:text-[#c0a898] text-[#1a0a04] font-medium bg-gray-200"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={messageId} className="text-xs font-bold text-brand-primary uppercase tracking-widest pl-1">Your Message</label>
                    <textarea
                      id={messageId}
                      required
                      rows={4}
                      placeholder="How can we help you today?"
                      value={state.message}
                      onChange={(e) => setState({ ...state, message: e.target.value })}
                      className="w-full px-5 py-4   focus:border-blaack rounded-2xl outline-none transition-all placeholder:text-[#c0a898] text-[#1a0a04] font-medium bg-gray-200 "
                    />
                  </div>

                  <button
                    type="submit"
                    className="relative bg-brand-primary w-full py-4 mt-2 rounded-md font-bold text-white text-lg tracking-wide overflow-hidden group transition-all duration-300  "
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary translate-x-[-200%] group-hover:translate-x-[200%] duration-700 ease-in-out" />
                    <span className="relative flex items-center justify-center gap-2">
                      Send Message
                    
                    </span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-[#ecfdf3] border-4 border-[#a6f4c5] flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-[#12b76a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#1a0a04] mb-2">Message Sent!</h3>
                  <p className="text-[#6b5a50] font-medium max-w-sm mb-8">
                    Thanks for reaching out, {state.name}. Our premium support team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setState({ name: "", email: "", message: "", isSubmitted: false })} className="text-[#E63946] font-bold hover:underline underline-offset-4">
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>


    </div>
  );
}

function ContactMethod({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="w-14 h-14 rounded-2xl bg-white border border-brand-primary  flex items-center justify-center text-[#E63946] transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
        {icon}
      </div>
      <div className="pt-1.5">
        <h4 className="text-brand-primary font-black text-lg mb-1">{title}</h4>
        <p className="text-[#6b5a50] font-medium">{detail}</p>
      </div>
    </div>
  );
}
