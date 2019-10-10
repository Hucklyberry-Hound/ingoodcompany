import React from 'react';
import { Link } from 'react-router-dom';

const ColumnData = props => {
  const { headerText, listData } = props;
  return listData.length ? (
    <div className="column">
      <h2>{headerText}</h2>
      {listData.map((community, index) => {
        return (
          <div className="column column-li" key={index}>
            <Link to={`/community/${community.id}`}>
              <h5>{community.name}</h5>
              <small>Category: {community.category}</small>
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="column">
      <h2>{headerText}</h2>
      <p>Looks Like there's nothing here</p>
    </div>
  );
};

export default ColumnData;