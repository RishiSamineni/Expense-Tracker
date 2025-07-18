import { useEffect } from "react";
import { UserContext } from "../context/userContext"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_URL } from "../utils/apiPaths"

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken || user) return;

        let isMounted = true;

        let fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_URL.AUTH.GET_USER_INFO);
                console.log(response);

                if(isMounted && response.data){
                    updateUser(response.data);
                }
            }
            catch(error){
                console.error("Failed to fetch user info", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);
}