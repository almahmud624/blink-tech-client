import axios from "axios";
import { useEffect, useState } from "react";

const useCheckAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:4000/users/admin/${email}`).then((res) => {
        setIsAdmin(res.data?.isAdmin);
        setIsAdminLoading(false);
      });
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};

export default useCheckAdmin;
