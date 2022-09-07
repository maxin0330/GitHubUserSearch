import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com/";

export default function Profile() {
  const params = useParams();
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);

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

  const fetchRepo = (username) => {
    const url = `${API}users/${username}/repos?per_page=10`;

    axios
      .get(url)
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  useEffect(() => {
    fetchUser(params.username);
    fetchRepo(params.username);
  }, [params]);

  if (user) {
    const repoList = repos.map((repo) => {
      return (
        <li key={repo.id}>
          <div>
            User The {user.name} with {user.followers} followers is following{" "}
            {user.following}. One repo for this user is {repo.name} and it is
            public.
          </div>
        </li>
      );
    });

    return (
      <div>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Back to Search
        </Link>
        <div>
          <div className="card">
            <div>
              <img className="userImage" alt="User" src={user.avatar_url} />
            </div>
            <div>
              <h4>
                <p>{user.name}</p>
              </h4>
              <div className="Followers">
                <Link to={`/user/${user.login}/followers`}>
                  <button className="follow-button">
                    Followers : {user.followers}
                  </button>
                </Link>
              </div>
              <div className="Following">
                <Link to={`/user/${user.login}/following`}>
                  <button className="follow-button">
                    Following : {user.following}
                  </button>
                </Link>
              </div>
              <div className="repoList">
                <h5>Repository List ({user.public_repos}) </h5>
                <ul>{repoList}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please wait . . .</div>;
  }
}