
'use client';
import { Button } from '@/components/ui/button';
import { DivisionQuestion } from '@/lib/types';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

interface DivisionGameProps {}
type isCorrect = boolean | null;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const DivisionGame: React.FC<DivisionGameProps> = ({}) => {
  const [isCorrect, setIsCorrect] = useState<isCorrect>(null);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<DivisionQuestion>({
    dividend: 0,
    divisor: 0,
    quotient: 0,
    options: [],
  });

  const getNewDivision = async () => {
    try {
      const res = await axios.get(`${backendUrl}/get-random-division`);
      await setQuestion(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getNewDivision();
  }, []);

  const handleAnswerClicked = async (option: number, answer: number) => {
    const isCorrect: boolean = option === answer;
    setIsCorrect(isCorrect);
    getNewDivision();
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
            {question.dividend} &divide; {question.divisor}
          </h1>
          <div className="flex justify-between mt-[2rem] space-x-[2rem]">
            {question.options.map((option) => (
              <Button
                variant={'ghost'}
                key={option}
                className="text-6xl font-bold px-[2rem] py-[3rem]"
                onClick={() => handleAnswerClicked(option, question.quotient)}
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

export default DivisionGame;
