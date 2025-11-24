import React from 'react';
import Hero from '../components/Hero';
import { PROFILE_DATA } from '../constants';

const Home: React.FC = () => {
  return <Hero profile={PROFILE_DATA} />;
};

export default Home;
