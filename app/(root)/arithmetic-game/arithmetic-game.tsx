'use client';
import { Button } from '@/components/ui/button';
import { BasicArithmetic } from '@/lib/types';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

type Settings = {
  multiplication: boolean;
  division: boolean;
  allowNegatives: boolean;
};

interface ArithmeticGameProps {
  settings: Settings;
}
type isCorrect = boolean | null;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ArithmeticGame: React.FC<ArithmeticGameProps> = ({ settings }) => {
  const [url, setUrl] = useState('');
  const [isCorrect, setIsCorrect] = useState<isCorrect>(null);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<BasicArithmetic>({
    operation: '',
    firstNumber: 0,
    secondNumber: 0,
    answer: 0,
    options: [],
  });

  const getNewMultiplication = async (url: string) => {
    try {
      const res = await axios.get(`${backendUrl}/get-arithmetic-${url}`);
      await setQuestion(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let urlString = '';
    if (settings.multiplication === true) {
      urlString += 'm';
    }
    if (settings.division === true) {
      urlString += 'd';
    }
    if (settings.allowNegatives === false) {
      urlString += 'p';
    } else {
      urlString += 'n';
    }
    setUrl(urlString);
    getNewMultiplication(url);
  }, [settings, url]);

  const handleAnswerClicked = async (option: number, answer: number) => {
    const isCorrect: boolean = option === answer;
    setIsCorrect(isCorrect);
    getNewMultiplication(url);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCorrect(null);
    }, 250);
  }, [isCorrect]);

  return (
    <div
      className={cn(
        'w-full h-full',
        isCorrect !== null && (isCorrect ? 'bg-green-400' : 'bg-red-400')
      )}
    >
      <div className='mt-[2rem] sm:mt-0 flex flex-col items-center justify-center w-full h-full'>
        {loading === true ? (
          <MoonLoader color="#ffffff" size={130} />
        ) : (
          <>
            <h1 className={cn('text-7xl font-bold sm:text-8xl')}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${question.firstNumber} &nbsp; ${question.operation} &nbsp; ${question.secondNumber}`,
                }}
              />
            </h1>

            <div className="grid grid-cols-2 justify-between mt-[3rem] sm:flex">
              {question.options.map((option) => (
                <Button
                  variant={'ghost'}
                  key={option}
                  className="text-5xl font-bold py-[3rem] mx-[2rem] sm:text-6xl"
                  onClick={() => handleAnswerClicked(option, question.answer)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArithmeticGame;
