import { toast } from "react-toastify";

// Capitialise function
export const capitaliseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Capitalise each word
export const capitaliseEachWord = (string, callback) => {
  let arr = string.split(' ');
  let newWords = arr.map((word) => {
  return callback(word);
  });
  return newWords.join(' ');
};

// to handle error serializing error DATE object
export const serializeErrorFunc = (data) => JSON.parse(JSON.stringify(data));

// Toastify alert
export const successNotification = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  },
  )
};

export const destroyNotification = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  },
  )
};

// Toastify close action
export const toastClose = (callbackFunction) => {
  return toast.onChange((payload) => {
    // when notification disappears
    if(payload.status === "removed") {
      callbackFunction();
    }
  })
};

// default image cloudinary URL
export const defaultTrackImgUrl = "vinyl-library-app/images/vinyl-white-label_rus5nl";

// mysql function - allows string template literals
export const addBackTicks = (str) => {
  let backticks = "`";
  let strArr = str.split('');
  strArr.unshift(backticks);
  strArr.push(backticks);
  return strArr.join('');  
};