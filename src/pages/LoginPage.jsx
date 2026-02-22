import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const location = useLocation();
  const from = location.state?.from || "/";

  return <LoginForm redirectTo={from} />;
}

export default LoginPage;

