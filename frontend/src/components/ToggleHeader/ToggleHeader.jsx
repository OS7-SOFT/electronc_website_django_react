import { useSelector } from "react-redux";
import "./ToggleHeader.css";
function ToggleHeader(props) {
  const handelMenu = () => {
    const navbar = window.document.getElementById("bottom-header");
    navbar.classList.toggle("close");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  return (
    <div
      id={`toggle-header`}
      className={`${props.name} mx-3`}
      onClick={
        props.name === "navbar-menu"
          ? handelMenu
          : () => props.onClick(props.name)
      }
    >
      <div
        className={
          "position-relative d-flex flex-column align-items-center text-white"
        }
      >
        {props.name === "navbar-menu"
          ? ""
          : props.name === "cart-list"
          ? cartItems.length > 0 && (
              <div className={"count"}>{cartItems.length}</div>
            )
          : props.name === "wishlist" &&
            wishlistItems.length > 0 && (
              <div className={"count"}>{wishlistItems.length}</div>
            )}
        <i className={props.icon}></i>
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default ToggleHeader;
