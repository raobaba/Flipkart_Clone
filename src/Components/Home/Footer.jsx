import React from "react";
import { styled, Box, Typography } from "@mui/material";

const FooterHead = styled(Box)`
  width: 100%;
  height: auto;
  color: #fff;
  color: grey;
`;

const BigCont = styled(Box)`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: row;
    height: 65%;
  }
`;

const SmallCont = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-around;
  
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 25%;
    margin-bottom: 0;
  }
`;

const TypoWord = styled(Typography)`
  font-size: 13px;
  padding-top: 5px;
  font-weight: 300;
`;

const Header = styled(Box)`
  color: black;
  font-weight: 600;
`;

const FooterPart = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    height: 15%;
  }
`;

const Flex = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
const TopGap = styled(Typography)`
  margin-top: 8px;
  font-size: 14px;
`;
const HorizontalLine = styled(Box)`
  width: 100%;
  border-top: 1px solid black; /* Horizontal line styling */
  margin: 10px 0;
`;

const VerticalLine = styled(Box)`
  width: 1px;
  height: 100%;
  background-color: black; /* Vertical line styling */
  margin: 0 20px;
`;

function Footer() {
  return (
    <FooterHead>
      <BigCont>
        <SmallCont>
          <Box>
            <Header>ABOUT</Header>
            <TypoWord>Contact Us</TypoWord>
            <TypoWord>About Us</TypoWord>
            <TypoWord>Careers</TypoWord>
            <TypoWord>Flipkart Stories</TypoWord>
            <TypoWord>Press</TypoWord>
            <TypoWord>Flipkart wholesale</TypoWord>
            <TypoWord>Cleartrip</TypoWord>
            <TypoWord>Corporate Information</TypoWord>
          </Box>
          <Box>
            <Header>HELP</Header>
            <TypoWord>Payments</TypoWord>
            <TypoWord>Shippings</TypoWord>
            <TypoWord>Cancelation & Returns</TypoWord>
            <TypoWord>FAQ</TypoWord>
            <TypoWord>Report Infringement</TypoWord>
          </Box>
          <Box>
            <Header>CONSUMER POLICY</Header>
            <TypoWord>Cancelation & Returns</TypoWord>
            <TypoWord>Terms of Use</TypoWord>
            <TypoWord>Security</TypoWord>
            <TypoWord>Privacy</TypoWord>
            <TypoWord>Sitemap</TypoWord>
            <TypoWord>Grievance Redressal</TypoWord>
            <TypoWord>EPR Compliance</TypoWord>
          </Box>
          <Box>
            <Header>SOCIAL</Header>
            <TypoWord>Facebook</TypoWord>
            <TypoWord>Twitter</TypoWord>
            <TypoWord>YouTube</TypoWord>
          </Box>
        </SmallCont>
        <VerticalLine />
        <SmallCont>
          <Box>
            <Header>Mail Us:</Header>
            <TypoWord>
              Flipkart Internet Private Limited,
              <br />
              Building Alyssa, Bagonia & Clove <br />
              Embassy Tech village, Outer ring <br />
              road,Deverabeeshanhalli, village,
              <br />
              Bengaluru, 234255 <br />
              Karnataka, India
            </TypoWord>
          </Box>
          <Box>
            <Header>Registered Office Address:</Header>
            <TypoWord>
              Flipkart Internet Private Limited,
              <br />
              Building Alyssa, Bagonia & Clove <br />
              Embassy Tech village, Outer ring <br />
              road,Deverabeeshanhalli, village,
              <br />
              Bengaluru, 234255 <br />
              Karnataka, India <br />
              CIN:-23235456i2342iwe5r2 <br />
              Tel-Phone:- 234123
            </TypoWord>
          </Box>
        </SmallCont>
      </BigCont>
      <HorizontalLine />
      <FooterPart>
        <Flex>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"
            alt="seller"
            width={20}
          />
          <TopGap>Become a seller</TopGap>
        </Flex>
        <Flex>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"
            alt="advertise"
            width={20}
          />
          <TopGap>Advertise</TopGap>
        </Flex>
        <Flex>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"
            alt="gift"
            width={20}
          />
          <TopGap>Gift Cards</TopGap>
        </Flex>
        <Flex>
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"
            alt="help"
            width={20}
          />
          <TopGap>Help Center</TopGap>
        </Flex>
        <Flex>
          <TopGap>© 2007-2023 flipkart.com</TopGap>
        </Flex>
        <Flex>
          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="iLogo" width={300} height={60} />
        </Flex>
      </FooterPart>
    </FooterHead>
  );
}

export default Footer;
