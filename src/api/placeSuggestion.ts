export const fetchCities = async (search: string) => {
  const url = `https://referential.p.rapidapi.com/v1/city?fields=iso_a2&lang=en&limit=250&prefix=${search}`;

  const res = await (
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`
      }
    })
  ).json();

  return res.map((i: any) => {
    // return i.locale_names[0] + ', ' + i.country;
    return i.fullName = `${i.value}, ${i.iso_a2}`;
  });
};
