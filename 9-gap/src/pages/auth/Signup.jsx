import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import authContext from "../../store/AuthContext";
import { signInWithGoogle } from "../../store/firestore";

const Auth = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(authContext);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const submitRegisterHandler = async () => {
    const formData = new FormData();
    formData.append("file", profilePic);
    const imageres = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
    const data1 = await imageres.json();
    let res = await fetch("http://localhost:5000/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email,
        password,
        profilePic: data1.path,
      }),
    });

    let data = await res.json();
    setJustifyActive("tab1");
  };

  const loginSubmitHandler = async () => {
    let res = await fetch("http://localhost:5000/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.success == 1) {
      authCtx.tokenChangeHandler(data.token);
      navigate("/dashboard");
    }
  };

  const googleAuth = async () => {
    signInWithGoogle();
    // console.log(data);
  };

  const profilePicHandler = async (e) => {
    e.preventDefault();
    setProfilePic(e.target.files[0]);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          {/* <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                {" "}
                <MDBIcon fab icon="google" size="sm" onClick={googleAuth} />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div> */}

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={loginSubmitHandler}>
            Sign in
          </MDBBtn>
          <p className="text-center">
            Not a member? <a href="#!">Register</a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <MDBInput
            wrapperClass="mb-4"
            label="FirstName"
            id="form1"
            type="text"
            value={fname}
            onChange={(e) => {
              setFName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="LastName"
            id="form1"
            type="text"
            value={lname}
            onChange={(e) => {
              setLName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <MDBInput wrapperClass="mb-4" label="Upload Profile Image">
            {/* <label class="form-label" for="customFile">
              Upload Profile Image
            </label> */}
            <input
              type="file"
              class="form-control"
              id="customFile"
              onChange={profilePicHandler}
            />
          </MDBInput>

          <MDBBtn className="mb-4 w-100" onClick={submitRegisterHandler}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default Auth;
