import { Link } from "@mui/material";
import { socialItems } from "./socialItems";
import { SocialImage, SocialsWrapper } from "./styles";

const SocialLinks = () => {
  return (
    <SocialsWrapper>
      {socialItems.map(({ link, ...values }, index) => {
        return (
          <Link key={index} href={link}>
            <SocialImage priority width={50} height={50} {...values} />
          </Link>
        );
      })}
    </SocialsWrapper>
  );
};

export default SocialLinks;
