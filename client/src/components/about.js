import React from 'react';

const About = props => {
  const { info, name } = props;

  return (
    <div>
      <h1>About {name}</h1>
      <p>{info}</p>
    </div>
  );
};

export default About;
