import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com";

export default function Search() {
  const [users, setUsers] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (users) {
      fetchSearch(keyword);
    }
  }, []);

  const fetchSearch = (keyword) => {
    let url = `${API}/search/users?q=${keyword}&per_page=10`;

    axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Oops! Fetching failed:", err);
        setUsers(false);
      });
  };

  return (
    <>
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        fetchSearch={fetchSearch}
      />
      <UsersList users={users} />
    </>
  );
}

function SearchForm({ keyword, setKeyword, fetchSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearch(keyword);
  };

  return (
    <div className="search-bar">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Search for github user"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </span>
      </form>
    </div>
  );
}

function UsersList({ users }) {
  if (users) {
    if (users.message === "Not Found") {
      return (
        <div className="notfound">
          <h2>Oops !!</h2>
          <p>
            The API couldn't find any user. Try again with a different keyword.
          </p>
        </div>
      );
    } else {
      const userList = users.items.map((user) => {
        return (
          <Link key={user.id} to={"user/" + user.login}>
            <div className="search-out search-info">
              <img className="user" alt="User profile" src={user.avatar_url} />
              <h4>{user.login}</h4>
            </div>
          </Link>
        );
      });
      return <div>{userList}</div>;
    }
  }
}