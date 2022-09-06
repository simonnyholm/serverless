import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [secretMessage, setSecretMessage] = useState("");

  useEffect(
    function () {
      fetch("/.netlify/functions/top-secret", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => setSecretMessage(data.message));
    },
    [token]
  );

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/auth", {
        method: "POST",
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">
            Email:
            <input type="email" name="email" id="" />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Password:
            <input type="password" name="password" id="" />
          </label>
        </div>
        <button type="submit">Log ind</button>
      </form>

      <div>
        <p>{token ? "Du er logget ind" : "Du er ikke logget ind"}</p>
        <p>{secretMessage}</p>
      </div>
    </div>
  );
}

export default App;
