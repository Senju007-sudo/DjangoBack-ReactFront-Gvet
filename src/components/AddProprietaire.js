import React, { useState } from "react";
import ProprietaireDataService from "../services/ProprietaireServices";
import { Button , Input } from 'semantic-ui-react'
import { Switch, Route, Link } from "react-router-dom";
const AddProprietaire = () => {
  const initialProprietaireState = {
    id: null,
    nom: "",
    prenoms: "",
    cin: "",
    adresse: "",
    tel:""
  };
  const [proprietaire, setProprietaire] = useState(initialProprietaireState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProprietaire({ ...proprietaire, [name]: value });
  };

  const saveProprietaire = () => {
    var data = {
      nom: proprietaire.nom,
      prenoms: proprietaire.prenoms,
      adresse: proprietaire.adresse,
      cin: proprietaire.cin,
      tel: proprietaire.tel

    };

    ProprietaireDataService.create(data)
      .then(response => {
        setProprietaire({
          id: response.data.id,
          nom: response.data.nom,
          prenoms: response.data.prenoms,
          adresse: response.data.adresse,
          cin: response.data.cin,
          tel: response.data.tel
        });
        setSubmitted(true);
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProprietaire = () => {
    setProprietaire(initialProprietaireState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Button primary onClick={newProprietaire}>
            Ajouter
          </Button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              required
              value={proprietaire.nom}
              onChange={handleInputChange}
              name="nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenoms">Prenoms</label>
            <input
              type="text"
              className="form-control"
              id="prenoms"
              required
              value={proprietaire.prenoms}
              onChange={handleInputChange}
              name="prenoms"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cin">Cin</label>
            <input
              type="text"
              className="form-control"
              id="cin"
              required
              value={proprietaire.cin}
              onChange={handleInputChange}
              name="cin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              required
              value={proprietaire.adresse}
              onChange={handleInputChange}
              name="adresse"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Adresse</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              required
              value={proprietaire.tel}
              onChange={handleInputChange}
              name="tel"
            />
          </div>


          <Button primary onClick={saveProprietaire} >
            Submit
          </Button>
        </div>


      )}
    </div>

  );
};

export default AddProprietaire;