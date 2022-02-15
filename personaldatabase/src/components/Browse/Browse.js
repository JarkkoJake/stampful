import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import axios from "axios";
import { constants } from "../../Constants";
import PropTypes from "prop-types";
import { RouteContext } from "../../Contexts/RouterContext";
import { Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "./Browse.css";

const Browse = () => {
  const { setRoute } = useContext(RouteContext);

  const [auctionItemsList, setAuctionItemsList] = useState([]);
  const pageNumber = useRef(1);

  const URL = constants.URL;

  useLayoutEffect(() => {
    axios
      .get(`${URL}/auctions/listbrowse?page=${pageNumber.current}&orderBy=id`)
      .then((res) => {
        console.log(res.data);
        setAuctionItemsList(res.data.auctions);
      });
  },[]);

  const changePage = (direction) => {
    if ((direction < 0 && pageNumber.current === 1) || (auctionItemsList.length < 10 && direction > 0)) {
      null;
    } else {
      axios
        .get(`${URL}/auctions/listbrowse?page=${pageNumber.current + direction}&orderBy=id`)
        .then((res) => {
          console.log(res.data);
          setAuctionItemsList(res.data.auctions);
          pageNumber.current = pageNumber.current + 1 * direction;
        });
    }
  };

  const auctionItems = auctionItemsList.map((auction) => {
    return (
      <Row className="auctionItem" key={auction.id}>
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
        <button id="back" onClick={() => setRoute("Menu")} style={{float: "left"}}>
          <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: "6px" }}/>
          Back
        </button>
        <div id="browseView">
          <p id="browseText"> Browse view </p>
          
        </div>
      </div>

      <div id="browseMainBody">
        {auctionItems}
      </div>
      <div className="paginationButtons">
        <Button size="default" shape="round" className="paginationButtonPrevious" onClick={() => changePage(-1)}>
          <p className="paginationText"><ArrowLeftOutlined />
          Previous page</p>
        </Button>
        <Button size="default" shape="round" className="paginationButtonNext" onClick={() => changePage(1)}>
          <p className="paginationText">Next page
            <ArrowRightOutlined /></p>
        </Button>
      </div>
    </div>
  );
    
};

export default Browse;
