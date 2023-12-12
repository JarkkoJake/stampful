import React, { useContext } from "react";
import { RouteContext } from "../../Contexts/RouterContext";
import { Row, Col, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "antd/dist/antd.css";
import { constants } from "../../Constants";
import { BrowseContext } from "../../Contexts/BrowseContext";

export const SingleView = () => {

  const { setRoute } = useContext(RouteContext);
  const { singleAuction } = useContext(BrowseContext);
  const { TextArea } = Input;
  React.useEffect(() => console.log(singleAuction), [singleAuction]);

  return (
    <div>
      <div id="PostHeader">
        <button id="back" onClick={() => setRoute("Browse")} style={{float: "left"}}>
          <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: "6px" }}/>
          Back
        </button>
        <div id="postView">
          <p id="postText">{`Auction - ${singleAuction.id || "not found"}`}</p>
        </div>
      </div>
      {singleAuction && (
        <div id="postWrapper">
          <Row justify="space-around" align="middle" className="firstRow">
            <Col className="columnFirstRow" style={{width: "calc(33% - 5px)"}}>
              <select disabled name="country" id="country" className="selectBoxPost">
                <option>{singleAuction.country ?
                  singleAuction.country.name :
                  "Contry"}
                </option>
              </select>
            
              <select disabled name="category1" id="category1" className="selectBoxPost" >
                <option>{singleAuction.category1 ? 
                  singleAuction.category1.category1 :
                  "Category1"}
                </option>
              </select>

              <select disabled name="category2" id="category2" className="selectBoxPost">
                <option>{singleAuction.category2 ?
                  singleAuction.category2.category2 :
                  "Category2"}
                </option>
              </select>

              <select disabled name="category3" id="category3" className="selectBoxPost" >
                <option>{singleAuction.category3?
                  singleAuction.category3.category3 :
                  "Category 3"}
                </option>
              </select>

            </Col>

            <Col className="columnFirstRow" style={{width: "calc(66% - 5px)"}}>
              <TextArea
                placeholder="Description"
                rows={2}
                id="descriptionField"
                defaultValue={singleAuction.description || ""}
                disabled
                readOnly
              />
            </Col>

          </Row>

          <Row justify="space-around" align="middle" className="secondRow">
            <Col className="columnThumbnail" style={{width: "calc(40% - 5px)"}}>
              <Row className="thumbnailFirstRow"> 
                <img id="thumbnail" className="postMainImage" src={singleAuction.thumbnail ?
                  constants.URL + "/" + singleAuction.thumbnail.path : logo} alt="Logo"/>
              </Row>
              <Row className="thumbnailSecondRow" id="additionalImages">
                {singleAuction.additionalImages.map((img, ind) => <div key={ind} style={{position: "relative"}}>
                  {img.path !== singleAuction.thumbnail?.path && <img className="columnThumbnailAdditional"
                    key={`AdditionalImage_${ind}`}
                    src={constants.URL + "/" + img.path}
                  />}
                </div>)}
              </Row>
            </Col>


            <Col className="columnInfo" style={{width: "calc(59% - 5px)"}}>
              <Row justify="space-around" align="middle" className="stampInfoRow">
                <Col className="stampInfoColumn" style={{width: "calc(100% - 5px)"}}>

                  <Row align="middle" className="stampInfoRowTopTop">
                    <div className="checkboxes">
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Used</label>
                        <input readOnly checked={singleAuction.used} className="checkboxPost" type="checkbox" disabled/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Mint</label>
                        <input readOnly checked={singleAuction.mint} className="checkboxPost" type="checkbox" disabled/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Postal</label>
                        <input readOnly checked={singleAuction.postalItem} className="checkboxPost" type="checkbox" disabled/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Cert.</label>
                        <input readOnly checked={singleAuction.certificate} className="checkboxPost" type="checkbox" disabled/>
                      </div>
                    </div>
                  </Row>

                  <Row className="stampInfoRowTopBottom">
                    <input readOnly defaultValue={singleAuction.catalogueNumber || "Catalogue number"} className="infoInput" disabled/>
                    <input readOnly defaultValue={singleAuction.startingPrice || "Starting price"} className="infoInput" disabled/>
                    <input readOnly defaultValue={singleAuction.sellingPrice || "Selling price"} className="infoInput" disabled/>
                    <input className="infoInputCurrency" readOnly value={"€"}/>
                  </Row>

                </Col>
              </Row>
              <Row justify="space-around" align="middle" className="stampSellerRow">
                <Col className="stampSellerColumn" style={{width: "calc(100% - 5px)"}}>
                  <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                    <input readOnly disabled className="infoInputBottom" defaultValue={singleAuction.sellingYear} placeholder={"Selling year"}/>
                    <input readOnly disabled className="infoInputBottom" defaultValue={singleAuction.auctionNumber} placeholder={"Auction number"}/>
                  </Row>
                  <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                    <select name="seller" id="seller" className="infoInputBottom">
                      <option>{singleAuction.seller ? singleAuction.seller.name : "Seller"}</option>
                    </select>
                    <input readOnly defaultValue={singleAuction.lotNumber} className="infoInputBottom" placeholder={"Lot number"}/>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
