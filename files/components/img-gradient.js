'use client'

import styled from "styled-components";

const ImgGradientDiv = styled.div`
  position: relative;
  width: ${props => props.$size};
  height: ${props => props.$size};

  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  >div:nth-child(2) {
    mask-image: linear-gradient(${props => props.$angle}, transparent, black);
    -webkit-mask-image: linear-gradient(${props => props.$angle}, transparent, black);
  }
  >div img {
    width: 100%;
    height: 100%;
  }
  >div:nth-child(1) img {
    transform: translateY(-10vw);
    filter: drop-shadow(0 10vw 0 ${props => props.$c1});
  }
  >div:nth-child(2) img {
    transform: translateY(-10vw);
    filter: drop-shadow(0 10vw 0 ${props => props.$c2});
  }
`;

export default function ImgGradient({src, alt = "", size = "50px", angle = "90deg", c1 = "blue", c2 = c1}) {
  return (
    <ImgGradientDiv className="img" $size={size} $angle={angle} $c1={c1} $c2={c2}>
      <div><img src={src} alt={alt} /></div>
      <div><img src={src} alt={alt} /></div>
    </ImgGradientDiv>
  )
}