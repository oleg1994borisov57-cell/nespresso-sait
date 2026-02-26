import { useEffect, useState } from "react";

const UpButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return show ? (
    <div onClick={scrollUp} id="plp-up">
      ↑
    </div>
  ) : null;
};

export default UpButton;
