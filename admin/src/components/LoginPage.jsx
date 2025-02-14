import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication (Replace this with an API call)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // Redirect after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-300 to-gray-500 flex justify-center items-center w-screen h-screen">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96">
        <h1 className="text-center text-4xl font-bold text-gray-700 mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-600 text-lg font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 text-lg font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
