import {
  FunctionComponent,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Layout, Row, Col, Button, message, Drawer, Card } from "antd";
import {
  MenuSpan,
  ProfileResultSpan,
  ProfileSpan,
  HashtagA,
} from "./style";
import Link from "next/link";
import jsCookie from "js-cookie";
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from "react-icons/md";
import Router from "next/router";
import api from "../../api";
import { useSelector } from "react-redux";

interface ICategory {
  id: number;
  code: number;
  name: string;
}

const AppLayout: FunctionComponent = ({ children }) => {
  const { me } = useSelector((state: any) => state.user);
  const [visible, setVisible] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);

  const onClickLogout = useCallback(async () => {
    await jsCookie.remove("token");
    message.success("로그아웃 되었습니다");
  }, []);

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
  // return (
  //     <Layout>
  //         <Row>
  //             <Header>
  //                 <Row justify="center">
  //                     {/* pc헤더 */}
  //                     <Col xs={0} md={16}>
  //                         <Navigation>
  //                             <Ul>
  //                                 <li>
  //                                     <Link href="/">
  //                                         <a>Home</a>
  //                                     </Link>
  //                                 </li>
  //                                 {categories &&
  //                                     categories.length > 0 &&
  //                                     categories.map(
  //                                         (category: ICategory) => (
  //                                             <li key={category.id}>
  //                                                 <Link
  //                                                     href={`/boards/category/${category.code}`}
  //                                                 >
  //                                                     <a>{category.name}</a>
  //                                                 </Link>
  //                                             </li>
  //                                         )
  //                                     )}
  //                                 <li>
  //                                     <Link href="/about">
  //                                         <a>About</a>
  //                                     </Link>
  //                                 </li>
  //                                 {me &&
  //                                     me.data &&
  //                                     me.data.role &&
  //                                     me.data.role === 99 && (
  //                                         <li>
  //                                             <Link href="/admin/category">
  //                                                 <a>카테고리 관리</a>
  //                                             </Link>
  //                                         </li>
  //                                     )}
  //                             </Ul>
  //                             <Logo>
  //                                 <Link href="/">
  //                                     <a>
  //                                         <h1>Kohubi's Blog</h1>
  //                                     </a>
  //                                 </Link>
  //                             </Logo>
  //                             <LeftUl>
  //                                 <li>
  //                                     {me && me.data && me.data.id ? (
  //                                         <Button
  //                                             onClick={onClickLogout}
  //                                             type="link"
  //                                             ghost
  //                                         >
  //                                             <a>로그아웃</a>
  //                                         </Button>
  //                                     ) : (
  //                                         <Link href="/login">
  //                                             <a>로그인</a>
  //                                         </Link>
  //                                     )}
  //                                 </li>
  //                             </LeftUl>
  //                         </Navigation>
  //                     </Col>
  //                     {/* 모바일 헤더 */}
  //                     <Col xs={24} md={0}>
  //                         <Row>
  //                             <Col>
  //                                 {visible ? (
  //                                     <MdFormatIndentDecrease
  //                                         style={{ color: "white" }}
  //                                         size={30}
  //                                         onClick={() => setVisible(false)}
  //                                     />
  //                                 ) : (
  //                                     <MdFormatIndentIncrease
  //                                         style={{ color: "white" }}
  //                                         size={30}
  //                                         onClick={() => setVisible(true)}
  //                                     />
  //                                 )}
  //                             </Col>
  //                             <Col style={{ margin: "0 auto" }}>
  //                                 <Logo>
  //                                     <Link href="/">
  //                                         <a>
  //                                             <h1>Kohubi's Blog</h1>
  //                                         </a>
  //                                     </Link>
  //                                 </Logo>
  //                             </Col>
  //                         </Row>

  //                         <Drawer
  //                             title="Basic Drawer"
  //                             placement={"left"}
  //                             closable={false}
  //                             onClose={onClose}
  //                             visible={visible}
  //                             key={"key"}
  //                         >
  //                             {categories &&
  //                                 categories.length > 0 &&
  //                                 categories.map((category: ICategory) => (
  //                                     <p
  //                                         key={category.id}
  //                                         onClick={() =>
  //                                             clickPage(
  //                                                 `/boards/category/${category.code}`
  //                                             )
  //                                         }
  //                                     >
  //                                         {category.name}
  //                                     </p>
  //                                 ))}
  //                             <p onClick={() => clickPage("/about")}>About</p>
  //                             {me &&
  //                                 me.data &&
  //                                 me.data.role &&
  //                                 me.data.role === 99 && (
  //                                     <p
  //                                         onClick={() =>
  //                                             clickPage("/admin/category")
  //                                         }
  //                                     >
  //                                         카테고리 추가
  //                                     </p>
  //                                 )}

  //                             {me && me.data && me.data.id ? (
  //                                 <p onClick={onClickLogout}>
  //                                     <a>로그아웃</a>
  //                                 </p>
  //                             ) : (
  //                                 <p onClick={() => clickPage("/login")}>
  //                                     로그인
  //                                 </p>
  //                             )}
  //                         </Drawer>
  //                     </Col>
  //                 </Row>
  //             </Header>
  //         </Row>
  //         <MainContentRow>
  //             <Col span={24} style={{ marginTop: "58px" }}>
  //                 <Row style={{ height: "100%" }}>
  //                     <MainContentCol xs={24} sm={24} md={16}>
  //                         <Row style={{ height: "100%" }}>
  //                             <Col md={4} xs={0}>
  //                                 <Card
  //                                     style={{ wordBreak: "break-word" }}
  //                                     title="해쉬태그"
  //                                 >
  //                                     {hashtags.length > 0 &&
  //                                         hashtags.map(
  //                                             (
  //                                                 hashtag: IHashtag,
  //                                                 index: number
  //                                             ) => (
  //                                                 <Link
  //                                                     href={`/hashtag/${hashtag.name}`}
  //                                                     key={index}
  //                                                 >
  //                                                     <a
  //                                                         style={{
  //                                                             margin: "5px",
  //                                                         }}
  //                                                     >
  //                                                         #{hashtag.name}
  //                                                     </a>
  //                                                 </Link>
  //                                             )
  //                                         )}
  //                                 </Card>
  //                             </Col>
  //                             <Col
  //                                 md={20}
  //                                 xs={24}
  //                                 style={{
  //                                     height: "100%",
  //                                     padding: "0px 10px",
  //                                 }}
  //                             >
  //                                 {children}
  //                             </Col>
  //                         </Row>
  //                     </MainContentCol>
  //                 </Row>
  //             </Col>
  //         </MainContentRow>
  //     </Layout>
  // );
  return (
    <div>
      <Row
        justify="center"
        style={{ backgroundColor: "#fafafa", height: "100vh" }}
      >
        <Col xs={24} md={20}>
          <Row style={{ height: "154px" }} align={"middle"}>
            <Col md={2} xs={0}></Col>
            <Col md={2}>
              <Link href="/">
                <a>
                  <img
                    src="/logo.svg"
                    style={{
                      width: "206px",
                      height: "48px",
                      objectFit: "contain",
                    }}
                  />
                </a>
              </Link>
            </Col>
            <Col md={8} xs={2}></Col>
            <Col md={9} xs={20}>
              <Row
                align={"middle"}
                style={{
                  height: "48px",
                  borderRadius: "24px",
                  backgroundColor: "rgba(98, 103, 106, 0.6)",
                  textAlign: "center",
                }}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map(
                    (category: ICategory) => (
                      <Col md={6} key={category.id}>
                        <Link href={`/boards/category/${category.code}`}>
                          <MenuSpan>
                            {category.name}
                          </MenuSpan>
                        </Link>
                      </Col>
                    ),
                  )}
                <Col md={6}>
                  <MenuSpan>
                    ABOUT
                  </MenuSpan>
                </Col>
              </Row>
            </Col>
            <Col md={3} xs={0}></Col>
          </Row>
          <Row style={{ marginTop: "117px" }}>
            <Col md={2} xs={0}></Col>
            <Col
              md={4}
              xs={0}
              style={{
                boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                padding: "0 20px",
              }}
            >
              <Row align="middle" style={{ marginTop: "46px" }}>
                <Col xs={8}>
                  <img style={{ width: "56px", height: "56px" }} />
                </Col>
                <Col xs={16} style={{ textAlign: "left" }}>
                  <h4>개발자 김인중의<br /> 블로그입니다.</h4>
                </Col>
              </Row>
              <Row style={{ marginTop: "39px" }}>
                <Col span={24}>
                  <Row>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>오늘의<br />방문자</ProfileSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>오늘의<br />게시물</ProfileSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>총<br />방문자</ProfileSpan>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileResultSpan>00</ProfileResultSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileResultSpan>12</ProfileResultSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileResultSpan>3</ProfileResultSpan>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr style={{ border: "dashed 1px rgba(98, 103, 106, 0.2)" }} />
              <Row style={{ marginTop: "59px" }}>
                <Col>
                  <h3>해쉬태그</h3>
                </Col>
                <Col xs={24} style={{ wordBreak: "break-word" }}>
                  <Row>
                    {hashtags.length > 0 &&
                      hashtags.map(
                        (
                          hashtag: IHashtag,
                          index: number,
                        ) => (
                          <Col xs={8}>
                            <Link
                              href={`/hashtag/${hashtag.name}`}
                              key={index}
                            >
                              <HashtagA
                                style={{
                                  margin: "5px",
                                }}
                              >
                                #{hashtag.name}
                              </HashtagA>
                            </Link>
                          </Col>
                        ),
                      )}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={0} md={1}></Col>
            <Col xs={24} md={15}>
              {children}
            </Col>
            <Col md={3} xs={0}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
