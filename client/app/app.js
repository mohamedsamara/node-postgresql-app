import React from 'react';

class App extends React.Component {
  componentDidMount() {
    fetch('/api/book')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  /* eslint-disable */

  handleClick() {
    fetch('/api/book', {
      method: 'post',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('after add:', data);
      });
  }

  render() {
    return (
      <div>
        Test APIS and PostgreSQL
        <button onClick={this.handleClick}>Post Data</button>
      </div>
    );
  }
}
export default App;
