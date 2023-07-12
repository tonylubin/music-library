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
export const toastNotification = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
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
    if(payload.status === "removed") {
      callbackFunction();
    }
  })
};

// default image cloudinary URL
export const defaultTrackImgUrl = "vinyl-library-app/vinyl-white-label_rus5nl";