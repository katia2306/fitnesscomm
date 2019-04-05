import React from "react";
import {
  Typography,
  TextField,
  Divider,
  Link,
  Theme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";

interface Props {}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#2196f3",
    color: "#ffff"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    padding: "1%",
    overflowY: "scroll"
  },
  exerciseDate: {
    display: "inline-flex",
    padding: "10px"
  },
  datePicker: {
    paddingTop: "5%",
    marginRight: "10px"
  },
  segments: {
    padding: "1%"
  },
  links: {
    paddingBottom: "10px"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#2196f3"
    }
  }
}));

const ExerciseForm = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <form noValidate>
        <div className={classes.exerciseDate}>
          <Typography variant="body1" className={classes.datePicker}>
            Tu registro de ejercicios para
          </Typography>
          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <Divider />

        <div className={classes.segments}>
          <Typography variant="h5">Cardiovascular</Typography>
          <Typography className={classes.links}>
            <Link>Añadir</Link>|<Link>Herramientas rápidas</Link>
          </Typography>

          <Table>
            <TableHead>
              <TableRow className={classes.row}>
                <CustomTableCell>Minutos</CustomTableCell>
                <CustomTableCell>Minutos</CustomTableCell>
                <CustomTableCell>Calorías quemadas</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody />
          </Table>

          <Table>
            <TableRow>
              <CustomTableCell>Total diario / Objetivo</CustomTableCell>
              <CustomTableCell>0/70</CustomTableCell>
              <CustomTableCell>0/503</CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>Total semanal / Objetivo</CustomTableCell>
              <CustomTableCell>0/280</CustomTableCell>
              <CustomTableCell>0/2.010</CustomTableCell>
            </TableRow>
          </Table>
        </div>
        <Divider />
        <div className={classes.segments}>
          <Typography variant="h5">Entrenamiento</Typography>
          <Typography className={classes.links}>
            <Link>Añadir</Link>|<Link>Herramientas rápidas</Link>
          </Typography>

          <Table>
            <TableHead>
              <TableRow className={classes.row}>
                <CustomTableCell>Series</CustomTableCell>
                <CustomTableCell>Repeticiones / Series</CustomTableCell>
                <CustomTableCell>Peso / series</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody />
          </Table>
        </div>
        <div>
          <Typography variant="body1">
            Notas sobre el ejercicio de hoy
          </Typography>
          <TextField
            id="notes"
            label="Notas sobre el ejercicio de hoy"
            multiline
            rows="2"
            variant="outlined"
            fullWidth
          />
        </div>
        <Button variant="contained" color="primary">
          Ver informe Completo (Para imprimir)
        </Button>
      </form>
    </div>
  );
};

export default ExerciseForm;
