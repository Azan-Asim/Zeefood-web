import PremiumContentPage from "@/components/common/PremiumContentPage";

export default function PrivacyPolicyPage() {
  return (
    <PremiumContentPage 
      label="Legal & Compliance" 
      title1="Privacy Policy" 
      title2="" 
      description="Last updated: May 2026. Your privacy is critically important to us at ZeeFood Premium Delivery."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">1. Introduction</span>
          </h2>
          <p className="text-brand-dark/80 leading-relaxed text-lg">
            Welcome to <strong>ZeeFood</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">2. The Data We Collect</span>
          </h2>
          <p className="text-brand-dark/80 leading-relaxed mb-6 text-lg">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: "Identity Data", d: "First name, last name, and date of birth." },
              { t: "Contact Data", d: "Billing address, delivery address, and email." },
              { t: "Financial Data", d: "Securely processed payment card details." },
              { t: "Transaction Data", d: "Details about payments and order history." }
            ].map((item, i) => (
              <li key={i} className="p-5 bg-white border border-black/5 rounded-[24px] shadow-sm">
                <strong className="text-brand-dark block mb-2">{item.t}</strong>
                <span className="text-sm text-brand-dark/60 font-medium">{item.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">3. Data Security</span>
          </h2>
          <p className="text-brand-dark/80 leading-relaxed text-lg">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those who have a business need to know.
          </p>
        </section>

        <div className="mt-12 p-8 bg-[#F8FAFC] rounded-[32px] border border-brand-primary/10">
          <h3 className="text-xl font-black text-brand-primary mb-2">Questions?</h3>
          <p className="text-brand-dark/70 m-0 font-bold">
            If you have any questions about this privacy policy, please contact our Data Privacy Manager at <strong className="text-brand-dark underline decoration-brand-primary/30 underline-offset-4">privacy@zeefood.pk</strong>.
          </p>
        </div>
      </div>
    </PremiumContentPage>
  );
}
