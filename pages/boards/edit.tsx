import Edit from "../../components/Edit";
import api from "../../api";
import { useState, useCallback, useEffect } from "react";

const edit = () => {
  const [categories, setCategories] = useState([]);

  const init = useCallback(async () => {
    const categoriesResult = await api.index("/categories");

    const { data: categories, status: categoriesStatus } = categoriesResult;

    if (categoriesStatus === 200) {
      setCategories(categories);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Edit categories={categories} />
    </div>
  );
};

export default edit;
