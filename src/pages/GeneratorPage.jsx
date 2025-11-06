import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  deleteDoc, // <-- Import doc and deleteDoc
} from "firebase/firestore";

function GeneratorPage() {
  // State for user authentication
  const [user, setUser] = useState(null);

  // State for generator functionality
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [savedDataList, setSavedDataList] = useState([]);
  const [clipboardText, setClipboardText] = useState("📋");

  // State to toggle visibility of saved data
  const [showSavedData, setShowSavedData] = useState(false);

  // Refs for smooth scrolling
  const instructionsRef = useRef(null);
  const suggestionsRef = useRef(null);
  const aboutRef = useRef(null);

  // Check user login status on component load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSavedData(currentUser.uid);
      } else {
        setSavedDataList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGeneratePassword = () => {
    const randomFunc = {
      lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
      upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
      number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
      symbol: () =>
        "!@#$%^&*(){}[]=<>/,.".charAt(Math.floor(Math.random() * 20)),
    };

    const typesArr = [
      ...(includeLower ? [{ lower: true }] : []),
      ...(includeUpper ? [{ upper: true }] : []),
      ...(includeNumber ? [{ number: true }] : []),
      ...(includeSymbol ? [{ symbol: true }] : []),
    ];

    if (typesArr.length === 0 || !length) {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const type = typesArr[Math.floor(Math.random() * typesArr.length)];
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    }
    setPassword(generatedPassword);
  };

  const handleGenerateQR = () => {
    const inputText = password.trim() || customInput.trim();
    if (!inputText) {
      alert("Please generate a password or enter custom data!");
      return;
    }
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      inputText
    )}`;
    setQrCodeUrl(qrUrl);
  };

  const copyToClipboard = () => {
    if (!password) {
      alert("No password to copy!");
      return;
    }
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  const handleLogout = () => {
    signOut(auth);
    setShowSavedData(false); // Hide data on logout
  };

  const handleSaveData = async () => {
    if (!user) {
      alert("You must be logged in to save data!");
      return;
    }
    const dataToSave = password || customInput;
    if (!dataToSave) {
      alert(
        "Nothing to save. Please generate a password or enter custom data."
      );
      return;
    }

    const nickname = window.prompt(
      "Enter a nickname for this data (e.g., 'Gmail Password', 'Wi-Fi QR Code'):"
    );

    if (!nickname) {
      alert("Save cancelled. A nickname is required.");
      return;
    }

    try {
      await addDoc(collection(db, "savedData"), {
        value: dataToSave,
        nickname: nickname,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      alert("Data saved successfully!");
      fetchSavedData(user.uid);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const fetchSavedData = async (userId) => {
    const q = query(
      collection(db, "savedData"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSavedDataList(dataList);
  };

  // NEW: Function to delete a saved item
  const handleDeleteData = async (dataId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const docRef = doc(db, "savedData", dataId);
      await deleteDoc(docRef);

      // Update the state locally to remove the item from the list instantly
      setSavedDataList((prevData) =>
        prevData.filter((item) => item.id !== dataId)
      );

      alert("Data deleted successfully.");
    } catch (error) {
      console.error("Error deleting data: ", error);
      alert("Failed to delete data.");
    }
  };

  return (
    <>
      <header>
        <div className="navbar">
          <div className="navbar-left">
            <a href="#" className="nav-brand">
              Password & QR Generator
            </a>
          </div>
          <div className="navbar-buttons">
            <button
              className="btn btn-small"
              onClick={() => scrollToSection(instructionsRef)}
            >
              Instructions
            </button>
            <button
              className="btn btn-small"
              onClick={() => scrollToSection(suggestionsRef)}
            >
              Suggestions
            </button>
            <button
              className="btn btn-small"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </button>

            {user ? (
              <>
                <button
                  className="btn btn-small"
                  onClick={() => setShowSavedData(!showSavedData)}
                >
                  {showSavedData ? "Hide Data" : "My Saved Data"}
                </button>
                <button className="btn btn-small" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-small">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container">
        <div className="options">
          <h2>Generate here!</h2>
          {user ? (
            <p>Welcome, {user.email}</p>
          ) : (
            <p>Login to save your data.</p>
          )}
          <div className="result-container">
            <span>{password}</span>
            <button
              className="btn"
              onClick={copyToClipboard}
              onMouseEnter={() => setClipboardText("Copy to clipboard")}
              onMouseLeave={() => setClipboardText("📋")}
            >
              {clipboardText}
            </button>
          </div>
          <input
            type="number"
            placeholder="Password Length (4-20)"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <div className="settings">
            <label>
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
              />{" "}
              Include Uppercase Letters
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
              />{" "}
              Include Lowercase Letters
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNumber}
                onChange={(e) => setIncludeNumber(e.target.checked)}
              />{" "}
              Include Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeSymbol}
                onChange={(e) => setIncludeSymbol(e.target.checked)}
              />{" "}
              Include Symbols
            </label>
          </div>
          <button className="btn btn-large" onClick={handleGeneratePassword}>
            Generate Password
          </button>
          <input
            type="text"
            placeholder="Or Enter Custom Data for QR"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />
          <button className="btn btn-large" onClick={handleGenerateQR}>
            Generate QR Code
          </button>
          {user && (
            <button className="btn btn-large" onClick={handleSaveData}>
              Save Data
            </button>
          )}
        </div>

        {qrCodeUrl && (
          <div className="qr-display">
            <div id="qrResult">
              <img src={qrCodeUrl} alt="Generated QR Code" />
            </div>
          </div>
        )}

        {/* UPDATED: Conditionally rendered saved data section */}
        {user && showSavedData && (
          <div className="suggestions">
            <h2>Your Saved Data</h2>
            {savedDataList.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {savedDataList.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span>
                      <strong>{item.nickname}:</strong> {item.value}
                    </span>
                    {/* NEW: Delete Button */}
                    <button
                      onClick={() => handleDeleteData(item.id)}
                      className="btn"
                      style={{
                        backgroundColor: "#dc3545",
                        padding: "5px 10px",
                        marginLeft: "10px",
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't saved any data yet.</p>
            )}
          </div>
        )}

        <div className="instructions" ref={instructionsRef}>
          <h2>How to Use</h2>
          <ul>
            <li>
              <strong>Generate Passwords:</strong>
              <ul>
                <li>
                  Enter the desired length of the password (between 4 and 20
                  characters) in the "Password Length" field.
                </li>
                <li>
                  Check the boxes to include uppercase letters, lowercase
                  letters, numbers, and symbols as per your preference.
                </li>
                <li>
                  Click the "Generate Password" button to generate a random
                  password based on your criteria.
                </li>
              </ul>
            </li>
            <li>
              <strong>Copy to Clipboard:</strong>
              <ul>
                <li>
                  Once a password is generated, you can click the clipboard icon
                  (📋) next to the generated password to copy it to your
                  clipboard.
                </li>
              </ul>
            </li>
            <li>
              <strong>Generate QR Code:</strong>
              <ul>
                <li>
                  Optionally, you can generate a QR code for the generated
                  password or any custom data.
                </li>
                <li>
                  Click the "Generate QR Code" button to create a QR code for
                  the password or enter custom data in the input field and then
                  click the button.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="suggestions" ref={suggestionsRef}>
          <h2>Making Strong Passwords</h2>
          <ul>
            <li>
              <strong>Length:</strong> Aim for passwords with a minimum length
              of 12 characters. Longer passwords are generally more secure.
            </li>
            <li>
              <strong>Complexity:</strong> Include a mix of uppercase letters,
              lowercase letters, numbers, and symbols in your password to
              increase its complexity.
            </li>
            <li>
              <strong>Avoid Common Words:</strong> Avoid using easily guessable
              words, phrases, or common patterns in your password.
            </li>
            <li>
              <strong>Randomness:</strong> Use random combinations of characters
              rather than predictable sequences to make your password harder to
              crack.
            </li>
            <li>
              <strong>Avoid Personal Information:</strong> Do not include
              personal information such as your name, birthdate, or any easily
              accessible information in your password.
            </li>
            <li>
              <strong>Unique Passwords:</strong> Use unique passwords for
              different accounts to prevent a security breach on one platform
              from affecting others.
            </li>
            <li>
              <strong>Regular Updates:</strong> Regularly update your passwords,
              especially for sensitive accounts, to maintain security.
            </li>
          </ul>
          <p>
            Remember to store your passwords securely and consider using a
            reputable password manager to manage and generate complex passwords
            for your accounts.
          </p>
        </div>
        <div className="about" ref={aboutRef}>
          <h2>About Me</h2>
          <ul>
            <li>
              <strong>Made by:</strong> Shashank Kanojia
            </li>
            <li>
              <strong>Email:</strong>
              <a
                href="mailto:kanojiashashank87@gmail.com"
                className="email-link"
              >
                {" "}
                kanojiashashank87@gmail.com
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>
              <a
                href="https://github.com/ShashankKan0jia"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                {" "}
                ShashankKan0jia
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>
              <a
                href="https://www.linkedin.com/in/shashank-kanojia-a2413924b/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                {" "}
                Shashank Kanojia
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default GeneratorPage;
