import authContext from "../Session";
import CommentForm from './comment-form';
import UserCommentItem from './user-comment';
import CommentItem from './comment-item';
import styled from 'styled-components'
import { Heading } from 'grommet'
// Import styled components and Heading from gromment
const NoComments = styled.p`
font-size: medium;
text-align:center;
margin:0;
font-family: 'Roboto';
`

const HeadingForm = styled(Heading)`
font-size: x-large;
font-family: 'Roboto';
text-align: center;
margin:10px 0;
`


const CommentList = ({ authUser, signIn, onDeleteComment, onEditComment, commentsSection, onCreateComment }) => {
    // Coomment list
    return (
        <>
            {/*if user has log in*/}
            {signIn ? <div>
                <HeadingForm>Create new Comment Section</HeadingForm>
                <CommentForm authUser={authUser} onCreateComment={onCreateComment} />
                {commentsSection ?
                    <div>
                        {/*comment exist*/}
                        {commentsSection.map((section, key) => (
                            <div key={key}>
                                <UserCommentItem
                                    section={section}
                                    userIDComment={authUser.uid} key={key}
                                    onDeleteComment={onDeleteComment}
                                    onEditComment={onEditComment}
                                />
                            </div>
                        ))}
                    </div>
                    :
                    <NoComments>No Comments</NoComments>
                }
            </div>
                :
                <div>
                    {/*if user has not log in*/}
                    {commentsSection ? <>
                        {/*comment exist*/}
                        {commentsSection.map((section, key) => (
                            <CommentItem section={section} key={key} />
                        ))}
                    </> : <NoComments>No Comments</NoComments>}

                </div>
            }
        </>
    )
}

const CommentListAuth = authContext(CommentList)

export default CommentListAuth