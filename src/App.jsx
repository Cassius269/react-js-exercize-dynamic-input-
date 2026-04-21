import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const onSubmit = (data) => {
    alert("Formulaire soumis avec succès !");
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Champ Nom */}
        <div>
          <label>Nom :</label>
          <input {...register("name")} />
        </div>

        {/* Champs Emails dynamiques */}
        <div>
          <label>Email(s) :</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`emails.${index}.email`)} />
              <button type="button" onClick={() => remove(index)}>
                🗑️
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ email: "" })}>
            Ajouter un email
          </button>
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label>Mot de passe :</label>
          <input type="password" {...register("password")} />
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
