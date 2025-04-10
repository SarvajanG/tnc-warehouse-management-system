import TextField from "@mui/material/TextField";
export default function InputField(props) {
    return (
        <TextField
          autoFocus
          className={props.className}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          label={props.label}
          variant="filled"
          sx={{
            '& .MuiFilledInput-root': {
              '&:after': {
                borderBottomColor: 'orange', // Focus color
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused': {
                color: 'orange', // Label focus color
              },
            },
          }}
        />
    )
}