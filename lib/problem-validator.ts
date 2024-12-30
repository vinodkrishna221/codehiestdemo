export interface TestCase {
  input: any[];
  expected: any;
  description: string;
}

export interface ProblemTests {
  id: number;
  testCases: TestCase[];
  validator: (result: any, expected: any, input: any[]) => boolean;
}

export const problemTests: Record<number, ProblemTests> = {
  1: {
    id: 1,
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        description: "Standard case with solution at beginning"
      },
      {
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        description: "Solution in middle/end of array"
      },
      {
        input: [[3, 3], 6],
        expected: [0, 1],
        description: "Same number used twice"
      }
    ],
    validator: (result: number[] | null, expected: number[] | null, input: any[]): boolean => {
      // Handle null cases
      if (result === null && expected === null) return true;
      if (result === null || expected === null) return false;
      
      // Validate array length
      if (!Array.isArray(result) || result.length !== 2) return false;
      
      const [nums, target] = input;
      const [idx1, idx2] = result;
      
      // Verify indices are different
      if (idx1 === idx2) return false;
      
      // Verify indices are within bounds
      if (idx1 < 0 || idx2 < 0 || idx1 >= nums.length || idx2 >= nums.length) {
        return false;
      }
      
      // Verify sum equals target
      return nums[idx1] + nums[idx2] === target;
    }
  }
};