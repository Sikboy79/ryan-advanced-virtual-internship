import React from "react";

const ForYou = () => {
  return (
    <div id="__next">
      <div className="wrapper">
        <div className="search__background">
          <div className="search__wrapper">
            <figure>
              <img src="logo" alt=""></img>
            </figure>
            <div className="search__content">
              <div className="search">
                <div className="search__input--wrapper">
                  <input
                    className="search__input"
                    placeholder="Search for books"
                    type="text"
                    value
                  ></input>
                  <div className="search__icon">
                    <svg>hourglass</svg>
                  </div>
                </div>
                <div className="sidebar__toggle--btn">
                    <svg></svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ForYou;
