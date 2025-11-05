import React, { useState } from 'react';
import { Calculator, Variable } from '../types';
import { PlusIcon, TrashIcon, XIcon } from './IconComponents';

interface AddCalculatorModalProps {
  onClose: () => void;
  onAddCalculator: (calculator: Omit<Calculator, 'id' | 'type'>) => void;
  existingGroups: string[];
}

export const AddCalculatorModal: React.FC<AddCalculatorModalProps> = ({ onClose, onAddCalculator, existingGroups }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [variables, setVariables] = useState<Variable[]>([{ name: '', key: '', unit: '' }]);
  const [formula, setFormula] = useState('');
  const [resultUnit, setResultUnit] = useState('');
  const [group, setGroup] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [helpText, setHelpText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVariableChange = (index: number, field: keyof Variable, value: string) => {
    const newVariables = [...variables];
    let newKey = newVariables[index].key;

    if (field === 'name') {
        let baseKey = value.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        newKey = baseKey;
        let counter = 2;
        while(newVariables.some((v, i) => i !== index && v.key === newKey)) {
          newKey = `${baseKey}_${counter}`;
          counter++;
        }
    }
    
    newVariables[index] = { ...newVariables[index], [field]: value, key: newKey };
    setVariables(newVariables);
  };

  const addVariable = () => {
    setVariables([...variables, { name: '', key: '', unit: '' }]);
  };

  const removeVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalGroup = group === 'new' ? newGroup.trim() : group;

    if (!name || !formula || !finalGroup || variables.some(v => !v.name || !v.key || !v.unit)) {
        setError("Por favor, preencha todos os campos obrigatórios (Nome, Grupo, Variáveis e Fórmula).");
        return;
    }

    // Formula validation for multi-line JS code
    try {
      const dummyValues = variables.map(() => 1);
      const formulaFunction = new Function(...variables.map(v => v.key), formula);
      formulaFunction(...dummyValues);
    } catch (err) {
      setError(`Fórmula inválida. Verifique a sintaxe. Erro: ${err instanceof Error ? err.message : 'desconhecido'}`);
      return;
    }

    onAddCalculator({ name, description, variables, formula, resultUnit, group: finalGroup, helpText });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Criar Nova Calculadora</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </header>
        <form id="add-calculator-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="calc-name" className="block text-sm font-medium text-gray-700">Nome da Calculadora</label>
              <input type="text" id="calc-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required />
            </div>
            <div>
              <label htmlFor="calc-result-unit" className="block text-sm font-medium text-gray-700">Unidade do Resultado (Opcional)</label>
              <input type="text" id="calc-result-unit" value={resultUnit} onChange={e => setResultUnit(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="ex: ml" />
            </div>
          </div>
          <div>
            <label htmlFor="calc-desc" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea id="calc-desc" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
           <div>
            <label htmlFor="calc-group" className="block text-sm font-medium text-gray-700">Grupo</label>
            <div className="mt-1 flex gap-2">
                <select id="calc-group" value={group} onChange={e => setGroup(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required>
                    <option value="">Selecione um grupo...</option>
                    {existingGroups.map(g => <option key={g} value={g}>{g}</option>)}
                    <option value="new">-- Criar Novo Grupo --</option>
                </select>
                {group === 'new' && (
                    <input type="text" value={newGroup} onChange={e => setNewGroup(e.target.value)} placeholder="Nome do Novo Grupo" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required />
                )}
            </div>
           </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Variáveis</h3>
            <div className="space-y-4">
              {variables.map((variable, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50">
                  <input type="text" placeholder="Nome da Variável (ex: Peso)" value={variable.name} onChange={e => handleVariableChange(index, 'name', e.target.value)} className="border-gray-300 rounded-md shadow-sm" required />
                  <input type="text" placeholder="Unidade (ex: kg)" value={variable.unit} onChange={e => handleVariableChange(index, 'unit', e.target.value)} className="border-gray-300 rounded-md shadow-sm" required />
                  <div className="flex items-center">
                    <input type="text" readOnly value={variable.key} placeholder="chave_auto" className="flex-1 border-gray-300 rounded-l-md bg-gray-200 text-gray-500 text-sm" />
                    <button type="button" onClick={() => removeVariable(index)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-r-md">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addVariable} className="mt-4 flex items-center text-sm font-medium text-teal-600 hover:text-teal-800">
              <PlusIcon className="w-5 h-5 mr-1" /> Adicionar Variável
            </button>
          </div>

          <div>
            <label htmlFor="calc-formula" className="block text-sm font-medium text-gray-700">Fórmula (JavaScript)</label>
            <textarea id="calc-formula" value={formula} onChange={e => setFormula(e.target.value)} rows={4} className="mt-1 font-mono text-sm block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="const dose_total = peso * dose;\nconst volume = dose_total / concentracao;\nreturn volume;" required />
             <div className="mt-2 text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
                <p className="font-semibold text-gray-700 mb-2">Como criar fórmulas avançadas:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Use as <span className="font-semibold">chaves das variáveis</span> (ex: `peso`, `dose`) em seus cálculos.</li>
                    <li>Sua fórmula pode ter <span className="font-semibold">múltiplas linhas</span>.</li>
                    <li>Use `const` para declarar variáveis intermediárias (ex: `const dose_total = ...`).</li>
                    <li>Use `if/else` para lógicas condicionais.</li>
                    <li>Sua fórmula <span className="font-bold text-red-600">DEVE</span> terminar com uma linha `return` para fornecer o resultado. Ex: `return resultado_final;`</li>
                    <li>Para retornar texto, use aspas: `return 'Dex: ' + dex_vol.toFixed(2) + 'ml';`</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t">
                    <span className="font-semibold">Variáveis disponíveis:</span>
                    {variables.filter(v => v.key).map(v => <code key={v.key} className="px-2 py-1 bg-gray-200 text-gray-800 rounded">{v.key}</code>)}
                </div>
             </div>
          </div>
          
          <div>
            <label htmlFor="calc-help" className="block text-sm font-medium text-gray-700">Texto de Ajuda / Tutorial (Opcional)</label>
            <textarea id="calc-help" value={helpText} onChange={e => setHelpText(e.target.value)} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Explique a finalidade, a fórmula e as variáveis da sua calculadora."></textarea>
          </div>

        </form>
        <footer className="p-4 bg-gray-50 border-t">
            {error && <p className="text-sm text-red-600 text-center mb-2">{error}</p>}
            <div className="flex justify-end">
                <button type="button" onClick={onClose} className="px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
                <button type="submit" form="add-calculator-form" className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700">Salvar Calculadora</button>
            </div>
        </footer>
      </div>
    </div>
  );
};