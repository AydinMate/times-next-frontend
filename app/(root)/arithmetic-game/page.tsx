'use client';

import { Switch } from '@/components/ui/switch';
import MultiplicationGame from './arithmetic-game';
import { useState } from 'react';

const MultiplicationGamePage = () => {
  const [isMultiplication, setIsMultiplication] = useState(true);
  const [isDivision, setIsDivision] = useState(false);
  const [isAllowNegatives, setIsAllowNegatives] = useState(false);

  return (
    <div className="flex justify-center items-center relative h-[100vh]">
      <div className="absolute right-4 top-4 space-y-4 text-right">
        <div className="flex space-x-4 justify-end">
          <p>Multiplications</p>
          <Switch
            checked={isMultiplication}
            onCheckedChange={(e) => setIsMultiplication(e)}
            disabled={isDivision === false}
          />
        </div>
        <div className="flex space-x-4 justify-end">
          <p>Divisions</p>
          <Switch
            checked={isDivision}
            onCheckedChange={(e) => setIsDivision(e)}
            disabled={isMultiplication === false}
          />
        </div>
        <div className="flex space-x-4 justify-end">
          <p>Negatives</p>
          <Switch
            checked={isAllowNegatives}
            onCheckedChange={(e) => setIsAllowNegatives(e)}
          />
        </div>
      </div>
      <MultiplicationGame
        settings={{
          multiplication: isMultiplication,
          division: isDivision,
          allowNegatives: isAllowNegatives,
        }}
      />
    </div>
  );
};

export default MultiplicationGamePage;
