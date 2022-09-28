import React, { Component } from "react";
import logo from "../assets/imgs/logo.webp";
import "../App.css";
import ScrollSpy from "react-ui-scrollspy";
import hamburger from "../assets/imgs/icons/hamburger.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const hamCtrl = () => {
    console.log("Clicked");
    let element = document.getElementById("nav-ctrl");
    element.classList.toggle("mystyle");
  };
  return (
    <div>
      <section className="header ">
        <div className="container">
          <div className="row">
            <div className="col-sm-2 col-5">
              <a href="#">
                <img
                  style={{ cursor: "pointer" }}
                  className="img-fluid logo"
                  src="..\assets\images\Truck Mint Logo@4x.png"
                  alt=""
                />
              </a>
            </div>
            <div className="col-sm-10 col-7">
              <ul id="nav-ctrl" className="navigation">
                <li className="nav-links">
                  <a
                    className="nav-items scrollto active-scroll-spy"
                    href="#collection"
                    data-to-scrollspy-id="collection"
                  >
                    Collection
                  </a>
                </li>
                <li className="nav-links scrollto">
                  <a
                    className="nav-items"
                    href="#benefit"
                    data-to-scrollspy-id="benefit"
                  >
                    benefit
                  </a>
                </li>
                <li className="nav-links scrollto">
                  <a
                    className="nav-items"
                    href="#roadmap"
                    data-to-scrollspy-id="roadmap"
                  >
                    Roadmap
                  </a>
                </li>
                <li className="nav-links scrollto">
                  <a
                    className="nav-items"
                    href="#team"
                    data-to-scrollspy-id="team"
                  >
                    Team
                  </a>
                </li>
                <li className="nav-links scrollto">
                  <a className="nav-items" href="#">
                    Litepaper
                  </a>
                </li>
                <li className="nav-links scrollto">
                  <a className="nav-items" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-links scrollto connectwalletmobile">
                  {/* <a className="nav-items mint-btn " href="#">
                    Connect Wallet
                  </a> */}
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      // Note: If your app doesn't use authentication, you
                      // can remove all 'authenticationStatus' checks
                      const ready =
                        mounted && authenticationStatus !== "loading";
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === "authenticated");

                      return (
                        <div
                          {...(!ready && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <button
                                  className="nav-items mint-btn "
                                  onClick={openConnectModal}
                                  type="button"
                                >
                                  Connect Wallet
                                </button>
                              );
                            }

                            return (
                              <div style={{ display: "flex", gap: 12 }}>
                                <button className="nav-items mint-btn "
                                   
                                  type="button"
                                >
                                  {account.displayName}
                                  {account.displayBalance
                                    ? ` (${account.displayBalance})`
                                    : ""}
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </li>
              </ul>

              <div className="ham-wrap">
                <img
                  className="hamburger"
                  src={hamburger}
                  alt=""
                  onClick={() => hamCtrl()}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Header;
