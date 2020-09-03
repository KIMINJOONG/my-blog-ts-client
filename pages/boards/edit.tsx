import Edit from "../../components/Edit";
import api from "../../api";
import { useState, useCallback, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import { useSelector } from "react-redux";
import Router from "next/router";

const edit = () => {
  const [categories, setCategories] = useState([]);
  const { addBoardDone, board } = useSelector((state: any) => state.board);

  const init = useCallback(async () => {
    const categoriesResult = await api.index("/categories");

    const { data: categories, status: categoriesStatus } = categoriesResult;

    if (categoriesStatus === 200) {
      setCategories(categories.data);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (addBoardDone) {
      Router.push(`/boards/${board.data.id}`);
    }
  }, [addBoardDone]);

  return (
    <AppLayout>
      <Edit categories={categories} />
    </AppLayout>
  );
};

export default edit;
