import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { SuggestionItem } from './styled';

interface ISuggestionProps {
  label: string;
  suggest: any;
  hideSuggestionFn: Function;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  console.log('Suggest..', props.suggest)
  const dispatch = useDispatch();
  const onClick = () => {
    // dispatch(fetchWeather(props.label.split(',')[0]));
    dispatch(fetchWeather(props.label));
    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);
  };

  return <SuggestionItem onClick={onClick}>{props.label}</SuggestionItem>;
};

export default Suggestion;
