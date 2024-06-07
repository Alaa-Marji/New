import axios from "axios";
import { useState } from "react";
import { LOG, baseURL } from "../../Api/Api";
import Loading from "../Loading/loading";
import "../Loading.css";
import ErrorMessage from "../errorBox";
import "./css/components/Auth.css";
import "./css/components/alert.css";
import "./css/components/button.css";
import "./css/components/form.css";
import { Box, Button, Modal, Fade } from "@mui/material";
import PasswordResetComponent from "../Auth/ForgetPassword/Forget";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();

  // States
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [oLoading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Cookie
  const cookie = Cookie();

  // Modal state and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleCloseErr = () => {
    setErro("");
  };

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/${LOG}`, form);
      const token = response.data.data.token;
      cookie.set("token", token);
      let roles = response.data.data.user.roles_name;
      roles = Object.entries(roles);
      let permissions = [];
      roles.map((role) => {
        permissions.push(role[1]);
      });
      cookie.set("permissions", permissions[0]);

      setLoading(false);

      // Replace true delete path and show last path
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.response === 401) {
        setErro("Wrong Email Or Password");
      } else {
        setErro("Internal Server Error ");
      }
    }
  }

  return (
    <>
      {oLoading && <Loading />}

      <div className="co row h-100 d-flex justify-content-center align-items-center">
        <form className="form" onSubmit={handleSubmit}>
          <div className="custom-form">
            <h1>Login Now</h1>
            <div className="mb-3">
              <label htmlFor="login">Email/Username:</label>
              <div className="input-field">
                <input
                  id="login"
                  type="text"
                  value={form.login}
                  placeholder="Enter Your Email.."
                  onChange={handleChange}
                  name="login"
                  required
                  minLength={2}
                  className="input-email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  placeholder="Enter Your Password.."
                  onChange={handleChange}
                  name="password"
                  required
                  minLength={6}
                  className="input-email"
                />
              </div>
              <Button onClick={handleOpen}>Forget Password?</Button>
            </div>

            <button className="btn btn-primary">Submit</button>
            {erro !== "" && (
              <ErrorMessage message={erro} onClose={handleCloseErr} />
            )}
          </div>
        </form>
      </div>

      <Modal
        className="modal"
        open={open}
        // onClose={(event, reason) => {
        //   if (reason === "backdropClick" || reason === "escapeKeyDown") {
        //     return;
        //   }
        //   handleClose();
        // }}
      >
        <Fade in={open}>
          <Box className="modal-box modal-animation">
            <Close className="iconclose" onClick={handleClose} />

            <PasswordResetComponent />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
