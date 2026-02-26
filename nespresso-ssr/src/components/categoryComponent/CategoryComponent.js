import { Box } from "@mui/material";
import { replaceSpacesWithUnderscore } from "../../utils/replaceSpacesWithUnderscore";
import Image from "next/image";

export default function CategoryComponent({
  bg,
  title,
  subtitle,
  desc,
  blur,
  className,
  categoryPos,
  children,
}) {
  const blurClassName = blur ? "blur" : "";

  return (
    <div className={`range product_range top_40 ${className} ${blurClassName}`}>
      <div className="range_id" id={replaceSpacesWithUnderscore(title)} />{" "}
      <Box
        className="bg"
        sx={{
          height: "calc(100% - 128px) !important",
          maxHeight: "calc(100vw * 880 / 1920)",
          overflow: "hidden",
          "&::after": {
            content: `""`,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0px",
            right: "0px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,1) 96%)",
          },
        }}
      >
        <Image
          className="bg lazyload"
          style={{
            width: "120%",
            filter: "blur(10px)",
          }}
          src={bg}
          priority={categoryPos === 0}
          alt={title}
          width={800}
          height={288}
        />
      </Box>
      <p className="h1 font-normal ptop_20">{title}</p>
      <h2 className="h3 font-bold top_20">{subtitle}</h2>
      <p className="p3 top_20">{desc}</p>
      <div className="articles top_40">{children}</div>
    </div>
  );
}
