import { useSelector } from "react-redux";

import {
  AboutCompanyMenu,
  AboutMenuButton,
  AboutMenuButtonTitle,
  AboutMenuListItem,
  AboutMenuTitle,
} from "./styles";

const AboutMenu = ({ title, sections }) => {
  const { status } = useSelector((state) => state.about);
  const items =
    status === "idle"
      ? sections.map(({ title, link }, i) => {
          return (
            <AboutMenuListItem key={i}>
              <AboutMenuButton activeClassName="active" href={link}>
                <AboutMenuButtonTitle component="span">
                  {title}
                </AboutMenuButtonTitle>
              </AboutMenuButton>
            </AboutMenuListItem>
          );
        })
      : null;

  return (
    <AboutCompanyMenu>
      <AboutMenuTitle component="h1">{title}</AboutMenuTitle>
      {items}
    </AboutCompanyMenu>
  );
};

export default AboutMenu;
