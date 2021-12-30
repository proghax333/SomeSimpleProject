
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import moment from 'moment';

function pad(time) {
  const str = `${time}`;
  return str.padStart(2, '0');
}

export default function Post({
  ...props
}) {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  const [lead, setLead] = React.useState(null);
  const { userDetails } = useAuth();
  const [bidSent, setBidSent] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(null);

  async function loadPost() {
    let response = await fetch(`http://localhost:5000/posts/${postId}`);
    const post = await response.json();
    
    response = await fetch(`http://localhost:5000/posts/getLead/${postId}`);
    const lead = await response.json();

    setPost(post);
    setLead(lead);
    updateTime(post);
  }

  React.useEffect(() => {
    loadPost();
  }, [postId]);

  const updateTime = (post) => {
    const expiry = moment.unix(post.createdAt / 1000)
    .add('144', 'hours');
    const now = moment();
    const time = moment.duration(expiry.diff(now));

    setTimeLeft(
      time
    );
  };

  const reloadTimer = () => {
    if(post)
    {
      const handle = setInterval(() => {
        updateTime(post);
      }, 600);

      return handle;
    }
  };

  React.useEffect(() => {
    const handle = reloadTimer();

    return () => {
      clearInterval(handle);
    }
  }, [post]);

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
      {timeLeft ? <p>Time left: {pad(Math.floor(timeLeft.asHours()))}:{pad(timeLeft.minutes())}:{pad(timeLeft.seconds())}</p> : 'Loading...'}
      <p>Lead: {lead.userId}</p>
      <p>Value: {lead.value}</p>
      {bidSent ? <p>Bid sent</p> : null}
    </div>
    {
      timeLeft && timeLeft.asMilliseconds() > 0 &&
      <button onClick={placeBid}>Lead + 100</button>
    }
  </div> :
    <div>Post is loading...</div>
}