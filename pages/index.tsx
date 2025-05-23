import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Workshop = {
  id: string;
  namn: string;
  status: 'ny' | 'aktiv';
  moduler: string[];
};

const workshopData: Workshop[] = [
  {
    id: 've1234',
    namn: 'Däckteam Karlstad',
    status: 'aktiv',
    moduler: ['fortnox', 'vecheck']
  },
  {
    id: 'ny001',
    namn: 'Nystart AB',
    status: 'ny',
    moduler: []
  }
];

const quickReplies = [
  'Hur kopplar jag Fortnox?',
  'Var hittar jag mina lagersaldon?',
  'Hur fungerar Vecheck?'
];

export default function OnboardingSupportChat() {
  const router = useRouter();
  const { site_id } = router.query;
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (site_id && typeof site_id === 'string') {
      const found = workshopData.find(w => w.id.toLowerCase() === site_id.toLowerCase());
      if (found) {
        setWorkshop(found);
        const greeting = found.status === 'ny'
          ? `Hej ${found.namn}! Jag hjälper dig gärna att komma igång med Eontyre.`
          : `Hej ${found.namn}! Vad kan jag hjälpa dig med idag?`;
        setMessages([{ sender: 'ai', text: greeting }]);
      } else {
        setMessages([{ sender: 'ai', text: 'Jag kunde tyvärr inte hitta din verkstad. Kontrollera länken.' }]);
      }
    }
  }, [site_id]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const updated = [...messages, { sender: 'user', text }];
    const aiReply = workshop?.status === 'ny'
      ? 'Tack! Jag markerar detta som ett onboardingsteg.'
      : 'Jag förstår, här är information om det du frågade.';
    setMessages([...updated, { sender: 'ai', text: aiReply }]);
    setInput('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Eontyre Chatbot</h1>

      {workshop && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Inloggad som: <strong>{workshop.namn}</strong> ({workshop.status})</p>
        </div>
      )}

      <div className="mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`text-${msg.sender === 'ai' ? 'blue' : 'gray'}-700`}>
            <strong>{msg.sender === 'ai' ? 'AI' : 'Du'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {quickReplies.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Skriv ett meddelande..."
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Skicka
        </button>
      </div>
    </div>
  );
}