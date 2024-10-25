const data = {
    title: "Hello World",
    description: "This is a description",
};

// write funciton to convert data object to url query string
export function toQueryString(data) {
    return Object.keys(data)
        .map((key) => key + "=" + data[key])
        .join("&");
}
