const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const posts = [
  {
    id: 1,
    createdBy: "user1",
    imageUrl: "https://images.xyzw/image.jpg",
    createdAt: 1640885863000,
  },
  {
    id: 2,
    createdBy: "user2",
    imageUrl: "https://images.xyzw/image.jpg",
    createdAt: 1640885863000,
  },
];

const bids = [
  {
    id: 1,
    postId: 1,
    userId: 2,
    value: 100,
    createdAt: 1640885863000,
  },
  {
    id: 2,
    postId: 2,
    userId: 1,
    value: 100,
    createdAt: 1640885863000,
  },
  {
    id: 3,
    postId: 1,
    userId: 3,
    value: 200,
    createdAt: 1640885863000,
  },
];

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  console.log("Get post:", id);
  const post = posts.find((post) => {
    return post.id === id;
  });

  if (!post) {
    return res.json({
      statusCode: 404,
      message: "Post not found",
    });
  }

  res.json(post);
});

function getLead(postId) {
  const allBids = bids.filter((bid) => bid.postId == postId);

  const highestBid = allBids.sort((a, b) => {
    return b.value - a.value;
  })[0];

  return highestBid;
}

app.get("/posts/getLead/:postId", (req, res) => {
  const highestBid = getLead(parseInt(req.params.postId));

  res.json(
    highestBid || {
      statusCode: 404,
      message: "No bids placed",
    }
  );
});

app.get("/posts/getAllBids/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const allBids = bids.filter((bid) => bid.postId === postId);

  res.json(allBids);
});

app.get("/posts/getGrossValue/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const grossValue = bids
    .filter((bid) => bid.postId === postId)
    .reduce((a, bid) => {
      return a + bid.value;
    }, 0);

  res.json({
    grossValue: grossValue,
  });
});

const BID_INCREMENT = 100;

app.post("/posts/placeBid/:postId", (req, res) => {
  const postId = Number(req.params.postId);
  const { userId } = req.body;

  console.log(req.body);

  const highestBid = getLead(postId);
  const newBid = {
    id: bids.length,
    postId,
    userId,
    value: highestBid.value + 100,
  };

  bids.push(newBid);

  res.json({
    message: "success",
  });

  console.log(new Date().getTime());
});

app.listen(PORT, () => {
  console.log("Server is started!");
});
