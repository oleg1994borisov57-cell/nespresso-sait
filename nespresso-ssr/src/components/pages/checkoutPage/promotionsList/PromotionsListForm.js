import { memo, useEffect, useRef } from "react";

import { MenuItem, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setPromoId,
  setPromoProductId,
  setStatus as setCartStatus,
} from "../../../../redux/slices/cartSlice";

import { Formik } from "formik";
import * as Yup from "yup";

function PromotionsListForm({ formFields }) {
  const { status } = useSelector((state) => state.cart);

  const formikRef = useRef(null);

  const dispatch = useDispatch();

  // const handleNext = () => {
  //   dispatch(nextStep());
  // };

  const externalSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (status === "validating") {
      externalSubmit();
      dispatch(setCartStatus("idle"));
    }
  }, [dispatch, status]);

  const initialValues = formFields.reduce(
    (acc, { key, value }) => ({ ...acc, [key]: value }),
    {}
  );

  const validationSchema = formFields.reduce((acc, { key, type, errMsg }) => {
    let schema;

    switch (type) {
      case "email":
        schema = Yup.string()
          .email("Invalid email")
          .required(errMsg)
          .typeError("Должно быть строкой.");
        break;
      case "number":
        schema = Yup.number().required(errMsg).typeError("Должно быть числом.");
        break;
      case "date":
        schema = Yup.date().required(errMsg).typeError("Должно быть датой.");
        break;
      default:
        schema = Yup.string()
          .required(errMsg)
          .typeError("Должно быть строкой.");
        break;
    }

    return { ...acc, [key]: schema };
  }, {});

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={({ promo, ...values }) => {
        dispatch(setPromoId(promo));
        dispatch(setPromoProductId(Object.values(values)));
        // handleNext();
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const items = formFields.map((params) => {
          const { key, options, onChange, label, type } = params;

          switch (type) {
            case "select":
              return (
                <TextField
                  select
                  sx={{
                    mt: "10px",
                  }}
                  SelectProps={{
                    value: values[key] ?? "",
                    MenuProps: {
                      sx: {
                        zIndex: 99999, // или любое другое высокое значение
                      },
                      // Альтернативный вариант через PaperProps:
                      PaperProps: {
                        sx: {
                          zIndex: 99999,
                        },
                      },
                    },
                  }}
                  error={Boolean(touched[key] && errors[key])}
                  helperText={touched[key] && errors[key]}
                  label={label}
                  id={key}
                  name={key}
                  onBlur={handleBlur}
                  value={values[key] ?? ""}
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                  fullWidth
                >
                  {options.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            default:
              throw new Error("Unknown type");
          }
        });

        return <>{items}</>;
      }}
    </Formik>
  );
}

export default memo(PromotionsListForm);
