import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [
    {
      id: 1,
      name: "intensity",
      viewName: "Интенсивность",
      activeFilterId: 1,
      activeFilterName: "Выбрать всё",
      options: [
        {
          id: 1,
          name: "Выбрать всё",
        },
        {
          id: 2,
          name: "Легкий",
          value: "1-5",
        },
        {
          id: 3,
          name: "Средний",
          value: "6-8",
        },
        {
          id: 4,
          name: "Интенсивный",
          value: "9+",
        },
      ],
    },
    {
      id: 2,
      name: "cupSize",
      viewName: "Объем чашки",
      activeFilterId: 1,
      activeFilterName: "Выбрать всё",
      vertuoOptions: [
        {
          id: 1,
          name: "Выбрать всё",
        },
        {
          id: 5,
          name: "Double Esspresso",
        },
        {
          id: 6,
          name: "Gran Lungo",
        },
        {
          id: 7,
          name: "Mug",
        },
        {
          id: 8,
          name: "XL",
        },
        {
          id: 9,
          name: "Carafe",
        },
        // {
        //   id: 10,
        //   name: "Milk",
        // },
        // {
        //   id: 11,
        //   name: "Frozen",
        // },
      ],
      proOptions: [
        {
          id: 1,
          name: "Выбрать всё",
        },
        {
          id: 2,
          name: "Ristretto",
        },
        {
          id: 3,
          name: "Espresso",
        },
        {
          id: 4,
          name: "Lungo",
        },
      ],
      originalOptions: [
        {
          id: 1,
          name: "Выбрать всё",
        },
        {
          id: 2,
          name: "Ristretto",
        },
        {
          id: 3,
          name: "Espresso",
        },
        {
          id: 4,
          name: "Lungo",
        },
      ],
    },
  ],
  view: "grid",
};

const shopFilterSelectSlice = createSlice({
  name: "shopFilter",
  initialState,
  reducers: {
    addActiveFilter(state, action) {
      const filtredFilters = state.filters.map((filter) => {
        if (action.payload.filterName === filter.name) {
          return {
            ...filter,
            activeFilterId: action.payload.optionId,
            activeFilterName: action.payload.filterName,
          };
        }

        return filter;
      });

      state.filters = filtredFilters;
    },
    changeView(state, action) {
      state.view = action.payload;
    },
    clearFilters(state) {
      const clearedFilters = state.filters.map((filter) => {
        return { ...filter, activeFilterName: "Select all", activeFilterId: 1 };
      });

      state.filters = clearedFilters;
    },
  },
});

const { reducer, actions } = shopFilterSelectSlice;

export const { addActiveFilter, changeView, clearFilters } = actions;
export default reducer;
