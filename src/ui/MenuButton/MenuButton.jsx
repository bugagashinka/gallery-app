import React, { useState } from "react";
import classNames from "classnames";

const MenuButton = (props) => {
  const [active, toggleButton] = useState(false);
  const clickHandler = () => toggleButton((state) => !state);

  const buttonStyle = classNames("button", "app__menu-btn", "menu-btn", {
    "menu-btn_active": active,
  });
  return (
    <button className={buttonStyle} onClick={clickHandler} type="button">
      <div className="menu-btn__row1"></div>
      <div className="menu-btn__row2"></div>
      <div className="menu-btn__row3"></div>
    </button>
  );
};

export default MenuButton;
