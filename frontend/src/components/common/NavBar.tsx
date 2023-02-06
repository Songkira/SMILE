// import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import logoImg from "../../assets/img/smile_black.png";
import "../../assets/css/index.css";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { rootCertificates } from "tls";

const Nav = styled(motion.nav)`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // padding: 0.784vw; //0.7rem
  align-items: center;
  z-index: 9999;
`;

const NavHeader = styled.div`
  margin-left: 3.36vw; //3rem
`;

const LinksContainer = styled.div`
  overflow: hidden;
`;

const Items = styled.li`
  display: flex;
  margin-right: 2.24vw; // 2rem;
  height: 3.2vw;
`;

const Item1 = styled.ul<UrlProps>`
  list-style-type: none;
  margin: 0 2.24vw; // 0 2rem;
  /* 텍스트 세로 중앙 정렬 위해 display, align-items 속성 추가 */
  display: flex;
  align-items: center;
  font-size: 1.12vw;
  position: relative;
  font-weight: ${(UrlProps) =>
    UrlProps.curUrl === "/studyList" ? "bold" : ""};

  &:hover,
  active,
  focus {
    cursor: pointer;
    font-weight: bold;
  }
  &::after {
    content: "";
    position: absolute;
    background: ${(props) => props.theme.mainColor};
    height: 0.4vw;
    width: calc(100%);
    left: 0;
    bottom: 0vw;
  }
  @media (hover) {
    &:hover::after {
      transform: scaleX(1);
      margin-left: 0;
    }

    &::after {
      transform: ${(UrlProps) =>
        UrlProps.curUrl === "/studyList" ? "scaleX(1)" : "scaleX(0)"};
      margin-left: 0%;
      transform-origin: left;
      transition: transform 500ms ease, margin-left 0.5s ease;
    }
  }
`;

const Item2 = styled(Item1)`
  font-weight: ${(UrlProps) => (UrlProps.curUrl === "/manage" ? "bold" : "")};

  @media (hover) {
    &::after {
      transform: ${(UrlProps) =>
        UrlProps.curUrl === "/manage" ? "scaleX(1)" : "scaleX(0)"};
    }
  }
`;

const Item3 = styled(Item1)`
  font-weight: ${(UrlProps) => (UrlProps.curUrl === "/mypage" ? "bold" : "")};

  @media (hover) {
    &::after {
      transform: ${(UrlProps) =>
        UrlProps.curUrl === "/mypage" ? "scaleX(1)" : "scaleX(0)"};
    }
  }
`;

const NabBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0 1.12vw; // 0.5rem 1rem;
  margin: 0.533vw;
  vertical-align: middle;
  background-color: ${(props) => props.theme.subColor2};
  color: white;
  border: 0;
  text-decoration: none;
  font-size: 1.12vw;

  &:hover,
  active,
  focus {
    background: ${(props) => props.theme.subColorHover};
  }
`;

const Img = styled.img`
  height: 2.1vw;
`;

// Link가 포함된 컴포넌트를 Router 안에 들어가 있어야 사용이 가능 => 일단 보류(페이지 만들어진 뒤에 추가)

const navVariants = {
  top: {
    backgroundColor: `rgba(255, 255, 255, 0)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0)`,
  },
  scroll: {
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0.1)`,
  },
  fix: {
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 5px 5px rgba(0, 0, 0, 0.1)`,
  },
};

interface UrlProps {
  curUrl: string;
}

function NavBar(props: UrlProps) {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  console.log("props : ", props.curUrl);

  useEffect(() => {
    if (props.curUrl === "/") {
      scrollY.onChange(() => {
        if (scrollY.get() > 80) {
          navAnimation.start("scroll");
        } else {
          navAnimation.start("top");
        }
      });
    } else {
      navAnimation.start("fix");
    }
  }, [scrollY, navAnimation, props.curUrl]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <NavHeader>
        <Link to="/">
          <Img src={logoImg} />
        </Link>
      </NavHeader>
      <LinksContainer>
        <Items>
          <Item1 curUrl={props.curUrl}>
            {/* <Link to="">스터디 조회</Link> */} 스터디 조회
          </Item1>
          <Item2 curUrl={props.curUrl}>
            <Link to="/manage">내 스터디</Link>
          </Item2>
          <Item3 curUrl={props.curUrl}>내 정보</Item3>
          {/* <Item>
            <NabBtn>로그아웃</NabBtn>
          </Item> */}
          <NabBtn>로그아웃</NabBtn>
        </Items>
      </LinksContainer>
    </Nav>
  );
}
export default NavBar;