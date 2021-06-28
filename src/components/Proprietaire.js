import React, { useState, useEffect } from "react";
import ProprietaireDataService from "../services/ProprietaireServices";

const Proprietaire = props => {
  const initialProprietaireState = {
    id: null,
    nom: "",
    prenoms: "",
    cin: "",
    adresse: "",
    tel:""
  };
  const [currentProprietaire, setCurrentProprietaire] = useState(initialProprietaireState);
  const [message, setMessage] = useState("");

  const getProprietaire = id => {
    ProprietaireDataService.get(id)
      .then(response => {
        setCurrentProprietaire(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProprietaire(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProprietaire({ ...currentProprietaire, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentProprietaire.id,
      nom: currentProprietaire.nom,
      prenoms: currentProprietaire.prenoms,
      cin:currentProprietaire.cin,
      adresse: currentProprietaire.adresse,
      tel: currentProprietaire.tel
    };

    ProprietaireDataService.update(currentProprietaire.id, data)
      .then(response => {
        setCurrentProprietaire({ ...currentProprietaire, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProprietaire = () => {
    ProprietaireDataService.update(currentProprietaire.id, currentProprietaire)
      .then(response => {
        console.log(response.data);
        setMessage("The proprietaire was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProprietaire = () => {
    ProprietaireDataService.remove(currentProprietaire.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/proprietaire");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProprietaire ? (
        <div className="edit-form">
          <h4>Proprietaire</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nom">Title</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={currentProprietaire.nom}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenoms">Prenoms</label>
              <input
                type="text"
                className="form-control"
                id="prenoms"
                name="prenoms"
                value={currentProprietaire.prenoms}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cin">Cin</label>
              <input
                type="text"
                className="form-control"
                id="cin"
                name="cin"
                value={currentProprietaire.cin}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                className="form-control"
                id="adresse"
                name="adresse"
                value={currentProprietaire.adresse}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Telephone</label>
              <input
                type="text"
                className="form-control"
                id="tel"
                name="tel"
                value={currentProprietaire.tel}
                onChange={handleInputChange}
              />
            </div>


          </form>

          <button className="badge badge-danger mr-2" onClick={deleteProprietaire}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProprietaire}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Proprietaire...</p>
        </div>
      )}
    </div>
  );
};

export default Proprietaire;