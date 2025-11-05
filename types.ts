
export interface Variable {
  name: string;
  key: string;
  unit: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  variables: Variable[];
  formula: string;
  resultUnit: string;
  type: 'builtin' | 'custom';
  group: string;
  helpText?: string;
}

export function isCalculatorArray(obj: any): obj is Calculator[] {
    if (!Array.isArray(obj)) {
      return false;
    }
    return obj.every(item => 
      typeof item === 'object' &&
      item !== null &&
      'id' in item && typeof item.id === 'string' &&
      'name' in item && typeof item.name === 'string' &&
      'description' in item && typeof item.description === 'string' &&
      'variables' in item && Array.isArray(item.variables) &&
      'formula' in item && typeof item.formula === 'string' &&
      'resultUnit' in item && typeof item.resultUnit === 'string' &&
      'type' in item && (item.type === 'builtin' || item.type === 'custom') &&
      'group' in item && typeof item.group === 'string'
    );
  }
