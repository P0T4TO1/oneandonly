import {
  FC,
  useContext,
  useState,
  useEffect,
  ComponentType,
  SyntheticEvent,
} from "react";
import { AuthContext } from "../../context";
import { IUser } from "../../interfaces";
// import { validations } from "../../utils";

import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  SlideProps,
  Slide,
  Chip,
} from "@mui/material";

import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import { ErrorOutline } from "@mui/icons-material";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

interface Props {
  userData: IUser;
}

type FormData = {
  name?: string;
  surname?: string;
  email?: string;
  image?: string;
  gender?: string;
  dateOfBirth?: string;
  telephone?: string;
};

export const Profile: FC<Props> = ({ userData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    ComponentType<TransitionProps> | undefined
  >(undefined);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [userProfile, setUserProfile] = useState<IUser>(userData);
  const [dateValue, setDateValue] = useState<Dayjs | null | undefined>(
    userData?.dateOfBirth ? dayjs(userData.dateOfBirth) : null
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userGender, setUserGender] = useState<string>("");
  const { user } = useContext(AuthContext);
  const Id = user?._id;

  useEffect(() => {
    if (userData) {
      setUserProfile(userData);
    }
  }, [userData]);

  const [isEditing, setIsEditing] = useState(false);

  const onUpdateProfile = async (data: FormData) => {
    const { name, surname, email } = data;
    const birthDate = dayjs(dateValue).format("YYYY-MM-DD");
    console.log(birthDate);
    const userUpdated = {
      ...userProfile,
      _id: Id,
      name,
      surname,
      email,
      gender: userGender,
      dateOfBirth: birthDate,
      telephone: phoneNumber,
    };

    await tesloApi
      .put("/profile", userUpdated)
      .then(() => {
        setTransition(() => TransitionLeft);
        setOpen(true);
        setIsEditing(false);
      })
      .catch((err) => {
        setShowError(true);
        setErrorMessage(err.message);
        setTimeout(() => setShowError(false), 3000);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        margin: "inherit",
      }}
    >
      <Box minWidth={{ xs: "100%", sm: "100%", md: 400, lg: 700 }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onUpdateProfile)}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(!isEditing)}
            sx={{ alignSelf: "flex-end", margin: "1rem" }}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          <Typography variant="h4" sx={{ marginBottom: 2 }} textAlign="center">
            Mi Perfil
          </Typography>
          <Chip
            label={errorMessage}
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? "flex" : "none" }}
          />
          {/* Imagen */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              margin: "1rem",
            }}
          >
            <Avatar src={userProfile?.image} sx={{ width: 100, height: 100 }} />
            <Button variant="contained" sx={{ marginTop: 1 }}>
              Cambiar Imagen
            </Button>
          </Box>

          <FormControl fullWidth>
            {isEditing && errors.name && (
              <Alert severity="error">{errors.name.message}</Alert>
            )}
            <TextField
              sx={{ marginBottom: 2 }}
              label="Nombre"
              variant="outlined"
              value={!isEditing ? userProfile?.name : undefined}
              disabled={!isEditing}
              {...register("name")}
            />
          </FormControl>

          <FormControl fullWidth>
            {isEditing && errors.surname && (
              <Alert severity="error">{errors.surname.message}</Alert>
            )}
            <TextField
              sx={{ marginBottom: 2 }}
              label="Apellido"
              variant="outlined"
              value={!isEditing ? userProfile?.surname : undefined}
              disabled={!isEditing}
              {...register("surname")}
            />
          </FormControl>

          <FormControl fullWidth>
            {isEditing && errors.email && (
              <Alert severity="error">{errors.email.message}</Alert>
            )}
            <TextField
              sx={{ marginBottom: 2 }}
              label="Email"
              variant="outlined"
              value={!isEditing ? userProfile?.email : undefined}
              disabled={!isEditing}
              {...register("email")}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            {isEditing && errors.gender && (
              <Alert severity="error">{errors.gender.message}</Alert>
            )}
            <InputLabel>Género</InputLabel>
            <Select
              value={!isEditing && userProfile?.gender}
              defaultValue={userProfile?.gender}
              label="Género"
              disabled={!isEditing}
              onChange={(value) => {
                setUserGender(value.target.value as string);
              }}
            >
              <MenuItem value={"masculino"}>Masculino</MenuItem>
              <MenuItem value={"femenino"}>Femenino</MenuItem>
              <MenuItem value={"undefined"}>Prefiero no decirlo</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <label>Teléfono</label>
            <PhoneInput
              country={"mx"}
              inputStyle={{ width: "100%", height: "100%" }}
              containerStyle={{ height: "50px" }}
              disabled={!isEditing}
              value={!isEditing ? userProfile?.telephone : undefined}
              onChange={(value) => {
                setPhoneNumber(value);
              }}
            />
          </FormControl>

          <FormControl sx={{ marginBottom: 2 }} fullWidth>
            {isEditing && errors.dateOfBirth && (
              <Alert severity="error">{errors.dateOfBirth.message}</Alert>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={!isEditing ? dayjs(userProfile?.dateOfBirth) : dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                disabled={!isEditing}
              />
            </LocalizationProvider>
          </FormControl>

          <Button
            sx={{ marginBottom: 2 }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isEditing}
          >
            Actualizar
          </Button>
        </form>
      </Box>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={transition}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Perfil actualizado correctamente
        </Alert>
      </Snackbar>
    </Box>
  );
};
