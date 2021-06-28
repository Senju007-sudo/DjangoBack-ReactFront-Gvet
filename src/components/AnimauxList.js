import React, { useState, useEffect } from "react";
import AnimauxDataService from "../services/AnimauxServices";
import { Switch, Route, Link } from "react-router-dom";
import { Button , Input , Checkbox, Icon, Table , Divider, Form, Grid, Segment ,Modal , Header, Image} from 'semantic-ui-react'
import AddAnimaux from "./AddAnimaux.js"

const ProprietairesList = () => {
  const [animaux, setAnimaux] = useState([]);
  const [currentAnimaux, setCurrentAnimaux] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNom, setSearchNom] = useState("");
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    retrieveAnimaux();
  }, []);

  const onChangeSearchNom = e => {
    const searchNom = e.target.value;
    setSearchNom(searchNom);
  };

  const retrieveAnimaux = () => {
    AnimauxDataService.getAll()
      .then(response => {
        setAnimaux(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveAnimaux();
    setCurrentAnimaux(null);
    setCurrentIndex(-1);
  };

  const setActiveAnimaux = (proprietaire, index) => {
    setCurrentAnimaux(proprietaire);
    setCurrentIndex(index);
  };


  const findByNom = () => {
    AnimauxDataService.findByNom(searchNom)
      .then(response => {
        setAnimaux(response.data);
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
                    <AddAnimaux></AddAnimaux>
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
                      <Table.HeaderCell>Proprietaire</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                  {animaux &&
                    animaux.map((animaux, index) => (
                    <Table.Row>
                      <Table.Cell>{animaux.id}</Table.Cell>
                      <Table.Cell>{animaux.nom}</Table.Cell>
                      <Table.Cell>{animaux.proprietaire}</Table.Cell>
                      <Table.Cell><Button primary  onClick={() => setActiveAnimaux(animaux, index)}
                        key={index}>Details </Button></Table.Cell>
                    </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <div className="col-md-6  col-sm-6  col-xs-2">
                  {currentAnimaux ? (
                    <div>
                      <h4>Animaux</h4>
                      <div>
                        <label>
                          <strong>Nom:</strong>
                        </label>{" "}
                        {currentAnimaux.nom}
                      </div>



                      <Link
                        to={"/animaux/" + currentAnimaux.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please click on a Animaux...</p>
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