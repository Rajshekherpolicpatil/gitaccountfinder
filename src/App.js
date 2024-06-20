import { useEffect, useState } from "react";

export default function App() {
  const [usergithubData, setusergithubData] = useState({});
  const [initialvalue, setInitialValue] = useState("");
  const [user, setuser] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => {
        //   res.ok ? return res.json() : {throw new Error("Couldn't fetch")};
        if (!res.ok) {
          throw new Error("Couldn't fetch");
        } else {
          setShow(true);
          return res.json();
        }
      })
      .then((data) => setusergithubData(data))
      .catch((err) => {
        setusergithubData({});
        setShow(false);

        console.error(
          `you enterd invalid user so ${err.message} the usergithub details`
        );
        alert("you have entered enterd invalid user");
      });
  }, [user]);
  console.log(user);
  console.log(usergithubData);
  return (
    <div className="container">
      <div className="inputbox">
        <input
          type="text"
          placeholder="Enter userId..."
          value={initialvalue}
          onChange={(e) => setInitialValue(e.target.value)}
        />
        <button onClick={() => setuser(initialvalue)}>Submit</button>
      </div>
      {show && (
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tbody>
              <tr>
                <th>user name:</th>
                <td> {usergithubData.login}</td>
              </tr>
              <tr>
                <th>profile picture:</th>
                <td>
                  <img src={usergithubData.avatar_url} alt="movie poster"></img>
                </td>
              </tr>
            </tbody>
          </thead>
        </table>
      )}
    </div>
  );
}
