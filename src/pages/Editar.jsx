import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovimientosContext } from "../contexts/MovimientosContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const esquemaValidacion = Yup.object({
  descripcion: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .required("Campo obligatorio"),
  categoria: Yup.string().required("Seleccioná una categoría"),
  tipo: Yup.string().required("Seleccioná tipo"),
  monto: Yup.number()
    .positive("Debe ser un número positivo")
    .required("Campo obligatorio"),
  fecha: Yup.date()
    .max(new Date(), "La fecha no puede ser futura")
    .required("Seleccioná una fecha válida"),
});

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movimientos, editMovimiento } = useMovimientosContext();

  const movimiento = movimientos.find(m => m.id === parseInt(id));

  return (
    <div className="nuevo-movimiento">
      <h2>Editar {movimiento ? movimiento.descripcion : `movimiento #${id}`}</h2>

      <Formik
        enableReinitialize
        initialValues={{
          descripcion: movimiento?.descripcion || "",
          categoria: movimiento?.categoria || "alimentacion",
          tipo: movimiento?.tipo || "gasto",
          monto: movimiento?.monto ?? "",
          fecha: movimiento?.fecha || new Date().toISOString().split("T")[0],
        }}
        validationSchema={esquemaValidacion}
        onSubmit={(values) => {
          const movimientoActualizado = {
            descripcion: values.descripcion.trim(),
            categoria: String(values.categoria).toLowerCase(),
            tipo: String(values.tipo).toLowerCase(),
            monto: Number(values.monto),
            fecha: values.fecha,
          };
          editMovimiento(parseInt(id), movimientoActualizado);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <Field id="descripcion" name="descripcion" />
              <ErrorMessage name="descripcion" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>
              <Field as="select" id="tipo" name="tipo">
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
              </Field>
              <ErrorMessage name="tipo" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría:</label>
              <Field as="select" id="categoria" name="categoria">
                <option value="alimentacion">Alimentación</option>
                <option value="transporte">Transporte</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                <option value="servicios">Servicios</option>
                <option value="ingresos">Ingresos</option>
                <option value="otros">Otros</option>
              </Field>
              <ErrorMessage name="categoria" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-group">
              <label htmlFor="monto">Monto:</label>
              <Field type="number" id="monto" name="monto" step="0.01" />
              <ErrorMessage name="monto" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha:</label>
              <Field type="date" id="fecha" name="fecha" />
              <ErrorMessage name="fecha" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>Guardar cambios</button>
              <button type="button" className="btn-secondary" onClick={() => navigate("/")}>Cancelar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Editar;
