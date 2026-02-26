import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setShippingAddress,
  setStatus,
} from "../../../../redux/slices/cartSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { handleOpen } from "../../../../redux/slices/alertSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const phoneRegex = /^(?:8|\+7)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

const CdekDeliveryForm = ({ address }) => {
  const dispatch = useDispatch();

  const formikRef = useRef(null);

  const status = useSelector((state) => state.cart.status);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const externalSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (status === "validating") {
      externalSubmit();
      dispatch(setStatus("idle"));
    }
  }, [dispatch, status]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        fullName: "",
        mobile: "+7",
        date: dayjs().add(1, "day"),
        time: "",
        email: "",
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().max(255).required("Введите своё ФИО"),
        mobile: Yup.string()
          .matches(phoneRegex, "Номер телефона введён неверно.")
          .required("Пожалуйста, введите свой номер телефона"),
        date: Yup.string().required("Выберите дату доставки"),
        time: Yup.string().required("Выберите время доставки"),
        email: Yup.string().email("Введите корректный email адрес"),
      })}
      onSubmit={(values) => {
        if (address) {
          dispatch(
            setShippingAddress({
              ...values,
              ...address,
              date: values.date.format("YYYY-MM-DD"),
            })
          );
          handleNext();
        } else {
          dispatch(
            handleOpen({
              message: "Выберите пункт выдачи",
              title: "Произошла ошибка",
            })
          );
        }
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
                  autoComplete="full-name"
                  variant="standard"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Номер телефона"
                  fullWidth
                  type="phone"
                  autoComplete="shipping mobile-phone"
                  variant="standard"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.mobile && errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Эл. Почта (Необязательно, необходимо для получения уведомлений о заказе.)"
                  fullWidth
                  autoComplete="shipping email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    sx={{ width: "100%" }}
                    onBlur={handleBlur}
                    error={Boolean(touched.date && errors.date)}
                    helperText={touched.date && errors.date}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Время доставки"
                  id="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.time && errors.time)}
                  sx={{
                    "& .MuiSelect-select": {
                      zIndex: 100, // z-index для самого поля выбора
                    },
                    position: "relative",
                    zIndex: 100, // z-index для всего TextField
                  }}
                  helperText={touched.time && errors.time}
                  fullWidth
                >
                  <MenuItem value={"10-14"}>С 12 до 18</MenuItem>
                  <MenuItem value={"14-18"}>С 12 до 18</MenuItem>
                  <MenuItem value={"18-23"}>С 18 до 21</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </>
        );
      }}
    </Formik>
  );
};

export default CdekDeliveryForm;
