import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function RegisterForm({ addUser }) {
  // Schéma de validation des données avec yup
  const userSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required("Le nom est requis")
      .min(3, "Minimum 3 caractères"),
    emails: yup
      .array()
      .of(
        yup.object({
          email: yup
            .string()
            .trim()
            .required("Email obligatoire")
            .email("Email invalide"),
        }),
      )
      .min(1, "Ajouter au moins un email"),
    password: yup
      .string()
      .trim()
      .required("Le mot de passe est requis")
      .min(6, "Minimum 6 caractères"),
  });

  // Gestion du formulaire
  const defaultValues = {
    name: "",
    emails: [],
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    // watch,
    // getValues,
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(userSchema),
    criteriaMode: "all",
  });

  // watch("emails");
  // console.log(getValues("emails"));
  // Gestion des champs dynamiques
  const { fields, append, remove } = useFieldArray({
    control, // permet de lier un champs au formulaire
    name: "emails",
  });

  const onSubmit = async (data) => {
    alert("Formulaire soumis avec succès !");
    console.log(data);

    try {
      const response = await fetch(
        "https://restapi.fr/api/usersreactc14?delay=2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Nouvel utilisateur", data);
        addUser(data);
        reset(defaultValues);
      } else {
        console.log("Ooops une erreur");
      }
    } catch (error) {
      console.log(`Erreur: ${error.message}`);
    }
  };
  console.log("Erreurs du champs email: ", errors.emails);
  return (
    <section>
      <h2>Inscription</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-warning-subtle p-4 mt-3"
      >
        {/* Champ Nom */}
        <div>
          <label className="form-label">Nom :</label>
          <input {...register("name")} className="form-control" />
          {errors?.name && (
            <ul>
              {Object.keys(errors.name.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.name.types[k]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Champs Emails dynamiques */}
        <div className="mt-3">
          <label>Email(s) :</label>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex gap-3">
              <input
                {...register(`emails.${index}.email`)}
                className="form-control mb-1"
              />
              <button type="button" onClick={() => remove(index)}>
                🗑️
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ email: "" })}
            className="btn btn-success ms-2 mt-2"
          >
            Ajouter un email
          </button>
        </div>

        {/* Champ Mot de passe */}
        <div className="mt-3">
          <label className="form-label">Mot de passe :</label>
          <input
            type="password"
            {...register("password")}
            className="form-control"
          />
          {errors?.password && (
            <ul>
              {Object.keys(errors.password.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.password.types[k]}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-warning mt-3"
          disabled={isSubmitting}
        >
          S'inscrire
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;
