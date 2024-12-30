"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { problemTests } from "@/lib/problem-validator";
import { Check, X } from "lucide-react";

interface TestResult {
  passed: boolean;
  executionTime?: number;
  error?: string;
}

export function ProblemSolution({ problemId }: { problemId: number }) {
  const problem = problemTests[problemId];

  if (!problem) {
    return (
      <Card className="p-6 bg-black/20 border-white/10">
        <p className="text-red-400">Problem configuration not found</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black/20 border-white/10">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Test Cases</h3>
          <div className="space-y-4">
            {problem.testCases.map((testCase, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Test Case {index + 1}</h4>
                  <Badge variant="outline" className="border-white/10">
                    {testCase.description}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">Input:</span>
                    <code className="text-cyan-400 bg-black/30 px-2 py-1 rounded">
                      nums = {JSON.stringify(testCase.input[0])}, 
                      target = {testCase.input[1]}
                    </code>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">Expected:</span>
                    <code className="text-purple-400 bg-black/30 px-2 py-1 rounded">
                      {JSON.stringify(testCase.expected)}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Example Solution</h3>
          <div className="bg-black/30 p-4 rounded-lg">
            <pre className="text-sm text-gray-300"><code>{`function solution(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`}</code></pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Solution Explanation</h3>
          <div className="space-y-2 text-gray-300">
            <p>This solution uses a hash map to achieve O(n) time complexity:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Create an empty hash map to store numbers and their indices</li>
              <li>Iterate through the array once</li>
              <li>For each number, calculate its complement (target - current number)</li>
              <li>If the complement exists in the map, we found our pair</li>
              <li>Otherwise, add the current number and its index to the map</li>
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
}