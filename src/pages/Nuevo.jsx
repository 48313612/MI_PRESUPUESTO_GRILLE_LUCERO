import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const categorias = [ "Alimentación", "Transporte", "Entretenimiento", "Salud", "Educación", "Servicios", "Ingresos", "Otros",];
const tipos = ["Gasto", "Ingreso"];

const esquemaValidacion = Yup.object({
  descripcion: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .required("Campo obligatorio"),
  categoria: Yup.string().required("Seleccioná una categoría"),
  tipo: Yup.string().required("Seleccioná tipo"),
  monto: Yup.number()
    .positive("Debe ser un número positivo")
    .required("Campo obligatorio"),
  fecha: Yup.date().required("Seleccioná una fecha válida"),
});

function Nuevo() {
  const navigate = useNavigate();

  return (
    <div className="nuevo-movimiento">
      <h2>
        Nuevo Movimiento
      </h2>

      <Formik
        initialValues={{
          descripcion: "",
          categoria: "",
          tipo: "",
          monto: "",
          fecha: "",
        }}
        validationSchema={esquemaValidacion}
        onSubmit={(values, { resetForm }) => {
          console.log("Nuevo movimiento:", values);
          alert("Movimiento agregado (simulado)");
          resetForm();
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Descripción</label>
              <Field
                name="descripcion"
              />
              <ErrorMessage
                name="descripcion"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <Field
                as="select"
                name="categoria"
              >
                <option value="">Seleccionar</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="categoria"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <Field
                as="select"
                name="tipo"
              >
                <option value="">Seleccionar</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="tipo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label>Monto</label>
              <Field
                name="monto"
                type="number"
              />
              <ErrorMessage
                name="monto"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <Field
                name="fecha"
                type="date"
              />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                Guardar
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Nuevo;