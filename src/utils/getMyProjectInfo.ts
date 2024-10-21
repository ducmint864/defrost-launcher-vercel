import { chainConfig } from "@/config"
import { useChainId, useContractRead } from "@thirdweb-dev/react"
import { getProjectPoolContract } from "./contracts"


const getMyProjectInfo = (
    projectOwnerAddress: string,
    projectId: number | string
    ) => {
        const poolContract = getProjectPoolContract(projectId);
        const { data: raisedAmount, isLoading, error } = useContractRead(
            poolContract,
            "getProjectRaisedAmount"
        ) 

        return { raisedAmount, isLoading, error }
}

export default getMyProjectInfo;