import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import { BrowseContext } from "../../Contexts/BrowseContext";
import { Drawer } from "antd";
import { constants } from "../../Constants";
import axios from "axios";
import "antd/dist/antd.css";
import { MenuOutlined } from "@ant-design/icons";
import "./Browse.css";

const DrawerComponent = (props) => {
  const { requestObject } = useContext(BrowseContext);

  const [country, setCountry] = useState([]);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [seller, setSeller] = useState([]);

  const URL = constants.URL;

  const changeCountry = (element)=> {
    console.log(element);
    axios
      .get(`${URL}/dropdown/category1?country=${element}`)
      .then((res) => {
        console.log(res);
        setCategory1(res.data);
      });
  };

  const changeCategory1 = (element)=> {
    axios
      .get(`${URL}/dropdown/category2?category1=${element}`)
      .then((res) => {
        setCategory2(res.data);
      });
  };

  const changeCategory2 = (element)=> {
    axios
      .get(`${URL}/dropdown/category3?category2=${element}`)
      .then((res) => {
        setCategory3(res.data);
      });
  };

  useLayoutEffect(() => {
    axios
      .get(`${URL}/dropdown/country`)
      .then((res) => {
        setCountry(res.data);
      });
    axios
      .get(`${URL}/dropdown/seller`)
      .then((res) => {
        setSeller(res.data);
      });
  },[]);

  const countryOptions = country.map((country) =>
    <option key={country.id} value={country.id}>{country.name}</option>
  );

  const category1Options = category1.map((category) =>
    <option key={category.id} value={category.id}>{category.category1}</option>
  );

  const category2Options = category2.map((category) =>
    <option key={category.id} value={category.id}>{category.category2}</option>
  );

  const category3Options = category3.map((category) =>
    <option key={category.id} value={category.id}>{category.category3}</option>
  );

  const sellerOptions = seller.map((seller) =>
    <option key={seller.id} value={seller.id}>{seller.name}</option>
  );


  return (
    <Drawer
      placement="left"
      onClose={props.closeFunction}
      closable={true}
      visible={props.visible}
      key="left"
      maskClosable={false}
      width={"380px"}
    >
      <button id="clearAll">
        Clear all
      </button>
      <div className="filterWrapper">
        <select name="country" id="country" className="selectBox" onChange={(e) => {changeCountry(e.target.value);}}>
          <option value="" selected disabled hidden>Country</option>
          {countryOptions}
        </select>
        <select disabled={category1.length === 0} name="category1" id="category1" className="selectBox" onChange={(e) => {changeCategory1(e.target.value);}}>
          <option value="" selected disabled hidden>Category 1</option>
          {category1Options}
        </select>
        <select disabled={category2.length === 0} name="category2" id="category2" className="selectBox" onChange={(e) => {changeCategory2(e.target.value);}}>
          <option value="" selected disabled hidden>Category 2</option>
          {category2Options}
        </select>
        <select disabled={category3.length === 0} name="category3" id="category2" className="selectBox" onChange={(e) => {}}>
          <option value="" selected disabled hidden>Category 3</option>
          {category3Options}
        </select>
        <select disabled={seller.length === 0} name="seller" id="seller" className="selectBox" onChange={(e) => {}}>
          <option value="" selected disabled hidden>Seller</option>
          {sellerOptions}
        </select>

        <div className="price">
          <input type="number" id="min" name="min" min="0" placeholder="Min price"/>
          <span id="priceDivider">-</span>
          <input type="number" id="max" name="max" min="0" placeholder="Max price"/>
        </div>
        <div className="checkboxes">
          <div className="checkboxWrapper">
            <label className="checkboxHeader">Used</label>
            <input className="checkbox" type="checkbox"/>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxHeader">Mint</label>
            <input className="checkbox" type="checkbox"/>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxHeader">Postal</label>
            <input className="checkbox" type="checkbox"/>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxHeader">Cert.</label>
            <input className="checkbox" type="checkbox"/>
          </div>
        </div>
      </div>
    </Drawer>
  );
    
};

export default DrawerComponent ;
