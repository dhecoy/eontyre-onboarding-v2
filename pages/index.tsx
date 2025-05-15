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
