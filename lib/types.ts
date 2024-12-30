export interface TestCase {
  input: any[];
  expected: any;
  description: string;
}

export interface ProblemTests {
  id: number;
  testCases: TestCase[];
  validator: (result: any, expected: any) => boolean;
}