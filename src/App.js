import React from 'react';
import Search from './components/Search';

class App extends React.Component {
  state = {
    user: null,
    error: null,
    loading: false,
  };

  fetchUserData = async username => {
    this.setState({ loading: true }, async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const data = await res.json();

          return this.setState({
            user: data,
            loading: false,
          });
        }

        const error = (await res.json()).message;

        this.setState({
          error,
          loading: false,
        });
      } catch (err) {
        this.setState({
          error: 'There was some error',
          loading: false,
        });
      }
    });
  };

  render() {
    const { error, loading } = this.state;

    return (
      <div>
        <Search fetchData={this.fetchUserData} />
        <div className="text-center pt-5">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    );
  }
}

export default App;
