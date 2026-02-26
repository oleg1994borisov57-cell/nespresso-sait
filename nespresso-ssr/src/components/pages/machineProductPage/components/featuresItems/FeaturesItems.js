import {
  FeatureItem,
  FeatureItemTitle,
  FeatureItemValue,
  Features,
} from "./styles";

export default function FeaturesItems({ features }) {
  const items = Object.entries(features).map(([title, value], i) => {
    return (
      <FeatureItem key={i}>
        <FeatureItemTitle component="span">{title}</FeatureItemTitle>
        <FeatureItemValue component="span">{value}</FeatureItemValue>
      </FeatureItem>
    );
  });

  return <Features>{items}</Features>;
}
