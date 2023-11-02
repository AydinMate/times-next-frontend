

import { ModeToggle } from '@/components/ui/mode-toggle';
import MultiplicationGame from './multiplication-game';

const MultiplicationGamePage = () => {

  




  return (
    <div className="flex justify-center items-center relative h-[100vh]">
      <div className='absolute right-2 top-2'>
        {/* <ModeToggle /> */}
      </div>
      <MultiplicationGame />
    </div>
  );
};

export default MultiplicationGamePage;
