const fetchData = async () => {
    try {
        const response = await fetch('./diagramdata.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error; // Rethrow the error to propagate it upwards
    }
};

export default fetchData;
