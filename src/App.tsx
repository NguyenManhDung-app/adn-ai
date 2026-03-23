import React, { useState, useRef } from 'react';
import { DesignFormData, DesignSuggestion, FengShuiResult } from './types';
import { generateArchitecturalDesigns, analyzeFengShui, editDesign } from './services/gemini';

import Header from './components/Header';
import Hero from './components/Hero';
import FormSection from './components/FormSection';
import InfoCard from './components/InfoCard';
import LoadingOverlay from './components/LoadingOverlay';
import FengShuiResultView from './components/FengShuiResultView';
import DesignResultView from './components/DesignResultView';
import Footer from './components/Footer';

const initialFormData: DesignFormData = {
  image: null,
  birthDate: '',
  houseType: '',
  width: '',
  length: '',
  floors: '',
  style: '',
  budget: ''
};

export default function App() {
  const [formData, setFormData] = useState<DesignFormData>(initialFormData);
  const [suggestions, setSuggestions] = useState<DesignSuggestion[]>([]);
  const [fengShuiResult, setFengShuiResult] = useState<FengShuiResult | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setFormData(initialFormData);
    setSuggestions([]);
    setFengShuiResult(null);
    setSelectedDesign(null);
    setEditPrompt('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Vui lòng tải lên ảnh khu đất hoặc hiện trạng.');
      return;
    }
    if (!formData.birthDate) {
      alert('Vui lòng nhập ngày sinh gia chủ để phân tích phong thủy.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Đang phân tích khu đất, phương án kiến trúc và định hướng phong thủy...');

    try {
      const [designs, fengShui] = await Promise.all([
        generateArchitecturalDesigns(formData),
        analyzeFengShui(formData)
      ]);

      setSuggestions(designs);
      setFengShuiResult(fengShui);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Lỗi khi tạo phương án:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDesign = async () => {
    if (!selectedDesign || !editPrompt.trim()) return;
    
    setIsEditing(true);
    try {
      const updatedDesign = await editDesign(selectedDesign, editPrompt);
      setSuggestions(prev => prev.map(s => s.id === selectedDesign ? updatedDesign : s));
      setEditPrompt('');
    } catch (error) {
      console.error('Lỗi khi tinh chỉnh:', error);
      alert('Có lỗi xảy ra khi cập nhật phương án.');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-primary relative overflow-x-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {isLoading && <LoadingOverlay message={loadingMessage} />}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onReset={handleReset} />

        <main className="flex-grow">
          <Hero />

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <FormSection 
                  formData={formData} 
                  setFormData={setFormData} 
                  onSubmit={handleGenerate} 
                  isLoading={isLoading} 
                />
              </div>
              <div className="lg:col-span-4">
                <InfoCard />
              </div>
            </div>
          </section>

          {(fengShuiResult || suggestions.length > 0) && (
            <section ref={resultsRef} className="bg-surfaceAlt/20 border-t border-primary/20 neon-box py-32 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent neon-box"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {fengShuiResult && <FengShuiResultView result={fengShuiResult} />}
                
                {suggestions.length > 0 && (
                  <DesignResultView 
                    suggestions={suggestions}
                    selectedDesign={selectedDesign}
                    onSelectDesign={setSelectedDesign}
                    isEditing={isEditing}
                    editPrompt={editPrompt}
                    setEditPrompt={setEditPrompt}
                    onEditDesign={handleEditDesign}
                  />
                )}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
