import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Link className="btn border btn-primary" to={"/register"}>
        Login
      </Link>
    </div>
  );
};

export default Login;
