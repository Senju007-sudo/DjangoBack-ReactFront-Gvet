import React, { useState, useEffect } from "react";
import ProprietaireDataService from "../services/ProprietaireServices";
import { Switch, Route, Link } from "react-router-dom";
import { Button , Input , Checkbox, Icon, Table , Divider, Form, Grid, Segment ,Modal , Header, Image} from 'semantic-ui-react'
import AddProprietaire from "../components/AddProprietaire"

const ProprietairesList = () => {
  const [proprietaire, setProprietaire] = useState([]);
  const [currentProprietaire, setCurrentProprietaire] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNom, setSearchNom] = useState("");
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    retrieveProprietaire();
  }, []);

  const onChangeSearchNom = e => {
    const searchNom = e.target.value;
    setSearchNom(searchNom);
  };

  const retrieveProprietaire = () => {
    ProprietaireDataService.getAll()
      .then(response => {
        setProprietaire(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProprietaire();
    setCurrentProprietaire(null);
    setCurrentIndex(-1);
  };

  const setActiveProprietaire = (proprietaire, index) => {
    setCurrentProprietaire(proprietaire);
    setCurrentIndex(index);
  };

  const removeAllProprietaire = () => {
    ProprietaireDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNom = () => {
    ProprietaireDataService.findByNom(searchNom)
      .then(response => {
        setProprietaire(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div >
      <div className="col-md-6">

      <div className="input-group mb-3">
            <Modal
                  basic
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  size='small'
                  trigger={<Button> Ajouter + </Button>}
                >
                  <Modal.Content>
                    <AddProprietaire></AddProprietaire>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => {setOpen(false); refreshList()}} >
                      <Icon name='remove' /> Terminer
                    </Button>
                  </Modal.Actions>
            </Modal>
      </div>
        <div className="input-group mb-3">
          <Input icon='users' iconPosition='left' placeholder='Search by Nom...'  value={searchNom} onChange={onChangeSearchNom} />
          <div className="input-group-append">
            <Button secondary onClick={findByNom}>
               Search
            </Button>
          </div>
        </div>
      </div>
        <div className="col-md-12">

        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
             <h4>Liste des Proprietaire </h4>

                <Table unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>Nom</Table.HeaderCell>
                      <Table.HeaderCell>Prenoms</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                  {proprietaire &&
                    proprietaire.map((proprietaire, index) => (
                    <Table.Row>
                      <Table.Cell>{proprietaire.id}</Table.Cell>
                      <Table.Cell>{proprietaire.nom}</Table.Cell>
                      <Table.Cell>{proprietaire.prenoms}</Table.Cell>
                      <Table.Cell><Button primary  onClick={() => setActiveProprietaire(proprietaire, index)}
                        key={index}>Details </Button></Table.Cell>
                    </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <div className="col-md-6  col-sm-6  col-xs-2">
                  {currentProprietaire ? (
                    <div>
                      <h4>Proprietaire</h4>
                      <div>
                        <label>
                          <strong>Nom:</strong>
                        </label>{" "}
                        {currentProprietaire.nom}
                      </div>
                      <div>
                        <label>
                          <strong>Prenoms:</strong>
                        </label>{" "}
                        {currentProprietaire.prenoms}
                      </div>
                      <div>
                        <label>
                          <strong>Cin:</strong>
                        </label>{" "}
                        {currentProprietaire.cin}
                      </div>
                      <div>
                        <label>
                          <strong>Adresse:</strong>
                        </label>{" "}
                        {currentProprietaire.adresse}
                      </div>
                      <div>
                        <label>
                          <strong>Tel:</strong>
                        </label>{" "}
                        {currentProprietaire.tel}
                      </div>


                      <Link
                        to={"/proprietaire/" + currentProprietaire.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please click on a Proprietaire...</p>
                    </div>
                  )}
                </div>
            </Grid.Column>
          </Grid>

           <Divider vertical></Divider>
       </Segment>


        </div>
      </div>
  );
};

export default ProprietairesList;