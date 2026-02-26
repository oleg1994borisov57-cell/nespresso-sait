import coffeeIcon from "../../resources/icons/navBar/coffee.png";
import machines from "../../resources/icons/navBar/machines.png";
import aboutCompany from "../../resources/icons/navBar/aboutUs.png";
import promotions from "../../resources/icons/navBar/promotions.png";
import legalEntities from "../../resources/icons/navBar/legalEntities.png";
import accessories from "../../resources/icons/navBar/accessories.png";

const links = [
  {
    id: "coffee",
    title: "Кофе",
    icon: coffeeIcon,
    href: "/",
    width: "60px",
  },
  {
    id: "accessories",
    title: "Аксессуары",
    icon: accessories,
    href: "/accessories",
    width: "30px",
  },
  {
    id: "machines",
    title: "Кофемашины",
    icon: machines,
    href: "/machines",
    width: "30px",
  },
  {
    id: "aboutCompany",
    title: "О компании",
    icon: aboutCompany,
    href: "/about/aboutCompany",
    width: "30px",
  },
  {
    id: "promotions",
    title: "Акции",
    icon: promotions,
    href: "/about/promotions",
    width: "30px",
  },
  {
    id: "legalEntities",
    title: "Юр лицам",
    icon: legalEntities,
    href: "/about/legalEntities",
    width: "30px",
  },
];

export default links;
