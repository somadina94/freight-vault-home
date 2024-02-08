import { Fragment } from 'react';

import WhyBuy from '../home/WhyBuy';
import Carousels from '../UI/Carousel';
import WhyChoose from '../home/WhyChoose';

const Homepage = () => {
  return (
    <Fragment>
      <Carousels />
      <WhyBuy />
      <WhyChoose />
    </Fragment>
  );
};

export default Homepage;
