import styled from "styled-components";
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import {
  faHouse,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../store/userStore";
import { useEffect } from "react";
import useModalStore from "../../store/modalStore";
import SearchModal from "../modal/SearchModal";

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  padding: 8px;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;

  border-right: 1px solid var(--color-grey-2);
  border-radius: 5px;
`;

const LogoImg = styled.img`
  width: 80%;
  margin: 30px auto;
`;

const NavItemLink = styled(Link)`
  color: var(--color-black-2);
  text-decoration: none;
`;

const NavItemUl = styled.ul`
  list-style: none;
`;

const NavItemLi = styled.li``;

const Navigation = () => {
  const { isOpenSearchModal, openSearchModal } = useModalStore();
  const { isLoggedIn, user, logout } = useUserStore();
  const navigate = useNavigate();

  // profile 버튼을 누르면 본인의 profile로 이동
  const openProfile = () => {
    if (isLoggedIn && user) {
      navigate(`/${user.id}`);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign");
    }
  }, [isLoggedIn, navigate]);

  const onClickLogout = () => {
    logout();
  };

  return (
    <>
      <Nav>
        <div>
          <NavItemLink to={`/`}>
            <LogoImg src={Logo} />
          </NavItemLink>
          <NavItemUl>
            <NavItemLi>
              <NavItemLink to={`/`}>
                <NavigationItem icon={faHouse} size="xl" text="Home" />
              </NavItemLink>
            </NavItemLi>
            <NavItemLi>
              <NavigationItem
                icon={faMagnifyingGlass}
                size="xl"
                text="Search"
                onClick={openSearchModal}
              />
            </NavItemLi>
            <NavItemLi>
              <NavigationItem
                icon={faUser}
                size="xl"
                text="Profile"
                onClick={openProfile} // 프로필 페이지 open
              />
            </NavItemLi>
          </NavItemUl>
        </div>
        <NavItemUl>
          <NavItemLi>
            <NavigationItem
              icon={faRightFromBracket}
              size="xl"
              text="Logout"
              onClick={onClickLogout}
            />
          </NavItemLi>
        </NavItemUl>
      </Nav>
      {isOpenSearchModal && <SearchModal />}
    </>
  );
};

export default Navigation;
