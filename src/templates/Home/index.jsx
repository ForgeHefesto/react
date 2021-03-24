import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPost, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPost.length;

  const filteredPosts = searchValue
    ? allPost.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPost.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      {' '}
      {!!searchValue && (
        <>
          <h1> {searchValue} </h1>{' '}
        </>
      )}{' '}
      <input
        className="text-input"
        type="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="type your search"
      ></input>{' '}
      <br />
      <br /> {filteredPosts.length > 0 && <Posts posts={filteredPosts}> </Posts>}{' '}
      {filteredPosts.length === 0 && <p> Não existem posts </p>}{' '}
      <div className="button-container">
        {' '}
        {!searchValue && <Button disabled={noMorePosts} onClick={loadMorePosts} text="Load more posts"></Button>}{' '}
      </div>{' '}
    </section>
  );
};
