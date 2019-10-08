import React from 'react';

const ColumnData = props => {
  const { headerText, listData } = props;
  return (
    <div className="column">
      <h2>{headerText}</h2>
      {listData.map((item, index) => {
        return (
          <div className="column column-li" key={index}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default ColumnData;
