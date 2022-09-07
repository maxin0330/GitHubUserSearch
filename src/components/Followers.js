import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com/";

export default function Followers() {
  const params = useParams();
  const [user, setUser] = useState("");
  const [follwers, setFollowers] = useState([]);

  const fetchUser = (username) => {
    let url = `${API}users/${username}`;

    axios
      .get(url)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  const fetchFollower = (username) => {
    const url = `${API}users/${username}/followers?per_page=10`;

    axios
      .get(url)
      .then((res) => {
        setFollowers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  useEffect(() => {
    fetchUser(params.username);
    fetchFollower(params.username);
  }, [params]);

  if (user) {
    const followersList = follwers.map((follower) => {
      return (
        <div key={follower.id}>
          <div>
            <img
              className="userImage1"
              src={follower.avatar_url}
              alt="follower-user"
            />
            <p>{follower.login}</p>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Link
          to={`/user/${user.login}`}
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Back to Profile
        </Link>
        <div>
          Followers:
          {followersList}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No Followers</p>;
      </div>
    );
  }
}
