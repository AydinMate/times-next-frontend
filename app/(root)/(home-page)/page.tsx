import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link href={'/arithmetic-game'}>
        <Button>Arithmetic</Button>
      </Link>
    </div>
  );
};

export default HomePage;
