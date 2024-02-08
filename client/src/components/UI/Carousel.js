import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import slide1 from '../../images/carousel-1.jpg';
import slide2 from '../../images/carousel-2.jpg';
import slide3 from '../../images/carousel-3.jpg';
import slide4 from '../../images/carousel-4.jpg';
import slide5 from '../../images/carousel-5.jpg';
import slide6 from '../../images/carousel-6.jpg';
import slide7 from '../../images/carousel-7.jpg';
import slide8 from '../../images/carousel-8.jpg';

function Carousels() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="carousel-container"
    >
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide1} alt="slide 1" />
        </div>
        <Carousel.Caption>
          <h3>Guardians of Wealth</h3>
          <p>
            Freight Vault Home's security vault, where assets are safeguarded
            with state-of-the-art protection.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide2} alt="slide 2" />
        </div>
        <Carousel.Caption>
          <h3>Fortified Fortress</h3>
          <p>
            Behold the impenetrable security vault at Freight Vault Home, where
            safety meets sophistication.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide3} alt="slide 3" />
        </div>
        <Carousel.Caption>
          <h3>Beyond Lock and Key</h3>
          <p>
            Our security vault sets the standard for protecting what matters
            most at Freight Vault Home.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide4} alt="slide 4" />
        </div>
        <Carousel.Caption>
          <h3>Vaulted Excellence</h3>
          <p>
            Experience peace of mind knowing your valuables are secured within
            the impenetrable walls of Freight Vault Home.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide5} alt="slide 5" />
        </div>
        <Carousel.Caption>
          <h3>Safeguarding Tomorrow</h3>
          <p>
            Freight Vault Home's security vault - where trust and security
            converge.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide6} alt="slide 6" />
        </div>
        <Carousel.Caption>
          <h3>Unyielding ProtectionUnyielding Protection</h3>
          <p>
            Explore the epitome of security in the heart of Freight Vault Home's
            impenetrable vault.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide7} alt="slide 7" />
        </div>
        <Carousel.Caption>
          <h3>Fort Knox of Finances:</h3>
          <p>
            Freight Vault Home's security vault, where your assets find an
            unmatched level of protection.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div text="First slide" className="slide-container">
          <img src={slide8} alt="slide 8" />
        </div>
        <Carousel.Caption>
          <h3>Securing Legacies</h3>
          <p>
            Freight Vault Home's security vault, preserving the essence of trust
            and reliability.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
