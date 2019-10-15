import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileColumn.css';

const ColumnData = props => {
  const { headerText, listData } = props;
  return listData.length ? (
    <div className="column">
      <h2>{headerText}</h2>
      {listData.map((community, index) => {
        return (
          <div className="column column-li" key={index} style={{background: props.color}}>
            <Link to={`/community/${community.slug}`}>
              <h5>{community.name}</h5>
              <Link to={`/category/${community.category}`}>
                <br></br>
                <small>Category: {community.category}</small>
              </Link>
            </Link>
            <br></br>
            <small>{community.users.length + 1} Members</small>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="column">
      <h2>{headerText}</h2>
      <p>Empty</p>
    </div>
  );
};

export default ColumnData;
