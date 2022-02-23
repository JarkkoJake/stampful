import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RouteContext } from "../../Contexts/RouterContext";
import { PostContext } from "../../Contexts/PostContext";
import { constants } from "../../Constants";
import { Row, Col, Select, Input } from "antd";
import axios from "axios";
import { ArrowLeftOutlined, SaveOutlined  } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "antd/dist/antd.css";
import "./Post.css";

const Post = () => {

  const { setRoute } = useContext(RouteContext);
  const { setPostContent, setPostItem, saveAuction, imageData, setImageData} = useContext(PostContext);


  const { TextArea } = Input;
  
  const additionalImages = ["image1", "image2", "image3"];

  const [countryOptionsArray, setCountryOptionsArray] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  const changeCountry = (element)=> {
    setPostItem("country", element);
    setPostItem("category1", null);
    setPostItem("category2", null);
    setPostItem("category3", null);
    setCategory1([]);
    setCategory2([]);
    setCategory3([]);
    axios
      .get(`${constants.URL}/dropdown/category1?country=${element}`)
      .then((res) => {
        setCategory1(res.data);
      });
  };

  const changeCategory1 = (element)=> {
    setPostItem("category1", element);
    setPostItem("category2", null);
    setPostItem("category3", null);
    setCategory2([]);
    setCategory3([]);
    axios
      .get(`${constants.URL}/dropdown/category2?category1=${element}`)
      .then((res) => {
        setCategory2(res.data);
      });
  };

  const changeCategory2 = (element)=> {
    setPostItem("category2", element);
    setPostItem("category3", null);
    setCategory3([]);
    axios
      .get(`${constants.URL}/dropdown/category3?category2=${element}`)
      .then((res) => {
        setCategory3(res.data);
      });
  };

  const changeCategory3 = (element)=> {
    setPostItem("category3", element);
  };



  useLayoutEffect(() => {
    axios
      .get(`${constants.URL}/dropdown/country`)
      .then((res) => {
        setCountryOptionsArray(res.data);
      });
    axios
      .get(`${constants.URL}/dropdown/seller`)
      .then((res) => {
        setSellerList(res.data);
      });
  },[]);

  useEffect(() => { // TODO : Preserve some details.
    setPostContent({});
  },[]);

  const saveAuctionButton = () => {
    saveAuction();
    setRoute("Browse");
  };


  // Images -------------------

  const [thumbnailUpdate, setThumbnailUpdate] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  const changeImage = (e) => {
    console.log(e.target.id);
    console.log(e.target.files);
    imageData.set(e.target.id, e.target.files[0]);
    setThumbnailUpdate(e.target.files[0]);
    setImageData(imageData);
  };
  
  useLayoutEffect(() => {
    if (imageData.get("thumbnail")) {
      document.getElementById("imagetesting").src = URL.createObjectURL(imageData.get("thumbnail"));
    }
  }, [thumbnailUpdate]);

  //----------------------------

  const imagesColumns = additionalImages.map((image) =>
    <img
      key={image}
      id={image}
      src={logo}
      className={"columnThumbnailAdditional"}/>
  );



  const countryOptions = countryOptionsArray.map((country) =>
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

  const sellerOptions = sellerList.map((seller) =>
    <option key={seller.id} value={seller.id}>{seller.name}</option>
  );

  return (
    <div>
      <div id="PostHeader">
        <button id="back" onClick={() => setRoute("Menu")} style={{float: "left"}}>
          <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: "6px" }}/>
          Back
        </button>
        <div id="postView">
          <p id="postText"> Post view </p>
        </div>
        <button id="save" onClick={() => saveAuctionButton()} style={{float: "right"}}>
          Save
          <SaveOutlined style={{fontSize: "2.3vh", paddingLeft: "6px" }}/>
        </button>
      </div>
      <div id="postWrapper">
        <Row justify="space-around" align="middle" className="firstRow">
          <Col className="columnFirstRow" style={{width: "calc(33% - 5px)"}}>
            <select name="country" id="country" className="selectBoxPost" onChange={(e) => {changeCountry(e.target.value);}}>
              <option value="" hidden>Country</option>
              {countryOptions}
            </select>
            <select disabled={category1.length === 0} name="category1" id="category1" className="selectBoxPost" onChange={(e) => {changeCategory1(e.target.value);}}>
              <option value="" hidden>Category 1</option>
              {category1Options}
            </select>
            <select disabled={category2.length === 0} name="category2" id="category2" className="selectBoxPost" onChange={(e) => {changeCategory2(e.target.value);}}>
              <option value="" hidden>Category 2</option>
              {category2Options}
            </select>
            <select disabled={category3.length === 0} name="category3" id="category3" className="selectBoxPost" onChange={(e) => {changeCategory3(e.target.value);}}>
              <option value="" hidden>Category 3</option>
              {category3Options}
            </select>

          </Col>
          <Col className="columnFirstRow" style={{width: "calc(66% - 5px)"}}>
            <TextArea
              placeholder="Description"
              rows={2}
              id="descriptionField"
              onChange={(e) => setPostItem("description", e.target.value)}
            />
          </Col>
        </Row>
        <Row justify="space-around" align="middle" className="secondRow">

          <Col className="columnThumbnail" style={{width: "calc(40% - 5px)"}}>

            <Row className="thumbnailFirstRow"> 
              {/*TESTING-----------------------*/}
              <img id="imagetesting" className="postMainImage" src={imageData.get("thumbnail") ? URL.createObjectURL(imageData.get("thumbnail")) : logo} alt="Logo"></img>
              <input className type="file" id="thumbnail" onChange={changeImage} />
              {/*------------------------*/}
            </Row>
            <Row className="thumbnailSecondRow">
              {imagesColumns}
            </Row>
          </Col>



          <Col className="columnInfo" style={{width: "calc(59% - 5px)"}}>
            <Row justify="space-around" align="middle" className="stampInfoRow">
              <Col className="stampInfoColumn" style={{width: "calc(100% - 5px)"}}>
                <Row align="middle" className="stampInfoRowTopTop">
                  <div className="checkboxes">
                    <div className="checkboxWrapperPost">
                      <label className="checkboxHeaderPost">Used</label>
                      <input className="checkboxPost" type="checkbox" onChange={(e) => setPostItem("used", e.target.checked)}/>
                    </div>
                    <div className="checkboxWrapperPost">
                      <label className="checkboxHeaderPost">Mint</label>
                      <input className="checkboxPost" type="checkbox"  onChange={(e) => setPostItem("mint", e.target.checked)}/>
                    </div>
                    <div className="checkboxWrapperPost">
                      <label className="checkboxHeaderPost">Postal</label>
                      <input className="checkboxPost" type="checkbox"  onChange={(e) => setPostItem("postalItem", e.target.checked)}/>
                    </div>
                    <div className="checkboxWrapperPost">
                      <label className="checkboxHeaderPost">Cert.</label>
                      <input className="checkboxPost" type="checkbox"  onChange={(e) => setPostItem("certificate", e.target.checked)}/>
                    </div>
                  </div>
                </Row>
                <Row className="stampInfoRowTopBottom">
                  <input className="infoInput" placeholder={"Catalog number"} onChange={(e) => setPostItem("catalogueNumber", e.target.value)}/>
                  <input className="infoInput" placeholder={"Starting price"} onChange={(e) => setPostItem("startingPrice", e.target.value)}/>
                  <input className="infoInput" placeholder={"Selling price"} onChange={(e) => setPostItem("sellingPrice", e.target.value)}/>
                  <input className="infoInputCurrency" readOnly value={"€"}/>
                </Row>
              </Col>
            </Row>
            <Row justify="space-around" align="middle" className="stampSellerRow">
              <Col className="stampSellerColumn" style={{width: "calc(100% - 5px)"}}>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                  <input className="infoInputBottom" placeholder={"Selling year"} onChange={(e) => setPostItem("sellingYear", e.target.value)}/>
                  <input className="infoInputBottom" placeholder={"Auction number"} onChange={(e) => setPostItem("auctionNumber", e.target.value)}/>
                </Row>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                  <select disabled={sellerList.length === 0} name="seller" id="seller" className="infoInputBottom" onChange={(e) => setPostItem("seller", e.target.value)}>
                    <option value="" hidden>Seller</option>
                    {sellerOptions}
                  </select>
                  <input className="infoInputBottom" placeholder={"Lot number"} onChange={(e) => setPostItem("lotNumber", e.target.value)}/>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Post;
