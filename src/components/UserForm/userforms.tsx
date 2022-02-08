import { useEffect, useCallback, useState, memo, useRef,createContext,useContext } from "react";
import { User, CustomInputProps } from ".";
import "./userform.css";
import { AppContext } from './context';
import DisplayUserData from './DisplayUserData';

const UserFormProvider = ({ name, age, phonenumber, email }: User) => {
  const defaultUser = {} as User;
  const [user, setUser] = useState(defaultUser);
  const [validateUser, setvalidateUser] = useState(defaultUser);
  let defaultErrorMsg: { [key: string]: string } = {};
  const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

 
  const onChange = useCallback((key, value) => {
    setUser((user) => ({ ...user, [key]: value }));
  }, []);

  useEffect(() => {
    setUser(user ? user : defaultUser);
  }, [user]);

  const SaveData = function (userdata: User) {
    console.log("pushpa");
    if (ValidateForm())
    { console.log("saving data:", userdata);
    setUser(user);
    setvalidateUser(user);
  }
  };

  const resetForm = () => {
    setUser(defaultUser);
    setErrorMsg(defaultErrorMsg);
  };

  const ValidateForm = (): Boolean => {
    let formIsValid = true;
    let errors: { [key: string]: string } = {};
    if (!user.name) {
      formIsValid = false;
      errors["name"] = "Please enter your username.";
    }
    if (!user.age) {
      formIsValid = false;
      errors["age"] = "Please enter your age.";
    }
    if (!user.phonenumber) {
      formIsValid = false;
      errors["phonenumber"] = "Please enter your phonenumber.";
    }
    if (user.phonenumber) {
      if (!user.phonenumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phonenumber"] = "Please enter valid phone no";
      }
    }

    if (!user.email) {
      formIsValid = false;
      errors["email"] = "Please enter your emailid.";
    }

    if (user.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(user.email)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email-ID.";
      }
    }

    setErrorMsg(errors);
    return formIsValid;
  };

  return (
    <AppContext.Provider value={{ validateUser}}>
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          SaveData(user);
        }}
      >
        <div className="row">
          <div className="col-25">
            <label>Name</label>
          </div>
          <div className="col-75">
            <CustomInput
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              stateKey="name"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25"></div>
          <div className="col-75">
            <label className="errormsg">{errorMsg["name"]}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Age</label>
          </div>
          <div className="col-75">
            <CustomInput
              type="number"
              name="age"
              placeholder="Enter your age"
              value={user.age}
              stateKey="age"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25"></div>
          <div className="col-75">
            <label className="errormsg">{errorMsg["age"]}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Phone Number</label>
          </div>
          <div className="col-75">
            <CustomInput
              type="text"
              name="phonenumber"
              placeholder="Enter your phonenumber"
              value={user.phonenumber}
              stateKey="phonenumber"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25"></div>
          <div className="col-75">
            <label className="errormsg">{errorMsg["phonenumber"]}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Email</label>
          </div>
          <div className="col-75">
            <CustomInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              stateKey="email"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25"></div>
          <div className="col-75">
            <label className="errormsg">{errorMsg["email"]}</label>
          </div>
        </div>

        <input type="submit" value="submit" />
        <input type="reset" value="Reset" onClick={resetForm} />
      </form>
    </div>
     <DisplayUserData/>
    </AppContext.Provider>
  );
};

const CustomInputType = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  stateKey,
}: CustomInputProps) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(stateKey, e.target.value)}
      />
    </div>
  );
};

const CustomInput = memo(CustomInputType);

export default UserFormProvider;
