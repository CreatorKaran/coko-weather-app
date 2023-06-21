import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { fetchCities } from './../../api/placeSuggestion';
import { useClickOutside } from './../../hooks/useClickOutside';
import { LocationButton, LocationIcon, SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
import Suggestion from './Suggestion';
import Popup from '../ReactModel/ReactModel';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const suggestionRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      console.log('res', res);
      if (res.status && res.status === 429) {
        setSearchTerm('');
        setShowSuggestions(false);
        setShowPopup(true);
      } else {
        setSuggestions(res);
      }
    });
  }, [searchTerm]);

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  const showPosition = (position: any) => {
    dispatch(
      fetchWeather({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const fetchWeatherOnPosition = useCallback(async (latLong: any) => {
    dispatch(
      fetchWeather(latLong)
    );
  }, [dispatch]);

  useEffect(() => {
    function printLog(position: any) {
      fetchWeatherOnPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(printLog);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [fetchWeatherOnPosition]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));



  const onSearchInputChanged = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchElement>
      <SearchIcon />
      <Popup isOpen={showPopup} onRequestClose={closePopup} />
      <DebounceInput element={SearchInput} debounceTimeout={300} value={searchTerm} onChange={onSearchInputChanged} placeholder="Search for location" />
      <LocationButton
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert('Geolocation is not supported by this browser.');
          }
        }}
      >
        <LocationIcon />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s}
              suggest={s}
              hideSuggestionFn={() => {
                setSearchTerm('');
                setShowSuggestions(false);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default Search;
