import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function OnboardingLanguage({ 
  onContinue, 
  onBack 
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const languages = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Spanish', flag: '🇲🇽' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col p-6">
      <button onClick={onBack} className="mb-12 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
        <ArrowLeft className="text-[#8b6f47]" size={20} />
      </button>
      
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <h1 className="text-[#8b6f47] text-3xl mb-4">Choose your language</h1>
        <p className="text-[#8b6f47] mb-12 text-center">
          Select your preferred language to use VitaPlant more easily.
        </p>
        
        <div className="space-y-4 mb-auto">
          {languages.map((language) => (
            <button
              key={language.name}
              onClick={() => setSelectedLanguage(language.name)}
              className={`w-full px-6 py-6 rounded-3xl border-4 transition-all shadow-lg flex items-center gap-4 ${
                selectedLanguage === language.name
                  ? 'border-[#6b8e75] bg-[#d4e8d4]'
                  : 'border-[#6b8e75] bg-white'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-2xl flex-shrink-0">
                {language.flag}
              </div>
              <span className="text-[#5a7a66] text-xl">{language.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 justify-center mb-8">
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
          <div className="w-2 h-2 rounded-full bg-[#8b6f47]" />
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
        </div>
        
        <button
          onClick={() => onContinue(selectedLanguage)}
          className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center"
        >
          Next
        </button>
      </div>
    </div>
  );
}
