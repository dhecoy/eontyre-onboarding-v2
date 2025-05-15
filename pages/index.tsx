import { useState } from 'react';

export default function OnboardingChat() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hej! Vill du börja med att välja din leverantör?' }
  ]);
  const [input, setInput] = useState('');
  const [checklist, setChecklist] = useState({
    kontaktinfo: false,
    leverantor: false,
    integration: false
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');

    let aiResponse = 'Tack! Jag markerar det steget som klart.';
    const updatedChecklist = { ...checklist };

    if (input.toLowerCase().includes('leverantör')) {
      updatedChecklist.leverantor = true;
      aiResponse = 'Toppen! Jag markerar Leverantörsval som klart.';
    } else if (input.toLowerCase().includes('kontakt')) {
      updatedChecklist.kontaktinfo = true;
      aiResponse = 'Kontaktuppgifterna är sparade.';
    } else if (input.toLowerCase().includes('fortnox')) {
      updatedChecklist.integration = true;
      aiResponse = 'Jag har markerat Fortnox-integrationen som klart.';
    }

    setChecklist(updatedChecklist);
    setMessages([...updatedMessages, { sender: 'ai', text: aiResponse }]);
  }; // ← denna måste avsluta funktionen korrekt!

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='w-full md:w-2/3 p-4 bg-gray-50 border-r'>
        <h1 className='text-xl font-bold mb-2'>🧠 Onboarding-assistent</h1>
        <div className='h-[400px] overflow-y-auto bg-white p-4 rounded shadow mb-4'>
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'ai' ? 'bg-blue-100 text-black' : 'bg-green-100 text-black'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className='flex gap-2'>
          <input
            type='text'
            className='flex-1 border p-2 rounded'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Skriv ett meddelande...'
          />
          <button
            onClick={handleSend}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Skicka
          </button>
        </div>
      </div>
      <div className='w-full md:w-1/3 p-4 bg-white'>
        <h2 className='text-lg font-semibold mb-4'>✅ Checklista</h2>
        <ul className='space-y-3'>
          <li className={checklist.kontaktinfo ? 'text-green-600' : 'text-gray-700'}>
            {checklist.kontaktinfo ? '✅' : '⬜'} Kontaktinformation
          </li>
          <li className={checklist.leverantor ? 'text-green-600' : 'text-gray-700'}>
            {checklist.leverantor ? '✅' : '⬜'} Leverantörsval
          </li>
          <li className={checklist.integration ? 'text-green-600' : 'text-gray-700'}>
            {checklist.integration ? '✅' : '⬜'} Integration
          </li>
        </ul>
      </div>
    </div>
  );
}



