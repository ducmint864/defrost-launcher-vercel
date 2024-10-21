import { useContractEvents, useContractWrite } from "@thirdweb-dev/react";
import { getProjectPoolContract } from "./contracts"

const withDrawFund = (projectId: string) => {
    const poolContract = getProjectPoolContract(
        projectId
    );

    if (!poolContract) {
        alert("failed to get pool contract");
        return;
    }

    const { mutateAsync, isLoading, error } = useContractWrite(
        poolContract,
        "withdrawFund"
    )

    const { data: eventData, isLoading: eventLoading, error: eventError } = useContractEvents(poolContract);
    



    return { mutateAsync, isLoading, error, eventData, eventLoading, eventError };

}

export default withDrawFund;