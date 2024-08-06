/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copy to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    alert("Show the password");
    if (ref.current.src.includes("/image/hidden.png")) {
      ref.current.src = "/image/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/image/hidden.png";
    }
  };

  const savePassword = () => {
    if(form.site.length == "" && form.username.length == "" && form.password.length == ""){
      alert("You not saved Empty field");
    }
    else{
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    setform({ site: "", username: "", password: "" });
    }
  };

  const deletePassword = (id) => {
    let conform = confirm("Do you really want to delete this password??");
    if(conform){
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
  };

  const handleChange = (event) => {
    let demo = setform({ ...form, [event.target.name]: event.target.value });
    console.log(demo);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mx-auto  md:p-0 md:mycontainer pt-7">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </h1>
        <p className="text-center text-green-700">Your own Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-8">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex md:flex-row flex-col text-black justify-between gap-3">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter User Name"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-[3px] top-[1px] p-1 cursor-pointer"
                onClick={showPassword}
              >
                <img src="/image/eye.png" ref={ref} width={24} alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-8 mx-auto  py-2 w-fit hover:bg-green-300"
          >
            Save Password
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
          </button>
        </div>

        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center border-white py-2 ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 lordiconcopy cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="size-7 lordiconcopy cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2">
                        <span>{item.password}</span>
                        <div className="flex items-center justify-center">
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center py-2 ">
                        <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            style={{"width":"34px","height":"34px"}}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            style={{"width":"34px","height":"34px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
