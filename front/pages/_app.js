import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import logo from "../public/images/logo.png";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { ThemeProvider } from "styled-components";

import theme from "../styles/theme";

import wrapper from "../store/configureStore";

const App = ({ Component }) => (
  <>
    <Head>
      <meta property="og:image" url={logo} />
      <title>Pohang</title>

      <script src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=t0gdynkrzk&submodules=visualization&amp;submodules=panorama,geocoder,drawing,visualization`}></script>
    </Head>
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  //console.log(metric);
}

export default wrapper.withRedux(App);
