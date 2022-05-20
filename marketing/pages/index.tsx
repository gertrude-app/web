import type { NextPage } from 'next';
import Button from '@shared/Button';
import Foo from '../components/Foo';

const Home: NextPage = () => {
  return (
    <div>
      <Foo />
      Home foo bara <Button />
    </div>
  );
};

export default Home;
