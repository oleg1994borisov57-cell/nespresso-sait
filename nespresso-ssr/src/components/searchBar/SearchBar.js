import { useEffect, useMemo, useState, useRef, forwardRef } from "react";
import CoffeeService from "../../services/CoffeeService";
import { ListGroup } from "react-bootstrap";
import SearchBarItem from "../searchBarItem/SearchBarItem";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState([]);

  const { getAllProducts } = new CoffeeService();

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  const onType = (e) => {
    setValue(e.target.value);
  };

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setFocused(false);
      }
    };

    if (focused) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [focused]);

  const onFocus = () => {
    setFocused(true);
  };

  const filtredProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    if (!value) {
      return [];
    }
    return products.filter((product) => {
      if (
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.desc.toLowerCase().includes(value.toLowerCase())
      ) {
        return product;
      } else {
        return false;
      }
    });
  }, [value, products]);

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onFocus={onFocus}
        onChange={onType}
        className="form-control"
        type="text"
        placeholder="Поиск"
        aria-label="Search"
      />
      {focused ? (
        <PopUp
          ref={modalRef}
          closeModal={() => setFocused(false)}
          products={filtredProducts}
        />
      ) : null}
    </>
  );
};

const PopUp = forwardRef(({ products, closeModal }, ref) => {
  const items = products.map(({ product_id, img, title, desc }) => {
    return (
      <SearchBarItem
        key={product_id}
        closeModal={closeModal}
        id={product_id}
        name={title}
        img={img}
        descr={desc}
      />
    );
  });

  return (
    <ListGroup ref={ref} className="search-wrapper">
      {items}
    </ListGroup>
  );
});

export default SearchBar;
