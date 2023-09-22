const shuffle = (array) => {
    const temp = array;

    array = [];

    for (let len = temp.length; len > 0; len --) {
        const index = Math.floor(Math.random() * len);

        array.push(temp[index]);

        temp.splice(index, 1);
    }

    return array;
};

export default shuffle;