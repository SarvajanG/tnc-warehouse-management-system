import TextField from "@mui/material/TextField";
export default function InputField(props) {
  return (
    <TextField
      autoFocus={props.autoFocus}
      className={props.className}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      label={props.label}
      variant="filled"
      disabled={props.disabled}
      sx={{
        width: "100%",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "white",
        "& .MuiFilledInput-root": {
          "&:after": {
            borderBottomColor: "orange", // Focus color
          },
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: "orange", // Label focus color
          },
        },
      }}
    />
  );
}
