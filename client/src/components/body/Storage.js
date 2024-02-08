import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import classes from './Storage.module.css';

const Storage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Storage</title>
        <meta
          name="description"
          content="Secure Gold, Silver and Platinum from Freight Vault Home"
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <section className={classes.container}>
        <h2>Secure Storage Options</h2>
        <div className={classes.storage}>
          <div className={classes.content}>
            <h3>Fortress Vaults</h3>
            <p>
              Our flagship secure storage option, the Fortress Vaults, are
              equipped with cutting-edge technology and fortified
              infrastructure. Your precious metals are housed in a
              state-of-the-art facility with advanced security systems,
              providing an impenetrable fortress for your investments.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Armored Caches</h3>
            <p>
              For those who seek a balance between accessibility and security,
              our Armored Caches offer a robust solution. These secure
              compartments are designed to provide optimal protection without
              compromising convenience, ensuring easy access to your assets when
              needed.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Customizable Storage Plans</h3>
            <p>
              At Freight Vault Home, we understand that one size does not fit
              all. Choose from our customizable storage plans based on your
              unique needs and preferences. Whether you require long-term
              storage or periodic access, our flexible plans cater to a variety
              of storage requirements.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Transparent Inventory Management</h3>
            <p>
              Our state-of-the-art inventory management system allows you to
              keep track of your precious metal holdings with ease. Access
              real-time information about your assets, transactions, and account
              status through our secure online portal, providing you with
              complete transparency and control over your portfolio.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Climate-Controlled Environments</h3>
            <p>
              To ensure the longevity of your precious metals, Freight Vault
              Home provides climate-controlled storage options. Our facilities
              maintain optimal temperature and humidity levels, safeguarding
              your assets from environmental factors that could compromise their
              integrity over time.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Insurance CoverageInsurance Coverage</h3>
            <p>
              Rest easy knowing that your investments are protected. Freight
              Vault Home offers comprehensive insurance coverage for stored
              precious metals, providing an additional layer of security and
              peace of mind.
            </p>
          </div>
          <div className={classes.content}>
            <h3>Effortless Retrieval</h3>
            <p>
              Need to access your stored assets? Our retrieval process is
              designed for simplicity and efficiency. Schedule an appointment,
              and our dedicated team will ensure a smooth and secure retrieval
              experience, allowing you to access your precious metals when it's
              most convenient for you.
            </p>
          </div>
          <div className={classes.content}>
            <h3>24/7 Security Monitoring</h3>
            <p>
              Freight Vault Home takes security seriously. Our storage
              facilities are equipped with 24/7 surveillance and monitoring
              systems, ensuring constant vigilance and rapid response to any
              potential security concerns.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Storage;
