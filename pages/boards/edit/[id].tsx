import { useRouter } from "next/router";
import Edit from "../../../components/Edit";
import { useState, useEffect, useCallback } from "react";
import api from "../../../api";

const edit = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);

  const init = useCallback(async () => {
    const result = await api.show(`/boards/${id}`);
    const { data, status: httpStatus } = result;

    const categoriesResult = await api.index("/categories");
    const { data: categories, status: categoriesStatus } = categoriesResult;
    if (httpStatus === 200) {
      setData(data.data);
    }

    if (categoriesStatus === 200) {
      setCategories(categories);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Edit param={id} data={data} categories={categories} preset={"none"} />
    </div>
  );
};

export default edit;
