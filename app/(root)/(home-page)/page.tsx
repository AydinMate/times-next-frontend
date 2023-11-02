import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';

const HomePage = () => {
  const options = [120, 180, 90, 100];

  return (
    <div className="flex justify-center items-center relative h-[100vh]">
      <div className='absolute right-2 top-2'>
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-bold">10 x 12 =</h1>
        <div className="flex justify-between mt-[2rem] space-x-[2rem]">
          {options.map((option, index) => (
            <Button
              variant={'ghost'}
              key={index}
              className="text-6xl font-bold px-[2rem] py-[3rem]"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
