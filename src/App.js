import React from 'react';
import Search from './components/Search';
import UserCard from './components/UserCard';
import RepoCard from './components/RepoCard';

const PAGE_SIZE = 30;

class App extends React.Component {
  state = {
    user: null,
    repos: [],
    userDataError: null,
    loading: false,
    page: 1,
  };

  fetchUserData = async username => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.ok) {
      const data = await res.json();

      return { data };
    }

    const error = (await res.json()).message;

    return { error };
  };

  fetchRepos = async username => {
    const { page } = this.state;
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${PAGE_SIZE}`,
    );
    if (res.ok) {
      const data = await res.json();

      return { data, page: page + 1 };
    }

    const error = (await res.json()).message;

    return { error };
  };

  fetchData = async username => {
    this.setState({ loading: true }, async () => {
      try {
        const [user, repos] = await Promise.all([
          this.fetchUserData(username),
          this.fetchRepos(username),
        ]);

        if (user.data !== undefined && repos.data !== undefined) {
          return this.setState({
            user: user.data,
            repos: repos.data,
            page: repos.page,
            loading: false,
          });
        }

        this.setState({
          userDataError: user.error,
          reposError: repos.error,
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

  loadMore = async () => {
    const { data, page } = await this.fetchRepos(this.state.user.login);

    if (data)
      this.setState(state => ({
        repos: [...state.repos, ...data],
        page,
      }));
  };

  render() {
    const {
      userDataError,
      reposError,
      loading,
      user,
      repos,
      page,
    } = this.state;

    return (
      <div>
        <Search fetchData={this.fetchData} />
        <div className="container">
          <div className="text-center pt-5">
            {loading && <p>Loading...</p>}
            {userDataError && <p className="text-danger">{userDataError}</p>}
          </div>
          {!loading && !userDataError && user && <UserCard user={user} />}
          {reposError && <p className="text-danger">{reposError}</p>}

          {!loading &&
            !reposError &&
            repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}

          {!loading &&
            !userDataError &&
            user &&
            (page - 1) * PAGE_SIZE < user.public_repos && (
              <button className="btn btn-success" onClick={this.loadMore}>
                Load More
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default App;
