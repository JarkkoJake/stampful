import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import axios from "axios";
import { constants } from "../../Constants";
import { RouteContext } from "../../Contexts/RouterContext";
import { Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "./Browse.css";

const Browse = () => {
  const { setRoute } = useContext(RouteContext);

  const [auctionItemsList, setAuctionItemsList] = useState([]);
  const pageNumber = useRef(1);
  const maxPageNumber = useRef(1);

  const URL = constants.URL;

  useEffect(() => {
    axios
      .get(`${URL}/auctions/listbrowse?page=${pageNumber.current}&orderBy=id`)
      .then((res) => {
        maxPageNumber.current = res.data.info.totalPages;
        setAuctionItemsList(res.data.auctions);
      });
  },[]);

  const changePage = (direction) => {
    if ((direction < 0 && pageNumber.current === 1) || (pageNumber.current === maxPageNumber.current && direction > 0)) {
      null;
    } else {
      axios
        .get(`${URL}/auctions/listbrowse?page=${pageNumber.current + direction}&orderBy=id`)
        .then((res) => {
          pageNumber.current = pageNumber.current + 1 * direction;
          maxPageNumber.current = res.data.info.totalPages;
          setAuctionItemsList(res.data.auctions);
          
        });
    }
  };

  const directPageChange = (number) => {
    if (number === 0) number = maxPageNumber.current;
    axios
      .get(`${URL}/auctions/listbrowse?page=${number}&orderBy=id`)
      .then((res) => {
        pageNumber.current = number;
        maxPageNumber.current = res.data.info.totalPages;
        setAuctionItemsList(res.data.auctions);
      });
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
        <div className="allLeft" onClick={() => directPageChange(1)}>
          <DoubleLeftOutlined style={{fontSize: "14px"}}/>
        </div>
        <div className="left">
          <LeftOutlined onClick={() => changePage(-1)} style={{fontSize: "14px"}}/>
        </div>
        <div className="pageNumers">
          {pageNumber.current}/{maxPageNumber.current}
        </div>
        <div className="right">
          <RightOutlined onClick={() => changePage(1)} style={{fontSize: "14px"}}/>
        </div>
        <div className="allRight">
          <DoubleRightOutlined onClick={() => directPageChange(0)} style={{fontSize: "14px"}}/>
        </div>
      </div>
    </div>
  );
    
};

export default Browse;
