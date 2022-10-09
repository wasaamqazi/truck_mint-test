import React, { Component, useEffect } from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/imgs/logo.webp";
import mainbg from "../assets/imgs/main-bg.jpg";
import pattern from "../assets/imgs/pattern.png";
import team1 from "../assets/imgs/team/team1.png";
import team2 from "../assets/imgs/team/team2.png";
import team3 from "../assets/imgs/team/team3.png";
import team4 from "../assets/imgs/team/team4.png";
import team5 from "../assets/imgs/team/team5.png";
import team6 from "../assets/imgs/team/team6.png";
import team7 from "../assets/imgs/team/team7.png";
import openseaicon from "../assets/imgs/icons/openc.png";
import socialicon1 from "../assets/imgs/footer-icons/icon-dd.png";
import socialicon2 from "../assets/imgs/footer-icons/icon-fb.png";
import socialicon3 from "../assets/imgs/footer-icons/icon-ig.png";
import socialicon4 from "../assets/imgs/footer-icons/icon-tlg.png";
import socialicon5 from "../assets/imgs/footer-icons/icon-twt.png";
import socialicon6 from "../assets/imgs/footer-icons/icon-ytb.png";
import collection1 from "../assets/imgs/collection1.png";
import collection2 from "../assets/imgs/collection2.png";
import Header from "./Header";
import video1 from "../assets/videos/FMC1080.mp4";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Countdown from "react-countdown";
import ScrollSpy from "react-ui-scrollspy";
import ReactAudioPlayer from "react-audio-player";
import sound from "../assets/audio/sound.mp3";
import {
  approveMinter,
  checkAllowance,
  getConnectedAddress,
  getTotalSupply,
  mintNFT,
} from "../utils/interact";
import { toast } from "react-toastify";
import validator from "validator";
import Spinner from "react-bootstrap/Spinner";
import { useAccount, useNetwork } from "wagmi";

// const current_chainId = 80001;
const current_chainId = 137;

const Home = (props) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [address_connected, setAddressConnected] = useState("");
  const getCurrrentConnectAddress = async () => {
    const currentConnectedAddress = await getConnectedAddress();
    setAddressConnected(currentConnectedAddress);
  };
  useEffect(() => {
    getCurrrentConnectAddress();
  }, []);

  const [isLoading, setisLoading] = useState(false);

  const [value, setValue] = useState(1);
  const [minterEmail, setMinterEmail] = useState("");

  const [totalAllowance, setTotalAllowance] = useState(null);
  const [totalMintedSupply, setTotalMintedSupply] = useState(0);
  const [showApprove, setShowApprove] = useState(false);
  const [showMint, setShowMint] = useState(false);

  //check user's allowance
  const checkAllowanceofUser = async () => {
    setisLoading(true);
    const totalAllowanceTemp = await checkAllowance();
    setTotalAllowance(totalAllowanceTemp);
    setisLoading(false);
  };

  //get total minted supply
  const getTotalMintedSupply = async () => {
    setisLoading(true);
    const totalMintedSupplyTemp = await getTotalSupply();
    setTotalMintedSupply(totalMintedSupplyTemp);
    setisLoading(false);
  };

  useEffect(() => {
    checkAllowanceofUser();
  }, [address]);

  useEffect(() => {
    getTotalMintedSupply();
  }, []);

  useEffect(() => {
    if (totalAllowance != null) {
      if (address == "" || address == null || address == undefined) {
        toast.error("Please connect your wallet first", {
          toastId: "walletConnectError",
        });
      } else {
        if (totalAllowance == 340000000000000000) {
          setShowApprove(false);
          setShowMint(true);
        } else {
          setShowApprove(true);
          setShowMint(false);
        }
      }
    }
  }, [totalAllowance]);
  //Invalid Classes
  function addInvalidClass(elementId) {
    var element = document.getElementById(elementId);
    element.classList.add("is-invalid");
  }
  function removeInvalidClass(elementId) {
    var element = document.getElementById(elementId);
    element.classList.remove("is-invalid");
  }
  function checkValidation() {
    var errorOccurs = false;

    if (!minterEmail || minterEmail == "" || !validator.isEmail(minterEmail)) {
      errorOccurs = true;
    } else {
      errorOccurs = false;
    }
    return errorOccurs;
  }
  const onApprovePressed = async () => {
    if (chain) {
      if (chain.id == current_chainId) {
        if (isLoading) {
          toast.warning("Please wait!", { toastId: "pleaseWaitWarning" });
        } else {
          if (address == "" || address == null || address == undefined) {
            toast.error("Please connect your wallet first", {
              toastId: "walletConnectError",
            });
          } else {
            setisLoading(true);
            const approvedResult = await approveMinter();
            checkAllowanceofUser();
            setTimeout(() => {
              setisLoading(false);
            }, 10000);
          }
        }
      } else {
        toast.warning(
          "Please connect to Polygon Mainnet. Use Connect Wallet button on top",
          {
            toastId: "wrongChainId",
          }
        );
      }
    } else {
      toast.warning(
        "Please connect to Polygon Mainnet. Use Connect Wallet button on top",
        {
          toastId: "wrongChainId",
        }
      );
    }
  };

  const onMintPressed = async () => {
    if (chain) {
      if (chain.id == current_chainId) {
        if (isLoading) {
          toast.warning("Please wait!", { toastId: "pleaseWaitWarning" });
        } else {
          setisLoading(true);
          if (checkValidation()) {
            //show error
            console.log("Error!");
            setisLoading(false);
            toast.error("Please enter valid email", { toastId: "emailError" });
          } else {
            //Mint here
            await mintNFT(minterEmail);
            setisLoading(false);
          }
        }
      } else {
        toast.warning(
          "Please connect to Polygon Mainnet. Use Connect Wallet button on top",
          {
            toastId: "wrongChainId",
          }
        );
      }
    } else {
      toast.warning(
        "Please connect to Polygon Mainnet. Use Connect Wallet button on top",
        {
          toastId: "wrongChainId",
        }
      );
    }
  };
  const ChangingImages1 = () => {
    var first = document.getElementsByClassName("artwork-controls");
    setValue(value + 1);
    var imgurl = "../../assets/images/artworkleft";
    if (value == 0) {
      first[0].src = imgurl + value + ".png";
    } else if (value == 1) {
      first[0].src = imgurl + value + ".png";
    }
    if (value == 2) {
      first[0].src = imgurl + value + ".png";
    } else if (value == 3) {
      first[0].src = imgurl + value + ".png";
      setValue(value - 3);
    }
  };
  const [value2, setValue2] = useState(1);

  const ChangingImages2 = () => {
    var first = document.getElementsByClassName("artwork-controls");
    setValue2(value2 + 1);
    console.log(value2);
    var imgurl = "../../assets/images/right/artworkright";
    if (value2 == 0) {
      first[1].src = imgurl + value2 + ".png";
      console.log(value2);
    } else if (value2 == 1) {
      first[1].src = imgurl + value2 + ".png";
      console.log(value2);
    }
    if (value2 == 2) {
      first[1].src = imgurl + value2 + ".png";
      console.log(value2);
    } else if (value2 == 3) {
      first[1].src = imgurl + value2 + ".png";
      setValue2(value2 - 3);
      console.log(value2);
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date("2022-10-09T12:00:04+00:00") - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (24 * 60 * 60 * 1000)),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    // (total / 1000 / 60 / 60) % 24;

    return timeLeft;
  }
  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <>
      <ReactAudioPlayer src={sound} autoPlay loop controls />
      <img className="main-image" src={mainbg} alt="" />
      <Header />
      <video
        className="slider-desk"
        id="slider-desk"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={video1} type="video/mp4"></source>
      </video>
      <ScrollSpy>
        <section id="#" className="main-section">
          <div className="container ">
            <div className="row">
              <div className="col-sm-6 col-6">
                <div className="text-wrapper">
                  <h2 className="first-tit">
                    <br />
                    Introducing the Future<br></br> of Trucking Via Web3
                  </h2>
                  {/* <h3 className="second-tit">Introducing Web3 Trucking</h3> */}
                  <p className="text hideonmob" style={{ fontWeight: "bold" }}>
                    <br />
                    Introducing Blockchain Trucking
                    <br /> Truck mint is a platform that is spearheading the
                    launch and ownership of truck NFTs.
                    <br />
                    Our NFT collection opens the gateway to an all-around
                    knowledge of the transport<br></br> management system to
                    equip you with the in and outs of the freight network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="collection">
          <div
            className="container aos-init aos-animate"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div className="row">
              <div className="col-lg-7">
                <Carousel
                  fade={true}
                  interval={1000}
                  controls={false}
                  indicators={false}
                  pause={false}
                >
                  <Carousel.Item>
                    <img
                      className="collection-image"
                      src={collection1}
                      alt=""
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="collection-image"
                      src={collection2}
                      alt=""
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="col-lg-5">
                <div className="collection-tit">
                  <div className="collection-text-wrapper">
                    <div className="collection-tit-wrapper">
                      <h2 className="collection-title">Collection</h2>
                    </div>
                    <p className="text">
                      Our entire fleet of freight vehicles has been commissioned
                      by Autonomous EV trucks. We exhibit a wide array of models ranging
                      from fuel-run to fully electric trucks. Our Autonomous EV trucks
                      are perfectly suitable for the long miles covered for
                      cargo transportation. Their damage-resistant exteriors can
                      withstand the long-term weathering that occurs from
                      everyday traveling.
                    </p>
                    <p className="text">
                      Each truck is unique to its owner and supports different
                      styles of truck parts. Based on the skins, headlights, and
                      bumpers, every car NFT truck has its individual
                      attributes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className="pattern" src={pattern} alt="" />
        </section>

        <section id="artwork" className="artwork">
          <div className="container-fluid  nopadding">
            <div className="artwork-wrapper "></div>
            <h2 className="artwork-title fadeInBottom">Art Work</h2>
            <p className="container w-70 mt-5 text-center">
              Nope!, we don’t have those plain old-fashioned trucks. The artwork
              on each vehicle is influenced by either a specific genre or truck
              type. These include fire brigade, police, ambulance, and
              horror-inspired trucks.
            </p>
          </div>
          <div className="artwork-wrappersss foranimation">
            <div className="forbackgroundok">
              <h2 className="art">art</h2>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <img
                    className="artwork-left artwork-controls"
                    src="../../assets/images/artworkleft0.png"
                    alt=""
                    onClick={() => ChangingImages1()}
                  />
                  <p className="tap-on-truck">Tap On Truck</p>
                </div>
                <div className="col-lg-6">
                  <div className="forcenter">
                    <div className="textwrap">
                      <h2 className="section-titles">Cyber tooth</h2>
                      <p className="text">
                        Releasing in 2023, this vehicle boasts a gigantic
                        payload of 3500 pounds with a towing capacity of 14000
                        pounds. With a range of 500 plus miles and a speed of
                        120 mph, its durable stainless steel is scratch and
                        wear-resistant. The tonneau cover at the back offers
                        perfect protection for cargo and other items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="forbackgroundok">
              <h2 className="art">Work</h2>
            </div>
            <div className="road-runn">
              <div className="container">
                <div className="row">
                  <div id="first" className="col-lg-6">
                    <div className="forcenter">
                      <div className="textwrap">
                        <h2 className="section-titles ">Roadrunner</h2>
                        <p className="text">
                          The roadrunner supports 3 independent motors with a
                          fully loaded vehicle weight of 82,000 lbs. Its
                          all-electric features offer a cheaper solution than
                          diesel-run trucks and can cover 500 miles on a single
                          charge. This truck is perfect for towing heavy loads
                          and supporting large shipments.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="second" className="col-lg-6">
                    <img
                      className="artwork-left artwork-controls"
                      src="../../assets/images/right/artworkright0.png"
                      alt=""
                      onClick={() => ChangingImages2()}
                    />

                    <p className="tap-on-truck">Tap On Truck</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="minting">
          <div className="artwork-wrapper"></div>
          <div className="container">
            <h2 className="artwork-title ">Minting</h2>
          </div>
          <div className="forbackgroundok">
            <h2
              style={{ textAlign: "left", marginBottom: "-177px" }}
              className="art"
            >
              mi
            </h2>
          </div>
          {isLoading && (
            <>
              <div className="loader">
                <Spinner
                  animation="border"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRightColor: "#f647e5",
                  }}
                  isGrow
                />
                <span className="customLoadingText">Loading...</span>
              </div>
            </>
          )}
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <div className="card-wrapping">
                  <div className="cards firstcard">
                    <div className="card-inner">
                      <h3 style={{ color: "#0AE1EF" }} className="card-tit">
                        1st Sale
                      </h3>
                      <div className="timer first-timer">
                        <span>
                          Mint Now
                        </span>

                        {/* <Countdown
                          onComplete={() => window.location.reload(false)}
                          date={new Date(parseInt(1665316799) * 1000)}
                        /> */}
                        {/* <span style={{ width: "250px" }}>
                          {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
                          {timeLeft.seconds}
                        </span> */}
                        {/* <div className="titles-wrapper">
                          <div className="time-tits">
                            <h3 className="day-tit">Day</h3>
                          </div>
                          <div className="time-tits">
                            <h3 className="day-tit">Hrs</h3>
                          </div>
                          <div className="time-tits">
                            <h3 className="day-tit">Mins</h3>
                          </div>
                          <div className="time-tits">
                            <h3 className="day-tit">Sec</h3>
                          </div>
                        </div> */}
                      </div>
                      <br/>
                      <div className="time-tits mint-counter">
                        <h3 className="day-tit">
                          {padLeadingZeros(totalMintedSupply, 4)}/1000
                        </h3>
                      </div>
                      <div className="price-wrap">price: 0.34 WETH</div>
                      <div className="currentdate">
                        Mint Date: 10/9/2022
                        {/* Date: {new Date().toLocaleString() + ""} */}
                      </div>
                      {showMint && !showApprove ? (
                        <div className="textbox-email">
                          <input
                            type="email"
                            placeholder="Email:"
                            onChange={(e) => {
                              setMinterEmail(e.target.value);
                            }}
                            value={minterEmail}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {showMint && !showApprove ? (
                    <div className="mint-btn-wrap">
                      <button
                        className="mint-btn"
                        href="#"
                        onClick={onMintPressed}
                      >
                        Mint
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {showApprove && !showMint ? (
                    <div className="mint-btn-wrap">
                      <button
                        className="mint-btn"
                        href="#"
                        onClick={onApprovePressed}
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="col-xl-4">
                <div className="cards">
                  <div className="card-inner">
                    <h3 className="card-tit">2nd Sale</h3>
                    <div className="timer first-timer">
                      {/* <Countdown
                        onComplete={() => window.location.reload(false)}
                        date={new Date(parseInt(1659749980) * 1000)}
                      /> */}
                      <span className="comingSoonCustom">Coming Soon</span>

                      <div className="titles-wrapper">
                        <div className="time-tits">
                          <h3 className="day-tit">Day</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Hrs</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Mins</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Sec</h3>
                        </div>
                      </div>
                    </div>
                    <div className="time-tits mint-counter">
                      <h3 className="day-tit">NA/NA</h3>
                    </div>
                    <div className="price-wrap">price: N/A</div>
                    <div className="currentdate">
                      Date: N/A
                      {/* Date: {new Date().toLocaleString() + ""} */}
                    </div>
                    {/* <div
                      style={{ visibility: "hidden" }}
                      className="textbox-email"
                    >
                      <input type="email" placeholder="Email:" />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="cards">
                  <div className="card-inner">
                    <h3 className="card-tit">3rd Sale</h3>
                    <div className="timer first-timer">
                      {/* <Countdown
                        onComplete={() => window.location.reload(false)}
                        date={new Date(parseInt(1659749380) * 1000)}
                      /> */}
                      <span className="comingSoonCustom">Coming Soon</span>

                      <div className="titles-wrapper">
                        <div className="time-tits">
                          <h3 className="day-tit">Day</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Hrs</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Mins</h3>
                        </div>
                        <div className="time-tits">
                          <h3 className="day-tit">Sec</h3>
                        </div>
                      </div>
                    </div>
                    <div className="time-tits mint-counter">
                      <h3 className="day-tit">NA/NA</h3>
                    </div>
                    <div className="price-wrap">price: N/A</div>
                    <div className="currentdate">
                      Date: N/A
                      {/* Date: {new Date().toLocaleString() + ""} */}
                    </div>
                    {/* <div
                      style={{ visibility: "hidden" }}
                      className="textbox-email"
                    >
                      <input type="email" placeholder="Email:" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2
            style={{
              textAlign: "right",
              marginTop: "-100px",
              marginBottom: "-200px",
            }}
            className="art"
          >
            nt
          </h2>
        </section>

        <section id="benefit">
          <div className="artwork-wrapper"></div>
          <div className="container">
            <div className="benefit">
              <h2 className="artwork-title">benefits</h2>
            </div>
          </div>
          <h2
            style={{ textAlign: "center", marginBottom: "-177px" }}
            className="art"
          >
            Bene
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-lg-3  iconbox">
                <div className="img-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100 "
                    height="100"
                    viewBox="0 0 188 188"
                    fill="none"
                    className="icons icon1"
                  >
                    <g>
                      <path
                        d="M150.4 89.3002C150.4 85.5606 151.886 81.9743 154.53 79.33C157.174 76.6857 160.76 75.2002 164.5 75.2002C168.24 75.2002 171.826 76.6857 174.47 79.33C177.114 81.9743 178.6 85.5606 178.6 89.3002V98.7002C178.6 102.44 177.114 106.026 174.47 108.67C171.826 111.315 168.24 112.8 164.5 112.8C160.76 112.8 157.174 111.315 154.53 108.67C151.886 106.026 150.4 102.44 150.4 98.7002V89.3002ZM164.5 84.6002C163.253 84.6002 162.058 85.0954 161.177 85.9768C160.295 86.8582 159.8 88.0537 159.8 89.3002V98.7002C159.8 99.9467 160.295 101.142 161.177 102.024C162.058 102.905 163.253 103.4 164.5 103.4C165.747 103.4 166.942 102.905 167.823 102.024C168.705 101.142 169.2 99.9467 169.2 98.7002V89.3002C169.2 88.0537 168.705 86.8582 167.823 85.9768C166.942 85.0954 165.747 84.6002 164.5 84.6002ZM61.1 75.2002C57.3605 75.2002 53.7741 76.6857 51.1298 79.33C48.4855 81.9743 47 85.5606 47 89.3002V98.7002C47 102.44 48.4855 106.026 51.1298 108.67C53.7741 111.315 57.3605 112.8 61.1 112.8C64.8396 112.8 68.426 111.315 71.0702 108.67C73.7145 106.026 75.2 102.44 75.2 98.7002V89.3002C75.2 85.5606 73.7145 81.9743 71.0702 79.33C68.426 76.6857 64.8396 75.2002 61.1 75.2002ZM56.4 89.3002C56.4 88.0537 56.8952 86.8582 57.7766 85.9768C58.658 85.0954 59.8535 84.6002 61.1 84.6002C62.3465 84.6002 63.542 85.0954 64.4234 85.9768C65.3048 86.8582 65.8 88.0537 65.8 89.3002V98.7002C65.8 99.9467 65.3048 101.142 64.4234 102.024C63.542 102.905 62.3465 103.4 61.1 103.4C59.8535 103.4 58.658 102.905 57.7766 102.024C56.8952 101.142 56.4 99.9467 56.4 98.7002V89.3002ZM112.8 89.3002C112.8 85.5606 114.286 81.9743 116.93 79.33C119.574 76.6857 123.16 75.2002 126.9 75.2002C130.64 75.2002 134.226 76.6857 136.87 79.33C139.514 81.9743 141 85.5606 141 89.3002V98.7002C141 102.44 139.514 106.026 136.87 108.67C134.226 111.315 130.64 112.8 126.9 112.8C123.16 112.8 119.574 111.315 116.93 108.67C114.286 106.026 112.8 102.44 112.8 98.7002V89.3002ZM126.9 84.6002C125.653 84.6002 124.458 85.0954 123.577 85.9768C122.695 86.8582 122.2 88.0537 122.2 89.3002V98.7002C122.2 99.9467 122.695 101.142 123.577 102.024C124.458 102.905 125.653 103.4 126.9 103.4C128.147 103.4 129.342 102.905 130.223 102.024C131.105 101.142 131.6 99.9467 131.6 98.7002V89.3002C131.6 88.0537 131.105 86.8582 130.223 85.9768C129.342 85.0954 128.147 84.6002 126.9 84.6002ZM23.5 75.2002C19.7605 75.2002 16.1741 76.6857 13.5298 79.33C10.8856 81.9743 9.40002 85.5606 9.40002 89.3002V98.7002C9.40002 102.44 10.8856 106.026 13.5298 108.67C16.1741 111.315 19.7605 112.8 23.5 112.8C27.2396 112.8 30.826 111.315 33.4702 108.67C36.1145 106.026 37.6 102.44 37.6 98.7002V89.3002C37.6 85.5606 36.1145 81.9743 33.4702 79.33C30.826 76.6857 27.2396 75.2002 23.5 75.2002ZM18.8 89.3002C18.8 88.0537 19.2952 86.8582 20.1766 85.9768C21.058 85.0954 22.2535 84.6002 23.5 84.6002C24.7465 84.6002 25.942 85.0954 26.8234 85.9768C27.7048 86.8582 28.2 88.0537 28.2 89.3002V98.7002C28.2 99.9467 27.7048 101.142 26.8234 102.024C25.942 102.905 24.7465 103.4 23.5 103.4C22.2535 103.4 21.058 102.905 20.1766 102.024C19.2952 101.142 18.8 99.9467 18.8 98.7002V89.3002Z"
                        fill="white"
                      />
                    </g>
                    <g className="second-g">
                      <path
                        d="M98.465 20.3984C97.2053 19.3675 95.6277 18.8042 94 18.8042C92.3723 18.8042 90.7947 19.3675 89.535 20.3984L63.685 41.5484C62.3003 42.7513 61.4389 44.4466 61.2838 46.2744C61.1286 48.1021 61.692 49.9183 62.8542 51.3374C64.0164 52.7566 65.686 53.6668 67.5084 53.875C69.3309 54.0832 71.1627 53.5728 72.615 52.4524L83.3075 43.7104L94 34.9684L115.385 52.4524C116.097 53.0708 116.926 53.5402 117.822 53.8326C118.719 54.1251 119.665 54.2347 120.605 54.1549C121.544 54.0752 122.459 53.8077 123.293 53.3683C124.127 52.929 124.865 52.3267 125.463 51.597C126.06 50.8674 126.505 50.0254 126.772 49.1207C127.038 48.216 127.12 47.267 127.013 46.3301C126.906 45.3931 126.612 44.4871 126.149 43.6658C125.685 42.8444 125.062 42.1244 124.315 41.5484L98.465 20.3984ZM124.315 146.452L98.465 167.602C97.2053 168.633 95.6277 169.197 94 169.197C92.3723 169.197 90.7947 168.633 89.535 167.602L63.685 146.452C62.3003 145.249 61.4389 143.554 61.2838 141.726C61.1286 139.899 61.692 138.082 62.8542 136.663C64.0164 135.244 65.686 134.334 67.5084 134.126C69.3309 133.918 71.1627 134.428 72.615 135.548L94 153.032L115.385 135.539C116.097 134.92 116.926 134.451 117.822 134.159C118.719 133.866 119.665 133.757 120.605 133.836C121.544 133.916 122.459 134.184 123.293 134.623C124.127 135.062 124.865 135.665 125.463 136.394C126.06 137.124 126.505 137.966 126.772 138.871C127.038 139.775 127.12 140.724 127.013 141.661C126.906 142.598 126.612 143.504 126.149 144.326C125.685 145.147 125.062 145.867 124.315 146.443V146.452ZM101.05 82.2504C101.05 84.1201 100.307 85.9133 98.9851 87.2355C97.663 88.5576 95.8698 89.3004 94 89.3004C92.1302 89.3004 90.337 88.5576 89.0149 87.2355C87.6928 85.9133 86.95 84.1201 86.95 82.2504C86.95 80.3806 87.6928 78.5874 89.0149 77.2653C90.337 75.9431 92.1302 75.2004 94 75.2004C95.8698 75.2004 97.663 75.9431 98.9851 77.2653C100.307 78.5874 101.05 80.3806 101.05 82.2504ZM94 112.8C95.8698 112.8 97.663 112.058 98.9851 110.735C100.307 109.413 101.05 107.62 101.05 105.75C101.05 103.881 100.307 102.087 98.9851 100.765C97.663 99.4431 95.8698 98.7004 94 98.7004C92.1302 98.7004 90.337 99.4431 89.0149 100.765C87.6928 102.087 86.95 103.881 86.95 105.75C86.95 107.62 87.6928 109.413 89.0149 110.735C90.337 112.058 92.1302 112.8 94 112.8Z"
                        fill="#0AE1EF"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_54_620"
                        x="5.40002"
                        y="71.2002"
                        width="177.2"
                        height="45.6001"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_620"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_620"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_54_620"
                        x="55.2585"
                        y="12.8042"
                        width="77.8"
                        height="162.392"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="3" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.0392157 0 0 0 0 0.882353 0 0 0 0 0.937255 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_620"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_620"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="benefits-text-wrappers">
                  <h2 className="privatesale"> NFT Marketplace</h2>
                  <p className="text benifits">
                    Truck Mint provides its audience exclusive ownership of
                    Autonomous EV truck NFTs.
                    <br />
                    <br />
                    With rare attributes and traits; the market value of our
                    NFTs will keep increasing over time. Hence increasing their
                    utility.
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-lg-3 iconbox">
                <div className="img-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 165 99"
                    fill="none"
                    className="icons icon2"
                  >
                    <g>
                      <path
                        d="M116 5C91.148 5 71 25.148 71 50C71 74.852 91.148 95 116 95C140.852 95 161 74.852 161 50C161 25.148 140.852 5 116 5ZM137.052 71.762H128.577V42.323C128.577 41.477 128.589 40.2905 128.607 38.765C128.628 37.238 128.637 36.062 128.637 35.2355L120.39 71.762H111.551L103.363 35.2355C103.363 36.062 103.371 37.238 103.392 38.765C103.413 40.2905 103.423 41.477 103.423 42.323V71.762H94.9475V28.238H108.183L116.105 62.459L123.968 28.238H137.055V71.762H137.052Z"
                        fill="white"
                      />
                    </g>
                    <g className="second-g">
                      <path
                        d="M33 25V65H41V45L49 65H57V25H49V45L41 25H33ZM45 5C50.2529 5 55.4543 6.03463 60.3073 8.04482C65.1604 10.055 69.5699 13.0014 73.2843 16.7157C76.9986 20.4301 79.945 24.8396 81.9552 29.6927C83.9654 34.5457 85 39.7471 85 45C85 55.6087 80.7857 65.7828 73.2843 73.2843C65.7828 80.7857 55.6087 85 45 85C39.7471 85 34.5457 83.9654 29.6927 81.9552C24.8396 79.945 20.4301 76.9986 16.7157 73.2843C9.21427 65.7828 5 55.6087 5 45C5 34.3913 9.21427 24.2172 16.7157 16.7157C24.2172 9.21427 34.3913 5 45 5Z"
                        fill="#0AE1EF"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_54_627"
                        x="67"
                        y="1"
                        width="98"
                        height="98"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_627"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_627"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_54_627"
                        x="0"
                        y="0"
                        width="90"
                        height="90"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.0392157 0 0 0 0 0.882353 0 0 0 0 0.937255 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_627"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_627"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="benefits-text-wrappers">
                  <h2 className="privatesale">TMS Courses</h2>
                  <p className="text benifits">
                    By investing in our NFTs you can avail further resources to
                    help you navigate the world of freight transport.
                    <br />
                    After the release of truck NFTs, our users can avail the
                    benefits of numerous educational content and resources like
                    short and long-form courses.
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-lg-3  iconbox">
                <div className="img-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 99 99"
                    fill="none"
                    className="icons icon3"
                  >
                    <g>
                      <path
                        d="M36.9928 23.231C27.6376 33.7327 21.2174 48.8202 20.6212 50.2418L4.02039 43.1337L26.0784 21.0757L36.9928 23.231ZM75.7892 62.0275C65.2876 71.3827 50.2001 77.8029 48.7785 78.399L55.8866 94.9999L77.9446 72.9418L75.7892 62.0275ZM36.1215 76.6564C36.1215 80.4627 34.5623 83.9021 32.0859 86.3784C26.6746 91.7898 4.02039 94.9999 4.02039 94.9999C4.02039 94.9999 7.23049 72.3457 12.6418 66.9344C14.5624 65.0038 17.0133 63.6875 19.6834 63.1525C22.3535 62.6176 25.1224 62.8882 27.6384 63.93C30.1544 64.9718 32.3041 66.7378 33.8145 69.0037C35.3249 71.2696 36.1279 73.9332 36.1215 76.6564Z"
                        fill="white"
                      />
                    </g>
                    <g className="second-g">
                      <path
                        d="M46.0728 72.0712C46.0728 72.0712 63.2239 64.9631 73.0835 55.1035C97.8472 30.3398 93.7199 10.9874 92.39 6.63085C88.0335 5.25509 68.6811 1.17367 43.9174 25.9374C34.0578 35.797 26.9497 52.9481 26.9497 52.9481L46.0728 72.0712ZM54.4649 35.3842C54.4649 30.3398 58.5922 26.2125 63.6367 26.2125C68.6811 26.2125 72.8084 30.3398 72.8084 35.3842C72.8084 40.4287 68.6811 44.556 63.6367 44.556C58.5922 44.556 54.4649 40.4287 54.4649 35.3842Z"
                        fill="#0AE1EF"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_54_631"
                        x="0.0203857"
                        y="17.0757"
                        width="81.9242"
                        height="81.9243"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_631"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_631"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_54_631"
                        x="21.9497"
                        y="0.51123"
                        width="76.5397"
                        height="76.5601"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.0392157 0 0 0 0 0.882353 0 0 0 0 0.937255 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_54_631"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_54_631"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="benefits-text-wrappers">
                  <h2 className="privatesale">Early release</h2>
                  <p className="text benifits">
                    We offer our loyal customers exclusive access to NFT drops
                    <br />
                    <br />
                    and other news before its released to the general public.
                    Early releases benefit our dedicated users by helping them
                    avail many resources beforehand.
                  </p>
                </div>
              </div>
              <div className="col-sm-4 col-lg-3  iconbox">
                <div className="img-wrapper">
                  <span className="">
                    <Icon
                      icon="bxl:digitalocean"
                      color="white"
                      width="100"
                      height="100"
                      className="icons icon3"
                    />
                  </span>
                </div>
                <div className="benefits-text-wrappers">
                  <h2 className="privatesale">Digital Coupons</h2>
                  <p className="text benifits">
                    These coupons can be used to upgrade the traits of your NFTs
                    <br />
                    <br />
                    which will in turn raise their market price and help you
                    grow passive income.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="benefits-text-wrappers">
            <h2 className="privatesale">Digital Coupons</h2>
            <p className="text benifits">
              These coupons can be used to upgrade
              <br />
              <br />
              the traits of your NFTs which will in turn raise their market
              price and help you grow passive income.
            </p>
          </div> */}

          <h2
            style={{
              textAlign: "center",
              marginBottom: "0px",
              marginTop: "-152px",
            }}
            className="art"
          >
            Fits
          </h2>
        </section>

        <section id="newsletter" className="Newsletter">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="size2 active-animatioon">
                  <div className="newsletter-wrapp">
                    <h2 className="joinnewsletter">join newsletter</h2>
                    <p className="text">
                      Join the
                      <span
                        style={{
                          color: "#0AE1EF",
                          fontWeight: "bold",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        TRUCK MINT
                      </span>
                      newsletter and be the first to know the latest news!
                    </p>
                    <div className="btn-wrap">
                      <a className="apply-btn" href="#">
                        Apply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="roadmap" className="roadmap">
          <div className="container-fluid  nopadding">
            <div className="artwork-wrapper"></div>
            <h2 className="artwork-title">Road Map</h2>
          </div>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "-270px",
              marginTop: "0px",
            }}
            className="art"
          >
            Map
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <h3 className="phase">
                  Quarter 3 <span className="numberstroke">2022</span>
                </h3>
                <p className="text phase">
                  <ul>
                    <li>Research and idea conception</li>
                    <li>Truck fleet design</li>
                    <li>Team building Website setup</li>
                    <li>Website setup</li>
                  </ul>
                  <br />
                  <br />
                  {/* Eros non sollicitud velit fermentum dui eget. Etiam et
                  ultrices adipiscing nec, eu purus eg. Nec mattis eget viverra
                  orci morbi. Eu ullamcorper nibh leo volutpat. */}
                </p>
              </div>
              <div className="col-sm-6 col-lg-3">
                <h3 className="phase">
                  Quarter 4 <span className="numberstroke">2022</span>
                </h3>
                <p className="text phase">
                  <ul>
                    <li>Community Expansion</li>
                    <li>500 NFTs on hold</li>
                    <li>Initial release of information </li>
                    <li>Start NFT sale</li>
                  </ul>
                </p>
              </div>
              <div className="col-sm-6 col-lg-3">
                <h3 className="phase">
                  Quarter 1 <span className="numberstroke">2023</span>
                </h3>
                <p className="text phase">
                  <ul>
                    <li>Commute bridge alpha version</li>
                    <li> Introduction to courses </li>
                    <li>Airdrops</li>
                  </ul>
                </p>
              </div>
              <div className="col-sm-6 col-lg-3">
                <h3 className="phase">
                  Quarter 2 <span className="numberstroke"> 2023</span>
                </h3>
                <p className="text phase">
                  <ul>
                    <li> Commute bridge final dashboard</li>
                    <li> Partnerships </li>
                    <li> Collaborations</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="team-main">
          <div className="artwork-wrapper"></div>
          <div className="container">
            <h2 className="artwork-title">Team</h2>
          </div>
          <h2
            style={{
              textAlign: "left",
              marginBottom: "-270px",
              marginTop: "0px",
            }}
            className="art"
          >
            TE
          </h2>

          <div className="container">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-5">
                  <div className="team main">
                    <div className="team-img-wrap">
                      <img className="team-img first-img" src={team1} alt="" />
                    </div>
                    <div className="team-text-wrap">
                      <h3 className="team-name">Truck Artist</h3>
                      <p className="main-team-postition">
                        Famous Creator of Collection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-sm-4 col-md-4">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team2} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team3} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team4} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4 col-md-4 second-row-team">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team5} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 second-row-team">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team6} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 second-row-team">
                      <div className="team">
                        <div className="team-img-wrap">
                          <img className="team-img" src={team7} alt="" />
                        </div>
                        <div className="team-text-wrap">
                          <h3 className="team-name">Truck Artist</h3>
                          <p className="team-postition">
                            Famous Creator of Collection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2
            style={{
              textAlign: "right",
              marginBottom: "0px",
              marginTop: "-240px",
            }}
            className="art"
          >
            AM
          </h2>
        </section>
        <footer>
          <div className="container-fluid  nopadding  ">
            <div className="artwork-wrapper"></div>
            <h2 className="artwork-title">
              <img
                className="img-fluid footlogo"
                src="..\assets\images\Truck Mint Logo@4x.png"
                alt=""
              />
            </h2>
          </div>

          <div className="footer-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  <div className="footer-img-wrap">
                    <img className="footer-img" src={openseaicon} alt="" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <ul className="footer-ul">
                    <li>
                      <a className="footer-links">About Truck Mint</a>
                    </li>
                    <li>
                      <a className="footer-links">ADVERTISING</a>
                    </li>
                    <li>
                      <a className="footer-links">Help/Faq</a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@fmcdigital.io"
                        className="footer-links"
                      >
                        info@fmcdigital.io
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-4 text-center">
                  <a href="#">
                    <img
                      className="social-icons"
                      src={socialicon1}
                      alt="social icons"
                    />
                  </a>
                  {/* <img
                    className="social-icons"
                    src={socialicon2}
                    alt="social icons"
                  /> */}
                  <a
                    href="https://www.instagram.com/truckmint.io/"
                    target="_blank"
                  >
                    <img
                      className="social-icons"
                      src={socialicon3}
                      alt="social icons"
                    />
                  </a>

                  {/* <img
                    className="social-icons"
                    src={socialicon4}
                    alt="social icons"
                  /> */}
                  <a href="https://twitter.com/TruckMint_io" target="_blank">
                    <img
                      className="social-icons"
                      src={socialicon5}
                      alt="social icons"
                    />
                  </a>

                  {/* <img
                    className="social-icons"
                    src={socialicon6}
                    alt="social icons"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </ScrollSpy>
    </>
  );
};
export default Home;
