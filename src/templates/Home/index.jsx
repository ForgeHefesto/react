import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-post";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";

export class Home extends Component {
  state = {
    posts: [],
    allPost: [],
    page: 0,
    postsPerPage: 2,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPost: postsAndPhotos,
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPost, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPost.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  componentDidUpdate() {}
  componentWillUnmount() {}

  render() {
    const { posts, postsPerPage, page, searchValue, allPost } = this.state;
    const noMorePosts = page + postsPerPage >= allPost.length;

    const filteredPosts = !!searchValue
      ? allPost.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        {!!searchValue && (
          <>
            <h1>{searchValue}</h1>
          </>
        )}
        <input
          className="text-input"
          type="search"
          value={searchValue}
          onChange={this.handleChange}
          placeholder="type your search"
        ></input>
        <br/><br/>
        {filteredPosts.length > 0 && <Posts posts={filteredPosts}></Posts>}
        {filteredPosts.length === 0 && <p>Não existem posts</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              onClick={this.loadMorePosts}
              text="load more posts"
            ></Button>
          )}
        </div>
      </section>
    );
  }
}
