import { useState } from "react";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! Choose a question below 👇", sender: "bot" }
    ]);

    const adminContact = "❗ Contact Admin: 9876543210";

    // FAQs
    const faqs = [
        {
            q: "What is the submission deadline?",
            a: "Deadline is 10 Sept."
        },
        {
            q: "When will match be announced?",
            a: "Allotment will be on 15 Sept."
        },
        {
            q: "Can I edit my preferences?",
            a: "Yes, before the deadline."
        },
        {
            q: "How does matching work?",
            a: "AI calculates compatibility based on preferences."
        }
    ];

    const handleFAQClick = (faq) => {
        setMessages((prev) => [
            ...prev,
            { text: faq.q, sender: "user" },
            { text: faq.a, sender: "bot" }
        ]);
    };

    const handleOtherQuery = () => {
        setMessages((prev) => [
            ...prev,
            { text: "Other Query", sender: "user" },
            { text: adminContact, sender: "bot" }
        ]);
    };

    return (
        <>
            {/* Floating Button */}
            <div
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white 
                   w-14 h-14 flex items-center justify-center rounded-full 
                   shadow-lg cursor-pointer hover:scale-110 transition"
            >
                💬
            </div>

            {/* Chat Window */}
            {open && (
                <div className="fixed top-20 bottom-6 right-6 w-80 bg-white border border-blue-200 
           rounded-xl shadow-lg z-50 flex flex-col">

                    {/* Header */}
                    <div className="p-3 bg-blue-500 text-white rounded-t-xl flex justify-between items-center">
                        <span>Homigo Assistant</span>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-white text-lg hover:scale-110 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="p-3 flex-1 overflow-y-auto space-y-2 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[75%]
                  ${msg.sender === "user"
                                        ? "bg-blue-500 text-white ml-auto"
                                        : "bg-gray-100 text-black"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* FAQ Buttons */}
                    <div className="p-3 border-t space-y-2">

                        {faqs.map((faq, i) => (
                            <button
                                key={i}
                                onClick={() => handleFAQClick(faq)}
                                className="w-full text-left px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm"
                            >
                                {faq.q}
                            </button>
                        ))}

                        {/* Other Query */}
                        <button
                            onClick={handleOtherQuery}
                            className="w-full text-left px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-sm"
                        >
                            Other Query
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}