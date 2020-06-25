import { withFirebase } from "../Firebase";
import CommentListAuth from './comment-list'
// Import withFirebase from Firebase and CommentListAuth 
import styled from 'styled-components'
import { Box } from 'grommet'
// Import styled components and Box from gromment
const CommentBox = styled(Box)`
background-color:#fff;
margin: 10px;
padding: 20px;
border-radius: 20px;
width: 90%;
@media (max-width : 600px) {
    margin:30px 0;
    border-radius: 0;
    width:100%;
    padding: 10px 5px;
}
`

class Comments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            loading: false,
            flowerId: null,
            commentsSection: [],
        }
    }

    componentDidMount() {
        if (this.state.flowerId) {
            return;
        }
        // Fetch all comments 
        this.setState({ loading: true });
        const test = this.props.id
        this.setState({ flowerId: test })
        this.props.firebase.flower(test).on('value', snapshot => {
            const CommentsObject = snapshot.val();
            // Check if comments exist
            if (CommentsObject) {
                const comments = Object.keys(CommentsObject).map(key => ({
                    ...CommentsObject[key],
                    commentID: key
                }))
                this.setState({ commentsSection: comments, loading: true })
            } else {
                this.setState({ commentsSection: null, loading: true });
            }
        });
    }
    componentWillUnmount() {
        // turn of firebase database
        const test = this.state.flowerId
        this.props.firebase.flower(test).off()
    }
    componentDidUpdate(prevProp) {
        // updates props
        if (prevProp.id === this.props.id) {
            return;
        }
        this.setState({ loading: true });
        const test = this.props.id
        this.setState({ flowerId: test })
        this.props.firebase.flower(test).on('value', snapshot => {
            const CommentsObject = snapshot.val();
            if (CommentsObject) {
                const comments = Object.keys(CommentsObject).map(key => ({
                    ...CommentsObject[key],
                    commentID: key
                }))
                this.setState({ commentsSection: comments, loading: true })
            } else {
                this.setState({ commentsSection: null, loading: true });
            }
        });
    }

    onDeleteComment = commentID => {
        // Delete comment in database
        const test = this.state.flowerId
        this.props.firebase.singleComment(test, commentID).remove();
    }
    onCreateComment = (text, user) => {
        // Create comment and push in database
        const test = this.state.flowerId
        this.props.firebase.flowers().child(`/${test}/`).push({
            text,
            uid: user.uid,
            username: user.username,
            date: this.props.firebase.serverValue.TIMESTAMP
        })
    }
    onEditComment = (comment, text) => {
        // Edit comment in data base
        const test = this.state.flowerId
        const { commentID, ...commentObj } = comment
        this.props.firebase.singleComment(test, commentID).set({
            ...commentObj,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        })
    }
    render() {
        const { commentsSection, loading } = this.state;
        return (
            <CommentBox>

                {loading ?
                    <div>
                        <CommentListAuth
                            onDeleteComment={this.onDeleteComment}
                            onEditComment={this.onEditComment}
                            commentsSection={commentsSection}
                            onCreateComment={this.onCreateComment}
                        />
                    </div>
                    : <p>Loading...</p>
                }



            </CommentBox>
        )
    }
}
// wrap Comments with firebase
export default withFirebase(Comments)