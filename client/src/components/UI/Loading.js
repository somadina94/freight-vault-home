import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
  return (
    <Skeleton
      style={{
        maxWidth: '80rem',
        height: '60rem',
        display: 'block',
        margin: '4rem auto',
        backgroundColor: 'black',
      }}
      variant="rectangular"
    />
  );
};

export default Loading;
