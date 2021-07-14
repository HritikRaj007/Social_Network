import React from 'react';
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
      <button type='button'  onClick={e => addLike(_id)} className='btn btn-light'>
        <i className='fas fa-thumbs-up' />{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button type='button'  onClick={e => removeLike(_id)} className='btn btn-light'>
        <i className='fas fa-thumbs-down' />
      </button>
      <Link to={`/post/${_id}`} className='btn btn-primary'>
        Discussion{' '}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type='button'  onClick={e => deletePost(_id)} className='btn btn-danger'>
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

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