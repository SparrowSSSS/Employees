import { Employee } from "@prisma/client";
import {useMemo} from "react";

const useFilterEmployees = (nameFilter: string, addressFilter: string, employees?: Employee[]) => {
    const filteredToName = useMemo(() => {
        if (nameFilter === "") return employees;
        return employees?.filter((employee) => employee.lastName.toLowerCase().includes(nameFilter.toLowerCase()));
    }, [nameFilter, employees]);

    const filteredToAddress = useMemo(() => {
        if (addressFilter === "") return filteredToName;
        return filteredToName?.filter((employee) => employee.address.toLowerCase().includes(addressFilter.toLowerCase()));
    }, [addressFilter, filteredToName]);

    return filteredToAddress;
};

export default useFilterEmployees;