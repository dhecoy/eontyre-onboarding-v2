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
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Eontyre Onboarding</h1>

      <div className="space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'ai' ? 'text-blue-600' : 'text-gray-800'}>
            <strong>{msg.sender === 'ai' ? 'AI' : 'Du'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Skriv ett meddelande..."
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
        Skicka
      </button>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Checklista</h2>
        <ul className="list-disc list-inside">
          <li className={checklist.kontaktinfo ? 'line-through' : ''}>Kontaktuppgifter</li>
          <li className={checklist.leverantor ? 'line-through' : ''}>Val av leverantör</li>
          <li className={checklist.integration ? 'line-through' : ''}>Fortnox-integration</li>
        </ul>
      </div>
    </div>
  );
}
