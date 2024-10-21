import { chainConfig } from "@/config"
import { useChainId, useContractRead } from "@thirdweb-dev/react"
import { getProjectPoolContract } from "./contracts"


const getMyProjectInfo = (
    projectOwnerAddress: string,
    projectId: number | string
    ) => {
        const poolContract = getProjectPoolContract(projectId);
        const { data, isLoading, error } = useContractRead(
            poolContract,
            "getProjectRaisedAmount"
        ) 

        return { data, isLoading, error }
}