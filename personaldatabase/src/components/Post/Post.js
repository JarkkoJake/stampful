import React, { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import { RouteContext } from "../../Contexts/RouterContext";
import { PostContext } from "../../Contexts/PostContext";
import { constants } from "../../Constants";
import { Row, Col, Select, Input, Checkbox } from "antd";
import axios from "axios";
import { ArrowLeftOutlined, SaveOutlined  } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "antd/dist/antd.css";
import "./Post.css";

const Post = () => {

  const { setRoute } = useContext(RouteContext);
  const { setPostContent, setPostItem, saveAuction } = useContext(PostContext);

  const { Option } = Select;

  const { TextArea } = Input;
  
  const categoryNames = ["Category 1", "Category 2", "Category 3"];
  const categoryAttributeNames = ["category1", "category2", "category3"];
  const categoryRequestList = ["category1", "category2", "category3", "country"];

  const additionalImages = ["image1", "image2", "image3"];

  const checkBoxTitles = ["Used", "Mint", "Postal item", "Certificate"];
  const checkBoxAttributeNames = ["used", "mint", "postalItem", "certificate"];

  const [countryOptions, setCountryOptions] = useState([]);
  const [sellerOptions, setSellerOptions] = useState([]);

  const [countryValue, setCountryValue] = useState(null); //eslint-disable-line
  const [category1Value, setCategory1Value] = useState(null); //eslint-disable-line
  const [category2Value, setCategory2Value] = useState(null); //eslint-disable-line
  const [category3Value, setCategory3Value] = useState(null); //eslint-disable-line
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  const changeCountry = (element)=> {
    setPostItem("country", element);
    setCountryValue(element);
    axios
      .get(`${constants.URL}/dropdown/category1?country=${element}`)
      .then((res) => {
        setCategory1(res.data);
      });
  };

  const fetchCategory = (index, element) => {
    if (index === 0) {
      changeCategory1(element);
    }
    else if (index === 1) {
      changeCategory2(element);
    }
    else {
      setPostItem("category3", element);
      setCategory3Value(element);
    }
  };

  const changeCategory1 = (element)=> {
    setPostItem("category1", element);
    setCategory1Value(element);
    axios
      .get(`${constants.URL}/dropdown/category2?category1=${element}`)
      .then((res) => {
        setCategory2(res.data);
      });
  };

  const changeCategory2 = (element)=> {
    setPostItem("category2", element);
    setCategory2Value(element);
    axios
      .get(`${constants.URL}/dropdown/category3?category2=${element}`)
      .then((res) => {
        setCategory3(res.data);
      });
  };

  useLayoutEffect(() => {
    axios
      .get(`${constants.URL}/dropdown/country`)
      .then((res) => {
        setCountryOptions(res.data);
      });
    axios
      .get(`${constants.URL}/dropdown/seller`)
      .then((res) => {
        setSellerOptions(res.data);
      });
  },[]);

  useEffect(() => { // TODO : Preserve some details.
    setPostContent({});
  },[]);

  const saveAuctionButton = () => {
    saveAuction(imageData);
    setRoute("Browse");
  };


  // Images -------------------

  const [imageData, setImageData] = useState(new FormData());
  const [thumbnailUpdate, setThumbnailUpdate] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  const changeImage = (e) => {
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


  const categoryOptions1 = category1.map((category) =>
    <Option
      key={category.id}
      id={category.id}
      value={category.id}>
      {category.category1}
    </Option>
  );
  const categoryOptions2 = category2.map((category) =>
    <Option
      key={category.id}
      id={category.id}
      value={category.id}>
      {category.category2}
    </Option>
  );
  const categoryOptions3 = category3.map((category) =>
    <Option
      key={category.id}
      id={category.id}
      value={category.id}>
      {category.category3}
    </Option>
  );

  const categorys = categoryNames.map((category, index) =>
    <Select
      key={category}
      className="categoryMenu"
      showSearch
      placeholder={`${category} ...`}
      optionFilterProp="children"
      onChange={(e) => fetchCategory(index, e)}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {category === "Category 1"
        ? categoryOptions1
        : category === "Category 2" ? categoryOptions2
          : categoryOptions3}
    </Select>
  );

  const imagesColumns = additionalImages.map((image) =>
    <Col
      key={image}
      id={image}
      align="middle"
      className="columnThumbnailAdditional"
      style={{width: "95px"}}>
      <p> Other image </p>
    </Col>
  );
  
  const Checkboxes = checkBoxTitles.map((title, index) =>
    <Checkbox
      key={title}
      id={title}
      onChange={(e) => setPostItem(checkBoxAttributeNames[index], e.target.checked)}>
      <i className="checkBoxText">{title}</i>
    </Checkbox>
  );

  const countryOptionsComponent = countryOptions.map((country) =>
    <Option
      key={country.id}
      id={country.id}
      value={country.id}>
      {country.name}
    </Option>
  );

  const sellerOptionsComponent = sellerOptions.map((seller) =>
    <Option
      key={seller.id}
      id={seller.id}
      value={seller.id}>
      {seller.name}
    </Option>
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
            <div>
              <Select
                className="categoryMenu"
                showSearch
                placeholder="Country ..."
                optionFilterProp="children"
                onChange={(e) => changeCountry(e)}
                filterOption={(input, option) => 
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {countryOptionsComponent}
              </Select>
              {categorys}
            </div>
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

            <Col className="thumbnailFirstRow" style={{width: "calc(50% - 5px)"}}> 
              {/*TESTING-----------------------*/}
              <img id="imagetesting" src={imageData.get("thumbnail") ? URL.createObjectURL(imageData.get("thumbnail")) : logo} alt="Logo"></img>
              <input type="file" id="thumbnail" onChange={changeImage}></input>

              {/*------------------------*/}
            </Col>
            <Col className="thumbnailSecondRow">
              {imagesColumns}
            </Col>
          </Col>



          <Col className="columnInfo" style={{width: "calc(59% - 5px)"}}>
            <Row justify="space-around" align="middle" className="stampInfoRow">
              <Col className="stampInfoColumn" style={{width: "calc(100% - 5px)"}}>
                <Row justify="space-around" align="middle" className="stampInfoRowTopTop">
                  {Checkboxes}
                  <Input
                    id="infoInput"
                    style={{minWidth: "130px"}}
                    placeholder="Catalogue number"
                    onChange={(e) => setPostItem("catalogueNumber", e.target.value)}/>
                </Row>
                <Row align="middle" className="stampInfoRowTopBottom">

                  <Input id="infoInputStartingPrice" style={{minWidth: "180px"}} placeholder="Starting price" onChange={(e) => setPostItem("startingPrice", e.target.value)}/>
                  <Input id="infoInputSellingPrice" style={{minWidth: "180px"}} placeholder="Selling price" onChange={(e) => setPostItem("sellingPrice", e.target.value)}/>
                  <Input id="infoInputCurrency" placeholder="Selling price" value={"€"} disabled={true}/>

                </Row>
              </Col>
            </Row>
            <Row justify="space-around" align="middle" className="stampSellerRow">
              <Col className="stampSellerColumn" style={{width: "calc(100% - 5px)"}}>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                  <Input className="infoInputBottom" placeholder="Selling year" onChange={(e) => setPostItem("sellingYear", e.target.value)}/>
                  <Input className="infoInputBottom" placeholder="Auction number" onChange={(e) => setPostItem("auctionNumber", e.target.value)}/>
                </Row>
                <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                  <Select
                    className="infoInputBottom"
                    showSearch
                    style={{borderRadius: "4px!important"}}
                    placeholder="Seller ..."
                    optionFilterProp="children"
                    onChange={(e) => setPostItem("seller", e)}
                    filterOption={(input, option) => 
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {sellerOptionsComponent}
                  </Select>
                  <Input className="infoInputBottomLot" placeholder="Lot number" onChange={(e) => setPostItem("lotNumber", e.target.value)}/>
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
