import { chainConfig } from "@/config"
import { useChainId, useContractRead } from "@thirdweb-dev/react"
import { getProjectPoolContract } from "./contracts"


const getMyProjectInfo = (
    projectId: number | string
    ) => {
        const poolContract = getProjectPoolContract(projectId);
        const { data: raisedAmount, isLoading, error } = useContractRead(
            poolContract,
            "getProjectRaisedAmount"
        ) 

        const { data: isProjectSoftCapReached, isLoading: loading, error: softCapError  } = useContractRead(
            poolContract,
            "getProjectSoftCapReached"
        )

        return { raisedAmount, isLoading, error, isProjectSoftCapReached, loading, softCapError };
}

export default getMyProjectInfo;