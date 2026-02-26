import { memo } from "react";

const Intencity = ({ count }) => {
  const bars = [];

  for (let i = 1; i <= 12; i++) {
    if (i <= count) {
      bars.push(<div key={i} className="bar full" />);
    } else {
      bars.push(<div key={i} className="bar empty" />);
    }
  }

  return (
    <div className="intensity">
      <div className="bars">{bars}</div>
      <div className="label top_6">
        Intensity
        <br />
        {count}
      </div>
    </div>
  );
};

export default memo(Intencity);
