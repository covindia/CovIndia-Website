import axios from "axios";

export const changeLanguage = (e) => {
  const language = e.target.id;
  const foodText = document.getElementById("foodText");
  const waterText = document.getElementById("waterText");
  const doctorText = document.getElementById("doctorText");
  const medicineText = document.getElementById("medicineText");
  const talkText = document.getElementById("talkText");
  const ambulanceText = document.getElementById("ambulanceText");
  const emergencyText = document.getElementById("emergencyText");
  const mobileText = document.getElementById("mobileText");
  const placeholderText = document.getElementById("icon_telephone");
  const submitText = document.getElementById("submitText");

  if (language === "englishToggler") {
    foodText.innerText = "Food";
    waterText.innerText = "Water";
    doctorText.innerText = "Doctor";
    medicineText.innerText = "Medicine";
    talkText.innerText = "Just Talk";
    ambulanceText.innerText = "Ambulance";
    emergencyText.innerText = "USE IN CASE OF EMERGENCY ONLY";
    try {
      mobileText.innerText = "Your registered number is";
    } catch (error) {
      console.log(error);
    }
    try {
      placeholderText.placeholder = "Enter your phone number";
      submitText.innerHTML = "Submit";
    } catch (error) {}
  }
  if (language === "hindiToggler") {
    foodText.innerText = "खाना";
    waterText.innerText = "पानी";
    doctorText.innerText = "डॉक्टर";
    medicineText.innerText = "दवाई";
    talkText.innerText = "बातचीत";
    ambulanceText.innerText = "आंब्युलेन्स";
    emergencyText.innerText = "केवल आपातकालीन स्थितियों के लिए उपयोग करें";
    try {
      mobileText.innerText = "आपके द्वारा दिया गया नंबर है";
    } catch (error) {
      console.log(error);
    }
    try {
      placeholderText.placeholder = "अपना फोन नंबर लिखें";
      submitText.innerHTML = "बटन दबाएं";
    } catch (error) {
      console.log(error);
    }
  }
};

export const registerOrg = (name, email, phone, services) => {
  console.log({
    org: name,
    email: email,
    phone: phone,
    ...services,
  });
  axios
    .post("https://ach4l.pythonanywhere.com/registration", {
      org: name,
      email: email,
      phone: phone,
      default_lang: "English",
      ...services,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
