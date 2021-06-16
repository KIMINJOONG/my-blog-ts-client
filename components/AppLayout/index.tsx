import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Row, Col, Button, message, Drawer } from "antd";
import { MenuSpan, ProfileResultSpan, ProfileSpan, HashtagA } from "./style";
import Link from "next/link";
import jsCookie from "js-cookie";
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from "react-icons/md";
import Router from "next/router";
import api from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_USER_REQUEST } from "../../reducers/user";
import { LOAD_COUNT_BY_TODAY_REQUEST } from "../../reducers/board";
import { RootState } from "../../reducers";
import { IHashtag } from "../../types/hashtag";
import { ICategory } from "../../types/category";

const AppLayout: FunctionComponent = ({ children }) => {
  const { countByToday } = useSelector((state: RootState) => state.board);
  const { me } = useSelector((state: RootState) => state.user);
  const [visible, setVisible] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const onClickLogout = useCallback(async () => {
    await jsCookie.remove("token");
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    message.success("로그아웃 되었습니다");
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const clickPage = useCallback(path => {
    Router.push(path);
    setVisible(false);
  }, []);
  const init = useCallback(async () => {
    dispatch({
      type: LOAD_COUNT_BY_TODAY_REQUEST
    });
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

  return (
    <div>
      <Row justify="center" style={{ backgroundColor: "#fafafa" }}>
        <Col xs={24} md={20}>
          <Row>
            <Col xs={24} md={0}>
              <Row>
                <Col>
                  {visible ? (
                    <MdFormatIndentDecrease
                      style={{ color: "#03e0c5" }}
                      size={30}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <MdFormatIndentIncrease
                      style={{ color: "#03e0c5" }}
                      size={30}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </Col>
              </Row>
              <Drawer
                title="메뉴"
                placement={"left"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"key"}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category: ICategory) => (
                    <p
                      key={category.id}
                      onClick={() =>
                        clickPage(`/boards/category/${category.code}`)
                      }
                    >
                      {category.name}
                    </p>
                  ))}
                <p onClick={() => clickPage("/about")}>About</p>
                {me && me.data && me.data.role && me.data.role === 99 && (
                  <p onClick={() => clickPage("/admin/category")}>
                    카테고리 추가
                  </p>
                )}

                {me && me.data && me.data.id ? (
                  <p onClick={onClickLogout}>
                    <a>로그아웃</a>
                  </p>
                ) : (
                  <p onClick={() => clickPage("/login")}>로그인</p>
                )}
              </Drawer>
            </Col>
          </Row>
          <Row style={{ height: "154px" }} align={"middle"}>
            <Col md={2} xs={4}></Col>
            <Col md={2} xs={5}>
              <Link href="/" prefetch={false}>
                <a>
                  <img
                    src="/logo.svg"
                    style={{
                      width: "206px",
                      height: "48px",
                      objectFit: "contain"
                    }}
                  />
                </a>
              </Link>
            </Col>
            <Col md={8} xs={2}></Col>
            <Col md={10} xs={0}>
              <Row
                align={"middle"}
                style={{
                  height: "48px",
                  borderRadius: "24px",
                  backgroundColor: "rgba(98, 103, 106, 0.6)",
                  textAlign: "center"
                }}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category: ICategory) => (
                    <Col md={4} key={category.id}>
                      <Link
                        href={`/boards/category/${category.code}`}
                        prefetch={false}
                      >
                        <MenuSpan>{category.name}</MenuSpan>
                      </Link>
                    </Col>
                  ))}
                <Col md={4}>
                  <MenuSpan>ABOUT</MenuSpan>
                </Col>
                <Col md={5}>
                  {me && me.data && me.data.id ? (
                    <MenuSpan onClick={onClickLogout}>LOGOUT</MenuSpan>
                  ) : (
                    <MenuSpan>
                      <Link href="/login" prefetch={false}>
                        <a>LOGIN</a>
                      </Link>
                    </MenuSpan>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={3} xs={0}></Col>
          </Row>
          <Row>
            <Col md={2} xs={0}></Col>
            <Col
              md={4}
              xs={0}
              style={{
                boxShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                padding: "0 20px"
              }}
            >
              <Row style={{ marginTop: "46px" }}>
                <Col
                  xs={8}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <img style={{ width: "56px", height: "56px" }} />
                </Col>
                <Col xs={16} style={{ textAlign: "left" }}>
                  <h4>
                    개발자 김인중의
                    <br /> 블로그입니다.
                  </h4>
                </Col>
              </Row>
              <Row style={{ marginTop: "39px" }}>
                <Col span={24}>
                  <Row>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>
                        오늘의
                        <br />
                        방문자
                      </ProfileSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>
                        오늘의
                        <br />
                        게시물
                      </ProfileSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileSpan>
                        총<br />
                        방문자
                      </ProfileSpan>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileResultSpan>00</ProfileResultSpan>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <ProfileResultSpan>
                        {countByToday.totalCount}
                      </ProfileResultSpan>
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
                  <Row
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-around"
                    }}
                  >
                    {hashtags.length > 0 &&
                      hashtags.map((hashtag: IHashtag, index: number) => (
                        <Col
                          xs={8}
                          key={index}
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            color: "#03e0c5"
                          }}
                        >
                          <Link
                            href={`/hashtag/${hashtag.name}`}
                            key={index}
                            prefetch={false}
                          >
                            <HashtagA
                              style={{
                                margin: "5px"
                              }}
                            >
                              #{hashtag.name}
                            </HashtagA>
                          </Link>
                        </Col>
                      ))}
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
