// helper function to convert svg images to base64 for use in the poster

// NOT READY YET! DO MORE RESEARCH!

const SvgToBase64 = (element) => {
  return new Promise((resolve, reject) => {
    const file = element.files[0];

    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
};

export default SvgToBase64;
