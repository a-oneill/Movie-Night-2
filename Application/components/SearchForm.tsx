import React, { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { MOVIE_GENRES, RELEASE_YEARS, RUNTIMES, RATINGS } from '../constants';
import { SearchCriteria } from '../types';
import { SparklesIcon } from './icons';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria, isFeelingLucky: boolean) => void;
  isLoading: boolean;
}

export interface SearchFormHandle {
  focusFirstField: () => void;
  setCriteria: (criteria: SearchCriteria) => void;
}

const initialCriteria: SearchCriteria = {
  genre: '',
  actor: '',
  director: '',
  writer: '',
  producer: '',
  productionHouse: '',
  releaseYear: '',
  runtime: '',
  rating: '',
};

// Define FormInput outside of the SearchForm component to prevent re-creation on every render.
interface FormInputProps {
  name: keyof SearchCriteria;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, value, onChange, disabled }) => (
  <div className="ui-form__field">
    <label htmlFor={name} className="ui-form__label">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="ui-form__input"
      placeholder={label === 'Actor' ? 'Tom Hanks' : 'Search name'}
    />
  </div>
);


export const SearchForm = forwardRef<SearchFormHandle, SearchFormProps>(({ onSearch, isLoading }, ref) => {
  const [criteria, setCriteriaState] = useState<SearchCriteria>(initialCriteria);
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteriaState(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(criteria, false);
  };

  const handleFeelingLucky = () => {
    setCriteriaState(initialCriteria);
    onSearch(initialCriteria, true);
  };

  useImperativeHandle(ref, () => ({
    focusFirstField() {
      firstFieldRef.current?.focus();
    },
    setCriteria(next) {
      setCriteriaState(next);
    },
  }), []);

  return (
    <form onSubmit={handleSubmit} className="ui-form">
      <div className="ui-form__grid">
        <div className="ui-form__field">
          <label htmlFor="genre" className="ui-form__label">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={criteria.genre}
            onChange={handleInputChange}
            disabled={isLoading}
            className="ui-form__select"
            ref={firstFieldRef}
          >
            <option value="">Any Genre</option>
            {MOVIE_GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="ui-form__field">
          <label htmlFor="releaseYear" className="ui-form__label">
            Release Year
          </label>
          <select
            id="releaseYear"
            name="releaseYear"
            value={criteria.releaseYear}
            onChange={handleInputChange}
            disabled={isLoading}
            className="ui-form__select"
          >
            <option value="">Any Year</option>
            {RELEASE_YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="ui-form__field">
          <label htmlFor="runtime" className="ui-form__label">
            Runtime
          </label>
          <select
            id="runtime"
            name="runtime"
            value={criteria.runtime}
            onChange={handleInputChange}
            disabled={isLoading}
            className="ui-form__select"
          >
            <option value="">Any Runtime</option>
            {RUNTIMES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="ui-form__field">
          <label htmlFor="rating" className="ui-form__label">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={criteria.rating}
            onChange={handleInputChange}
            disabled={isLoading}
            className="ui-form__select"
          >
            <option value="">Any Rating</option>
            {RATINGS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <FormInput name="actor" label="Actor" value={criteria.actor} onChange={handleInputChange} disabled={isLoading} />
        <FormInput name="director" label="Director" value={criteria.director} onChange={handleInputChange} disabled={isLoading} />
        <FormInput name="writer" label="Writer" value={criteria.writer} onChange={handleInputChange} disabled={isLoading} />
        <FormInput name="producer" label="Producer" value={criteria.producer} onChange={handleInputChange} disabled={isLoading} />
        <FormInput name="productionHouse" label="Production House" value={criteria.productionHouse} onChange={handleInputChange} disabled={isLoading} />
      </div>

      <div className="ui-form__actions">
        <button
          type="submit"
          disabled={isLoading}
          className="ui-btn ui-btn--primary"
        >
          {isLoading ? 'Searching...' : 'Search Movies'}
        </button>
        <button
          type="button"
          onClick={handleFeelingLucky}
          disabled={isLoading}
          className="ui-btn ui-btn--ghost"
        >
          <SparklesIcon className="ui-btn__icon" />
          I'm Feeling Lucky
        </button>
      </div>
    </form>
  );
});

SearchForm.displayName = 'SearchForm';
