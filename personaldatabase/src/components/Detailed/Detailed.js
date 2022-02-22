import React, { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import axios from "axios";
import { constants } from "../../Constants";
import { RouteContext } from "../../Contexts/RouterContext";
import { Row, Col, Button, Select, Input, Checkbox } from "antd";
import "antd/dist/antd.css";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "./Detailed.css";
import { BrowseContext } from "../../Contexts/BrowseContext";
import "../Post/Post.css";


const Detailed = () => {
  const { setRoute } = useContext(RouteContext);
  const { detailedObject, setDetailedObject } = useContext(BrowseContext);

  const [auctionItemsList, setAuctionItemsList] = useState([detailedObject]);

  const { TextArea } = Input;

  return (
    <div>
      <div id="PostHeader">
        <button id="back" onClick={() => setRoute("Browse")} style={{float: "left"}}>
          <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: "6px" }}/>
          Back
        </button>
        <div id="postView">
          <p id="postText"> Detailed view </p>
        </div>
        <button id="save" onClick={() => setRoute("Edit")} style={{float: "right"}}>
          Edit
          <EditOutlined style={{fontSize: "2.3vh", paddingLeft: "6px" }}/>
        </button>
      </div>

      <div id="postWrapper">
        <Row justify="space-around" align="middle" className="firstRow">
          <Col className="columnFirstRow" style={{width: "calc(33% - 5px)"}}>
            <Col
              className="categoryMenu"
              placeholder="Country"
            >{detailedObject.catalogueNumber ? detailedObject.catalogueNumber : "-"}
            </Col>
          </Col>
          <Col className="columnFirstRow" style={{width: "calc(66% - 5px)"}}>
          </Col>
        </Row>

        <Row justify="space-around" align="middle" className="secondRow">
          <Col className="columnThumbnail" style={{width: "calc(40% - 5px)"}}>
            <Col className="thumbnailFirstRow" style={{width: "calc(50% - 5px)"}}> 
            </Col>
            <Col className="thumbnailSecondRow">
            </Col>
          </Col>



          <Col className="columnInfo" style={{width: "calc(59% - 5px)"}}>
            <Row justify="space-around" align="middle" className="stampInfoRow">
              <Col className="stampInfoColumn" style={{width: "calc(100% - 5px)"}}>

                <Row justify="space-around" align="middle" className="stampInfoRowTopTop">
                  <Col
                    id="infoInput"
                    style={{minWidth: "130px"}}
                    placeholder="catalogText">{detailedObject.catalogueNumber ? detailedObject.catalogueNumber : "-"}
                  </Col>
                </Row>
                
                <Row align="middle" className="stampInfoRowTopBottom">
                  <Col id="infoInputStartingPrice" style={{minWidth: "180px"}} 
                    placeholder="Starting price" > {detailedObject.startingPrice  ? detailedObject.startingPrice : "-" }{detailedObject.currency ? detailedObject.currency : "" }
                  </Col>
                  <Col id="infoInputSellingPrice" style={{minWidth: "180px"}} 
                    placeholder="Selling price" > {detailedObject.sellingPrice ? detailedObject.sellingPrice : "-" }{detailedObject.currency ? detailedObject.currency : "" }
                  </Col>
                  <Col id="infoInputCurrency" 
                    placeholder="Selling price" >{detailedObject.currency ? detailedObject.currency : "" }
                  </Col>
                </Row>

              </Col>
            </Row>
            <Row justify="space-around" align="middle" className="stampSellerRow">
              <Col className="stampSellerColumn" style={{width: "calc(100% - 5px)"}}>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                </Row>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Detailed;