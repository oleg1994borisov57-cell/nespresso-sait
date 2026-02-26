const SingleProductIntensity = ({ count, color }) => {
  const bars = [];

  for (let i = 1; i <= 14; i++) {
    if (i <= count) {
      bars.push(
        <div
          key={i}
          className="intensity-scale-filled"
          style={{ backgroundColor: color ?? "rgb(8, 21, 55)" }}
        />
      );
    } else {
      bars.push(<div key={i} className="intensity-scale-empty" />);
    }
  }

  return (
    <div className="product-intensity-info">
      <div className="product-intensity-info-elements">{bars}</div>
      <div className="intensity-label">
        Intensity
        <br />
        {count}
      </div>
    </div>
  );
};

export default SingleProductIntensity;
