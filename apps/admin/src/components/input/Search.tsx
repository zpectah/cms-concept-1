import { forwardRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchProps } from './types';
import Input from './Input';

const Search = forwardRef<HTMLInputElement, SearchProps>(({ disableIcon, ...rest }, ref) => {
  return <Input type="search" startAdornment={!disableIcon && <SearchIcon />} inputRef={ref} {...rest} />;
});

export default Search;
