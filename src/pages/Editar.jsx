import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMovimientosContext } from "../contexts/MovimientosContext";

const categorias = ["alimentacion", "transporte", "entretenimiento", "salud", "educacion", "servicios", "ingresos", "otros"];
const tipos = ["ingreso", "gasto"];

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

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movimientos, editMovimiento } = useMovimientosContext();

  const movimiento = movimientos.find(m => m.id === parseInt(id));

  const initialValues = movimiento || {
    descripcion: "Cena con amigos",
    categoria: "alimentacion",
    tipo: "gasto",
    monto: 4500,
    fecha: "2025-10-10",
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Editar {movimiento ? movimiento.descripcion : `movimiento #${id}`}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={esquemaValidacion}
        onSubmit={(valores) => {
          editMovimiento(parseInt(id), valores);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div>
              <label>Descripción</label>
              <Field name="descripcion" className="border rounded p-2 w-full" />
              <ErrorMessage
                name="descripcion"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Categoría</label>
              <Field
                as="select"
                name="categoria"
                className="border rounded p-2 w-full"
              >
                <option value="">Seleccionar</option>
                <option value="alimentacion">Alimentación</option>
                <option value="transporte">Transporte</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                <option value="servicios">Servicios</option>
                <option value="ingresos">Ingresos</option>
                <option value="otros">Otros</option>
              </Field>
              <ErrorMessage
                name="categoria"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Tipo</label>
              <Field
                as="select"
                name="tipo"
                className="border rounded p-2 w-full"
              >
                <option value="">Seleccionar</option>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </Field>
              <ErrorMessage
                name="tipo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Monto</label>
              <Field
                name="monto"
                type="number"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="monto"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>Fecha</label>
              <Field
                name="fecha"
                type="date"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white rounded p-2 mt-2 hover:bg-green-700"
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Editar;