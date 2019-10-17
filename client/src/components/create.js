import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { GET_COMMUNITIES } from './profilepage';

import '../styles/Create.css';

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CreateMutation(
    $name: String!
    $category: String!
    $hasPosts: Boolean!
    $hasMessages: Boolean!
    $hasEvents: Boolean!
    $privacy: String!
    $about: String!
  ) {
    createNewCommunity(
      name: $name
      category: $category
      hasPosts: $hasPosts
      hasMessages: $hasMessages
      hasEvents: $hasEvents
      privacy: $privacy
      about: $about
    ) {
      id
      name
      slug
    }
  }
`;

export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: 'animals',
      hasPosts: true,
      hasEvents: true,
      hasMessages: true,
      privacy: 'public',
      about: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const key = event.target.name;
    console.log(event.target.name);
    const updatedValue = { [key]: event.target.value };
    this.setState(updatedValue);
  }

  render() {
    return (
      <div className="community-form-container">
        <div className="community-form">
          <h1>Create A New Community</h1>
          <div className="create-field">
            <label htmlFor="name">Community Name: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="create-field">
            <label htmlFor="category">Select A Topic: </label>
            <FormControl variant="outlined">
              <Select
                value={this.state.category}
                onChange={this.handleOnChange}
                inputProps={{
                  name: 'category',
                }}
              >
                <MenuItem value="animals">Animals</MenuItem>
                <MenuItem value="computers">Computers</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="games">Games</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="movies">Movies</MenuItem>
                <MenuItem value="nature">Nature</MenuItem>
                <MenuItem value="photography">Photography</MenuItem>
                <MenuItem value="random">Random</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="create-field">
            <label htmlFor="about">About: </label>
            <TextField
              id="outlined-multiline-flexible"
              label="About Your Community"
              name="about"
              multiline
              rows="6"
              fullWidth
              value={this.state.about}
              onChange={this.handleOnChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="create-field">
            <label htmlFor="hasPosts">Has Posts: </label>
            <FormControl variant="outlined">
              <Select
                value={this.state.hasPosts}
                onChange={this.handleOnChange}
                inputProps={{
                  name: 'hasPosts',
                }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="create-field">
            <label htmlFor="hasEvents">Has Events: </label>
            <FormControl variant="outlined">
              <Select
                value={this.state.hasEvents}
                onChange={this.handleOnChange}
                inputProps={{
                  name: 'hasEvents',
                }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="create-field">
            <label htmlFor="privacy">Privacy Settings: </label>
            <FormControl variant="outlined">
              <Select
                value={this.state.privacy}
                inputProps={{
                  name: 'privacy',
                }}
                onChange={this.handleOnChange}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="submit-button">
            <Mutation
              mutation={CREATE_COMMUNITY_MUTATION}
              variables={this.state}
              refetchQueries={() => {
                return [
                  {
                    query: GET_COMMUNITIES,
                  },
                ];
              }}
              onCompleted={data =>
                this.props.history.push(
                  `community/${data.createNewCommunity.slug}`
                )
              }
            >
              {createMutation => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createMutation}
                >
                  Submit
                </Button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}
