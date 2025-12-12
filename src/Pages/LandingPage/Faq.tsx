import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  {
    id: 1,
    question: "How long does it take to complete the certification?",
    answer: "The duration varies by certification level. Our foundational courses typically take 4-6 weeks with 5-10 hours of study per week, while advanced certifications may require 8-12 weeks. You can learn at your own pace and have lifetime access to all materials."
  },
  {
    id: 2,
    question: "Are the certifications recognized by employers?",
    answer: "Yes! Our certifications are industry-recognized and accredited by leading professional bodies. Over 5,000+ companies worldwide accept our certifications, including Fortune 500 organizations. Each certificate includes a unique verification code that employers can authenticate."
  },
  {
    id: 3,
    question: "What happens if I fail the certification exam?",
    answer: "Don't worry! You can retake the exam after a 7-day waiting period. Your first retake is completely free, and you'll receive detailed feedback on areas to improve. We also provide additional study resources and practice tests to help you succeed on your next attempt."
  },
  {
    id: 4,
    question: "Do I need prior experience to enroll?",
    answer: "It depends on the certification level. Our foundational programs are designed for beginners with no prior experience required. Intermediate and advanced certifications may have prerequisites, which are clearly listed on each course page. We offer free assessment tests to help you choose the right starting point."
  },
  {
    id: 5,
    question: "Is my certificate valid permanently or does it expire?",
    answer: "Your certification remains valid for 3 years from the date of issuance. We offer renewal options through continuing education credits or a simplified recertification exam. Staying current ensures your skills remain relevant in the rapidly evolving industry landscape."
  }
,
  {
    id: 6,
    question: "Is my certificate valid permanently or does it expire?",
    answer: "Your certification remains valid for 3 years from the date of issuance. We offer renewal options through continuing education credits or a simplified recertification exam. Staying current ensures your skills remain relevant in the rapidly evolving industry landscape."
  }
];

export default function CertificationFAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleQuestion = (id:any) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex  mx-auto px-4 sm:px-6 lg:px-8 pt-16 ">
        
        {/* Header Section */}
        <div className="text-center flex-1">
          <h1 className="text-4xl text-start md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Frequently Asked 
            <br></br>
            Questions
           
            
          </h1>
          <p className="text-xl text-blue-900 text-start max-w-2xl ">
            Everything you need to know about our  programs
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3 flex-2 ">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div key={faq.id}>
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className={`w-full px-8 py-4 cursor-pointer flex items-start justify-between gap-6 text-left transition-all duration-300 rounded-2xl ${
                    isOpen 
                      ? 'bg-blue-900 shadow-2xl' 
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <h3 className={`text-xl  font-bold transition-colors duration-300 flex-1 ${
                    isOpen ? 'text-white' : 'text-blue-900'
                  }`}>
                    {faq.question}
                  </h3>
                  
                  <div className="shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-white rotate-180' 
                        : 'bg-blue-900'
                    }`}>
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-blue-900" />
                      ) : (
                        <Plus className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 mt-2' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 py-6 bg-gray-50 rounded-2xl">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



      </div>
    </div>
  );
}