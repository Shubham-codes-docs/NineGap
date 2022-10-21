import React, { useState, useEffect, useContext } from "react";
import Amplify, { Storage } from "aws-amplify";
import authContext from "../../store/AuthContext";

const index = () => {
  const authCtx = useContext(authContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "ap-south-1:cb6c9137-6fd5-4532-a7ff-5aedc94d87f3",
        region: "ap-south-1",
      },
      Storage: {
        AWSS3: {
          bucket: "ninegap",
          region: "ap-south-1",
        },
      },
    });
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (
      Object.keys(user).length !== 0 &&
      Object.getPrototypeOf(user) === Object.prototype
    ) {
      console.log(user);
      const imagePath = user.profilePic.split("/")[1];
      Storage.get(imagePath)
        .then((res) => {
          setImage(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/v1/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${authCtx.token}`,
      },
    });
    let data = await res.json();
    setUser(data.user);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card text-center p-4">
        <img src={image === "" ? null : image} alt="" />
        <h5>
          <strong>FirstName: </strong>
          {user.firstName}
        </h5>
        <h5>
          <strong>LastName: </strong>
          {user.lastName}
        </h5>
        <h5>
          <strong>Email: </strong>
          {user.email}
        </h5>
      </div>
    </div>
  );
};

export default index;
