const helper = require("./helper.js");
const React = require("react");
const { createRoot } = require("react-dom/client");

const handleLogin = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;

  if (!username || !pass) {
    helper.handleError("Username or password is empty!");
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  helper.hideError();

  const firstName = e.target.querySelector("#first").value;
  const lastName = e.target.querySelector("#last").value;
  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;
  const pass2 = e.target.querySelector("#pass2").value;

  if (!username || !pass || !pass2 || !firstName || !lastName) {
    helper.handleError("All fields are required!");
    return false;
  }

  if (pass !== pass2) {
    helper.handleError("Passwords do not match!");
    return false;
  }

  helper.sendPost(e.target.action, {
    username,
    pass,
    pass2,
    firstName,
    lastName,
  });

  return false;
};

const LoginWindow = (props) => {
  return (
    <form
      id="loginForm"
      name="loginForm"
      onSubmit={handleLogin}
      action="/login"
      method="POST"
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username" />
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password" />
      <input className="formSubmit" type="submit" value="Sign in" />
    </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form
      id="signupForm"
      name="signupForm"
      onSubmit={handleSignup}
      action="/signup"
      method="POST"
      className="mainForm"
    >
      <label htmlFor="firstName">First Name: </label>
      <input id="first" type="text" name="firstName" placeholder="first name" />
      <label htmlFor="lastName">Last Name: </label>
      <input id="last" type="text" name="lastName" placeholder="last name" />
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username" />
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password" />
      <label htmlFor="pass2">Password: </label>
      <input
        id="pass2"
        type="password"
        name="pass2"
        placeholder="retype password"
      />
      <input className="formSubmit" type="submit" value="Sign up" />
    </form>
  );
};

const init = () => {
  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");

  const greeting = document.getElementById("greeting");
  const root = createRoot(document.getElementById("content"));

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    root.render(<LoginWindow />);
    greeting.innerHTML = "Welcome Back";
    return false;
  });

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    root.render(<SignupWindow />);
    greeting.innerHTML = "Hello";
    return false;
  });

  root.render(<LoginWindow />);
};

window.onload = init;
