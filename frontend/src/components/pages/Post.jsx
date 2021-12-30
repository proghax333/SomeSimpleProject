
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Post({
  ...props
}) {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [lead, setLead] = React.useState(null);
  const { userDetails } = useAuth();
  const [bidSent, setBidSent] = React.useState(false);

  async function loadPost() {
    let response = await fetch(`http://localhost:5000/posts/${postId}`);
    const post = await response.json();
    
    response = await fetch(`http://localhost:5000/posts/getLead/${postId}`);
    const lead = await response.json();

    setPost(post);
    setLead(lead);
  }

  React.useEffect(() => {
    loadPost();
  }, [postId]);

  const placeBid = () => {
    // Implementation of login api is pending.
    // needs to be changed to userDetails.userId later.
    const userId = userDetails.username;
    
    async function sendBid() {
      const data = {
        userId
      };
      console.log("sent data:", data);

      const res = await fetch(`http://localhost:5000/posts/placeBid/${postId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      await res.json();

      setBidSent(true);
      loadPost();
    }

    sendBid();
  };

  return post && lead ? <div>
    <p>ID: {post.id}</p>
    <p>Created by: {post.createdBy}</p>
    <p>Image url: {post.imageUrl}</p>
    <div style={{
      marginLeft: "1rem"
    }}>
      <p>Lead: {lead.userId}</p>
      <p>Value: {lead.value}</p>
      {bidSent ? <p>Bid sent</p> : null}
    </div>
    <button onClick={placeBid}>Lead + 100</button>
  </div> :
    <div>Post is loading...</div>
}