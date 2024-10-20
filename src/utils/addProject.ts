import {
  useChainId,
  useContract,
  useContractEvents,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ProjectPoolFactoryABI, ProjectPoolABI } from "@/abi";
import { chainConfig } from "@/config";
import confirm from "antd/es/modal/confirm";
import { getProjectPoolContract } from "./contracts";

const useCreateProjectPool = (
  verifyToken: string,
  tokenExchangeRate: string,
  unixTime: Date,
  unixTimeEnd: Date,
  minInvest: number,
  maxInvest: number,
  softCap: number,
  hardCap: number,
  reward: number,
  selectedVToken: string
) => {
  //log all the parameters
  console.log(`
  VerifyToken: ${verifyToken}
  tokenExchangeRate: ${tokenExchangeRate}
  minInvest: ${minInvest}
  maxInvest: ${maxInvest}
  softCap: ${softCap}
  hardCap: ${hardCap}
  reward: ${reward}
  selectedVToken: ${selectedVToken}
  unixTime: ${unixTime}
  unixTimeEnd: ${unixTimeEnd}
`);
  const chainId = useChainId();
  console.log(chainId);

  const factoryAddress = chainId
    ? chainConfig[chainId.toString() as keyof typeof chainConfig]?.contracts
        ?.ProjectPoolFactory?.address
    : undefined;
  console.log("factoryAddress1: " + factoryAddress);

  const { contract: factoryContract, error: factoryConnErr } = useContract(
    factoryAddress, // Contract address
    ProjectPoolFactoryABI // Contract abi
  );
  console.log("factoryAddress2: " + factoryContract);
  if (factoryConnErr) {
    alert("failed to connect to factory contract");
  }
  console.log("factoryAddress3: " + factoryAddress);
  const {
    mutateAsync,
    isLoading: createProjectLoading,
    error: createProjectError,
  } = useContractWrite(factoryContract, "createProjectPool");
  console.log("factoryAddress4: " + mutateAsync);
  const startTimed = Math.floor(unixTime.getTime() / 1000); ///FOMRATED to uint256
  const endTimed = Math.floor(unixTimeEnd.getTime() / 1000);
  console.log("startTimed: " + startTimed);
  console.log("endTimed: " + endTimed);
  const handleWrite = async () => {
    try {
      await mutateAsync({
        args: [
          verifyToken,
          tokenExchangeRate,
          startTimed,
          endTimed,
          minInvest,
          maxInvest,
          softCap,
          hardCap,
          reward,
          selectedVToken,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: eventData,
    isLoading,
    error,
  } = useContractEvents(factoryContract, "ProjectPoolCreated");

  return { handleWrite, isLoading, createProjectError, eventData };
};

export default useCreateProjectPool;
