import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com/";

export default function Following() {
  const params = useParams();
  const [user, setUser] = useState("");
  const [follwings, setFollowings] = useState([]);

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

  const fetchFollowing = (username) => {
    const url = `${API}users/${username}/following?per_page=10`;

    axios
      .get(url)
      .then((res) => {
        setFollowings(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  useEffect(() => {
    fetchUser(params.username);
    fetchFollowing(params.username);
  }, [params]);

  if (user) {
    const followingList = follwings.map((following) => {
      return (
        <div key={following.id}>
          <div>
            <img
              className="userImage1"
              src={following.avatar_url}
              alt="following-user"
            />
            <p>{following.login}</p>
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
          Following:
          {followingList}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No Following</p>;
      </div>
    );
  }
}