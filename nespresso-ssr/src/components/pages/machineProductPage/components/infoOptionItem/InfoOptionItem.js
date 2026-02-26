import { Image, OptionItemWrapper, Title } from "./styles";

export default function InfoOptionItem({ title, img }) {
  return (
    <OptionItemWrapper>
      <Image src={img} alt={title} />
      <Title
        sx={{
          padding: title.length <= 11 ? "0 40px 0 40px" : null,
        }}
      >
        {title}
      </Title>
    </OptionItemWrapper>
  );
}
