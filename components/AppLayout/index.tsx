import {
  FunctionComponent,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Layout, Row, Col, Button, message, Drawer, Card } from "antd";
import {
  Header,
  Ul,
  Navigation,
  MainContentRow,
  MainContentCol,
  LeftUl,
  Logo,
} from "./style";
import Link from "next/link";
import userStore from "../../stores/userStore";
import jsCookie from "js-cookie";
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from "react-icons/md";
import Router from "next/router";
import api from "../../api";

interface ICategory {
  id: number;
  code: number;
  name: string;
}

const AppLayout: FunctionComponent = ({ children }) => {
  const userState = useContext(userStore);
  const [visible, setVisible] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);

  const onClickLogout = useCallback(async () => {
    await jsCookie.remove("token");
    userState.logout();
    message.success("로그아웃 되었습니다");
  }, [userState]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const clickPage = useCallback((path) => {
    Router.push(path);
    setVisible(false);
  }, []);
  const init = useCallback(async () => {
    const result = await api.index("/hashtags");
    const { data, status } = result;
    const { data: hashtagsData } = data;
    if (status === 200) {
      setHashtags(hashtagsData);
    }

    const categoriesResult = await api.index("/categories");

    const { data: categories, status: categoriesStatus } = categoriesResult;

    if (categoriesStatus === 200) {
      setCategories(categories.data);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);

  interface IHashtag {
    id: number;
    name: string;
  }
  return (
    <Layout>
      <Row>
        <Header>
          <Row justify="center">
            {/* pc헤더 */}
            <Col xs={0} md={16}>
              <Navigation>
                <Ul>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  {categories && categories.length > 0 &&
                    categories.map((category: ICategory) => (
                      <li key={category.id}>
                        <Link href={`/boards/category/${category.code}`}>
                          <a>{category.name}</a>
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  {userState &&
                    userState.value &&
                    userState.value.role &&
                    userState.value.role === 99 && (
                      <li>
                        <Link href="/admin/category">
                          <a>카테고리 관리</a>
                        </Link>
                      </li>
                    )}
                </Ul>
                <Logo>
                  <Link href="/">
                    <a>
                      <h1>Kohubi's Blog</h1>
                    </a>
                  </Link>
                </Logo>
                <LeftUl>
                  <li>
                    {userState &&
                      userState.value &&
                      userState.value.id
                      ? (
                        <Button
                          onClick={onClickLogout}
                          type="link"
                          ghost
                        >
                          <a>로그아웃</a>
                        </Button>
                      )
                      : (
                        <Link href="/login">
                          <a>로그인</a>
                        </Link>
                      )}
                  </li>
                </LeftUl>
              </Navigation>
            </Col>
            {/* 모바일 헤더 */}
            <Col xs={24} md={0}>
              <Row>
                <Col>
                  {visible
                    ? (
                      <MdFormatIndentDecrease
                        style={{ color: "white" }}
                        size={30}
                        onClick={() => setVisible(false)}
                      />
                    )
                    : (
                      <MdFormatIndentIncrease
                        style={{ color: "white" }}
                        size={30}
                        onClick={() => setVisible(true)}
                      />
                    )}
                </Col>
                <Col style={{ margin: "0 auto" }}>
                  <Logo>
                    <Link href="/">
                      <a>
                        <h1>Kohubi's Blog</h1>
                      </a>
                    </Link>
                  </Logo>
                </Col>
              </Row>

              <Drawer
                title="Basic Drawer"
                placement={"left"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"key"}
              >
                {categories && categories.length > 0 &&
                  categories.map((category: ICategory) => (
                    <p
                      key={category.id}
                      onClick={() =>
                        clickPage(`/boards/category/${category.code}`)}
                    >
                      {category.name}
                    </p>
                  ))}
                <p onClick={() => clickPage("/about")}>About</p>
                {userState &&
                  userState.value &&
                  userState.value.role &&
                  userState.value.role === 99 && (
                    <p onClick={() => clickPage("/admin/category")}>
                      카테고리 추가
                    </p>
                  )}

                {userState &&
                  userState.value &&
                  userState.value.id
                  ? (
                    <p onClick={onClickLogout}>
                      <a>로그아웃</a>
                    </p>
                  )
                  : (
                    <p onClick={() => clickPage("/login")}>
                      로그인
                    </p>
                  )}
              </Drawer>
            </Col>
          </Row>
        </Header>
      </Row>
      <MainContentRow>
        <Col span={24} style={{ marginTop: "58px" }}>
          <Row style={{ height: "100%" }}>
            <MainContentCol xs={24} sm={24} md={16}>
              <Row style={{ height: "100%" }}>
                <Col md={4} xs={0}>
                  <Card
                    title="태그"
                  >
                    {hashtags.length > 0 &&
                      hashtags.map((hashtag: IHashtag, index: number) => (
                        <Link
                          href={`/hashtag/${hashtag.name}`}
                          key={index}
                        >
                          <a style={{ margin: "5px" }}>
                            #{hashtag.name}
                          </a>
                        </Link>
                      ))}
                  </Card>
                </Col>
                <Col
                  md={20}
                  xs={24}
                  style={{ height: "100%", padding: "0px 10px" }}
                >
                  {children}
                </Col>
              </Row>
            </MainContentCol>
          </Row>
        </Col>
      </MainContentRow>
    </Layout>
  );
};

export default AppLayout;
