import React, { Component } from 'react';
import LeftBar from '../../components/LeftBar';
import styles from './styles/home.scss';
import * as actions from '../../action/index';
import { connect } from 'react-redux';
import { Loader, Comment, Button,Form, Image, Icon } from 'semantic-ui-react';
import axios from 'axios';

class Home extends Component {
  async componentDidMount() {
    const res = await axios.get('/api/post');

    this.setState({ posts: res.data, loading: false });
  }

  state = {
    newPost: '',
    newComment: '',
    posts: [],
    loading: true
  }

  handlePost = (e, { name, value }) => {
    e.preventDefault()

    this.setState({ [name]: value });
  }

  async createComment(values, postID) {
    console.log(postID)
    const { user } = this.props;
    const comment = {
      text: this.state.newComment,
      name: user.name,
      avatar: user.avatar,
      user: user
    };
    const res = await axios.post(`/api/post/comment/${postID}`, comment);

    this.setState({ newComment: '', posts: res.data });
  }

  createPost = async (e) => {
    e.preventDefault();

    const { user } = this.props;
    const Post = {
      text: this.state.newPost,
      name: user.name,
      avatar: user.avatar,
      user
    };
    const res = await axios.post('/api/post', Post);
    this.setState({ posts: res.data, newPost: '' });
  }

  async toggleLike(postID) {
    const res = await axios.post(`/api/post/like/${postID}`);

    this.setState({ posts: res.data });
  }

  isLiked(likes, userID) {
    let liked = false;
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].user === userID) liked = true; break;
    };
    return liked;
  }

  renderComments(comments) {
    return comments.map((comment, i) => {
      return (
        <Comment key={i}>
          <Comment.Avatar src={comment.avatar} />
          <Comment.Content>
            <Comment.Author style={{ color: '#445878'}}>{comment.name}</Comment.Author>
            <Comment.Text>
              {comment.text}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )
    })
  }


  renderPost(allPost) {
    const { user } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loader inline='centered' active content='Loading Post' />
    } else if (allPost.length === 0) {
      return <h1>there are no post</h1>
    }
    return allPost.map((post, i) => {
      return (
        <Comment key={i}>
          <div className={styles.post}>

            <Comment.Avatar src={post.user.avatar} style={{ marginRight: '10px' }} />
            <Comment.Content>
              <Comment.Author>{post.user.name}</Comment.Author>
              <Comment.Metadata>
                <Icon name='like' />
                {post.likes.length}
              </Comment.Metadata>
              <Comment.Text>{post.text}</Comment.Text>
            </Comment.Content>

            <Button.Group fluid>
              <Button basic color='red' onClick={this.toggleLike.bind(this, post._id, i)} icon>
                Like
                <Icon name='like' color={this.isLiked(post.likes, user.id) ? 'red' : 'teal'} />
              </Button>
              <Button primary icon>
                Comments
                <Icon name='comment' />
              </Button>
            </Button.Group>
          </div>
          <div className={styles.post}>
            {this.renderComments(post.comments)}
            <Form onSubmit={(values) => this.createComment(values, post._id)}>
              <Form.Input
                action={<Button primary type='submit'><Icon name='send' /></Button>}
                placeholder='add a comment...'
                onChange={this.handlePost}
                name='newComment'
                style={{ width: '25vw' }}
                value={this.state.newComment}
              />
            </Form>
          </div>
        </Comment>
      )
    })
  }

  render() {
    const { user } = this.props;
    const { posts } = this.state;
    return (
      <div>
        <LeftBar />
        <div className={styles.home}>

          <Form onSubmit={this.createPost} className={styles.form}>
            <div className={styles.textarea}>
              <Image avatar src={user.avatar} />
              <Form.TextArea
                name='newPost'
                style={{ width: '23vw' }}
                placeholder='create a post'
                onChange={this.handlePost}
                value={this.state.newPost}
              />
            </div>
            <Button style={{ margin: '0px 0px 10px 50px' }} type='submit' primary content='send' />
          </Form>

          <Comment.Group size='big'>
            {this.renderPost(posts)}
          </Comment.Group>

        </div>

      </div>
    )
  }

};

const mapStateToProps = state => {
  return {
    allPost: state.post.posts,
    newPost: state.post.post,
    newComment: state.post.comment,
    loading: state.post.loading,
    user: state.user.user
  }
}

export default connect(mapStateToProps, actions)(Home);
