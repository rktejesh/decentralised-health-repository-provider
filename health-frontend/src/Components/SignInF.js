import React, { useState  } from "react";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaMaskSDK from "@metamask/sdk";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function SignInF({typeOfUser}) {
  const { seteth_id } = useAuth();
  const { eth_id } = useAuth();
  const {setAuth} = useAuth() ;
  const [walletAddress, setWalletAddress] = useState();
  const [userexist, setuserexist] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const fetchData = async () => {
    console.log("here" + typeOfUser);
    await axiosPrivate
      .get(
        `/api/check-user?eth_id=${walletAddress}&type=${typeOfUser}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.ifUserExists===false) {
            const container = document.querySelector(".container");
            container.classList.add("sign-up-mode");
            const accessToken = res.data.accessToken;
            console.log(accessToken);
            setAuth({walletAddress , accessToken});
            setuserexist(false);
        }else{
          const accessToken = res.data.accessToken;
          console.log(accessToken);
          setAuth({walletAddress , accessToken});
          console.log(accessToken  + 'here');
          navigate(`/${typeOfUser}/Home`)
          setuserexist(true);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate(`/${typeOfUser}/Login`)
      });
  };

  const change_page = () => {
    if (!userexist) {
      const container = document.querySelector(".container");
      container.classList.add("sign-up-mode");
    } else navigate(`/${typeOfUser}/Home`);
  };

  const onConnect = async () => {
    const MMSDK = new MetaMaskSDK({
      checkInstallationOnAllCalls: true,
      preferDesktop: false,
    });

    try {
      console.log("yes")
      if (window.ethereum) {
        if(window.ethereum.isConnected() && walletAddress !== undefined) {
          seteth_id(walletAddress);
          await fetchData();
        } else {
          try {
            const account = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const acc = account[0];
            if (walletAddress === acc) {
              console.log(walletAddress);
              seteth_id(walletAddress);
              await fetchData();
              console.log(walletAddress);
            } else{
              setWalletAddress(acc);
            }
          } catch (err) {
            console.error(err);
          }   
        }
      } else {
        // setErrorMessage("Install MetaMask");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(`walletAddress - ${walletAddress}`);
    if (walletAddress !== undefined) {
      seteth_id(walletAddress);
      console.log(eth_id);
      fetchData();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (userexist !== undefined) change_page();
  }, [userexist]);

  return (
    <form action="#" className="sign-in-form">
      <button
        className="bottom-btn-sub"
        style={{ width: "60%" }}
        onClick={onConnect}
      >
        Connect to Metamask{" "}
      </button>
    </form>
  );
}
export default SignInF;
