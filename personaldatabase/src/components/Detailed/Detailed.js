import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import axios from "axios";
import { constants } from "../../Constants";
import { RouteContext } from "../../Contexts/RouterContext";
import { Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "./Detailed.css";

const Detailed = () => {
  const { setRoute } = useContext(RouteContext);

  const [auctionItemsList, setAuctionItemsList] = useState([]);

  const auctionItems = auctionItemsList.map((auction) => {

    return(
      <Row className="auctionItem" onClick={() => console.log(auction)} key={auction.id}>
        <Col className="image">
          <img className="auctionImage" src={logo} alt="Logo"></img>
        </Col>
        <Col className="catalogNumber">
          <div className="centeringWrapper">
            <h2 className="catalogText">{auction.catalogueNumber ? auction.catalogueNumber : "-"}</h2>
          </div>
        </Col>
        <Col className="description">
          <div className="centeringWrapperDescription">
            <h2 className="descriptionText">
              {auction.description ? auction.description : "-" }
            </h2>
          </div>
        </Col>
        <Col className="prices">
          <Row className="startingPrice">
            <div className="centeringWrapper">
              <h3 className="infoHeader">{auction.startingPrice  ? auction.startingPrice : "-" }{auction.currency ? auction.currency : "" }</h3>
            </div>
          </Row>
            
          <Row className="sellingPrice">
            <div className="centeringWrapper">
              <h3 className="infoHeader">{auction.sellingPrice ? auction.sellingPrice : "-" }{auction.currency ? auction.currency : "" }</h3>
            </div>
          </Row>
        </Col>
        <Col className="seller">
          <Row className="sellingYear">
            <div className="centeringWrapper">
              <h3 className="infoHeader">{auction.sellingYear ? auction.sellingYear : "-" }</h3>
            </div>
          </Row>
          <Row className="sellerName">
            <div className="centeringWrapper">
              <h3 className="infoHeader">{auction.seller ? auction.seller.name : "-" }</h3>
            </div>
          </Row>
        </Col>
      </Row>
    );
  });

  return (
    <div>
      <div id="browseHeader">
        <button id="back" onClick={() => setRoute("Browse")} style={{float: "left"}}>
          <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: "6px" }}/>
            Browse
        </button>
        <div id="browseView">
          <p id="browseText"> Detailed view </p>

        </div>
      </div>

      <div id="browseMainBody">
        {auctionItems}
      </div>
    </div>
  );
};
export default Detailed;