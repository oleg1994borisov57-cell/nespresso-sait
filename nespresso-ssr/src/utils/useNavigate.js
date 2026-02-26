import { useRouter } from "next/router";

function useNavigate() {
  const router = useRouter();

  const navigate = (href) => {
    if (href === -1) {
      router.back();
      return;
    }

    router.push(href);
  };

  return navigate;
}

export default useNavigate;
