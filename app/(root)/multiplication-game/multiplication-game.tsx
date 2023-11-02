'use client';
import { Button } from '@/components/ui/button';
import { MultiplicationQuestion } from '@/lib/types';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

interface MultiplicationGameProps {}
type isCorrect = boolean | null;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const MultiplicationGame: React.FC<MultiplicationGameProps> = ({}) => {
  const [isCorrect, setIsCorrect] = useState<isCorrect>(null);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<MultiplicationQuestion>({
    firstNumber: 0,
    secondNumber: 0,
    answer: 0,
    options: [],
  });

  const getNewMultiplication = async () => {
    const res = await axios.get(`${backendUrl}/get-random-multiplication`);
    setQuestion(res.data);
  };
  useEffect(() => {
    getNewMultiplication();
    setLoading(false);
  }, []);

  const handleAnswerClicked = async (option: number, answer: number) => {
    const isCorrect: boolean = option === answer;
    setIsCorrect(isCorrect);
    getNewMultiplication();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCorrect(null);
    }, 250);
  }, [isCorrect]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center  w-full h-full',
        isCorrect !== null && (isCorrect ? 'bg-green-400' : 'bg-red-400')
      )}
    >
      {loading === true ? (
        <MoonLoader color="#ffffff" size={130} />
      ) : (
        <>
          <h1 className={cn('text-8xl font-bold')}>
            {question.firstNumber} x {question.secondNumber} =
          </h1>
          <div className="flex justify-between mt-[2rem] space-x-[2rem]">
            {question.options.map((option) => (
              <Button
                variant={'ghost'}
                key={option}
                className="text-6xl font-bold px-[2rem] py-[3rem]"
                onClick={() => handleAnswerClicked(option, question.answer)}
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiplicationGame;
