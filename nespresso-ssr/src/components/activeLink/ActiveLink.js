import { useRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ children, activeClassName, className, ...props }) => {
  const { asPath } = useRouter();

  const clazzName =
    asPath === props.href
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    <Link className={clazzName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
