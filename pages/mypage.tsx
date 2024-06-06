import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mypage() {
    const router = useRouter();

  useEffect(() => {
    window.localStorage.removeItem("accessToken");
    router.push('/signin');
  });
}
