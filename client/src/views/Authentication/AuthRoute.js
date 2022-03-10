import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const AuthRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ROUTE ARRIVED");
    switch (mode) {
      case "resetPassword":
        navigate(`/resetpswd?oobCode=${resetCode}`);
        break;
      case "verifyEmail":
        navigate(`/emailverify?oobCode=${resetCode}`);
        break;
      default:
    }
  }, []);

  return <></>;
};

export default AuthRoute;
