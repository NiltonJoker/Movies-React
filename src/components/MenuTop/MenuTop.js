import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <div className="menu-top__logo">
        <Link to="/"><Logo /></Link>
      </div>
      <Menu
        theme="dark"
        className="menu-top__menu"
        mode="horizontal"
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/new-movies">Últimos Lanzamientos</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/popular">Populares</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/search">Buscador</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
