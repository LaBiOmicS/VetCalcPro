
import React, { useState, useMemo, useRef } from 'react';
import { Calculator } from '../types';
import { PlusIcon, TrashIcon, ChevronDownIcon, ArrowUpTrayIcon, ArrowDownTrayIcon, InformationCircleIcon, CalculatorIcon } from './IconComponents';

interface SidebarProps {
  calculators: Calculator[];
  selectedCalculatorId: string | null;
  onSelectCalculator: (id: string | null) => void;
  onOpenModal: () => void;
  onOpenHelpModal: () => void;
  onDeleteCalculator: (id: string) => void;
  onExport: () => void;
  onImport: (fileContent: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  calculators,
  selectedCalculatorId,
  onSelectCalculator,
  onOpenModal,
  onOpenHelpModal,
  onDeleteCalculator,
  onExport,
  onImport,
}) => {
  const sortByName = (a: Calculator, b: Calculator) => a.name.localeCompare(b.name, 'pt-BR');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { groupedCalculators, customCalculators } = useMemo(() => {
    const builtIn = calculators.filter(c => c.type === 'builtin');
    const custom = calculators.filter(c => c.type === 'custom').sort(sortByName);

    const grouped = builtIn.reduce((acc, calc) => {
      const group = calc.group || 'Outras';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(calc);
      return acc;
    }, {} as Record<string, Calculator[]>);

    Object.keys(grouped).forEach(group => {
      grouped[group].sort(sortByName);
    });

    return { groupedCalculators: grouped, customCalculators: custom };
  }, [calculators]);

  const sortedGroupNames = useMemo(() => Object.keys(groupedCalculators).sort((a,b) => a.localeCompare(b, 'pt-BR')), [groupedCalculators]);
  
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(prev => (prev === groupName ? null : groupName));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza de que deseja excluir esta calculadora?')) {
      onDeleteCalculator(id);
    }
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                onImport(text);
            } else {
                alert("Não foi possível ler o arquivo.");
            }
        };
        reader.onerror = () => {
             alert("Erro ao ler o arquivo.");
        }
        reader.readAsText(file);
    }
    // Limpa o valor para permitir reimportar o mesmo arquivo
    if(event.target) {
        event.target.value = '';
    }
  };

  const CalculatorListItem: React.FC<{ calculator: Calculator }> = ({ calculator }) => (
    <li
      key={calculator.id}
      onClick={() => onSelectCalculator(calculator.id)}
      className={`group flex justify-between items-center pl-5 pr-3 py-2 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        selectedCalculatorId === calculator.id
          ? 'bg-teal-600 text-white shadow-sm'
          : 'text-gray-700 hover:bg-teal-100'
      }`}
    >
      <span className="font-medium text-sm whitespace-nowrap">{calculator.name}</span>
      {calculator.type === 'custom' && (
        <button
          onClick={(e) => handleDelete(e, calculator.id)}
          className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${selectedCalculatorId === calculator.id ? 'hover:bg-teal-500' : 'hover:bg-red-200 text-red-600'}`}
          aria-label="Delete calculator"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      )}
    </li>
  );

  const AccordionGroup: React.FC<{ title: string; calculators: Calculator[] }> = ({ title, calculators }) => {
    const isExpanded = expandedGroup === title;
    return (
      <div className="py-1">
        <button
          onClick={() => toggleGroup(title)}
          className="w-full flex justify-between items-center text-left p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</h2>
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <ul className="mt-1">
            {calculators.map(calc => <CalculatorListItem key={calc.id} calculator={calc} />)}
          </ul>
        )}
      </div>
    );
  };

  return (
    <aside className="w-72 md:w-96 bg-white border-r border-gray-200 flex flex-col p-4 shadow-lg">
      <div className="flex items-center justify-between mb-6 pl-2">
        <div 
            className="flex items-center cursor-pointer"
            onClick={() => onSelectCalculator(null)}
        >
            <CalculatorIcon className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">VetCalc Pro</h1>
        </div>
         <button 
            onClick={onOpenHelpModal} 
            className="p-2 text-gray-400 hover:text-teal-600 rounded-full transition-colors"
            aria-label="Ajuda"
            title="Ajuda Geral"
        >
            <InformationCircleIcon className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto pr-2 -mr-2">
        {sortedGroupNames.map(groupName => (
          <AccordionGroup key={groupName} title={groupName} calculators={groupedCalculators[groupName]} />
        ))}
        {customCalculators.length > 0 && (
          <AccordionGroup title="Minhas Calculadoras" calculators={customCalculators} />
        )}
      </nav>
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <div className="flex space-x-2">
            <input type="file" accept=".json" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
            <button
              onClick={handleImportClick}
              className="w-full flex items-center justify-center py-2 px-3 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors text-sm"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Importar
            </button>
            <button
              onClick={onExport}
              className="w-full flex items-center justify-center py-2 px-3 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
              disabled={customCalculators.length === 0}
              title={customCalculators.length === 0 ? "Crie uma calculadora para poder exportar" : "Exportar minhas calculadoras"}
            >
              <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
              Exportar
            </button>
        </div>
        <button
          onClick={onOpenModal}
          className="w-full flex items-center justify-center py-3 px-4 bg-teal-50 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nova Calculadora
        </button>
      </div>
    </aside>
  );
};