import { Box } from "@mui/material";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <div id="enriched_plp">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="enriched_header"
        >
          <Box
            sx={{
              paddingTop: "150px",
              height: "57vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 className="h1 top_20">404</h1>
            <p>Страница не найдена</p>
            <Link href="/" className="button--cta button--secondary size--48">
              На главную
            </Link>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Page404;
