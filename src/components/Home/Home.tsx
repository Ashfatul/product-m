import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
        <p>Welcome to the Product Management App!</p>
        <Link to="/products">View Products</Link>
    </div>
  );
}