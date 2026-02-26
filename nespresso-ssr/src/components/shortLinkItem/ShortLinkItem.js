import ScrollIntoView from "react-scroll-into-view";
import { replaceSpacesWithUnderscore } from "../../utils/replaceSpacesWithUnderscore";
import Image from "next/image";

const ShortLinkItem = ({ img, bg, selector, name }) => {
  return (
    <ScrollIntoView
      selector={`#${replaceSpacesWithUnderscore(selector)}`}
      className="shortlink"
    >
      <div className="circle">
        <Image
          className="bg"
          fetchPriority="high"
          width={80}
          height={80}
          src={bg}
          alt={name}
        />
        <Image
          fetchPriority="high"
          className="img"
          id="shortimg"
          src={img}
          width={60}
          height={47}
          alt={name}
        />
      </div>
      <div className="title p5">{name}</div>
    </ScrollIntoView>
  );
};

export default ShortLinkItem;
