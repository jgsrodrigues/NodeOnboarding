import { Link, Outlet } from "react-router-dom";

const App = () =>
  <>
    <div>
      <nav>
        <Link to="/">Home</Link>
        <p />
        <Link to="/login">Login</Link>
        <p />
        <Link to="/profile">Profiles</Link>
      </nav>
    </div>
    <div>
      <Outlet />
    </div>
  </>;

export default App;
