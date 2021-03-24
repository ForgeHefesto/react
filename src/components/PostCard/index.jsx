import './style.css';
import P from 'prop-types';

export const Postcard = ({ cover, title, id, body }) => {
  return (
    <div className="post">
      <img src={cover} alt={title}></img>
      <div key={id} className="post-content">
        <h2>
          {title} {id}
        </h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

Postcard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
