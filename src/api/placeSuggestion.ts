export const fetchCities = async (search: string) => {
  const url = `https://referential.p.rapidapi.com/v1/city?fields=iso_a2&lang=en&limit=250&prefix=${search}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.map((i: any) => {
        return i.fullName = `${i.value}, ${i.iso_a2}`;
      });
    } else {
      // Handle different error scenarios based on the response status code
      if (response.status === 429) {
        return { status: 429 };
      } else {
        console.log('Request failed with status: ' + response.status);
        return [];
      }
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
