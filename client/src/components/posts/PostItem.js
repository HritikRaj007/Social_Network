import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { addLike, deletePost, removeLike } from '../../actions/post';
import { connect } from 'react-redux';

const PostItem = ({
  addLike,
  removeLike,
  auth,
  deletePost,
  showActions,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
    <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      {showActions && (
        <Fragment>
          <button
            onClick={e => addLike(_id)}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={e => removeLike(_id)}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} class='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span class='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={e => deletePost(_id)}
              type='button'
              class='btn btn-danger'
            >
              <i class='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};


PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {addLike,removeLike,deletePost}
)(PostItem);