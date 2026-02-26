import * as Yup from "yup";
import { PHONE_BASIC_REGEX, PHONE_HOME_REGEX } from "../constants/regex";

const firstSymbolVariants = {
  "+": PHONE_BASIC_REGEX,
  8: PHONE_HOME_REGEX,
};

// Добавляем пользовательский метод
Yup.addMethod(Yup.string, "phoneValidation", function (msg) {
  return this.test("phoneValidation", msg, (value) => {
    if (!value) {
      return false; // Пустое значение не валидно
    }

    const regEx = firstSymbolVariants[value[0]];

    if (regEx) {
      return regEx.test(value);
    }

    return false;
  });
});

export default Yup;
