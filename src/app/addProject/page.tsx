import { useRouter } from "next/router";

export default function AddProjectPage() {
  const router = useRouter();

  router.push("/addProject/verifyToken");
}