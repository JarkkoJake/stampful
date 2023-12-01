import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RouteContext } from "../../Contexts/RouterContext";
import { PostContext } from "../../Contexts/PostContext";
import { constants } from "../../Constants";
import { Row, Col, Input } from "antd";
import axios from "axios";
import { ArrowLeftOutlined, SaveOutlined, PlusCircleFilled } from "@ant-design/icons";
import logo from "../../public/images/StampLogo.png";
import "antd/dist/antd.css";
import "./Post.css";

const Post = () => {

  const { setRoute } = useContext(RouteContext);
  const { postContent, setPostContent, setPostItem, saveAuction, imageData, setImageData} = useContext(PostContext);

  const { TextArea } = Input;

  const [countryOptionsArray, setCountryOptionsArray] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  const [description, setDescription] = useState(null);
  const [mint, setMint] = useState(false);
  const [used, setUsed] = useState(false);
  const [postalItem, setPostalItem] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [lotNumber, setLotNumber] = useState(null);
  const [catalogueNumber, setCatalogueNumber] = useState(null);
  const [startingPrice, setStartingPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);

  const [newDropdownItem, setNewDropdownItem] = useState("");
  const [postDropdownItemMenu, setPostDropdownItemMenu] = useState("");
  const dropdownItemMetaData = {
    "SELLER": {
      endpoint: "seller",
    },
    "COUNTRY": {
      endpoint: "country",
    },
    "CATEGORY_1": {
      endpoint: "category1",
    },
    "CATEGORY_2": {
      endpoint: "category2",
    },
    "CATEGORY_3": {
      endpoint: "category3",
    },
    
  };

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



  useEffect(() => {
    setPostContent(content => ({
      auctionNumber: content.auctionNumber,
      seller: content.seller,
      sellingYear: content.sellingYear,
    }));
    setImageData(new FormData());
    document.getElementById("thumbnail").src = logo;
    document.getElementById("thumbnail").style = "height: 43vh";
    document.getElementById("additionalImages").innerHTML = null;
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

  // Maximum image size (bytes) before compression is used
  const MAX_IMAGE_SIZE = 50000;

  const saveAuctionButton = async () => {
    let resized_images = 0;
    if (thumbnail) {
      if (thumbnail.size <= MAX_IMAGE_SIZE) imageData.set("thumbnail", thumbnail);
      else {
        resized_images += 1;
        compressImage(thumbnail, (compressedThumbnail) => {
          imageData.set("thumbnail", compressedThumbnail);
        });
      }
    }
    additionalImages.forEach(img => {
      if (img.size <= MAX_IMAGE_SIZE) imageData.append("additionalImages", img);
      else {
        resized_images += 1;
        compressImage(img, (compressedImage) => {
          imageData.append("additionalImages", compressedImage);
        });
      }
    });

    // wait a certain amount of time to guerantee all images have been handled
    setTimeout(async () => {
      await saveAuction();
      resetForm();
    }, 500 * resized_images);
  };

  /**
   * Compress an image file from image input
   * @param {File} image Image to be compressed
   * @param {(File) => void} after Callback called afterwards with the compressed image
   */
  const compressImage = (image, after) => {
    const imageBlobURL = window.URL.createObjectURL(image);
    const img = new Image();
    img.src = imageBlobURL;
    const imageScaleRatio = Math.sqrt(MAX_IMAGE_SIZE / image.size);
    img.onload = () => {
      window.URL.revokeObjectURL(imageBlobURL);
      const newW = Math.round(imageScaleRatio * img.width);
      const newH = Math.round(imageScaleRatio * img.height);
      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, newW, newH);
      canvas.toBlob((blob) => {
        blob.name = image.name;
        const blobFile = new File([blob], image.name);
        after(blobFile);
      }, image.type, 0.7);
    };
  };

  const [thumbnail, setThumbail] = React.useState(null);
  const [additionalImages, setAdditionalImages] = React.useState([]);
  const thumbnailSet = React.useRef(false);

  // add images
  const addImages = (e) => {
    /* Set first image as thumbnail if not set already, append rest of the images into additional images */
    for (let index = 0; index < e.target.files.length; index++) {
      const imageFile = e.target.files[index];
      if (!thumbnailSet.current) {
        /* Set thumbnail if not set yet */
        setThumbail(imageFile);
        thumbnailSet.current = true;
        continue;
      }
      setAdditionalImages(images => [...images, imageFile]);
    }
  };

  //----------------------------

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

  /**
   * Reset the form manually after posting. Keep some details of post content
   */
  const resetForm = () => {
    setPostContent(c => ({
      auctionNumber: c.auctionNumber,
      sellingYear: c.sellingYear,
      seller: c.seller,
    }));

    // dropdown reset countries to empty and back to reset the select component back to default
    const countriesCopy = [...countryOptionsArray];
    setCountryOptionsArray([]);
    setTimeout(() => setCountryOptionsArray(countriesCopy), 100);
    setCategory1([]);
    setCategory2([]);
    setCategory3([]);

    // text and number inputs
    setDescription(null);
    setLotNumber("");
    setCatalogueNumber("");
    setSellingPrice("");
    setStartingPrice("");
    
    // booleans
    setMint(false);
    setUsed(false);
    setCertificate(false);
    setPostalItem(false);

    // images
    setThumbail(null);
    setAdditionalImages([]);
    setImageData(new FormData());
  };

  return (
    <div>
      <div className="popupBackground" style={{
        display: postDropdownItemMenu == "" ? "none" : "flex",
      }}>
        <div style={{
          padding: 15,
          borderRadius: 15,
          backgroundColor: "var(--mainclr1)",
        }}>
          <div style={{width: "100%", marginBottom: 15}}>
            <button id="closePopup" onClick={() => setPostDropdownItemMenu("")}>
              <ArrowLeftOutlined style={{fontSize: "2.3vh", paddingRight: 6}}/>
              Back
            </button>
            <button id="saveDropdownItem" style={{float: "right"}} onClick={() => {
              if (postDropdownItemMenu == "SELLER" || postDropdownItemMenu == "COUNTRY") {
                const type = postDropdownItemMenu;
                axios.post(`${constants.URL}/dropdown/${dropdownItemMetaData[postDropdownItemMenu].endpoint}`,
                  {name: newDropdownItem}).then(r => {
                  if (!r.data) return;
                  if (r.data.id) {
                    if (type == "SELLER") setSellerList(list => [...list, r.data]);
                    if (type == "COUNTRY") setCountryOptionsArray(list => [...list, r.data]);
                  }
                });
              }
              if (postDropdownItemMenu == "CATEGORY_1") {
                axios.post(`${constants.URL}/dropdown/${dropdownItemMetaData[postDropdownItemMenu].endpoint}`, {
                  country: postContent.country,
                  category1: newDropdownItem,
                }).then(r => {
                  if (!r.data) return;
                  if (r.data.id) setCategory1(list => [...list, r.data]);
                });
              }
              if (postDropdownItemMenu == "CATEGORY_2") {
                axios.post(`${constants.URL}/dropdown/${dropdownItemMetaData[postDropdownItemMenu].endpoint}`, {
                  category1: postContent.category1,
                  category2: newDropdownItem,
                }).then(r => {
                  if (!r.data) return;
                  if (r.data.id) setCategory2(list => [...list, r.data]);
                });
              }
              if (postDropdownItemMenu == "CATEGORY_3") {
                axios.post(`${constants.URL}/dropdown/${dropdownItemMetaData[postDropdownItemMenu].endpoint}`, {
                  category2: postContent.category2,
                  category3: newDropdownItem,
                }).then(r => {
                  if (!r.data) return;
                  if (r.data.id) setCategory3(list => [...list, r.data]);
                });
              }
              setPostDropdownItemMenu("");
              setNewDropdownItem("");
            }}>
              Save
              <SaveOutlined style={{fontSize: "2.3vh", paddingLeft: 6}}/>
            </button>
          </div>
          <input value={newDropdownItem} className="infoInput" placeholder="TEST" style={{width: 400}} onChange={e => setNewDropdownItem(e.target.value)}/>
        </div>

      </div>
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
      {postContent && (
        <div id="postWrapper">
          <Row justify="space-around" align="middle" className="firstRow">
            <Col className="columnFirstRow" style={{width: "calc(33% - 5px)"}}>
              <select name="country" id="country" className="selectBoxPost" onChange={(e) => {
                if (e.target.value == "NEW_ITEM_POST") {
                  setPostDropdownItemMenu("COUNTRY");
                } else {
                  changeCountry(e.target.value);
                }
              }}>
                <option value="" hidden>Country</option>
                {countryOptions}
                {postDropdownItemMenu == "" && <option value="NEW_ITEM_POST">+ New country</option>}
              </select>
            
              <select disabled={!postContent.country} name="category1" id="category1" className="selectBoxPost" onChange={(e) => {
                if (e.target.value == "NEW_ITEM_POST") {
                  setPostDropdownItemMenu("CATEGORY_1");
                } else {
                  changeCategory1(e.target.value);
                }
              }}>
                <option value="" hidden>Category 1</option>
                {category1Options}
                {postDropdownItemMenu == "" && <option value="NEW_ITEM_POST">+ New category</option>}
              </select>

              <select disabled={!postContent.category1} name="category2" id="category2" className="selectBoxPost" onChange={(e) => {
                if (e.target.value == "NEW_ITEM_POST") {
                  setPostDropdownItemMenu("CATEGORY_2");
                } else {
                  changeCategory2(e.target.value);
                }
              }}>
                <option value="" hidden>Category 2</option>
                {category2Options}
                {postDropdownItemMenu == "" && <option value="NEW_ITEM_POST">+ New category</option>}
              </select>

              <select disabled={!postContent.category2} name="category3" id="category3" className="selectBoxPost" onChange={(e) => {
                if (e.target.value == "NEW_ITEM_POST") {
                  setPostDropdownItemMenu("CATEGORY_3");
                } else {
                  changeCategory3(e.target.value);
                }
              }}>
                <option value="" hidden>Category 3</option>
                {category3Options}
                {postDropdownItemMenu == "" && <option value="NEW_ITEM_POST">+ New category</option>}
              </select>

            </Col>
            <Col className="columnFirstRow" style={{width: "calc(66% - 5px)"}}>
              <TextArea
                placeholder="Description"
                rows={2}
                id="descriptionField"
                value={description}
                onChange={(e) => {
                  setPostItem("description", e.target.value);
                  setDescription(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row justify="space-around" align="middle" className="secondRow">
            <Col className="columnThumbnail" style={{width: "calc(40% - 5px)"}}>
              <label htmlFor="thumbnailInput" className="custom-file-upload">
                <PlusCircleFilled className="addImagesButton" /> 
                <span id="tooltiptext">Add images</span>
              </label>
              <input type="file" id="thumbnailInput" multiple accept="image/*" onChange={addImages} />
              <Row className="thumbnailFirstRow"> 
                <img id="thumbnail" className="postMainImage" src={thumbnail ? URL.createObjectURL(thumbnail) : logo} alt="Logo"/>
              </Row>
              <Row className="thumbnailSecondRow" id="additionalImages">
                {additionalImages.map((img, ind) => <div key={ind} style={{position: "relative"}}>
                  <img onClick={() => {
                    setAdditionalImages(images => [...images.filter(i => i != img), thumbnail]);
                    setThumbail(img);
                  }} className="columnThumbnailAdditional" key={`AdditionalImage_${ind}`} src={URL.createObjectURL(img)}>
                  </img>
                  <button style={{position: "absolute",left: 0}} onClick={() => setAdditionalImages(images => images.filter(i => i != img))}>Remove</button>
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
                        <input checked={used} className="checkboxPost" type="checkbox" onChange={(e) => {
                          setPostItem("used", e.target.checked);
                          setUsed(e.target.checked);
                        }}/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Mint</label>
                        <input checked={mint} className="checkboxPost" type="checkbox" onChange={(e) => {
                          setPostItem("mint", e.target.checked);
                          setMint(e.target.checked);
                        }}/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Postal</label>
                        <input checked={postalItem} className="checkboxPost" type="checkbox" onChange={(e) => {
                          setPostItem("postalItem", e.target.checked);
                          setPostalItem(e.target.checked);
                        }}/>
                      </div>
                      <div className="checkboxWrapperPost">
                        <label className="checkboxHeaderPost">Cert.</label>
                        <input checked={certificate} className="checkboxPost" type="checkbox" onChange={(e) => {
                          setPostItem("certificate", e.target.checked);
                          setCertificate(e.target.checked);
                        }}/>
                      </div>
                    </div>
                  </Row>
                  <Row className="stampInfoRowTopBottom">
                    <input value={catalogueNumber} className="infoInput" placeholder={"Catalog number"} onChange={(e) => {
                      setPostItem("catalogueNumber", e.target.value);
                      setCatalogueNumber(e.target.value);  
                    }}/>
                    <input value={startingPrice} className="infoInput" placeholder={"Starting price"} onChange={(e) => {
                      setPostItem("startingPrice", e.target.value);
                      setStartingPrice(e.target.value);
                    }}/>
                    <input value={sellingPrice} className="infoInput" placeholder={"Selling price"} onChange={(e) => {
                      setPostItem("sellingPrice", e.target.value);
                      setSellingPrice(e.target.value);
                    }}/>
                    <input className="infoInputCurrency" readOnly value={"€"}/>
                  </Row>
                </Col>
              </Row>
              <Row justify="space-around" align="middle" className="stampSellerRow">
                <Col className="stampSellerColumn" style={{width: "calc(100% - 5px)"}}>
                  <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                    <input className="infoInputBottom" defaultValue={postContent.sellingYear} placeholder={"Selling year"} onChange={(e) => setPostItem("sellingYear", e.target.value)}/>
                    <input className="infoInputBottom" defaultValue={postContent.auctionNumber} placeholder={"Auction number"} onChange={(e) => setPostItem("auctionNumber", e.target.value)}/>
                  </Row>
                  <Row justify="space-around" align="middle" className="stampInfoRowBottom">
                    <select name="seller" id="seller" className="infoInputBottom" onChange={(e) => {
                      if (e.target.value == "NEW_ITEM_POST") {
                        setPostDropdownItemMenu("SELLER");
                      } else {
                        setPostItem("seller", e.target.value);
                      }
                    }}>
                      <option value="" hidden>{sellerList.find(s => s.id == postContent.seller)?.name  || "Seller"}</option>
                      {sellerOptions}
                      {postDropdownItemMenu == "" && <option value="NEW_ITEM_POST">+ New seller</option>}
                    </select>
                    <input value={lotNumber} className="infoInputBottom" placeholder={"Lot number"} onChange={(e) => {
                      setPostItem("lotNumber", e.target.value);
                      setLotNumber(e.target.value);
                    }}/>
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

export default Post;
