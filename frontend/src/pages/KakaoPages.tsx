import { LoginToken, Selector } from "atoms/LoginAtom";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

interface ILoginToken {
  accessToken: string;
}

function KakaoPages() {
  const params = useParams<ILoginToken>();
  const history = useHistory();

  console.log("params : ", params);

  const [token, setToken] = useRecoilState(LoginToken);
  const data = useRecoilValue(Selector);

  useEffect(() => {
    console.log("before data ", data);
    setToken(params.accessToken);
    console.log("after data ", data);
    history.push("/");
  }, [params]);

  return <div></div>;
}

export default KakaoPages;
