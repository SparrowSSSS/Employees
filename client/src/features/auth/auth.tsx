import { useCurrentQuery } from "../../app/services/auth";
import Loading from "../../components/loading/Loading";

const Auth = ({ children }: { children: JSX.Element }) => {

    const { isLoading } = useCurrentQuery();

    if (isLoading) return <Loading />

    return children
};

export default Auth;