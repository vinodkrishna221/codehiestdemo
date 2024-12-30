export interface CodeRunResult {
  success: boolean;
  output?: any;
  error?: string;
  executionTime?: number;
}

export async function runCode(code: string, input: any[]): Promise<CodeRunResult> {
  try {
    // Create a safe evaluation context
    const wrappedCode = `
      ${code}
      return solution(...arguments);
    `;
    
    const fn = new Function(wrappedCode);
    
    const start = performance.now();
    const result = fn.apply(null, input);
    const executionTime = performance.now() - start;

    return {
      success: true,
      output: result,
      executionTime
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Execution failed'
    };
  }
}