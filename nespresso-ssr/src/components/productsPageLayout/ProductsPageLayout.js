import { Main, PageWrapper } from "./styles";

const ProductsPageLayout = ({ children }) => {
  return (
    <Main>
      <PageWrapper>{children}</PageWrapper>
    </Main>
  );
};

export default ProductsPageLayout;
