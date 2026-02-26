import BackLink from "../backLink/BackLink";
import { BackLinksWrapper } from "./styles";

export default function BackLinks({ links, sx, ...props }) {
  const items = links.map(({ text, href }, i) => (
    <BackLink {...props} key={i} withoutBackArrow={i === 0} href={href}>
      {text}
    </BackLink>
  ));

  return <BackLinksWrapper sx={sx}>{items}</BackLinksWrapper>;
}
