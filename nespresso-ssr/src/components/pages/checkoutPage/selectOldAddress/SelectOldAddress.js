import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../../../redux/slices/cartSlice";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectOldAddress() {
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const { shippingAddressesList } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onChooseOldAddress = (e) => {
    const currTarget = e.target;

    setSelectedAddressId(currTarget.value);
  };

  useEffect(() => {
    if (selectedAddressId) {
      const currAddress = shippingAddressesList.find(
        ({ id }) => id === selectedAddressId
      );

      dispatch(setShippingAddress(currAddress));
    }
  }, [selectedAddressId]);

  const items = shippingAddressesList.length ? (
    shippingAddressesList.map(({ address, id, fullName, city }) => (
      <MenuItem key={id} value={id}>
        {city} {address} ({fullName})
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>Нет адресов</MenuItem>
  );

  return (
    <TextField
      select
      SelectProps={{
        MenuProps: {
          sx: {
            zIndex: 9999, // Очень высокий z-index для меню
            // Дополнительные стили для меню
            '& .MuiPaper-root': {
              zIndex: '9999 !important',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)'
            }
          },
          // Рендеринг меню в body документа
          container: document.body,
          disablePortal: false
        }
      }}
      sx={{
        '& .MuiSelect-select': {
          zIndex: 100, // z-index для самого поля выбора
        },
        position: 'relative',
        zIndex: 100, // z-index для всего TextField
        marginTop: "10px"
      }}
      label="Список предыдущих адресов"
      value={selectedAddressId}
      onChange={onChooseOldAddress}
      fullWidth
    >
      {items}
    </TextField>
  );
}
