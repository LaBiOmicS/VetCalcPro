import React from 'react';
import { XIcon } from './IconComponents';
import { BUILT_IN_CALCULATORS } from '../constants';

interface HelpModalProps {
  onClose: () => void;
}

const calculatorGroups = [...new Set(BUILT_IN_CALCULATORS.map(c => c.group))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Central de Ajuda - VetCalc Pro</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-700">
          <section>
            <h3 className="text-2xl font-bold text-teal-700 mb-3">O que é o VetCalc Pro?</h3>
            <p>
              O VetCalc Pro é uma calculadora veterinária avançada projetada para ser uma ferramenta de apoio rápido e confiável para médicos veterinários e estudantes. Ele contém uma vasta biblioteca de cálculos pré-configurados e permite que você crie, salve e compartilhe suas próprias fórmulas personalizadas.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-teal-700 mb-3">Calculadoras Disponíveis</h3>
            <p className="mb-4">
              As calculadoras são organizadas em grupos para facilitar o acesso. Cada calculadora possui um ícone de ajuda (?) que fornece um tutorial detalhado sobre sua finalidade e uso.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 list-disc list-inside">
              {calculatorGroups.map(group => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-teal-700 mb-3">Funcionalidades Principais</h3>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Nova Calculadora</h4>
              <p>
                Esta é a função mais poderosa do VetCalc Pro. Ela permite que você crie suas próprias calculadoras com lógicas complexas.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-sm">
                <li><strong>Fórmulas Avançadas:</strong> Você pode escrever fórmulas com múltiplas linhas, usar variáveis (`const`), lógica condicional (`if/else`) e retornar textos formatados. O sistema usa JavaScript, o que oferece enorme flexibilidade.</li>
                <li><strong>Tutorial Personalizado:</strong> Adicione seu próprio texto de ajuda para documentar a finalidade e o uso da sua calculadora.</li>
                <li><strong>Grupos Personalizados:</strong> Organize suas criações em grupos existentes ou crie novos grupos para manter tudo organizado.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Importar Calculadoras</h4>
              <p>
                Você pode adicionar calculadoras que foram criadas e exportadas por colegas ou por você mesmo em outro dispositivo.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-sm">
                <li>Clique no botão <strong>"Importar"</strong> e selecione o arquivo `.json` desejado.</li>
                <li>O sistema irá adicionar apenas as calculadoras que ainda não existem na sua lista de "Minhas Calculadoras", evitando duplicatas.</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Exportar Calculadoras</h4>
              <p>
                Esta função permite que você salve todas as suas calculadoras personalizadas em um único arquivo `.json`.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-sm">
                <li>Use esta função para <strong>fazer backup</strong> de suas criações ou para <strong>compartilhar</strong> suas ferramentas com outros usuários do VetCalc Pro.</li>
                <li>O botão só fica ativo se você tiver pelo menos uma calculadora personalizada.</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h3 className="text-2xl font-bold text-teal-700 mb-3">Relate um Erro ou Sugestão</h3>
            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <p>
                A precisão é a nossa maior prioridade. Se você encontrar qualquer erro em uma calculadora ou tiver uma sugestão de melhoria, por favor, nos avise abrindo uma "issue" em nosso repositório do projeto no GitHub. Sua colaboração é fundamental para tornar esta ferramenta cada vez melhor.
                </p>
                <a 
                  href="https://github.com/LaBiOmicS/VetCalcPro/issues"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-3 inline-block bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Relatar um Problema no GitHub
                </a>
            </div>
          </section>

           <p className="text-center text-sm text-gray-500 pt-4 border-t">
              Lembre-se: O VetCalc Pro é uma ferramenta de auxílio e não substitui o julgamento clínico profissional.
            </p>

        </main>
        <footer className="p-4 bg-gray-50 border-t flex justify-end">
          <button type="button" onClick={onClose} className="px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700">
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};