import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

function Entry() {
    let { id } = useParams();
    const [entryObject, setEntryObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    
    useEffect(()=> {
        axios.get(`/entries/${id}`).then(res => {
            setEntryObject(res.data);
        });

        axios.get(`/comments/${id}`).then(res => {
            setComments(res.data);
        });

    }, [id]);

    const addComment = () => {
        axios.post('/comments', {
            body: newComment,
            entryId: id
        },
        {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then(res=>{
            if(res.data.error){
                console.log(res.data.error)
            } else {
                // const commentToAdd = {
                //     body: newComment,
                //     username: res.data.username
                // };
                setComments([...comments, res.data]);
                setNewComment("");
            }
        });
    }

    return (
        <div className="entryPage">
            <div className='leftSide'>
                <div className="entry individual">
                    <div className='title'>{entryObject.title}</div>
                    <div className='body'>{entryObject.body}</div>
                    <div className='footer'>{entryObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                    <div className="addCommentContainer">
                <input
                    type="text"
                    placeholder="Comment..."
                    autoComplete="off"
                    value={newComment}
                    onChange={(event) => {
                    setNewComment(event.target.value);
                    }}
                />
                <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                {comments.map((comment) => {
                    return (
                    <div key={comment.id} className="comment">
                        <p>{comment.body}</p>
                        <small>Posted by: {comment.username}</small>
                    </div>
                    );
                })}
                </div>

            </div>
        </div>
    )
}

export default Entry
