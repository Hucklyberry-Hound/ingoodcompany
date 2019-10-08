import React from "react";
import ColumnData from "./profilecolumn";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: ["Cats", "Dog People"],
      belongTo: ["Cat People", "People who like umbrellas"],
      public: ["I need to buy cups", "Computers"]
    };
  }
  render() {
    return (
      <div className="profile-container">
        <ColumnData
          headerText="Communities You Own"
          listData={this.state.owned}
        />
        <ColumnData
          headerText="Communities You're Subscribed To"
          listData={this.state.belongTo}
        />
        <ColumnData
          headerText="Public Communities"
          listData={this.state.public}
        />
      </div>
    );
  }
}