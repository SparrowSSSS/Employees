import {FC, PropsWithChildren} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

interface Props {
    type: "private" | "public"
}

const CheckUser: FC<PropsWithChildren<Props>>  = ({children, type}) => {

    const user = useSelector(selectUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (type === "public") navigate(paths.home);
        } else if (type === "private") navigate(paths.login);
    }, []);

    return <>{children}</>;
};

export default CheckUser;