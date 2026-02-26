const AromaticPoints = ({ count }) => {
  const items = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      items.push(<div key={i} className="product-circle-filled" />);
    } else {
      items.push(<div key={i} className="product-circle-empty" />);
    }
  }

  return <>{items}</>;
};

export default AromaticPoints;
