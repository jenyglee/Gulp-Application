const isEmail = (email) => {
    var regex =
        /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
};
const removeWhiteSpace = (text) => {
    return text.replace(/(\s*)/g, "");
};

export { isEmail, removeWhiteSpace };
