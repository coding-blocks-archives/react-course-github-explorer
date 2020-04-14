import React from 'react';
import Search from './components/Search';

class App extends React.Component {
  state = {
    user: null,
    error: null,
  };

  fetchUserData = async username => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.ok) {
        const data = await res.json();

        return this.setState({
          user: data,
        });
      }

      const error = (await res.json()).message;

      this.setState({
        error,
      });
    } catch (err) {
      this.setState({
        error: 'There was some error',
      });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <Search fetchData={this.fetchUserData} />
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
}

export default App;
