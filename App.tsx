
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { CalculatorView } from './components/CalculatorView';
import { AddCalculatorModal } from './components/AddCalculatorModal';
import { HelpModal } from './components/HelpModal';
import { usePersistentStorage } from './hooks/usePersistentStorage';
import { Calculator, isCalculatorArray } from './types';
import { BUILT_IN_CALCULATORS } from './constants';
import { CalculatorIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [customCalculators, setCustomCalculators] = usePersistentStorage([]);
  const [selectedCalculatorId, setSelectedCalculatorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const allCalculators = useMemo(() => [...BUILT_IN_CALCULATORS, ...customCalculators], [customCalculators]);
  const builtInGroups = useMemo(() => [...new Set(BUILT_IN_CALCULATORS.map(c => c.group))].sort((a,b) => a.localeCompare(b, 'pt-BR')), []);

  const selectedCalculator = useMemo(() => {
    return allCalculators.find(c => c.id === selectedCalculatorId) || null;
  }, [allCalculators, selectedCalculatorId]);

  const handleAddCalculator = (newCalculator: Omit<Calculator, 'id' | 'type'>) => {
    const calculatorToAdd: Calculator = {
      ...newCalculator,
      id: `custom-${Date.now()}`,
      type: 'custom',
    };
    setCustomCalculators([...customCalculators, calculatorToAdd]);
    setIsModalOpen(false);
    setSelectedCalculatorId(calculatorToAdd.id);
  };

  const handleDeleteCalculator = (id: string) => {
    setCustomCalculators(customCalculators.filter(c => c.id !== id));
    if (selectedCalculatorId === id) {
      setSelectedCalculatorId(null);
    }
  };

  const handleExport = () => {
    if (customCalculators.length === 0) {
      alert("Você não tem calculadoras personalizadas para exportar.");
      return;
    }
    const dataStr = JSON.stringify(customCalculators, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `vetcalc_pro_calculadoras_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (fileContent: string) => {
    try {
      const importedData = JSON.parse(fileContent);
      
      if (!isCalculatorArray(importedData)) {
        throw new Error("O arquivo não contém um array de calculadoras válido.");
      }
      
      const existingIds = new Set(customCalculators.map(c => c.id));
      const newCalculators = importedData.filter(calc => !existingIds.has(calc.id) && calc.type === 'custom');

      if (newCalculators.length === 0) {
        alert("Nenhuma calculadora nova para importar. As calculadoras do arquivo já existem ou não são do tipo 'custom'.");
        return;
      }

      setCustomCalculators(prev => [...prev, ...newCalculators]);
      alert(`${newCalculators.length} calculadora(s) importada(s) com sucesso!`);

    } catch (error) {
      alert(`Erro ao importar o arquivo: ${error instanceof Error ? error.message : 'Formato inválido.'}`);
      console.error("Import error:", error);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
        calculators={allCalculators}
        selectedCalculatorId={selectedCalculatorId}
        onSelectCalculator={setSelectedCalculatorId}
        onOpenModal={() => setIsModalOpen(true)}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        onDeleteCalculator={handleDeleteCalculator}
        onExport={handleExport}
        onImport={handleImport}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {selectedCalculator ? (
          <CalculatorView calculator={selectedCalculator} key={selectedCalculator.id} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-4">
            <CalculatorIcon className="h-16 w-16 text-teal-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo ao VetCalc Pro</h2>
            <div className="max-w-3xl text-lg text-gray-600 space-y-5 mb-8">
              <p>
                O <strong>VetCalc Pro</strong> é uma ferramenta de apoio desenvolvida para auxiliar médicos veterinários, estudantes e profissionais da área em seus cálculos diários. Nosso objetivo é fornecer uma plataforma rápida, precisa e confiável para as fórmulas mais comuns na rotina clínica, abrangendo áreas como farmacologia, fluidoterapia, nutrição e emergência.
              </p>
              <p>
                Navegue pelas categorias na barra lateral para encontrar as calculadoras ou crie suas próprias fórmulas personalizadas para atender às suas necessidades.
              </p>
               <p className="text-sm text-amber-800 bg-amber-100 p-3 rounded-lg border border-amber-200">
                <strong>Atenção:</strong> Esta ferramenta destina-se a ser um auxílio e não substitui o julgamento clínico profissional. Verifique sempre os resultados e adapte-os à condição individual de cada paciente.
              </p>
            </div>
            <div className="max-w-xl text-sm text-gray-400 border-t border-gray-200 pt-6 mt-6 w-full">
              <p className="font-semibold text-gray-500 mb-2">Desenvolvido por:</p>
              <p>Laboratório de Bioinformática e Ciências Ômicas (LaBiOmicS)</p>
              <p>Universidade de Mogi das Cruzes (UMC)</p>
              <p className="font-semibold text-gray-500 mt-4 mb-2">Sob a supervisão de:</p>
              <p>Prof. Dr. Fabiano B. Menegidio</p>
              <p>Prof. Me. Paulo Sallarola Takao</p>
            </div>
          </div>
        )}
      </main>
      {isModalOpen && (
        <AddCalculatorModal
          onClose={() => setIsModalOpen(false)}
          onAddCalculator={handleAddCalculator}
          existingGroups={builtInGroups}
        />
      )}
      {isHelpModalOpen && (
        <HelpModal onClose={() => setIsHelpModalOpen(false)} />
      )}
    </div>
  );
};

export default App;