import InputMask from "react-input-mask";

const formatChars = {
  9: "[0-9]",
  "+": "[+8]",
  7: "7",
};

const PhoneMask = ({ children, ...props }) => {
  const mask =
    props.value[0] === "+" ? "+7 (999) 999 99 99" : "+ (999) 999 99 99";

  return (
    <InputMask formatChars={formatChars} mask={mask} maskChar={null} {...props}>
      {children}
    </InputMask>
  );
};

export default PhoneMask;
