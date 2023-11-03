import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link href={"/multiplication-game"}>
        <Button>Multiplication</Button>
      </Link>
      <Link href={"/division-game"}>
        <Button>Division</Button>
      </Link>
    </div>
  );
};

export default HomePage;
