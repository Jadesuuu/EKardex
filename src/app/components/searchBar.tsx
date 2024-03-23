import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton/IconButton';

interface SearchBarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    placeholder?: string; 
  }

const SearchBar: React.FC<SearchBarProps> = ({ onChange, placeholder }) => {
    return (
      <TextField
        label="Search"
        placeholder={placeholder || "John Doe"}
        onChange={onChange}
        sx={{background: 'white', marginLeft: '43.6vw', width: '30vw'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };
  
  export default SearchBar;
  