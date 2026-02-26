import { useRouter } from "next/router";
import { ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useNavigate from "../../utils/useNavigate";

const SearchBarItem = ({ img, name, descr, id, closeModal }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <ListGroupItem
      className="search-item"
      onClick={() => {
        navigate(`/product/${id}`);
        dispatch({ type: "menu/toggleSearchBar" });
        closeModal();
      }}
      action
    >
      <img src={img} alt={name} width={50} />
      <div className="search-item-info">
        <h3 className="h3 ProductListElement__name">{name}</h3>
        <p className="search-item-desc">{descr}</p>
      </div>
    </ListGroupItem>
  );
};

export default SearchBarItem;
