import React, { useState, useMemo, useEffect } from 'react';
import { Calculator } from '../types';
import { QuestionMarkCircleIcon } from './IconComponents';

interface CalculatorViewProps {
  calculator: Calculator;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ calculator }) => {
  const initialValues = useMemo(() => {
    return calculator.variables.reduce((acc, v) => ({ ...acc, [v.key]: '' }), {});
  }, [calculator]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<number | string | null>(null);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  useEffect(() => {
    setIsHelpVisible(false);
  }, [calculator.id]);

  const handleInputChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setResult(null); // Reset result on input change
  };

  const calculate = () => {
    const numericValues: Record<string, number> = {};
    for (const key in values) {
      const num = parseFloat(values[key]);
      if (isNaN(num)) {
        const variableName = calculator.variables.find(v => v.key === key)?.name || key;
        setResult(`Erro: Entrada inválida para ${variableName}`);
        return;
      }
      numericValues[key] = num;
    }
    
    try {
      // Execute multi-line JS code. The user's formula MUST include a 'return' statement.
      const formulaFunction = new Function(...Object.keys(numericValues), calculator.formula);
      const calculationResult = formulaFunction(...Object.values(numericValues));
      
      if (typeof calculationResult === 'number') {
        if (!isFinite(calculationResult)) {
            setResult('Erro: O cálculo resultou em um número inválido.');
        } else {
            setResult(calculationResult);
        }
      } else if (typeof calculationResult === 'string') {
        setResult(calculationResult);
      } else {
        setResult('Erro: O resultado do cálculo não é um número ou texto válido.');
      }
    } catch (error) {
      console.error(error);
      setResult(`Erro na fórmula: ${error instanceof Error ? error.message : 'Erro desconhecido.'}`);
    }
  };

  const handleCalculateClick = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };
  
  const formattedResult = useMemo(() => {
    if (typeof result === 'number') {
        if (result < 0.01 && result > 0) return result.toExponential(4);
        return parseFloat(result.toFixed(4)).toString();
    }
    return result;
  }, [result]);

  const isValidStringResult = typeof result === 'string' && !result.toLowerCase().startsWith('erro:');

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">{calculator.name}</h1>
          {calculator.helpText && (
            <button
              onClick={() => setIsHelpVisible(!isHelpVisible)}
              className="p-1 text-gray-400 hover:text-teal-600 rounded-full transition-colors"
              aria-label="Mostrar ajuda"
            >
              <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <p className="mt-2 text-gray-600">{calculator.description}</p>
      </header>

      {isHelpVisible && calculator.helpText && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-800 transition-all duration-300">
            <p dangerouslySetInnerHTML={{ __html: calculator.helpText.replace(/\n/g, '<br />') }}></p>
        </div>
      )}

      <form onSubmit={handleCalculateClick}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {calculator.variables.map(variable => (
            <div key={variable.key}>
              <label htmlFor={variable.key} className="block text-sm font-medium text-gray-700">
                {variable.name}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  step="any"
                  name={variable.key}
                  id={variable.key}
                  value={values[variable.key]}
                  onChange={e => handleInputChange(variable.key, e.target.value)}
                  className="block w-full pr-12 pl-4 py-3 border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{variable.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
            >
              Calcular
            </button>
            {result !== null && (
                 <div className="w-full p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
                    {typeof result === 'number' ? (
                        <>
                            <p className="text-sm font-medium text-teal-800">Resultado</p>
                            <p className="text-2xl font-bold text-teal-900">
                                {formattedResult} <span className="text-lg font-normal">{calculator.resultUnit}</span>
                            </p>
                        </>
                    ) : isValidStringResult ? (
                         <>
                            <p className="text-sm font-medium text-teal-800">Resultado</p>
                            <p className="text-xl font-bold text-teal-900">
                                {result}
                            </p>
                         </>
                    ) : (
                        <p className="text-red-600 font-medium">{result}</p>
                    )}
                 </div>
            )}
        </div>
      </form>
    </div>
  );
};