import React, { useState } from "react";

const stats = [
  { count: 4850, label: "Total Campaigns", icon: "🎁" },
  { count: 2068, label: "Happy Volunteers", icon: "👥" },
  { count: 3456, label: "Released Funds", icon: "💵" },
  { count: 480, label: "Satisfied Donors", icon: "😊" },
];

const faqs = [
  {
    question: "Can I change where I want my donation to go?",
    answer:
      "Yes, you can update your donation preferences from your profile settings.",
  },
  {
    question: "Where does my transaction processing fee go?",
    answer:
      "Adding an additional 2.5% to the amount of your donation will help cover processing fees and other expenses associated with the processing of your gift. This fee is not required to make a financial gift. You may choose to add the additional amount at the time of your online donation.",
  },
  {
    question: "How can I receive a refund?",
    answer:
      "Refunds can be requested within 7 days of the transaction by contacting support.",
  },
  {
    question: "Is my credit card information secure?",
    answer: "Yes, we use industry-standard encryption to protect your data.",
  },
];

const StatsAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(1); // open the second FAQ by default

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-gray-50 min-h-screen max-w-7xl mx-auto items-center">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.count}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h4 className="text-sm text-gray-500 uppercase mb-2">
            Recently Asked Questions
          </h4>
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  className="w-full text-left font-semibold flex justify-between items-center"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAndFAQ;
