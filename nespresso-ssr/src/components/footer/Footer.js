import { Container } from "@mui/material";
import { contacts } from "../../config/phoneNumber.config";
import {
  FooterWrapper,
  Footer as FooterComponent,
  FooterItem,
  FooterItemWrapper,
  FooterTitle,
  FooterLink,
} from "./styles";
import { useMemo } from "react";

const Footer = ({ links }) => {
  const footerItems = useMemo(() => {
    return [
      {
        id: 1,
        title: "Навигация",
        items: links,
      },
      {
        id: 2,
        title: "Контакты",
        items: [
          {
            id: 1,
            title: contacts.phoneNumber,
            href: `tel:${contacts.phoneNumber}`,
          },
          {
            id: 2,
            title: contacts.email,
            href: `mailto:${contacts.email}`,
          },
          {
            id: 3,
            title: contacts.address,
          },
        ],
      },
    ];
  }, [links]);

  const items = useMemo(() => {
    return footerItems.map(({ title, items, id }) => {
      const footItems = items.map(({ title, href, id }) => {
        const content = href ? (
          <FooterLink href={href}>{title}</FooterLink>
        ) : (
          title
        );

        return <FooterItem key={id}>{content}</FooterItem>;
      });

      return (
        <FooterItemWrapper key={id}>
          <FooterTitle component="div">{title}</FooterTitle>
          {footItems}
        </FooterItemWrapper>
      );
    });
  }, [footerItems]);

  return (
    <FooterComponent>
      <Container maxWidth="lg">
        <FooterWrapper>{items}</FooterWrapper>
      </Container>
    </FooterComponent>
  );
};

export default Footer;
