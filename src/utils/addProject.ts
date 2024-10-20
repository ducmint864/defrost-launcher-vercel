import { useChainId, useContract, useContractEvents, useContractWrite } from "@thirdweb-dev/react";
import {
    ProjectPoolFactoryABI,
    ProjectPoolABI
} from "@/abi"
import { chainConfig } from "@/config";
import confirm from "antd/es/modal/confirm";

const createProjectPool = (
    verifyToken: string, tokenExchangeRate: string, unixTime: Date, unixTimeEnd: Date,
    minInvest: number, maxInvest: number, softCap: number, hardCap: number,
    reward: number, selectedVToken: string) => {
    const chainId = useChainId();
    const factoryAddress = chainId
        ? chainConfig[chainId.toString() as keyof typeof chainConfig]?.contracts?.ProjectPoolFactory?.address
        : undefined;

    const { contract: factoryContract, error: factoryConnErr } = useContract(
        factoryAddress, // Contract address
        ProjectPoolFactoryABI // Contract abi
    );

    if (factoryConnErr) {
        alert("failed to connect to factory contract");
    }

    const { mutateAsync, isLoading: createProjectLoading, error: createProjectError } = useContractWrite(
        factoryContract,
        "createProjectpool",
    );



    const handleWrite = async () => {
        try {
            await mutateAsync({
                args: [
                    verifyToken, tokenExchangeRate,unixTime, unixTimeEnd,
                    minInvest, maxInvest, softCap, hardCap,
                    reward, selectedVToken
                ]
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const { data: eventData, isLoading, error } = useContractEvents(
        factoryContract,
        "ProjectPoolCreated",
    
    );



    return { handleWrite, isLoading, createProjectError, eventData};

}

export default createProjectPool;