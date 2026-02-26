import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setShippingAddress,
  setStatus,
} from "../../../../redux/slices/cartSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import PhoneMask from "../../../masks/phoneMask/PhoneMask";
import isSameDayAndAfter6PM from "../../../../utils/isSameDayAndAfter6PM";
// import context from "react-bootstrap/esm/AccordionContext";

const DeliveryForm = () => {
  const dispatch = useDispatch();

  const formikRef = useRef(null);

  const { shippingAddress, shippingAddressesList, status } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (status === "validating") {
      externalSubmit();
      dispatch(setStatus("idle"));
    }
  }, [dispatch, status]);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const externalSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        isIndividual: true,
        id: shippingAddress?.id ?? shippingAddressesList.length + 1,
        fullName: shippingAddress?.fullName ?? "",
        mobile: shippingAddress?.mobile ?? "+7",
        address: shippingAddress?.address ?? "",
        city: shippingAddress?.city ?? "",
        date:
          shippingAddress?.date &&
          dayjs(shippingAddress.date).isAfter(dayjs().add(1, "day"))
            ? dayjs(shippingAddress.date)
            : dayjs().add(1, "day"),
        type: shippingAddress?.type ?? "address",
        time: shippingAddress?.time ?? "",
        email: shippingAddress?.email ?? "",
        mrr: true,
        inn: "",
        policeConcent: false,
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().max(255).required("Введите своё ФИО"),
        mobile: Yup.string()
          .phoneValidation("Номер телефона введён неверно.")
          .required("Пожалуйста, введите свой номер телефона"),
        address: Yup.string().max(255).required("Введите адрес доставки"),
        city: Yup.string().max(255).required("Введите город"),
        date: Yup.string().required("Выберите дату доставки"),
        time: Yup.string().required("Выберите время доставки"),
        email: Yup.string().email("Введите корректный email адрес"),
        mrr: Yup.bool()
          .oneOf([true, false], "Выберите корректное значение")
          .required("Выберите корректное значение"),
        policeConcent: Yup.bool().oneOf(
          [true],
          "Подтвердите согласие с политикой конфиденциальности"
        ),
      })}
      onSubmit={(values) => {
        const paymentValues = { ...values };

        delete paymentValues.policeConcent;

        dispatch(
          setShippingAddress({
            ...paymentValues,
            date: paymentValues.date.format("YYYY-MM-DD"),
          })
        );
        handleNext();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="ФИО"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneMask
                  id="mobile"
                  name="mobile"
                  autoComplete="phone"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      type="tel"
                      required
                      label="Номер телефона"
                      fullWidth
                      variant="standard"
                      error={Boolean(touched.mobile && errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  )}
                </PhoneMask>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Эл. Почта (Необязательно, необходимо для получения уведомлений о заказе.)"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Адрес доставки"
                  fullWidth
                  autoComplete="shipping address"
                  variant="standard"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Город"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  select
                  label="Ваш адрес находится в пределах мкада?"
                  id="mrr"
                  name="mrr"
                  value={values.mrr}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.mrr && errors.mrr)}
                  helperText={touched.mrr && errors.mrr}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      sx: {
                        zIndex: 9999, // Очень высокий z-index для меню
                        // Дополнительные стили для меню
                        "& .MuiPaper-root": {
                          zIndex: "9999 !important",
                          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                        },
                      },
                      // Рендеринг меню в body документа
                      container: document.body,
                      disablePortal: false,
                    },
                  }}
                  sx={{
                    "& .MuiSelect-select": {
                      zIndex: 100, // z-index для самого поля выбора
                    },
                    position: "relative",
                    zIndex: 100, // z-index для всего TextField
                  }}
                >
                  <MenuItem value={true}>Да</MenuItem>
                  <MenuItem value={false}>Нет</MenuItem>
                </TextField>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  adapterLocale="ru"
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    label="Дата доставки"
                    minDate={dayjs().add(1, "day")}
                    format="DD.MM.YYYY"
                    id="date"
                    name="date"
                    value={values.date}
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.date && errors.date)}
                    helperText={touched.date && errors.date}
                    slotProps={{
                      dialog: {
                        sx: {
                          zIndex: 9999,
                        },
                      },
                      popper: {
                        sx: {
                          zIndex: 9999,
                          "& .MuiPaper-root": {
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                            boxSizing: "content-box", // Явно устанавливаем border-box
                          },
                        },
                      },
                      textField: {
                        sx: {
                          width: "100%",
                          "& .MuiInputBase-root": {
                            zIndex: "auto",
                            boxSizing: "content-box", // И для текстового поля тоже
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                sx={(theme) => ({
                  [theme.breakpoints.down(769)]: {
                    paddingTop: "10px !important",
                  },
                })}
                xs={12}
                sm={6}
              >
                <TextField
                  select
                  label="Время доставки"
                  id="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.time && errors.time)}
                  helperText={touched.time && errors.time}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      sx: {
                        zIndex: 9999, // Очень высокий z-index для меню
                        // Дополнительные стили для меню
                        "& .MuiPaper-root": {
                          zIndex: "9999 !important",
                          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                        },
                      },
                      // Рендеринг меню в body документа
                      container: document.body,
                      disablePortal: false,
                    },
                  }}
                  sx={{
                    "& .MuiSelect-select": {
                      zIndex: 100, // z-index для самого поля выбора
                    },
                    position: "relative",
                    zIndex: 100, // z-index для всего TextField
                  }}
                >
                  {!isSameDayAndAfter6PM(values.date, dayjs().add(1, "day")) ? (
                    <MenuItem value={"10-14"}>С 10 до 14</MenuItem>
                  ) : null}
                  <MenuItem value={"14-18"}>С 14 до 18</MenuItem>
                  <MenuItem value={"18-23"}>С 18 до 22</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="policeConcent"
                      name="policeConcent"
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                      checked={values.policeConcent}
                      onClick={handleChange}
                    />
                  }
                  label={
                    <Typography variant="body1">
                      Согласен с{" "}
                      <Link
                        style={{
                          color: "black",
                          textDecorationLine: "underline",
                        }}
                        onClick={() => {
                          dispatch({ type: "menu/toggleCart" });
                        }}
                        href={"/about/privacyPolicy"}
                      >
                        Политикой конфиденциальности
                      </Link>
                    </Typography>
                  }
                />
                {touched.policeConcent && errors.policeConcent ? (
                  <FormHelperText error={Boolean(touched.time && errors.time)}>
                    {errors.policeConcent}
                  </FormHelperText>
                ) : null}
                {/* </FormControl> */}
              </Grid>
            </Grid>
          </>
        );
      }}
    </Formik>
  );
};

export default DeliveryForm;
