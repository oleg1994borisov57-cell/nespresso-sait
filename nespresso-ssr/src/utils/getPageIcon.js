import OriginalPageIcon from "../resources/icons/pages/originalIcon.svg";
import VertuoPageIcon from "../resources/icons/pages/vertuoIcon.svg";
import ProPageIcon from "../resources/icons/pages/proIcon.svg";

export default function getPageIcon(page) {
  switch (page) {
    case "original":
      return <OriginalPageIcon />;
    case "vertuo":
      return <VertuoPageIcon />;
    case "pro":
      return <ProPageIcon />;
    default:
      throw new Error("Page icon not found, check your redux slice with pages");
  }
}
