import React from 'react';

const About = props => {
  const { info, name } = props;

  return (
    <div className="community-item">
      <div className="about">
        <h1>About {name}</h1>
        <p>{info}</p>
      </div>
    </div>
  );
};

export default About;
