const getFormattedTime = (timestampStr) => {
    var options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    var readableFormat = new Date(timestampStr).toLocaleDateString('en-US', options);
    return readableFormat;
};

export default getFormattedTime;